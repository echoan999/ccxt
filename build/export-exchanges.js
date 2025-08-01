// ----------------------------------------------------------------------------
// Usage:
//
//      npm run export-exchanges
// ----------------------------------------------------------------------------

import fs from 'fs'
import path from 'path'
import log  from 'ololog'
import ansi from 'ansicolor'
import { pathToFileURL } from 'url'
import { countries } from './countries.js'
import { execSync } from 'child_process';
import { replaceInFile } from './fsLocal.js'
import asTable from 'as-table'
import { promisify } from 'util'

const { keys, values, entries, fromEntries } = Object

ansi.nice

const unlimitedLog = log.unlimited;

let isPartiaBuild = false;

const capitalize = (s) => {
    return s.length ? (s.charAt (0).toUpperCase () + s.slice (1)) : s;
};

function cloneGitHubWiki (gitWikiPath) {

    if (!fs.existsSync (gitWikiPath)) {
        log.bright.cyan ('Cloning ccxt.wiki...')
        execSync ('git clone https://github.com/ccxt/ccxt.wiki.git ' + gitWikiPath)
    }
}

// ----------------------------------------------------------------------------

function logExportExchanges (filename, regex, replacement) {
    log.bright.cyan ('Exporting exchanges →', filename.yellow)
    replaceInFile (filename, regex, replacement)
}

// ----------------------------------------------------------------------------

function getIncludedExchangeIds (pathToDirectory) {

    if (process.argv.length > 2) {
        // allow a specific exchange to be specified via command line
        isPartiaBuild = true;
        return process.argv.slice (2);
    }

    const includedIds = fs.readFileSync ('exchanges.cfg')
        .toString () // Buffer → String
        .split ('\n') // String → Array
        .map (line => line.split ('#')[0].trim ()) // trim comments
        .filter (exchange => exchange); // filter empty lines

    isPartiaBuild = includedIds.length > 0;

    const isIncluded = (id) => ((includedIds.length === 0) || includedIds.includes (id))
    const ids = fs.readdirSync (pathToDirectory)
        .filter (file => file.match (/[a-zA-Z0-9_-]+.ts$/))
        .map (file => file.slice (0, -3))
        .filter (isIncluded);

    return ids
}

// ----------------------------------------------------------------------------

function exportExchanges (replacements) {

    log.bright.yellow ('Exporting exchanges...')

    replacements.forEach (({ file, regex, replacement }) => {
        logExportExchanges (file, regex, replacement)
    })

    log.bright.green ('Base sources updated successfully.')
}

// ----------------------------------------------------------------------------

function indexBy (x, k, out = {}) {
    for (const v of values(x)) {
        if (k in v) {
            out[v[k]] = v;
        }
    }
    return out;
};

// ----------------------------------------------------------------------------

function createExchange (id, content) {
    const urlsRegex = /^(\s*)'urls':\s((.|\n)+)/gm;
    const versionRegex = /\s+'version':\s*'(.+)',/gm;
    const nameRegex = /\s+'name':\s*'(.+)',/gm;
    const countriesRegex = /\s*'countries':\s*(\[.+\]),/gm;
    const parentExchange = /export default class [\d\w]+ extends ([\w\d]+) {/gm

    const isAlias = content.indexOf("'alias': true") > -1;
    if (!isAlias) {
        const definesPro = content.indexOf("'pro': true") > -1 || content.indexOf("'pro': false") > -1;
        const isPro = definesPro ? content.indexOf("'pro': true") > -1 : undefined;
        const definesCertified = content.indexOf("'certified': true") > -1 || content.indexOf("'certified': false") > -1;
        const isCertified = definesCertified ? content.indexOf("'certified': true") > -1 : undefined;
        const isDex = definesCertified ? content.indexOf("'dex': true") > -1 : undefined;
        const matches = content.match(urlsRegex);
        const chunk = matches[0];
        const leftSpace = chunk.search(/\S|$/)
        const rightDelimiter =  ' '.repeat(leftSpace) + '},';
        const reg = new RegExp('^' + rightDelimiter, 'gm')
        const secondIndex = chunk.search(reg);
        let sliced = chunk.slice(0,secondIndex + rightDelimiter.length);
        sliced = sliced.slice(sliced.indexOf('{'))
        sliced = sliced.slice(0, -1); // remove last comma
        sliced = sliced.replace(/'/g, '"'); // correct json quotes
        sliced = sliced.replace(/\s*\/\/\s+.*$/gm, ''); // remove comments
        sliced = sliced.replace(/(,)(\n\s*[}|\]])/g, '$2'); //remove trailing comma
        sliced = sliced.replace(/undefined/gm, 'null');
        const parsedUrls = JSON.parse(sliced);
        const name = content.matchAll(nameRegex).next().value[1];
        const versionMatches = content.matchAll(versionRegex).next().value
        const version = versionMatches ? versionMatches[1] : undefined;
        const countriesMatches =  content.matchAll(countriesRegex).next().value;
        let countries = countriesMatches ? countriesMatches[1] : undefined;
        if (countries) {
            countries = countries.replace(/undefined/gm, 'null');
            countries = countries.replace(/'/g, '"'); // correct json quotes
            countries = JSON.parse(countries);
        }
        const parentMatches = content.matchAll(parentExchange).next().value;
        const parent = parentMatches ? parentMatches[1] : undefined;
        return {
            'urls': parsedUrls,
            'alias': false,
            'id': id,
            'pro': isPro,
            'certified': isCertified,
            'name': name,
            'version': version,
            'countries': countries,
            'parent': parent,
            'dex': isDex,
        }
    }
    return {
        'alias': true,
        'id': id,
    }
}

// ----------------------------------------------------------------------------

function extendedExchangesById (exchanges){
    const exchangesById = indexBy (exchanges, 'id')
    Object.values(exchangesById).forEach(exchange => {
        // infer values from parent
        const extendsFromDerived = exchange.parent && exchange.parent !== 'Exchange';
        if (extendsFromDerived) {
            if (exchange.version === undefined) {
                exchange.version = exchangesById[exchange.parent].version
            }
            if (exchange.certified === undefined) {
                exchange.certified = exchangesById[exchange.parent].certified
            }
            if (exchange.urls === undefined) {
                exchange.urls = exchangesById[exchange.parent].urls
            } else {
                exchange.urls = Object.assign({}, exchangesById[exchange.parent].urls, exchange.urls)
            }
            if (exchange.name === undefined) {
                exchange.name = exchangesById[exchange.parent].name
            }
            if (exchange.pro === undefined) {
                exchange.pro = exchangesById[exchange.parent].pro
            }
            if (exchange.countries === undefined) {
                exchange.countries = exchangesById[exchange.parent].countries
            }
        }
    })

    return exchangesById;
}

// ----------------------------------------------------------------------------

async function createExchanges (ids) {
    const pathToSrcDirectory = './ts/src/'

    // readd all files simultaneously
    const promiseReadFile = promisify (fs.readFile);
    const fileArray = await Promise.all (ids.map (id => promiseReadFile (pathToSrcDirectory + id + '.ts', 'utf8')));


    let exchanges = fileArray.map ((file, index) => createExchange(ids[index], file)).filter(exchange => exchange !== undefined)
    const exchangesById = extendedExchangesById(exchanges)

    return exchangesById
}

// ----------------------------------------------------------------------------

const ccxtCertifiedBadge = '[![CCXT Certified](https://img.shields.io/badge/CCXT-Certified-green.svg)](https://github.com/ccxt/ccxt/wiki/Certification)'
    , ccxtProBadge = '[![CCXT Pro](https://img.shields.io/badge/CCXT-Pro-black)](https://ccxt.pro)'

// ----------------------------------------------------------------------------

function getFirstWebsiteUrl (exchange) {
    return Array.isArray (exchange.urls.www) ? exchange.urls.www[0] : exchange.urls.www
}

// ----------------------------------------------------------------------------

function getReferralUrlOrWebsiteUrl (exchange) {
    return exchange.urls.referral ?
        (exchange.urls.referral.url ? exchange.urls.referral.url : exchange.urls.referral) :
        getFirstWebsiteUrl (exchange)
}

// ----------------------------------------------------------------------------

function getReferralDiscountBadgeLink (exchange) {
    const url = getReferralUrlOrWebsiteUrl (exchange)
    if (exchange.urls.referral && exchange.urls.referral.discount) {
        const discountPercentage = parseInt (exchange.urls.referral.discount * 100)

        // this badge does not work with a minus sign
        // const badge = '(https://img.shields.io/badge/fee-%2D' + discountPercentage.toString () + '%25-yellow)'

        const badge = '(https://img.shields.io/static/v1?label=Fee&message=%2d' + discountPercentage.toString () + '%25&color=orange)'
        const alt = "![Sign up with " + exchange.name + " using CCXT's referral link for a " + discountPercentage.toString () + "% discount!]"
        return  '[' + alt + badge + '](' + url + ')'
    } else {
        return ''
    }
}

// ----------------------------------------------------------------------------

function getFirstDocUrl (exchange) {
    return Array.isArray (exchange.urls.doc) ? exchange.urls.doc[0] : exchange.urls.doc
}

// ----------------------------------------------------------------------------


function getVersion (exchange) {
    return exchange.version ? exchange.version.replace (/[^0-9\.]+/, '') : '\*'
}

// ----------------------------------------------------------------------------

function getVersionLink (exchange) {
    const version = getVersion (exchange)
        , doc = getFirstDocUrl (exchange)
    return '[' + version + '](' + doc + ')'
}

// ----------------------------------------------------------------------------

function getVersionBadge (exchange) {
    const version = getVersion (exchange)
        , doc = getFirstDocUrl (exchange)
    return '[![API Version ' + version + '](https://img.shields.io/badge/' + version + '-lightgray)](' + doc + ')'
}

// ----------------------------------------------------------------------------

function createMarkdownExchange (exchange) {
    const url = getReferralUrlOrWebsiteUrl (exchange)
    return {
        'logo': '[![' + exchange.id + '](' + exchange.urls.logo + ')](' + url + ')',
        'id': exchange.id,
        'name': '[' + exchange.name + '](' + url + ')',
        'ver': getVersionBadge (exchange),
        'type': exchange.dex ? '![DEX - Distributed EXchange](https://img.shields.io/badge/DEX-blue.svg "DEX - Distributed EXchange")' : '![CEX – Centralized EXchange](https://img.shields.io/badge/CEX-green.svg "CEX – Centralized EXchange")',
        'certified': exchange.certified ? ccxtCertifiedBadge : '',
        'pro': exchange.pro ? ccxtProBadge : '',
    }
}

// ----------------------------------------------------------------------------

function createMarkdownListOfExchanges (exchanges) {
    return exchanges.map ((exchange) => createMarkdownExchange (exchange))
}

// ----------------------------------------------------------------------------

function createMarkdownListOfCertifiedExchanges (exchanges) {
    return exchanges.map ((exchange) => {
        const discount = getReferralDiscountBadgeLink (exchange)
        return { ... createMarkdownExchange (exchange), discount }
    })
}

// ----------------------------------------------------------------------------

const sortByCountry = (a, b) => {
    if (a['country / region'] > b['country / region']) {
        return 1
    } else if (a['country / region'] < b['country / region']) {
        return -1;
    } else {
        if (a['id'] > b['id']) {
            return 1;
        } else if (a['id'] < b['id']) {
            return -1;
        } else {
            return 0;
        }
    }
}

// ----------------------------------------------------------------------------

function createMarkdownListOfExchangesByCountries (exchanges) {

    const exchangesByCountries = []

    keys (countries).forEach (code => {

        exchanges.forEach (exchange => {

            const exchangeInCountry =
                (Array.isArray (exchange.countries) && exchange.countries.includes (code)) ||
                (code === exchange.countries)

            if (exchangeInCountry) {

                const { logo, id, name, ver } = createMarkdownExchange (exchange)

                exchangesByCountries.push ({
                    'country / region': countries[code],
                    logo,
                    id,
                    name,
                    ver,
                })
            }
        })
    });

    return exchangesByCountries.sort (sortByCountry)
}

// ----------------------------------------------------------------------------

function createMarkdownTable (array, markdownMethod, centeredColumns) {

    array = markdownMethod (array)

    const asTableDelimiter = asTable.configure ({
        delimiter: '|',
        print: (x) => ' ' + x + ' '
    })

    const table = asTableDelimiter (array)
    const lines = table.split ("\n")

    //
    // asTable creates a header underline like
    //
    //      logo | id | name | version | certified | pro
    //     ----------------------------------------------
    //
    // we fix it to match markdown underline like
    //
    //      logo | id | name | version | certified | pro
    //     ------|----|------|---------|-----------|-----
    //

    const underline = lines[0].replace (/[^\|]/g, '-')

    //
    // ver and doc columns should be centered so we convert it to
    //
    //      logo | id | name | version | certified | pro
    //     ------|----|------|:-------:|-----------|-----
    //

    const columns = underline.split ('|')
    for (const i of centeredColumns) {
        columns[i] = ':' + columns[i].slice (1, columns[i].length - 1) + ':'
    }

    lines.splice (1, 1, columns.join ('|'))

    //
    // prepend and append a vertical bar to each line
    //
    //     | logo | id | name | version | certified | pro |
    //     |------|----|------|:-------:|-----------|-----|
    //

    return lines.map (line => '|' + line + '|').join ("\n")
}

// ----------------------------------------------------------------------------

function exportSupportedAndCertifiedExchanges (exchanges, { allExchangesPaths, certifiedExchangesPaths, exchangesByCountriesPaths, proExchangesPaths }) {

    // const aliases = [ 'hitbtc2', 'huobipro' ] // aliases are not shown tables for deduplication

    const arrayOfExchanges = values (exchanges).filter (exchange => !exchange.alias)
    const numExchanges = arrayOfExchanges.length

    if (allExchangesPaths && numExchanges) {
        const supportedExchangesMarkdownTable = createMarkdownTable (arrayOfExchanges, createMarkdownListOfExchanges, [ 3 ])
            , beginning = "<!--- init list -->The CCXT library currently supports the following "
            , ending = " cryptocurrency exchange markets and trading APIs:\n\n"
            , totalString = beginning + numExchanges + ending
            // , allExchangesReplacement = totalString + supportedExchangesMarkdownTable + "$1"
            , allExchangesReplacement = totalString + supportedExchangesMarkdownTable + "\n<!--- end list -->"
            , allExchangesRegex = new RegExp (/<!--- init list -->([\s\S]*?)<!--- end list -->/)
        for (const exchangePath of allExchangesPaths) {
            logExportExchanges (exchangePath, allExchangesRegex, allExchangesReplacement)
        }
    }

    const proExchanges = arrayOfExchanges.filter (exchange => exchange.pro)
    const numProExchanges = proExchanges.length
    if (proExchangesPaths && numProExchanges) {
        const proExchangesMarkdownTable = createMarkdownTable (proExchanges, createMarkdownListOfExchanges, [ 3 ])
            , beginning = "<!--- init list -->The CCXT Pro library currently supports the following "
            , ending = " cryptocurrency exchange markets and WebSocket trading APIs:\n\n"
            , totalString = beginning + numProExchanges + ending
            , proExchangesReplacement = totalString + proExchangesMarkdownTable + "\n<!--- end list -->"
            , proExchangesRegex = new RegExp (/<!--- init list -->([\s\S]*?)<!--- end list -->/)
        for (const exchangePath of proExchangesPaths) {
            logExportExchanges (exchangePath, proExchangesRegex, proExchangesReplacement)
        }
    }

    const certifiedExchanges = arrayOfExchanges.filter (exchange => exchange.certified)
    // certified exchanges are sorted according to the following order
    const certifiedExchangesSortingOrder = [
        'binance',
        'binanceusdm',
        'binancecoinm',
        'bybit',
        'okx',
        'gate',
        'kucoin',
        'kucoinfutures',
        'bitget',
        'hyperliquid',
        'bitmex',
        'bingx',
        'htx',
        'mexc',
        'bitmart',
        'cryptocom',
        'coinex',
        'hashkey',
        'woo',
        'woofipro',
    ]

    let copyOfCertifiedExchanges = certifiedExchanges.slice (); // makes a new array with the same elements
    let reorderedCertifiedExchanges = []
    for (let i = 0; i < certifiedExchangesSortingOrder.length; i++) {
        const exchangeId = certifiedExchangesSortingOrder[i]
        const index = copyOfCertifiedExchanges.findIndex (exchange => exchange.id == exchangeId)
        if (index >= 0) {
            const splicedExchanges = copyOfCertifiedExchanges.splice (index, 1)
            const exchange = splicedExchanges[0]
            reorderedCertifiedExchanges.push (exchange)
        } else {
            const errorMessage = exchangeId + ' not certified in export-exchanges.js'
            console.log (errorMessage)
            throw new Error (errorMessage)
        }
    }
    if (copyOfCertifiedExchanges.length > 0) {
            const errorMessage = 'Not all certified exchanges listed in export-exchanges.js'
            console.log (errorMessage)
            throw new Error (errorMessage)
    }

    if (certifiedExchangesPaths && certifiedExchanges.length) {
        const certifiedExchangesMarkdownTable = createMarkdownTable (reorderedCertifiedExchanges, createMarkdownListOfCertifiedExchanges, [ 3, 6 ])
            , certifiedExchangesReplacement = '$1' + certifiedExchangesMarkdownTable + "\n"
            , certifiedExchangesRegex = new RegExp ("^(## Certified Cryptocurrency Exchanges\n{3})(?:\\|.+\\|$\n)+", 'm')
        for (const exchangePath of certifiedExchangesPaths) {
            logExportExchanges (exchangePath, certifiedExchangesRegex, certifiedExchangesReplacement)
        }
    }

    if (exchangesByCountriesPaths) {
        const exchangesByCountriesMarkdownTable = createMarkdownTable (arrayOfExchanges, createMarkdownListOfExchangesByCountries, [ 4 ])
        const result = "# Exchanges By Country\n\nThe ccxt library currently supports the following cryptocurrency exchange markets and trading APIs:\n\n" + exchangesByCountriesMarkdownTable + "\n\n"
        for (const exchangePath of exchangesByCountriesPaths) {
            fs.truncateSync (exchangePath)
            fs.writeFileSync (exchangePath, result)
        }
    }
}

// ----------------------------------------------------------------------------

function exportExchangeIdsToExchangesJson (ids, ws) {
    log.bright ('Exporting exchange ids to'.cyan, 'exchanges.json'.yellow)
    fs.writeFileSync ('exchanges.json', JSON.stringify ({ ids, ws }, null, 4))
}

// ----------------------------------------------------------------------------

function exportWikiToGitHub (wikiPath, gitWikiPath) {

    log.bright.cyan ('Exporting wiki to GitHub')

    const ccxtWikiFiles = {
        'README.md': 'Home.md',
        'Install.md': 'Install.md',
        'Manual.md': 'Manual.md',
        'Exchange-Markets.md': 'Exchange-Markets.md',
        'Exchange-Markets-By-Country.md': 'Exchange-Markets-By-Country.md',
        'ccxt.pro.md': 'ccxt.pro.md',
        // 'ccxt.pro.install.md': 'ccxt.pro.install.md',
        'ccxt.pro.manual.md': 'ccxt.pro.manual.md',
    }

    for (const [ sourceFile, destinationFile ] of entries (ccxtWikiFiles)) {

        const sourcePath = wikiPath + '/' + sourceFile
        const destinationPath = gitWikiPath + '/' + destinationFile
        log.bright.cyan ('Exporting', sourcePath.yellow, '→', destinationPath.yellow)
        fs.writeFileSync (destinationPath, fs.readFileSync (sourcePath))
    }
}

// ----------------------------------------------------------------------------

function exportKeywordsToPackageJson (exchanges) {

    log.bright ('Exporting exchange keywords to'.cyan, 'package.json'.yellow)

    // const packageJSON = require ('../package.json')
    const packageJSON = JSON.parse (fs.readFileSync ('./package.json'))
    const keywords = new Set (packageJSON.keywords)

    for (const ex of values (exchanges)) {
        for (const url of Array.isArray (ex.urls.www) ? ex.urls.www : [ex.urls.www]) {
            keywords.add (url.replace (/(http|https):\/\/(www\.)?/, '').replace (/\/.*/, ''))
        }
        keywords.add (ex.name)
    }

    packageJSON.keywords = values (fromEntries ([ ... keywords ].map (s => [ s.toLowerCase (), s ])));
    fs.writeFileSync ('./package.json', JSON.stringify (packageJSON, null, 2) + "\n")
}

// ----------------------------------------------------------------------------

function flatten (nested, result = []) {
    for (const key in nested) {
        result.push (key)
        if (Object.keys (nested[key]).length)
            flatten (nested[key], result)
    }
    return result
}

// ----------------------------------------------------------------------------

function getErrorHierarchy() {
    const pathToErrorHierarchy = './ts/src/base/errorHierarchy.ts';
    const content = fs.readFileSync (pathToErrorHierarchy, 'utf8');
    let errorObject = content.matchAll (/const\s*[\w\d]+\s*=\s({(.|\n)+});/gm).next().value[1];
    errorObject = errorObject.replace(/(,)(\n\s*[}|\]])/g, '$2'); //remove trailing comma
    errorObject = errorObject.replace(/'/g, '"');
    return JSON.parse(errorObject);
}

// ----------------------------------------------------------------------------

function generateErrorsTs () {
    const classBlock = (className, extendedClassName) => {
        return '' + 
            `class ${className} extends ${extendedClassName} {\n` +
            `    constructor (message: string) {\n` +
            `        super (message);\n` +
            `        this.name = '${className}';\n` +
            `    }\n` +
            `}`;
    }
    const errorsHierarchyJson = getErrorHierarchy ();
    const errorsFlatArray = [];
    let result = '/* eslint-disable max-classes-per-file */\n\n';
    // recursively go through the error hierarchy
    const generateErrorClasses = (errorObject, parentClassName) => {
        for (const key in errorObject) {
            const className = key;
            const extendedClassName = parentClassName;
            errorsFlatArray.push(className);
            result += classBlock(className, extendedClassName) + '\n';
            if (Object.keys(errorObject[key]).length) {
                generateErrorClasses(errorObject[key], className);
            }
        }
    }
    generateErrorClasses(errorsHierarchyJson, 'Error');
    result += '\n';
    result += 'export { ' + errorsFlatArray.join(', ') + ' };\n';
    result += '\n';
    result += 'export default { ' + errorsFlatArray.join(', ') + ' };\n';
    const errorsTsPath = './ts/src/base/errors.ts';
    fs.writeFileSync(errorsTsPath, result);
}

// ----------------------------------------------------------------------------

function getTypesExports() {
    const typesPath = './ts/src/base/types.ts';
    const fileContent = fs.readFileSync(typesPath, 'utf8');

    // Regular expressions to match type and interface declarations
    const typeRegex = /export\stype\s+([A-Za-z0-9_]+)/g;
    const interfaceRegex = /export\sinterface\s+([A-Za-z0-9_]+)/g;

    const typeNames = [];
    const interfaceNames = [];

    let match;
      // Extract type names
    while ((match = typeRegex.exec(fileContent)) !== null) {
      typeNames.push(match[1]);
    }

    // Extract interface names
    while ((match = interfaceRegex.exec(fileContent)) !== null) {
      interfaceNames.push(match[1]);
    }
    return typeNames.concat(interfaceNames);
}

// ----------------------------------------------------------------------------

async function exportEverything () {
    const ids = getIncludedExchangeIds ('./ts/src')

    const wsIds = getIncludedExchangeIds ('./ts/src/pro')

    generateErrorsTs();
    const errorHierarchy = getErrorHierarchy()
    const flat = flatten (errorHierarchy);
    const errorsExports = [...flat];
    flat.push ('error_hierarchy')

    const typeExports = getTypesExports();
    const staticExports = ['version', 'Exchange', 'exchanges', 'pro', 'Precise', 'functions', 'errors'].concat(errorsExports).concat(typeExports)

    const fullExports  = staticExports.concat(ids)

    const ccxtFileDir = './ts/ccxt.ts'
    const replacements = [
        {
            // exceptions automatic import statement
            file: ccxtFileDir,
            regex:  /(import\s+\{)(.*?)(\}\s+from\s+'.\/src\/base\/errors.js'\n+)/g,
            replacement: '$1' + errorsExports.join(", ") + '$3'
        },
        {
            file: ccxtFileDir,
            regex:  /(?:(import)\s(\w+)\sfrom\s+'.\/src\/(\2).js'\n)+/g,
            replacement: ids.map (id => "import " + id + ' from ' + " './src/" + id + ".js'").join("\n") + "\n" // update these paths
        },
        {
            file: ccxtFileDir,
            regex:  /(?:(import)\s(\w+)Pro\sfrom\s+'.\/src\/pro\/(\2).js'\n)+/g,
            replacement: wsIds.map (id => "import " + id + 'Pro from ' + " './src/pro/" + id + ".js'").join("\n") + "\n"
        },
        {
            file: ccxtFileDir,
            regex:  /(?:const|var)\s+exchanges\s+\=\s+\{[^\}]+\}/,
            replacement: "const exchanges = {\n" + ids.map (id => ("    '" + id + "':").padEnd (30) + id + ",") .join ("\n") + "\n}",
        },
        {
            file: ccxtFileDir,
            regex:  /export\s+{\n[^\}]+\}/,
            replacement: "export {\n" + fullExports.map (id => "    " +id + ',').join ("\n") + "    \n}",
        },
        {
            file: ccxtFileDir,
            regex:  /(?:const|var)\s+pro\s+\=\s+\{[^\}]+\}/,
            replacement: "const pro = {\n" + wsIds.map (id => ("    '" + id + "':").padEnd (30) + id + "Pro,") .join ("\n") + "\n}",
        },
        {
            file: './python/ccxt/__init__.py',
            regex: /exchanges \= \[[^\]]+\]/,
            replacement: "exchanges = [\n" + "    '" + ids.join ("',\n    '") + "'," + "\n]",
        },
        {
            file: './python/ccxt/__init__.py',
            regex: /(?:from ccxt\.[^\.]+ import [^\s]+\s+\# noqa\: F401[\r]?[\n])+[\r]?[\n]exchanges/,
            replacement: ids.map (id => ('from ccxt.' + id + ' import ' + id).padEnd (70) + '# noqa: F401').join ("\n") + "\n\nexchanges",
        },
        {
            file: './python/ccxt/__init__.py',
            regex: /(?:from ccxt\.base\.errors import [^\s]+\s+\# noqa\: F401[\r]?[\n])+[\r]?[\n]/,
            replacement: flat.map (error => ('from ccxt.base.errors' + ' import ' + error).padEnd (70) + '# noqa: F401').join ("\n") + "\n\n",
        },
        {
            file: './python/ccxt/async_support/__init__.py',
            regex: /(?:from ccxt\.base\.errors import [^\s]+\s+\# noqa\: F401[\r]?[\n])+[\r]?[\n]/,
            replacement: flat.map (error => ('from ccxt.base.errors' + ' import ' + error).padEnd (70) + '# noqa: F401').join ("\n") + "\n\n",
        },
        {
            file: './python/ccxt/async_support/__init__.py',
            regex: /(?:from ccxt\.async_support\.[^\.]+ import [^\s]+\s+\# noqa\: F401[\r]?[\n])+[\r]?[\n]exchanges/,
            replacement: ids.map (id => ('from ccxt.async_support.' + id + ' import ' + id).padEnd (80) + '# noqa: F401').join ("\n") + "\n\nexchanges",
        },
        {
            file: './python/ccxt/async_support/__init__.py',
            regex: /exchanges \= \[[^\]]+\]/,
            replacement: "exchanges = [\n" + "    '" + ids.join ("',\n    '") + "'," + "\n]",
        },
        {
            file: './php/Exchange.php',
            regex: /public static \$exchanges \= array\s*\([^\)]+\)/,
            replacement: "public static $exchanges = array(\n        '" + ids.join ("',\n        '") + "',\n    )",
        },
        {
            file: './php/pro/Exchange.php',
            regex: /Exchange::\$exchanges \= array\s*\([^\)]+\)/,
            replacement: "Exchange::$exchanges = array(\n    '" + wsIds.join ("',\n    '") + "',\n)",
        },
        {
            file: './python/ccxt/pro/__init__.py',
            regex: /(# DO_NOT_REMOVE__ERROR_IMPORTS_START)[\s\S]*?(# DO_NOT_REMOVE__ERROR_IMPORTS_END\n)[\n]/s,
            replacement: '$1\n' +flat.map (error => ('from ccxt.base.errors' + ' import ' + error).padEnd (70) + '# noqa: F401').join ("\n") + "\n$2\n",
        },
        {
            file: './python/ccxt/pro/__init__.py',
            regex: /(?:from ccxt\.pro\.[^\.]+ import [^\s]+\s+\# noqa\: F401[\r]?[\n])+[\r]?[\n]exchanges/,
            replacement: wsIds.map (id => ('from ccxt.pro.' + id + ' import ' + id).padEnd (74) + '# noqa: F401').join ("\n") + "\n\nexchanges",
        },
        {
            file: './python/ccxt/pro/__init__.py',
            regex: /exchanges \= \[[^\]]+\]/,
            replacement: "exchanges = [\n" + "    '" + wsIds.join ("',\n    '") + "'," + "\n]",
        },
        {
            file: './cs/ccxt/base/Exchange.MetaData.cs',
            regex: /public static List<string> exchanges =.+$/gm,
            replacement: `public static List<string> exchanges = new List<string> { ${ids.map(i=>`"${i}"`).join(', ')} };`,
        },
        {
            file: './go/v4/exchange_metadata.go',
            regex: /var Exchanges \[\]string = \[\]string\{.+$/gm,
            replacement: `var Exchanges []string = []string{ ${ids.map(i=>`"${capitalize(i)}"`).join(', ')} }`,
        },
    ]

    exportExchanges (replacements, unlimitedLog)

    // strategically placed exactly here (we can require it AFTER the export)
    const exchanges = await createExchanges (ids)

    if (isPartiaBuild) {
        log.bright.cyan ('Using a partial build'.yellow, 'building only', ids)
        return
    }

    const wikiPath = 'wiki'
        , gitWikiPath = 'build/ccxt.wiki'

    cloneGitHubWiki (gitWikiPath, unlimitedLog)

    exportSupportedAndCertifiedExchanges (exchanges, {
        allExchangesPaths: [
            'README.md',
            wikiPath + '/Manual.md',
            wikiPath + '/Exchange-Markets.md'
        ],
        certifiedExchangesPaths: [
            'README.md',
        ],
        exchangesByCountriesPaths: [
            wikiPath + '/Exchange-Markets-By-Country.md'
        ],
        proExchangesPaths: [
            wikiPath + '/ccxt.pro.manual.md',
        ],
    }, unlimitedLog)

    exportExchangeIdsToExchangesJson (keys(exchanges), wsIds)
    exportWikiToGitHub (wikiPath, gitWikiPath)
    // skip this step to reduce the size of the package metadata
    // exportKeywordsToPackageJson (exchanges)

    unlimitedLog.bright.green ('Exported successfully.')
}


// ============================================================================
// main entry point

// remove extensions
let metaUrl = import.meta.url
metaUrl = path.join(path.dirname(metaUrl), path.parse(metaUrl).name) 
const url = pathToFileURL(process.argv[1]);
const href = path.join(path.dirname(url.href), path.parse(url.href).name)

// compare paths to check if it's launched directly or included as a module
if (metaUrl === href) {

    // if called directly like `node module`
    try {
        await exportEverything ()
    } catch (e) {
        console.log(e);
    }

    console.log('finished')

} else {

    // do nothing if required as a module
}

// ============================================================================

export {
    exportEverything
}
