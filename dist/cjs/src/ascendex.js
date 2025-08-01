'use strict';

var ascendex$1 = require('./abstract/ascendex.js');
var errors = require('./base/errors.js');
var Precise = require('./base/Precise.js');
var number = require('./base/functions/number.js');
var sha256 = require('./static_dependencies/noble-hashes/sha256.js');

// ----------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class ascendex
 * @augments Exchange
 */
class ascendex extends ascendex$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'ascendex',
            'name': 'AscendEX',
            'countries': ['SG'],
            // 8 requests per minute = 0.13333 per second => rateLimit = 750
            // testing 400 works
            'rateLimit': 400,
            'certified': false,
            'pro': true,
            // new metainfo interface
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': true,
                'swap': true,
                'future': false,
                'option': false,
                'addMargin': true,
                'cancelAllOrders': true,
                'cancelOrder': true,
                'createOrder': true,
                'createOrders': true,
                'createPostOnlyOrder': true,
                'createReduceOnlyOrder': true,
                'createStopLimitOrder': true,
                'createStopMarketOrder': true,
                'createStopOrder': true,
                'fetchAccounts': true,
                'fetchBalance': true,
                'fetchClosedOrders': true,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchDeposits': true,
                'fetchDepositsWithdrawals': true,
                'fetchDepositWithdrawFee': 'emulated',
                'fetchDepositWithdrawFees': true,
                'fetchFundingHistory': true,
                'fetchFundingRate': 'emulated',
                'fetchFundingRateHistory': false,
                'fetchFundingRates': true,
                'fetchGreeks': false,
                'fetchIndexOHLCV': false,
                'fetchLeverage': 'emulated',
                'fetchLeverages': true,
                'fetchLeverageTiers': true,
                'fetchMarginMode': 'emulated',
                'fetchMarginModes': true,
                'fetchMarketLeverageTiers': 'emulated',
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMySettlementHistory': false,
                'fetchOHLCV': true,
                'fetchOpenInterest': false,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrders': true,
                'fetchOption': false,
                'fetchOptionChain': false,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': false,
                'fetchPosition': false,
                'fetchPositionMode': false,
                'fetchPositions': true,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchSettlementHistory': false,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': true,
                'fetchTransactionFee': false,
                'fetchTransactionFees': false,
                'fetchTransactions': 'emulated',
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchVolatilityHistory': false,
                'fetchWithdrawal': false,
                'fetchWithdrawals': true,
                'reduceMargin': true,
                'sandbox': true,
                'setLeverage': true,
                'setMarginMode': true,
                'setPositionMode': false,
                'transfer': true,
            },
            'timeframes': {
                '1m': '1',
                '5m': '5',
                '15m': '15',
                '30m': '30',
                '1h': '60',
                '2h': '120',
                '4h': '240',
                '6h': '360',
                '12h': '720',
                '1d': '1d',
                '1w': '1w',
                '1M': '1m',
            },
            'version': 'v2',
            'urls': {
                'logo': 'https://github.com/user-attachments/assets/55bab6b9-d4ca-42a8-a0e6-fac81ae557f1',
                'api': {
                    'rest': 'https://ascendex.com',
                },
                'test': {
                    'rest': 'https://api-test.ascendex-sandbox.com',
                },
                'www': 'https://ascendex.com',
                'doc': [
                    'https://ascendex.github.io/ascendex-pro-api/#ascendex-pro-api-documentation',
                ],
                'fees': 'https://ascendex.com/en/feerate/transactionfee-traderate',
                'referral': {
                    'url': 'https://ascendex.com/en-us/register?inviteCode=EL6BXBQM',
                    'discount': 0.25,
                },
            },
            'api': {
                'v1': {
                    'public': {
                        'get': {
                            'assets': 1,
                            'products': 1,
                            'ticker': 1,
                            'barhist/info': 1,
                            'barhist': 1,
                            'depth': 1,
                            'trades': 1,
                            'cash/assets': 1,
                            'cash/products': 1,
                            'margin/assets': 1,
                            'margin/products': 1,
                            'futures/collateral': 1,
                            'futures/contracts': 1,
                            'futures/ref-px': 1,
                            'futures/market-data': 1,
                            'futures/funding-rates': 1,
                            'risk-limit-info': 1,
                            'exchange-info': 1,
                        },
                    },
                    'private': {
                        'get': {
                            'info': 1,
                            'wallet/transactions': 1,
                            'wallet/deposit/address': 1,
                            'data/balance/snapshot': 1,
                            'data/balance/history': 1,
                        },
                        'accountCategory': {
                            'get': {
                                'balance': 1,
                                'order/open': 1,
                                'order/status': 1,
                                'order/hist/current': 1,
                                'risk': 1,
                            },
                            'post': {
                                'order': 1,
                                'order/batch': 1,
                            },
                            'delete': {
                                'order': 1,
                                'order/all': 1,
                                'order/batch': 1,
                            },
                        },
                        'accountGroup': {
                            'get': {
                                'cash/balance': 1,
                                'margin/balance': 1,
                                'margin/risk': 1,
                                'futures/collateral-balance': 1,
                                'futures/position': 1,
                                'futures/risk': 1,
                                'futures/funding-payments': 1,
                                'order/hist': 1,
                                'spot/fee': 1,
                            },
                            'post': {
                                'transfer': 1,
                                'futures/transfer/deposit': 1,
                                'futures/transfer/withdraw': 1,
                            },
                        },
                    },
                },
                'v2': {
                    'public': {
                        'get': {
                            'assets': 1,
                            'futures/contract': 1,
                            'futures/collateral': 1,
                            'futures/pricing-data': 1,
                            'futures/ticker': 1,
                            'risk-limit-info': 1,
                        },
                    },
                    'private': {
                        'data': {
                            'get': {
                                'order/hist': 1,
                            },
                        },
                        'get': {
                            'account/info': 1,
                        },
                        'accountGroup': {
                            'get': {
                                'order/hist': 1,
                                'futures/position': 1,
                                'futures/free-margin': 1,
                                'futures/order/hist/current': 1,
                                'futures/funding-payments': 1,
                                'futures/order/open': 1,
                                'futures/order/status': 1,
                            },
                            'post': {
                                'futures/isolated-position-margin': 1,
                                'futures/margin-type': 1,
                                'futures/leverage': 1,
                                'futures/transfer/deposit': 1,
                                'futures/transfer/withdraw': 1,
                                'futures/order': 1,
                                'futures/order/batch': 1,
                                'futures/order/open': 1,
                                'subuser/subuser-transfer': 1,
                                'subuser/subuser-transfer-hist': 1,
                            },
                            'delete': {
                                'futures/order': 1,
                                'futures/order/batch': 1,
                                'futures/order/all': 1,
                            },
                        },
                    },
                },
            },
            'fees': {
                'trading': {
                    'feeSide': 'get',
                    'tierBased': true,
                    'percentage': true,
                    'taker': this.parseNumber('0.002'),
                    'maker': this.parseNumber('0.002'),
                },
            },
            'precisionMode': number.TICK_SIZE,
            'options': {
                'account-category': 'cash',
                'account-group': undefined,
                'fetchClosedOrders': {
                    'method': 'v2PrivateDataGetOrderHist', // 'v1PrivateAccountCategoryGetOrderHistCurrent'
                },
                'defaultType': 'spot',
                'accountsByType': {
                    'spot': 'cash',
                    'swap': 'futures',
                    'margin': 'margin',
                },
                'transfer': {
                    'fillResponseFromRequest': true,
                },
                'networks': {
                    'BSC': 'BEP20 ' + '(BSC)',
                    'ARB': 'arbitrum',
                    'SOL': 'Solana',
                    'AVAX': 'avalanche C chain',
                    'OMNI': 'Omni',
                    // 'TRC': 'TRC20',
                    'TRC20': 'TRC20',
                    'ERC20': 'ERC20',
                    'GO20': 'GO20',
                    'BEP2': 'BEP2',
                    'BTC': 'Bitcoin',
                    'BCH': 'Bitcoin ABC',
                    'LTC': 'Litecoin',
                    'MATIC': 'Matic Network',
                    'AKT': 'Akash',
                },
            },
            'features': {
                'default': {
                    'sandbox': true,
                    'createOrder': {
                        'marginMode': true,
                        'triggerPrice': true,
                        'triggerPriceType': undefined,
                        'triggerDirection': false,
                        'stopLossPrice': false,
                        'takeProfitPrice': false,
                        'attachedStopLossTakeProfit': undefined,
                        'timeInForce': {
                            'IOC': true,
                            'FOK': true,
                            'PO': true,
                            'GTD': false,
                        },
                        'hedged': false,
                        'trailing': false,
                        'leverage': false,
                        'marketBuyRequiresPrice': false,
                        'marketBuyByCost': false,
                        'selfTradePrevention': false,
                        'iceberg': false,
                    },
                    'createOrders': {
                        'max': 10,
                    },
                    'fetchMyTrades': undefined,
                    'fetchOrder': {
                        'marginMode': false,
                        'trigger': false,
                        'trailing': false,
                        'marketType': true,
                        'symbolRequired': false,
                    },
                    'fetchOpenOrders': {
                        'marginMode': false,
                        'limit': undefined,
                        'trigger': false,
                        'trailing': false,
                        'marketType': true,
                        'symbolRequired': false,
                    },
                    'fetchOrders': undefined,
                    'fetchClosedOrders': undefined,
                    'fetchOHLCV': {
                        'limit': 500,
                    },
                },
                'spot': {
                    'extends': 'default',
                    'fetchClosedOrders': {
                        'marginMode': false,
                        'limit': 1000,
                        'daysBack': 100000,
                        'daysBackCanceled': 1,
                        'untilDays': 100000,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                },
                'forDerivatives': {
                    'extends': 'default',
                    'createOrder': {
                        // todo: implementation
                        'attachedStopLossTakeProfit': {
                            'triggerPriceType': {
                                'last': true,
                                'mark': false,
                                'index': false,
                            },
                            'price': false,
                        },
                    },
                    'fetchClosedOrders': {
                        'marginMode': false,
                        'limit': 1000,
                        'daysBack': undefined,
                        'daysBackCanceled': undefined,
                        'untilDays': undefined,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                },
                'swap': {
                    'linear': {
                        'extends': 'forDerivatives',
                    },
                    'inverse': undefined,
                },
                'future': {
                    'linear': undefined,
                    'inverse': undefined,
                },
            },
            'exceptions': {
                'exact': {
                    // not documented
                    '1900': errors.BadRequest,
                    '2100': errors.AuthenticationError,
                    '5002': errors.BadSymbol,
                    '6001': errors.BadSymbol,
                    '6010': errors.InsufficientFunds,
                    '60060': errors.InvalidOrder,
                    '600503': errors.InvalidOrder,
                    // documented
                    '100001': errors.BadRequest,
                    '100002': errors.BadRequest,
                    '100003': errors.BadRequest,
                    '100004': errors.BadRequest,
                    '100005': errors.BadRequest,
                    '100006': errors.BadRequest,
                    '100007': errors.BadRequest,
                    '100008': errors.BadSymbol,
                    '100009': errors.AuthenticationError,
                    '100010': errors.BadRequest,
                    '100011': errors.BadRequest,
                    '100012': errors.BadRequest,
                    '100013': errors.BadRequest,
                    '100101': errors.ExchangeError,
                    '150001': errors.BadRequest,
                    '200001': errors.AuthenticationError,
                    '200002': errors.ExchangeError,
                    '200003': errors.ExchangeError,
                    '200004': errors.ExchangeError,
                    '200005': errors.ExchangeError,
                    '200006': errors.ExchangeError,
                    '200007': errors.ExchangeError,
                    '200008': errors.ExchangeError,
                    '200009': errors.ExchangeError,
                    '200010': errors.AuthenticationError,
                    '200011': errors.ExchangeError,
                    '200012': errors.ExchangeError,
                    '200013': errors.ExchangeError,
                    '200014': errors.PermissionDenied,
                    '200015': errors.PermissionDenied,
                    '300001': errors.InvalidOrder,
                    '300002': errors.InvalidOrder,
                    '300003': errors.InvalidOrder,
                    '300004': errors.InvalidOrder,
                    '300005': errors.InvalidOrder,
                    '300006': errors.InvalidOrder,
                    '300007': errors.InvalidOrder,
                    '300008': errors.InvalidOrder,
                    '300009': errors.InvalidOrder,
                    '300011': errors.InsufficientFunds,
                    '300012': errors.BadSymbol,
                    '300013': errors.InvalidOrder,
                    '300014': errors.InvalidOrder,
                    '300020': errors.InvalidOrder,
                    '300021': errors.AccountSuspended,
                    '300031': errors.InvalidOrder,
                    '310001': errors.InsufficientFunds,
                    '310002': errors.InvalidOrder,
                    '310003': errors.InvalidOrder,
                    '310004': errors.BadSymbol,
                    '310005': errors.InvalidOrder,
                    '510001': errors.ExchangeError,
                    '900001': errors.ExchangeError, // HUMAN_CHALLENGE Human change do not pass
                },
                'broad': {},
            },
            'commonCurrencies': {
                'XBT': 'XBT',
                'BOND': 'BONDED',
                'BTCBEAR': 'BEAR',
                'BTCBULL': 'BULL',
                'BYN': 'BeyondFi',
                'PLN': 'Pollen',
            },
        });
    }
    getAccount(params = {}) {
        // get current or provided bitmax sub-account
        const account = this.safeValue(params, 'account', this.options['account']);
        const lowercaseAccount = account.toLowerCase();
        return this.capitalize(lowercaseAccount);
    }
    /**
     * @method
     * @name ascendex#fetchCurrencies
     * @description fetches all available currencies on an exchange
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an associative dictionary of currencies
     */
    async fetchCurrencies(params = {}) {
        const response = await this.v2PublicGetAssets(params);
        //
        //    {
        //        "code": "0",
        //        "data": [
        //            {
        //                "assetCode": "USDT",
        //                "assetName": "Tether",
        //                "precisionScale": 9,
        //                "nativeScale": 4,
        //                "blockChain": [
        //                    {
        //                        "chainName": "Solana",
        //                        "withdrawFee": "2.0",
        //                        "allowDeposit": true,
        //                        "allowWithdraw": true,
        //                        "minDepositAmt": "0.01",
        //                        "minWithdrawal": "4.0",
        //                        "numConfirmations": 1
        //                    },
        //                    ...
        //                ]
        //            },
        //         ]
        //    }
        //
        const data = this.safeList(response, 'data', []);
        const result = {};
        for (let i = 0; i < data.length; i++) {
            const currency = data[i];
            const id = this.safeString(currency, 'assetCode');
            const code = this.safeCurrencyCode(id);
            const chains = this.safeList(currency, 'blockChain', []);
            const precision = this.parseNumber(this.parsePrecision(this.safeString(currency, 'nativeScale')));
            const networks = {};
            for (let j = 0; j < chains.length; j++) {
                const networkEtnry = chains[j];
                const networkId = this.safeString(networkEtnry, 'chainName');
                const networkCode = this.networkCodeToId(networkId);
                networks[networkCode] = {
                    'fee': this.safeNumber(networkEtnry, 'withdrawFee'),
                    'active': undefined,
                    'withdraw': this.safeBool(networkEtnry, 'allowWithdraw'),
                    'deposit': this.safeBool(networkEtnry, 'allowDeposit'),
                    'precision': precision,
                    'limits': {
                        'amount': {
                            'min': undefined,
                            'max': undefined,
                        },
                        'withdraw': {
                            'min': this.safeNumber(networkEtnry, 'minWithdrawal'),
                            'max': undefined,
                        },
                        'deposit': {
                            'min': this.safeNumber(networkEtnry, 'minDepositAmt'),
                            'max': undefined,
                        },
                    },
                };
            }
            // todo type: if (chainsLength === 0 && (assetName.endsWith (' Staking') || assetName.indexOf (' Reward ') >= 0 || assetName.indexOf ('Slot Auction') >= 0 || assetName.indexOf (' Freeze Asset') >= 0))
            result[code] = this.safeCurrencyStructure({
                'id': id,
                'code': code,
                'info': currency,
                'type': undefined,
                'margin': undefined,
                'name': this.safeString(currency, 'assetName'),
                'active': undefined,
                'deposit': undefined,
                'withdraw': undefined,
                'fee': undefined,
                'precision': precision,
                'limits': {
                    'amount': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'withdraw': {
                        'min': this.safeNumber(currency, 'minWithdrawalAmt'),
                        'max': undefined,
                    },
                },
                'networks': networks,
            });
        }
        return result;
    }
    /**
     * @method
     * @name ascendex#fetchMarkets
     * @description retrieves data on all markets for ascendex
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchMarkets(params = {}) {
        const spotPromise = this.fetchSpotMarkets(params);
        const contractPromise = this.fetchContractMarkets(params);
        const [spotMarkets, contractMarkets] = await Promise.all([spotPromise, contractPromise]);
        return this.arrayConcat(spotMarkets, contractMarkets);
    }
    async fetchSpotMarkets(params = {}) {
        const productsPromise = this.v1PublicGetProducts(params);
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "symbol": "LBA/BTC",
        //                 "baseAsset": "LBA",
        //                 "quoteAsset": "BTC",
        //                 "status": "Normal",
        //                 "minNotional": "0.000625",
        //                 "maxNotional": "6.25",
        //                 "marginTradable": false,
        //                 "commissionType": "Quote",
        //                 "commissionReserveRate": "0.001",
        //                 "tickSize": "0.000000001",
        //                 "lotSize": "1"
        //             },
        //         ]
        //     }
        //
        const cashPromise = this.v1PublicGetCashProducts(params);
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "symbol": "QTUM/BTC",
        //                 "displayName": "QTUM/BTC",
        //                 "domain": "BTC",
        //                 "tradingStartTime": 1569506400000,
        //                 "collapseDecimals": "0.0001,0.000001,0.00000001",
        //                 "minQty": "0.000000001",
        //                 "maxQty": "1000000000",
        //                 "minNotional": "0.000625",
        //                 "maxNotional": "12.5",
        //                 "statusCode": "Normal",
        //                 "statusMessage": "",
        //                 "tickSize": "0.00000001",
        //                 "useTick": false,
        //                 "lotSize": "0.1",
        //                 "useLot": false,
        //                 "commissionType": "Quote",
        //                 "commissionReserveRate": "0.001",
        //                 "qtyScale": 1,
        //                 "priceScale": 8,
        //                 "notionalScale": 4
        //             }
        //         ]
        //     }
        //
        const [products, cash] = await Promise.all([productsPromise, cashPromise]);
        const productsData = this.safeList(products, 'data', []);
        const productsById = this.indexBy(productsData, 'symbol');
        const cashData = this.safeList(cash, 'data', []);
        const cashAndPerpetualsById = this.indexBy(cashData, 'symbol');
        const dataById = this.deepExtend(productsById, cashAndPerpetualsById);
        const ids = Object.keys(dataById);
        const result = [];
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            if (id.indexOf('-PERP') >= 0) {
                continue; // skip perpetuals, as separate endpoint returns them
            }
            const market = dataById[id];
            const status = this.safeString(market, 'status');
            const domain = this.safeString(market, 'domain');
            let active = false;
            if (((status === 'Normal') || (status === 'InternalTrading')) && (domain !== 'LeveragedETF')) {
                active = true;
            }
            const minQty = this.safeNumber(market, 'minQty');
            const maxQty = this.safeNumber(market, 'maxQty');
            const minPrice = this.safeNumber(market, 'tickSize');
            const maxPrice = undefined;
            const underlying = this.safeString2(market, 'underlying', 'symbol');
            const parts = underlying.split('/');
            const baseId = this.safeString(parts, 0);
            const quoteId = this.safeString(parts, 1);
            const base = this.safeCurrencyCode(baseId);
            const quote = this.safeCurrencyCode(quoteId);
            const fee = this.safeNumber(market, 'commissionReserveRate');
            const marginTradable = this.safeBool(market, 'marginTradable', false);
            result.push({
                'id': id,
                'symbol': base + '/' + quote,
                'base': base,
                'baseId': baseId,
                'quote': quote,
                'quoteId': quoteId,
                'settle': undefined,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': marginTradable,
                'swap': false,
                'future': false,
                'option': false,
                'active': active,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'taker': fee,
                'maker': fee,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.safeNumber(market, 'lotSize'),
                    'price': this.safeNumber(market, 'tickSize'),
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': minQty,
                        'max': maxQty,
                    },
                    'price': {
                        'min': minPrice,
                        'max': maxPrice,
                    },
                    'cost': {
                        'min': this.safeNumber(market, 'minNotional'),
                        'max': this.safeNumber(market, 'maxNotional'),
                    },
                },
                'created': this.safeInteger(market, 'tradingStartTime'),
                'info': market,
            });
        }
        return result;
    }
    async fetchContractMarkets(params = {}) {
        const contracts = await this.v2PublicGetFuturesContract(params);
        //
        //    {
        //        "code": 0,
        //        "data": [
        //            {
        //                "symbol": "BTC-PERP",
        //                "status": "Normal",
        //                "displayName": "BTCUSDT",
        //                "settlementAsset": "USDT",
        //                "underlying": "BTC/USDT",
        //                "tradingStartTime": 1579701600000,
        //                "priceFilter": {
        //                    "minPrice": "0.1",
        //                    "maxPrice": "1000000",
        //                    "tickSize": "0.1"
        //                },
        //                "lotSizeFilter": {
        //                    "minQty": "0.0001",
        //                    "maxQty": "1000000000",
        //                    "lotSize": "0.0001"
        //                },
        //                "commissionType": "Quote",
        //                "commissionReserveRate": "0.001",
        //                "marketOrderPriceMarkup": "0.03",
        //                "marginRequirements": [
        //                    {
        //                        "positionNotionalLowerBound": "0",
        //                        "positionNotionalUpperBound": "50000",
        //                        "initialMarginRate": "0.01",
        //                        "maintenanceMarginRate": "0.006"
        //                    },
        //                    ...
        //                ]
        //            }
        //        ]
        //    }
        //
        const data = this.safeList(contracts, 'data', []);
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const market = data[i];
            const id = this.safeString(market, 'symbol');
            const underlying = this.safeString(market, 'underlying');
            const parts = underlying.split('/');
            const baseId = this.safeString(parts, 0);
            const base = this.safeCurrencyCode(baseId);
            const quoteId = this.safeString(parts, 1);
            const quote = this.safeCurrencyCode(quoteId);
            const settleId = this.safeString(market, 'settlementAsset');
            const settle = this.safeCurrencyCode(settleId);
            const linear = settle === quote;
            const inverse = settle === base;
            const symbol = base + '/' + quote + ':' + settle;
            const priceFilter = this.safeDict(market, 'priceFilter');
            const lotSizeFilter = this.safeDict(market, 'lotSizeFilter');
            const fee = this.safeNumber(market, 'commissionReserveRate');
            result.push({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': settle,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': settleId,
                'type': 'swap',
                'spot': false,
                'margin': undefined,
                'swap': true,
                'future': false,
                'option': false,
                'active': this.safeString(market, 'status') === 'Normal',
                'contract': true,
                'linear': linear,
                'inverse': inverse,
                'taker': fee,
                'maker': fee,
                'contractSize': this.parseNumber('1'),
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.safeNumber(lotSizeFilter, 'lotSize'),
                    'price': this.safeNumber(priceFilter, 'tickSize'),
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': this.safeNumber(lotSizeFilter, 'minQty'),
                        'max': this.safeNumber(lotSizeFilter, 'maxQty'),
                    },
                    'price': {
                        'min': this.safeNumber(priceFilter, 'minPrice'),
                        'max': this.safeNumber(priceFilter, 'maxPrice'),
                    },
                    'cost': {
                        'min': this.safeNumber(market, 'minNotional'),
                        'max': this.safeNumber(market, 'maxNotional'),
                    },
                },
                'created': this.safeInteger(market, 'tradingStartTime'),
                'info': market,
            });
        }
        return result;
    }
    /**
     * @method
     * @name ascendex#fetchTime
     * @description fetches the current integer timestamp in milliseconds from the ascendex server
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int} the current integer timestamp in milliseconds from the ascendex server
     */
    async fetchTime(params = {}) {
        const request = {
            'requestTime': this.milliseconds(),
        };
        const response = await this.v1PublicGetExchangeInfo(this.extend(request, params));
        //
        //    {
        //        "code": 0,
        //        "data": {
        //            "requestTimeEcho": 1656560463601,
        //            "requestReceiveAt": 1656560464331,
        //            "latency": 730
        //        }
        //    }
        //
        const data = this.safeDict(response, 'data', {});
        return this.safeInteger(data, 'requestReceiveAt');
    }
    /**
     * @method
     * @name ascendex#fetchAccounts
     * @description fetch all the accounts associated with a profile
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [account structures]{@link https://docs.ccxt.com/#/?id=account-structure} indexed by the account type
     */
    async fetchAccounts(params = {}) {
        let accountGroup = this.safeString(this.options, 'account-group');
        let response = undefined;
        if (accountGroup === undefined) {
            response = await this.v1PrivateGetInfo(params);
            //
            //     {
            //         "code":0,
            //         "data":{
            //             "email":"igor.kroitor@gmail.com",
            //             "accountGroup":8,
            //             "viewPermission":true,
            //             "tradePermission":true,
            //             "transferPermission":true,
            //             "cashAccount":["cshrHKLZCjlZ2ejqkmvIHHtPmLYqdnda"],
            //             "marginAccount":["martXoh1v1N3EMQC5FDtSj5VHso8aI2Z"],
            //             "futuresAccount":["futc9r7UmFJAyBY2rE3beA2JFxav2XFF"],
            //             "userUID":"U6491137460"
            //         }
            //     }
            //
            const data = this.safeDict(response, 'data', {});
            accountGroup = this.safeString(data, 'accountGroup');
            this.options['account-group'] = accountGroup;
        }
        return [
            {
                'id': accountGroup,
                'type': undefined,
                'code': undefined,
                'info': response,
            },
        ];
    }
    parseBalance(response) {
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        const balances = this.safeList(response, 'data', []);
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            const code = this.safeCurrencyCode(this.safeString(balance, 'asset'));
            const account = this.account();
            account['free'] = this.safeString(balance, 'availableBalance');
            account['total'] = this.safeString(balance, 'totalBalance');
            result[code] = account;
        }
        return this.safeBalance(result);
    }
    parseMarginBalance(response) {
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        const balances = this.safeList(response, 'data', []);
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            const code = this.safeCurrencyCode(this.safeString(balance, 'asset'));
            const account = this.account();
            account['free'] = this.safeString(balance, 'availableBalance');
            account['total'] = this.safeString(balance, 'totalBalance');
            const debt = this.safeString(balance, 'borrowed');
            const interest = this.safeString(balance, 'interest');
            account['debt'] = Precise["default"].stringAdd(debt, interest);
            result[code] = account;
        }
        return this.safeBalance(result);
    }
    parseSwapBalance(response) {
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        const data = this.safeDict(response, 'data', {});
        const collaterals = this.safeList(data, 'collaterals', []);
        for (let i = 0; i < collaterals.length; i++) {
            const balance = collaterals[i];
            const code = this.safeCurrencyCode(this.safeString(balance, 'asset'));
            const account = this.account();
            account['total'] = this.safeString(balance, 'balance');
            result[code] = account;
        }
        return this.safeBalance(result);
    }
    /**
     * @method
     * @name ascendex#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @see https://ascendex.github.io/ascendex-pro-api/#cash-account-balance
     * @see https://ascendex.github.io/ascendex-pro-api/#margin-account-balance
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#position
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.type] wallet type, 'spot', 'margin', or 'swap'
     * @param {string} [params.marginMode] 'cross' or undefined, for spot margin trading, value of 'isolated' is invalid
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    async fetchBalance(params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        let marketType = undefined;
        let marginMode = undefined;
        [marketType, params] = this.handleMarketTypeAndParams('fetchBalance', undefined, params);
        [marginMode, params] = this.handleMarginModeAndParams('fetchBalance', params);
        const isMargin = this.safeBool(params, 'margin', false);
        const isCross = marginMode === 'cross';
        marketType = (isMargin || isCross) ? 'margin' : marketType;
        params = this.omit(params, 'margin');
        const accountsByType = this.safeDict(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, marketType, 'cash');
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
        };
        if ((marginMode === 'isolated') && (marketType !== 'swap')) {
            throw new errors.BadRequest(this.id + ' does not supported isolated margin trading');
        }
        if ((accountCategory === 'cash') || (accountCategory === 'margin')) {
            request['account-category'] = accountCategory;
        }
        let response = undefined;
        if ((marketType === 'spot') || (marketType === 'margin')) {
            response = await this.v1PrivateAccountCategoryGetBalance(this.extend(request, params));
        }
        else if (marketType === 'swap') {
            response = await this.v2PrivateAccountGroupGetFuturesPosition(this.extend(request, params));
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchBalance() is not currently supported for ' + marketType + ' markets');
        }
        //
        // cash
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "asset": "BCHSV",
        //                 "totalBalance": "64.298000048",
        //                 "availableBalance": "64.298000048",
        //             },
        //         ]
        //     }
        //
        // margin
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "asset": "BCHSV",
        //                 "totalBalance": "64.298000048",
        //                 "availableBalance": "64.298000048",
        //                 "borrowed": "0",
        //                 "interest": "0",
        //             },
        //         ]
        //     }
        //
        // swap
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "ac": "FUTURES",
        //             "collaterals": [
        //                 {"asset":"ADA","balance":"0.355803","referencePrice":"1.05095","discountFactor":"0.9"},
        //                 {"asset":"USDT","balance":"0.000014519","referencePrice":"1","discountFactor":"1"}
        //             ],
        //         }j
        //     }
        //
        if (marketType === 'swap') {
            return this.parseSwapBalance(response);
        }
        else if (marketType === 'margin') {
            return this.parseMarginBalance(response);
        }
        else {
            return this.parseBalance(response);
        }
    }
    /**
     * @method
     * @name ascendex#fetchOrderBook
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.v1PublicGetDepth(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":{
        //             "m":"depth-snapshot",
        //             "symbol":"BTC-PERP",
        //             "data":{
        //                 "ts":1590223998202,
        //                 "seqnum":115444921,
        //                 "asks":[
        //                     ["9207.5","18.2383"],
        //                     ["9207.75","18.8235"],
        //                     ["9208","10.7873"],
        //                 ],
        //                 "bids":[
        //                     ["9207.25","0.4009"],
        //                     ["9207","0.003"],
        //                     ["9206.5","0.003"],
        //                 ]
        //             }
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const orderbook = this.safeDict(data, 'data', {});
        const timestamp = this.safeInteger(orderbook, 'ts');
        const result = this.parseOrderBook(orderbook, symbol, timestamp);
        result['nonce'] = this.safeInteger(orderbook, 'seqnum');
        return result;
    }
    parseTicker(ticker, market = undefined) {
        //
        //     {
        //         "symbol":"QTUM/BTC",
        //         "open":"0.00016537",
        //         "close":"0.00019077",
        //         "high":"0.000192",
        //         "low":"0.00016537",
        //         "volume":"846.6",
        //         "ask":["0.00018698","26.2"],
        //         "bid":["0.00018408","503.7"],
        //         "type":"spot"
        //     }
        //
        const timestamp = undefined;
        const marketId = this.safeString(ticker, 'symbol');
        const type = this.safeString(ticker, 'type');
        const delimiter = (type === 'spot') ? '/' : undefined;
        const symbol = this.safeSymbol(marketId, market, delimiter);
        const close = this.safeString(ticker, 'close');
        const bid = this.safeList(ticker, 'bid', []);
        const ask = this.safeList(ticker, 'ask', []);
        const open = this.safeString(ticker, 'open');
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': undefined,
            'high': this.safeString(ticker, 'high'),
            'low': this.safeString(ticker, 'low'),
            'bid': this.safeString(bid, 0),
            'bidVolume': this.safeString(bid, 1),
            'ask': this.safeString(ask, 0),
            'askVolume': this.safeString(ask, 1),
            'vwap': undefined,
            'open': open,
            'close': close,
            'last': close,
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeString(ticker, 'volume'),
            'quoteVolume': undefined,
            'info': ticker,
        }, market);
    }
    /**
     * @method
     * @name ascendex#fetchTicker
     * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTicker(symbol, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.v1PublicGetTicker(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":{
        //             "symbol":"BTC-PERP", // or "BTC/USDT"
        //             "open":"9073",
        //             "close":"9185.75",
        //             "high":"9185.75",
        //             "low":"9185.75",
        //             "volume":"576.8334",
        //             "ask":["9185.75","15.5863"],
        //             "bid":["9185.5","0.003"],
        //             "type":"derivatives", // or "spot"
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseTicker(data, market);
    }
    /**
     * @method
     * @name ascendex#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://ascendex.github.io/ascendex-pro-api/#ticker
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#ticker
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTickers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        let market = undefined;
        if (symbols !== undefined) {
            const symbol = this.safeString(symbols, 0);
            market = this.market(symbol);
            const marketIds = this.marketIds(symbols);
            request['symbol'] = marketIds.join(',');
        }
        let type = undefined;
        [type, params] = this.handleMarketTypeAndParams('fetchTickers', market, params);
        let response = undefined;
        if (type === 'spot') {
            response = await this.v1PublicGetTicker(this.extend(request, params));
        }
        else {
            response = await this.v2PublicGetFuturesTicker(this.extend(request, params));
        }
        //
        //     {
        //         "code":0,
        //         "data": {
        //             "symbol":"QTUM/BTC",
        //             "open":"0.00016537",
        //             "close":"0.00019077",
        //             "high":"0.000192",
        //             "low":"0.00016537",
        //             "volume":"846.6",
        //             "ask":["0.00018698","26.2"],
        //             "bid":["0.00018408","503.7"],
        //             "type":"spot"
        //         }
        //     }
        //
        const data = this.safeList(response, 'data', []);
        if (!Array.isArray(data)) {
            return this.parseTickers([data], symbols);
        }
        return this.parseTickers(data, symbols);
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        //     {
        //         "m":"bar",
        //         "s":"BTC/USDT",
        //         "data":{
        //             "i":"1",
        //             "ts":1590228000000,
        //             "o":"9139.59",
        //             "c":"9131.94",
        //             "h":"9139.99",
        //             "l":"9121.71",
        //             "v":"25.20648"
        //         }
        //     }
        //
        const data = this.safeDict(ohlcv, 'data', {});
        return [
            this.safeInteger(data, 'ts'),
            this.safeNumber(data, 'o'),
            this.safeNumber(data, 'h'),
            this.safeNumber(data, 'l'),
            this.safeNumber(data, 'c'),
            this.safeNumber(data, 'v'),
        ];
    }
    /**
     * @method
     * @name ascendex#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest candle to fetch
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
            'interval': this.safeString(this.timeframes, timeframe, timeframe),
        };
        // if since and limit are not specified
        // the exchange will return just 1 last candle by default
        const duration = this.parseTimeframe(timeframe);
        const options = this.safeDict(this.options, 'fetchOHLCV', {});
        const defaultLimit = this.safeInteger(options, 'limit', 500);
        const until = this.safeInteger(params, 'until');
        if (since !== undefined) {
            request['from'] = since;
            if (limit === undefined) {
                limit = defaultLimit;
            }
            else {
                limit = Math.min(limit, defaultLimit);
            }
            const toWithLimit = this.sum(since, limit * duration * 1000, 1);
            if (until !== undefined) {
                request['to'] = Math.min(toWithLimit, until + 1);
            }
            else {
                request['to'] = toWithLimit;
            }
        }
        else if (until !== undefined) {
            request['to'] = until + 1;
            if (limit === undefined) {
                limit = defaultLimit;
            }
            else {
                limit = Math.min(limit, defaultLimit);
            }
            request['from'] = until - (limit * duration * 1000);
        }
        else if (limit !== undefined) {
            request['n'] = limit; // max 500
        }
        params = this.omit(params, 'until');
        const response = await this.v1PublicGetBarhist(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {
        //                 "m":"bar",
        //                 "s":"BTC/USDT",
        //                 "data":{
        //                     "i":"1",
        //                     "ts":1590228000000,
        //                     "o":"9139.59",
        //                     "c":"9131.94",
        //                     "h":"9139.99",
        //                     "l":"9121.71",
        //                     "v":"25.20648"
        //                 }
        //             }
        //         ]
        //     }
        //
        const data = this.safeList(response, 'data', []);
        return this.parseOHLCVs(data, market, timeframe, since, limit);
    }
    parseTrade(trade, market = undefined) {
        //
        // public fetchTrades
        //
        //     {
        //         "p":"9128.5", // price
        //         "q":"0.0030", // quantity
        //         "ts":1590229002385, // timestamp
        //         "bm":false, // if true, the buyer is the market maker, we only use this field to "define the side" of a public trade
        //         "seqnum":180143985289898554
        //     }
        //
        const timestamp = this.safeInteger(trade, 'ts');
        const priceString = this.safeString2(trade, 'price', 'p');
        const amountString = this.safeString(trade, 'q');
        const buyerIsMaker = this.safeBool(trade, 'bm', false);
        const side = buyerIsMaker ? 'sell' : 'buy';
        market = this.safeMarket(undefined, market);
        return this.safeTrade({
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'id': undefined,
            'order': undefined,
            'type': undefined,
            'takerOrMaker': undefined,
            'side': side,
            'price': priceString,
            'amount': amountString,
            'cost': undefined,
            'fee': undefined,
        }, market);
    }
    /**
     * @method
     * @name ascendex#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://ascendex.github.io/ascendex-pro-api/#market-trades
     * @param {string} symbol unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of trades to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
     */
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        if (limit !== undefined) {
            request['n'] = limit; // max 100
        }
        const response = await this.v1PublicGetTrades(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":{
        //             "m":"trades",
        //             "symbol":"BTC-PERP",
        //             "data":[
        //                 {"p":"9128.5","q":"0.0030","ts":1590229002385,"bm":false,"seqnum":180143985289898554},
        //                 {"p":"9129","q":"0.0030","ts":1590229002642,"bm":false,"seqnum":180143985289898587},
        //                 {"p":"9129.5","q":"0.0030","ts":1590229021306,"bm":false,"seqnum":180143985289899043}
        //             ]
        //         }
        //     }
        //
        const records = this.safeDict(response, 'data', {});
        const trades = this.safeList(records, 'data', []);
        return this.parseTrades(trades, market, since, limit);
    }
    parseOrderStatus(status) {
        const statuses = {
            'PendingNew': 'open',
            'New': 'open',
            'PartiallyFilled': 'open',
            'Filled': 'closed',
            'Canceled': 'canceled',
            'Rejected': 'rejected',
        };
        return this.safeString(statuses, status, status);
    }
    parseOrder(order, market = undefined) {
        //
        // createOrder
        //
        //     {
        //         "id": "16e607e2b83a8bXHbAwwoqDo55c166fa",
        //         "orderId": "16e85b4d9b9a8bXHbAwwoqDoc3d66830",
        //         "orderType": "Market",
        //         "symbol": "BTC/USDT",
        //         "timestamp": 1573576916201
        //     }
        //
        //  & linear (fetchClosedOrders)
        //
        //     {
        //         "ac": "FUTURES",
        //         "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //         "time": 1640819389454,
        //         "orderId": "a17e0874ecbdU0711043490bbtcpDU5X",
        //         "seqNum": -1,
        //         "orderType": "Limit",
        //         "execInst": "NULL_VAL", // NULL_VAL, ReduceOnly , ...
        //         "side": "Buy",
        //         "symbol": "BTC-PERP",
        //         "price": "30000",
        //         "orderQty": "0.002",
        //         "stopPrice": "0",
        //         "stopBy": "ref-px",
        //         "status": "Ack",
        //         "lastExecTime": 1640819389454,
        //         "lastQty": "0",
        //         "lastPx": "0",
        //         "avgFilledPx": "0",
        //         "cumFilledQty": "0",
        //         "fee": "0",
        //         "cumFee": "0",
        //         "feeAsset": "",
        //         "errorCode": "",
        //         "posStopLossPrice": "0",
        //         "posStopLossTrigger": "market",
        //         "posTakeProfitPrice": "0",
        //         "posTakeProfitTrigger": "market",
        //         "liquidityInd": "n"
        //      }
        //
        // fetchOrder, fetchOpenOrders, fetchClosedOrders
        //
        //     {
        //         "symbol":       "BTC/USDT",
        //         "price":        "8131.22",
        //         "orderQty":     "0.00082",
        //         "orderType":    "Market",
        //         "avgPx":        "7392.02",
        //         "cumFee":       "0.005152238",
        //         "cumFilledQty": "0.00082",
        //         "errorCode":    "",
        //         "feeAsset":     "USDT",
        //         "lastExecTime": 1575953151764,
        //         "orderId":      "a16eee20b6750866943712zWEDdAjt3",
        //         "seqNum":       2623469,
        //         "side":         "Buy",
        //         "status":       "Filled",
        //         "stopPrice":    "",
        //         "execInst":     "NULL_VAL" // "Post" (for postOnly orders), "reduceOnly" (for reduceOnly orders)
        //     }
        //
        //     {
        //         "orderId": "a173ad938fc3U22666567717788c3b66",   // orderId
        //         "seqNum": 18777366360,                           // sequence number
        //         "accountId": "cshwSjbpPjSwHmxPdz2CPQVU9mnbzPpt", // accountId
        //         "symbol": "BTC/USDT",                            // symbol
        //         "orderType": "Limit",                            // order type (Limit/Market/StopMarket/StopLimit)
        //         "side": "Sell",                                  // order side (Buy/Sell)
        //         "price": "11346.77",                             // order price
        //         "stopPrice": "0",                                // stop price (0 by default)
        //         "orderQty": "0.01",                              // order quantity (in base asset)
        //         "status": "Canceled",                            // order status (Filled/Canceled/Rejected)
        //         "createTime": 1596344995793,                     // order creation time
        //         "lastExecTime": 1596344996053,                   // last execution time
        //         "avgFillPrice": "11346.77",                      // average filled price
        //         "fillQty": "0.01",                               // filled quantity (in base asset)
        //         "fee": "-0.004992579",                           // cummulative fee. if negative, this value is the commission charged; if possitive, this value is the rebate received.
        //         "feeAsset": "USDT"                               // fee asset
        //     }
        //
        //     {
        //         "ac": "FUTURES",
        //         "accountId": "testabcdefg",
        //         "avgPx": "0",
        //         "cumFee": "0",
        //         "cumQty": "0",
        //         "errorCode": "NULL_VAL",
        //         "execInst": "NULL_VAL",
        //         "feeAsset": "USDT",
        //         "lastExecTime": 1584072844085,
        //         "orderId": "r170d21956dd5450276356bbtcpKa74",
        //         "orderQty": "1.1499",
        //         "orderType": "Limit",
        //         "price": "4000",
        //         "sendingTime": 1584072841033,
        //         "seqNum": 24105338,
        //         "side": "Buy",
        //         "status": "Canceled",
        //         "stopPrice": "",
        //         "symbol": "BTC-PERP"
        //     },
        //
        const status = this.parseOrderStatus(this.safeString(order, 'status'));
        const marketId = this.safeString(order, 'symbol');
        const symbol = this.safeSymbol(marketId, market, '/');
        let timestamp = this.safeIntegerN(order, ['timestamp', 'sendingTime', 'time']);
        const lastTradeTimestamp = this.safeInteger(order, 'lastExecTime');
        if (timestamp === undefined) {
            timestamp = lastTradeTimestamp;
        }
        const price = this.safeString(order, 'price');
        const amount = this.safeString(order, 'orderQty');
        const average = this.safeString2(order, 'avgPx', 'avgFilledPx');
        const filled = this.safeStringN(order, ['cumFilledQty', 'cumQty', 'fillQty']);
        const id = this.safeString(order, 'orderId');
        let clientOrderId = this.safeString(order, 'id');
        if (clientOrderId !== undefined) {
            if (clientOrderId.length < 1) {
                clientOrderId = undefined;
            }
        }
        const rawTypeLower = this.safeStringLower(order, 'orderType');
        let type = rawTypeLower;
        if (rawTypeLower !== undefined) {
            if (rawTypeLower === 'stoplimit') {
                type = 'limit';
            }
            if (rawTypeLower === 'stopmarket') {
                type = 'market';
            }
        }
        const side = this.safeStringLower(order, 'side');
        const feeCost = this.safeNumber2(order, 'cumFee', 'fee');
        let fee = undefined;
        if (feeCost !== undefined) {
            const feeCurrencyId = this.safeString(order, 'feeAsset');
            const feeCurrencyCode = this.safeCurrencyCode(feeCurrencyId);
            fee = {
                'cost': feeCost,
                'currency': feeCurrencyCode,
            };
        }
        const triggerPrice = this.omitZero(this.safeString(order, 'stopPrice'));
        let reduceOnly = undefined;
        const execInst = this.safeStringLower(order, 'execInst');
        if (execInst === 'reduceonly') {
            reduceOnly = true;
        }
        let postOnly = undefined;
        if (execInst === 'post') {
            postOnly = true;
        }
        return this.safeOrder({
            'info': order,
            'id': id,
            'clientOrderId': clientOrderId,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'lastTradeTimestamp': lastTradeTimestamp,
            'symbol': symbol,
            'type': type,
            'timeInForce': undefined,
            'postOnly': postOnly,
            'reduceOnly': reduceOnly,
            'side': side,
            'price': price,
            'triggerPrice': triggerPrice,
            'amount': amount,
            'cost': undefined,
            'average': average,
            'filled': filled,
            'remaining': undefined,
            'status': status,
            'fee': fee,
            'trades': undefined,
        }, market);
    }
    /**
     * @method
     * @name ascendex#fetchTradingFees
     * @description fetch the trading fees for multiple markets
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure} indexed by market symbols
     */
    async fetchTradingFees(params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
        };
        const response = await this.v1PrivateAccountGroupGetSpotFee(this.extend(request, params));
        //
        //      {
        //         "code": "0",
        //         "data": {
        //           "domain": "spot",
        //           "userUID": "U1479576458",
        //           "vipLevel": "0",
        //           "fees": [
        //             { symbol: 'HT/USDT', fee: { taker: '0.001', maker: "0.001" } },
        //             { symbol: 'LAMB/BTC', fee: { taker: '0.002', maker: "0.002" } },
        //             { symbol: 'STOS/USDT', fee: { taker: '0.002', maker: "0.002" } },
        //             ...
        //           ]
        //         }
        //      }
        //
        const data = this.safeDict(response, 'data', {});
        const fees = this.safeList(data, 'fees', []);
        const result = {};
        for (let i = 0; i < fees.length; i++) {
            const fee = fees[i];
            const marketId = this.safeString(fee, 'symbol');
            const symbol = this.safeSymbol(marketId, undefined, '/');
            const takerMaker = this.safeDict(fee, 'fee', {});
            result[symbol] = {
                'info': fee,
                'symbol': symbol,
                'maker': this.safeNumber(takerMaker, 'maker'),
                'taker': this.safeNumber(takerMaker, 'taker'),
                'percentage': undefined,
                'tierBased': undefined,
            };
        }
        return result;
    }
    createOrderRequest(symbol, type, side, amount, price = undefined, params = {}) {
        /**
         * @method
         * @ignore
         * @name ascendex#createOrderRequest
         * @description helper function to build request
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much you want to trade in units of the base currency
         * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {string} [params.timeInForce] "GTC", "IOC", "FOK", or "PO"
         * @param {bool} [params.postOnly] true or false
         * @param {float} [params.triggerPrice] the price at which a trigger order is triggered at
         * @returns {object} request to be sent to the exchange
         */
        const market = this.market(symbol);
        let marginMode = undefined;
        let marketType = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('createOrderRequest', params);
        [marketType, params] = this.handleMarketTypeAndParams('createOrderRequest', market, params);
        const accountsByType = this.safeDict(this.options, 'accountsByType', {});
        let accountCategory = this.safeString(accountsByType, marketType, 'cash');
        if (marginMode !== undefined) {
            accountCategory = 'margin';
        }
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const clientOrderId = this.safeString2(params, 'clientOrderId', 'id');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
            'symbol': market['id'],
            'time': this.milliseconds(),
            'orderQty': this.amountToPrecision(symbol, amount),
            'orderType': type,
            'side': side, // buy or sell,
            // 'execInst': // Post for postOnly, ReduceOnly for reduceOnly
            // 'respInst': 'ACK', // ACK, 'ACCEPT, DONE
        };
        const isMarketOrder = ((type === 'market') || (type === 'stop_market'));
        const isLimitOrder = ((type === 'limit') || (type === 'stop_limit'));
        const timeInForce = this.safeString(params, 'timeInForce');
        const postOnly = this.isPostOnly(isMarketOrder, false, params);
        const reduceOnly = this.safeBool(params, 'reduceOnly', false);
        const triggerPrice = this.safeString2(params, 'triggerPrice', 'stopPrice');
        if (isLimitOrder) {
            request['orderPrice'] = this.priceToPrecision(symbol, price);
        }
        if (timeInForce === 'IOC') {
            request['timeInForce'] = 'IOC';
        }
        if (timeInForce === 'FOK') {
            request['timeInForce'] = 'FOK';
        }
        if (postOnly) {
            request['postOnly'] = true;
        }
        if (triggerPrice !== undefined) {
            request['stopPrice'] = this.priceToPrecision(symbol, triggerPrice);
            if (isLimitOrder) {
                request['orderType'] = 'stop_limit';
            }
            else if (isMarketOrder) {
                request['orderType'] = 'stop_market';
            }
        }
        if (clientOrderId !== undefined) {
            request['id'] = clientOrderId;
        }
        if (market['spot']) {
            if (accountCategory !== undefined) {
                request['category'] = accountCategory;
            }
        }
        else {
            request['account-category'] = accountCategory;
            if (reduceOnly) {
                request['execInst'] = 'ReduceOnly';
            }
            if (postOnly) {
                request['execInst'] = 'Post';
            }
        }
        params = this.omit(params, ['reduceOnly', 'triggerPrice']);
        return this.extend(request, params);
    }
    /**
     * @method
     * @name ascendex#createOrder
     * @description create a trade order on the exchange
     * @see https://ascendex.github.io/ascendex-pro-api/#place-order
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#new-order
     * @param {string} symbol unified CCXT market symbol
     * @param {string} type "limit" or "market"
     * @param {string} side "buy" or "sell"
     * @param {float} amount the amount of currency to trade
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.timeInForce] "GTC", "IOC", "FOK", or "PO"
     * @param {bool} [params.postOnly] true or false
     * @param {float} [params.triggerPrice] the price at which a trigger order is triggered at
     * @param {object} [params.takeProfit] *takeProfit object in params* containing the triggerPrice that the attached take profit order will be triggered (perpetual swap markets only)
     * @param {float} [params.takeProfit.triggerPrice] *swap only* take profit trigger price
     * @param {object} [params.stopLoss] *stopLoss object in params* containing the triggerPrice that the attached stop loss order will be triggered (perpetual swap markets only)
     * @param {float} [params.stopLoss.triggerPrice] *swap only* stop loss trigger price
     * @returns [An order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        const market = this.market(symbol);
        const request = this.createOrderRequest(symbol, type, side, amount, price, params);
        let response = undefined;
        if (market['swap']) {
            response = await this.v2PrivateAccountGroupPostFuturesOrder(request);
        }
        else {
            response = await this.v1PrivateAccountCategoryPostOrder(request);
        }
        //
        // spot
        //
        //      {
        //          "code":0,
        //          "data": {
        //              "accountId":"cshwT8RKojkT1HoaA5UdeimR2SrmHG2I",
        //              "ac":"CASH",
        //              "action":"place-order",
        //              "status":"Ack",
        //              "info": {
        //                  "symbol":"TRX/USDT",
        //                  "orderType":"StopLimit",
        //                  "timestamp":1654290662172,
        //                  "id":"",
        //                  "orderId":"a1812b6840ddU8191168955av0k6Eyhj"
        //              }
        //          }
        //      }
        //
        // swap
        //
        //      {
        //          "code":0,
        //          "data": {
        //              "meta": {
        //                  "id":"",
        //                  "action":"place-order",
        //                  "respInst":"ACK"
        //              },
        //              "order": {
        //                  "ac":"FUTURES",
        //                  "accountId":"futwT8RKojkT1HoaA5UdeimR2SrmHG2I",
        //                  "time":1654290969965,
        //                  "orderId":"a1812b6cf322U8191168955oJamfTh7b",
        //                  "seqNum":-1,
        //                  "orderType":"StopLimit",
        //                  "execInst":"NULL_VAL",
        //                  "side":"Buy",
        //                  "symbol":"TRX-PERP",
        //                  "price":"0.083",
        //                  "orderQty":"1",
        //                  "stopPrice":"0.082",
        //                  "stopBy":"ref-px",
        //                  "status":"Ack",
        //                  "lastExecTime":1654290969965,
        //                  "lastQty":"0",
        //                  "lastPx":"0",
        //                  "avgFilledPx":"0",
        //                  "cumFilledQty":"0",
        //                  "fee":"0",
        //                  "cumFee":"0",
        //                  "feeAsset":"",
        //                  "errorCode":"",
        //                  "posStopLossPrice":"0",
        //                  "posStopLossTrigger":"market",
        //                  "posTakeProfitPrice":"0",
        //                  "posTakeProfitTrigger":"market",
        //                  "liquidityInd":"n"
        //              }
        //          }
        //      }
        //
        const data = this.safeDict(response, 'data', {});
        const order = this.safeDict2(data, 'order', 'info', {});
        return this.parseOrder(order, market);
    }
    /**
     * @method
     * @name ascendex#createOrders
     * @description create a list of trade orders
     * @see https://ascendex.github.io/ascendex-pro-api/#place-batch-orders
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#place-batch-orders
     * @param {Array} orders list of orders to create, each object should contain the parameters required by createOrder, namely symbol, type, side, amount, price and params
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.timeInForce] "GTC", "IOC", "FOK", or "PO"
     * @param {bool} [params.postOnly] true or false
     * @param {float} [params.triggerPrice] the price at which a trigger order is triggered at
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrders(orders, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        const ordersRequests = [];
        let symbol = undefined;
        let marginMode = undefined;
        for (let i = 0; i < orders.length; i++) {
            const rawOrder = orders[i];
            const marketId = this.safeString(rawOrder, 'symbol');
            if (symbol === undefined) {
                symbol = marketId;
            }
            else {
                if (symbol !== marketId) {
                    throw new errors.BadRequest(this.id + ' createOrders() requires all orders to have the same symbol');
                }
            }
            const type = this.safeString(rawOrder, 'type');
            const side = this.safeString(rawOrder, 'side');
            const amount = this.safeNumber(rawOrder, 'amount');
            const price = this.safeNumber(rawOrder, 'price');
            const orderParams = this.safeDict(rawOrder, 'params', {});
            const marginResult = this.handleMarginModeAndParams('createOrders', orderParams);
            const currentMarginMode = marginResult[0];
            if (currentMarginMode !== undefined) {
                if (marginMode === undefined) {
                    marginMode = currentMarginMode;
                }
                else {
                    if (marginMode !== currentMarginMode) {
                        throw new errors.BadRequest(this.id + ' createOrders() requires all orders to have the same margin mode (isolated or cross)');
                    }
                }
            }
            const orderRequest = this.createOrderRequest(marketId, type, side, amount, price, orderParams);
            ordersRequests.push(orderRequest);
        }
        const market = this.market(symbol);
        const accountsByType = this.safeDict(this.options, 'accountsByType', {});
        let accountCategory = this.safeString(accountsByType, market['type'], 'cash');
        if (marginMode !== undefined) {
            accountCategory = 'margin';
        }
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {};
        let response = undefined;
        if (market['swap']) {
            throw new errors.NotSupported(this.id + ' createOrders() is not currently supported for swap markets on ascendex');
            // request['account-group'] = accountGroup;
            // request['category'] = accountCategory;
            // request['orders'] = ordersRequests;
            // response = await this.v2PrivateAccountGroupPostFuturesOrderBatch (request);
        }
        else {
            request['account-group'] = accountGroup;
            request['account-category'] = accountCategory;
            request['orders'] = ordersRequests;
            response = await this.v1PrivateAccountCategoryPostOrderBatch(request);
        }
        //
        // spot
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "accountId": "cshdAKBO43TKIh2kJtq7FVVb42KIePyS",
        //             "ac": "CASH",
        //             "action": "batch-place-order",
        //             "status": "Ack",
        //             "info": [
        //                 {
        //                     "symbol": "BTC/USDT",
        //                     "orderType": "Limit",
        //                     "timestamp": 1699326589344,
        //                     "id": "",
        //                     "orderId": "a18ba7c1f6efU0711043490p3HvjjN5x"
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const info = this.safeList(data, 'info', []);
        return this.parseOrders(info, market);
    }
    /**
     * @method
     * @name ascendex#fetchOrder
     * @description fetches information on an order made by the user
     * @see https://ascendex.github.io/ascendex-pro-api/#query-order
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#query-order-by-id
     * @param {string} id the order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOrder(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        const [type, query] = this.handleMarketTypeAndParams('fetchOrder', market, params);
        const accountsByType = this.safeDict(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash');
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
            'orderId': id,
        };
        let response = undefined;
        if ((type === 'spot') || (type === 'margin')) {
            response = await this.v1PrivateAccountCategoryGetOrderStatus(this.extend(request, query));
        }
        else if (type === 'swap') {
            request['account-category'] = accountCategory;
            response = await this.v2PrivateAccountGroupGetFuturesOrderStatus(this.extend(request, query));
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchOrder() is not currently supported for ' + type + ' markets');
        }
        //
        // AccountCategoryGetOrderStatus
        //
        //     {
        //         "code": 0,
        //         "accountCategory": "CASH",
        //         "accountId": "cshQtyfq8XLAA9kcf19h8bXHbAwwoqDo",
        //         "data": [
        //             {
        //                 "symbol":       "BTC/USDT",
        //                 "price":        "8131.22",
        //                 "orderQty":     "0.00082",
        //                 "orderType":    "Market",
        //                 "avgPx":        "7392.02",
        //                 "cumFee":       "0.005152238",
        //                 "cumFilledQty": "0.00082",
        //                 "errorCode":    "",
        //                 "feeAsset":     "USDT",
        //                 "lastExecTime": 1575953151764,
        //                 "orderId":      "a16eee20b6750866943712zWEDdAjt3",
        //                 "seqNum":       2623469,
        //                 "side":         "Buy",
        //                 "status":       "Filled",
        //                 "stopPrice":    "",
        //                 "execInst":     "NULL_VAL"
        //             }
        //         ]
        //     }
        //
        // AccountGroupGetFuturesOrderStatus
        //
        //     {
        //         "code": 0,
        //         "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //         "ac": "FUTURES",
        //         "data": {
        //             "ac": "FUTURES",
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "time": 1640247020217,
        //             "orderId": "r17de65747aeU0711043490bbtcp0cmt",
        //             "seqNum": 28796162908,
        //             "orderType": "Limit",
        //             "execInst": "NULL_VAL",
        //             "side": "Buy",
        //             "symbol": "BTC-PERP",
        //             "price": "30000",
        //             "orderQty": "0.0021",
        //             "stopPrice": "0",
        //             "stopBy": "market",
        //             "status": "New",
        //             "lastExecTime": 1640247020232,
        //             "lastQty": "0",
        //             "lastPx": "0",
        //             "avgFilledPx": "0",
        //             "cumFilledQty": "0",
        //             "fee": "0",
        //             "cumFee": "0",
        //             "feeAsset": "USDT",
        //             "errorCode": "",
        //             "posStopLossPrice": "0",
        //             "posStopLossTrigger": "market",
        //             "posTakeProfitPrice": "0",
        //             "posTakeProfitTrigger": "market",
        //             "liquidityInd": "n"
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseOrder(data, market);
    }
    /**
     * @method
     * @name ascendex#fetchOpenOrders
     * @description fetch all unfilled currently open orders
     * @see https://ascendex.github.io/ascendex-pro-api/#list-open-orders
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#list-open-orders
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of  open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            symbol = market['symbol'];
        }
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const [type, query] = this.handleMarketTypeAndParams('fetchOpenOrders', market, params);
        const accountsByType = this.safeDict(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
        };
        let response = undefined;
        if ((type === 'spot') || (type === 'margin')) {
            response = await this.v1PrivateAccountCategoryGetOrderOpen(this.extend(request, query));
        }
        else if (type === 'swap') {
            request['account-category'] = accountCategory;
            response = await this.v2PrivateAccountGroupGetFuturesOrderOpen(this.extend(request, query));
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchOpenOrders() is not currently supported for ' + type + ' markets');
        }
        //
        // AccountCategoryGetOrderOpen
        //
        //     {
        //         "ac": "CASH",
        //         "accountId": "cshQtyfq8XLAA9kcf19h8bXHbAwwoqDo",
        //         "code": 0,
        //         "data": [
        //             {
        //                 "avgPx": "0",        // Average filled price of the order
        //                 "cumFee": "0",       // cumulative fee paid for this order
        //                 "cumFilledQty": "0", // cumulative filled quantity
        //                 "errorCode": "",     // error code; could be empty
        //                 "feeAsset": "USDT",  // fee asset
        //                 "lastExecTime": 1576019723550, //  The last execution time of the order
        //                 "orderId": "s16ef21882ea0866943712034f36d83", // server provided orderId
        //                 "orderQty": "0.0083",  // order quantity
        //                 "orderType": "Limit",  // order type
        //                 "price": "7105",       // order price
        //                 "seqNum": 8193258,     // sequence number
        //                 "side": "Buy",         // order side
        //                 "status": "New",       // order status on matching engine
        //                 "stopPrice": "",       // only available for stop market and stop limit orders; otherwise empty
        //                 "symbol": "BTC/USDT",
        //                 "execInst": "NULL_VAL" // execution instruction
        //             },
        //         ]
        //     }
        //
        // AccountGroupGetFuturesOrderOpen
        //
        // {
        //     "code": 0,
        //     "data": [
        //         {
        //             "ac": "FUTURES",
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "time": 1640247020217,
        //             "orderId": "r17de65747aeU0711043490bbtcp0cmt",
        //             "seqNum": 28796162908,
        //             "orderType": "Limit",
        //             "execInst": "NULL_VAL",
        //             "side": "Buy",
        //             "symbol": "BTC-PERP",
        //             "price": "30000",
        //             "orderQty": "0.0021",
        //             "stopPrice": "0",
        //             "stopBy": "market",
        //             "status": "New",
        //             "lastExecTime": 1640247020232,
        //             "lastQty": "0",
        //             "lastPx": "0",
        //             "avgFilledPx": "0",
        //             "cumFilledQty": "0",
        //             "fee": "0",
        //             "cumFee": "0",
        //             "feeAsset": "USDT",
        //             "errorCode": "",
        //             "posStopLossPrice": "0",
        //             "posStopLossTrigger": "market",
        //             "posTakeProfitPrice": "0",
        //             "posTakeProfitTrigger": "market",
        //             "liquidityInd": "n"
        //         }
        //     ]
        // }
        //
        const data = this.safeList(response, 'data', []);
        if (accountCategory === 'futures') {
            return this.parseOrders(data, market, since, limit);
        }
        // a workaround for https://github.com/ccxt/ccxt/issues/7187
        const orders = [];
        for (let i = 0; i < data.length; i++) {
            const order = this.parseOrder(data[i], market);
            orders.push(order);
        }
        return this.filterBySymbolSinceLimit(orders, symbol, since, limit);
    }
    /**
     * @method
     * @name ascendex#fetchClosedOrders
     * @description fetches information on multiple closed orders made by the user
     * @see https://ascendex.github.io/ascendex-pro-api/#list-history-orders-v2
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#list-current-history-orders
     * @param {string} symbol unified market symbol of the market orders were made in
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of order structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch orders for
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchClosedOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
        // 'category': accountCategory,
        // 'symbol': market['id'],
        // 'orderType': 'market', // optional, string
        // 'side': 'buy', // or 'sell', optional, case insensitive.
        // 'status': 'Filled', // "Filled", "Canceled", or "Rejected"
        // 'startTime': exchange.milliseconds (),
        // 'endTime': exchange.milliseconds (),
        // 'page': 1,
        // 'pageSize': 100,
        };
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        const [type, query] = this.handleMarketTypeAndParams('fetchClosedOrders', market, params);
        const options = this.safeDict(this.options, 'fetchClosedOrders', {});
        const defaultMethod = this.safeString(options, 'method', 'v2PrivateDataGetOrderHist');
        const method = this.getSupportedMapping(type, {
            'spot': defaultMethod,
            'margin': defaultMethod,
            'swap': 'v2PrivateAccountGroupGetFuturesOrderHistCurrent',
        });
        if (since !== undefined) {
            request['startTime'] = since;
        }
        const until = this.safeString(params, 'until');
        if (until !== undefined) {
            request['endTime'] = until;
        }
        const accountsByType = this.safeDict(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash'); // margin, futures
        let response = undefined;
        if (method === 'v1PrivateAccountCategoryGetOrderHistCurrent') {
            request['account-group'] = accountGroup;
            request['account-category'] = accountCategory;
            if (limit !== undefined) {
                request['limit'] = limit;
            }
            response = await this.v1PrivateAccountCategoryGetOrderHistCurrent(this.extend(request, query));
        }
        else if (method === 'v2PrivateDataGetOrderHist') {
            request['account'] = accountCategory;
            if (limit !== undefined) {
                request['limit'] = limit;
            }
            response = await this.v2PrivateDataGetOrderHist(this.extend(request, query));
        }
        else if (method === 'v2PrivateAccountGroupGetFuturesOrderHistCurrent') {
            request['account-group'] = accountGroup;
            request['account-category'] = accountCategory;
            if (limit !== undefined) {
                request['pageSize'] = limit;
            }
            response = await this.v2PrivateAccountGroupGetFuturesOrderHistCurrent(this.extend(request, query));
        }
        else {
            throw new errors.NotSupported(this.id + ' fetchClosedOrders() is not currently supported for ' + type + ' markets');
        }
        //
        // accountCategoryGetOrderHistCurrent
        //
        //     {
        //         "code":0,
        //         "accountId":"cshrHKLZCjlZ2ejqkmvIHHtPmLYqdnda",
        //         "ac":"CASH",
        //         "data":[
        //             {
        //                 "seqNum":15561826728,
        //                 "orderId":"a17294d305c0U6491137460bethu7kw9",
        //                 "symbol":"ETH/USDT",
        //                 "orderType":"Limit",
        //                 "lastExecTime":1591635618200,
        //                 "price":"200",
        //                 "orderQty":"0.1",
        //                 "side":"Buy",
        //                 "status":"Canceled",
        //                 "avgPx":"0",
        //                 "cumFilledQty":"0",
        //                 "stopPrice":"",
        //                 "errorCode":"",
        //                 "cumFee":"0",
        //                 "feeAsset":"USDT",
        //                 "execInst":"NULL_VAL"
        //             }
        //         ]
        //     }
        //
        //    {
        //        "code": 0,
        //        "data": [
        //            {
        //                "orderId"     :  "a173ad938fc3U22666567717788c3b66", // orderId
        //                "seqNum"      :  18777366360,                        // sequence number
        //                "accountId"   :  "cshwSjbpPjSwHmxPdz2CPQVU9mnbzPpt", // accountId
        //                "symbol"      :  "BTC/USDT",                         // symbol
        //                "orderType"   :  "Limit",                            // order type (Limit/Market/StopMarket/StopLimit)
        //                "side"        :  "Sell",                             // order side (Buy/Sell)
        //                "price"       :  "11346.77",                         // order price
        //                "stopPrice"   :  "0",                                // stop price (0 by default)
        //                "orderQty"    :  "0.01",                             // order quantity (in base asset)
        //                "status"      :  "Canceled",                         // order status (Filled/Canceled/Rejected)
        //                "createTime"  :  1596344995793,                      // order creation time
        //                "lastExecTime":  1596344996053,                      // last execution time
        //                "avgFillPrice":  "11346.77",                         // average filled price
        //                "fillQty"     :  "0.01",                             // filled quantity (in base asset)
        //                "fee"         :  "-0.004992579",                     // cummulative fee. if negative, this value is the commission charged; if possitive, this value is the rebate received.
        //                "feeAsset"    :  "USDT"                              // fee asset
        //            }
        //        ]
        //    }
        //
        // accountGroupGetFuturesOrderHistCurrent
        //
        //     {
        //         "code": 0,
        //         "data": [
        //             {
        //                 "ac": "FUTURES",
        //                 "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //                 "time": 1640245777002,
        //                 "orderId": "r17de6444fa6U0711043490bbtcpJ2lI",
        //                 "seqNum": 28796124902,
        //                 "orderType": "Limit",
        //                 "execInst": "NULL_VAL",
        //                 "side": "Buy",
        //                 "symbol": "BTC-PERP",
        //                 "price": "30000",
        //                 "orderQty": "0.0021",
        //                 "stopPrice": "0",
        //                 "stopBy": "market",
        //                 "status": "Canceled",
        //                 "lastExecTime": 1640246574886,
        //                 "lastQty": "0",
        //                 "lastPx": "0",
        //                 "avgFilledPx": "0",
        //                 "cumFilledQty": "0",
        //                 "fee": "0",
        //                 "cumFee": "0",
        //                 "feeAsset": "USDT",
        //                 "errorCode": "",
        //                 "posStopLossPrice": "0",
        //                 "posStopLossTrigger": "market",
        //                 "posTakeProfitPrice": "0",
        //                 "posTakeProfitTrigger": "market",
        //                 "liquidityInd": "n"
        //             }
        //         ]
        //     }
        //
        let data = this.safeList(response, 'data', []);
        if (!Array.isArray(data)) {
            data = this.safeList(data, 'data', []);
        }
        return this.parseOrders(data, market, since, limit);
    }
    /**
     * @method
     * @name ascendex#cancelOrder
     * @description cancels an open order
     * @see https://ascendex.github.io/ascendex-pro-api/#cancel-order
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#cancel-order
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelOrder(id, symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' cancelOrder() requires a symbol argument');
        }
        await this.loadMarkets();
        await this.loadAccounts();
        const market = this.market(symbol);
        const [type, query] = this.handleMarketTypeAndParams('cancelOrder', market, params);
        const accountsByType = this.safeDict(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash');
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
            'symbol': market['id'],
            'time': this.milliseconds(),
            'id': 'foobar',
        };
        const clientOrderId = this.safeString2(params, 'clientOrderId', 'id');
        if (clientOrderId === undefined) {
            request['orderId'] = id;
        }
        else {
            request['id'] = clientOrderId;
            params = this.omit(params, ['clientOrderId', 'id']);
        }
        let response = undefined;
        if ((type === 'spot') || (type === 'margin')) {
            response = await this.v1PrivateAccountCategoryDeleteOrder(this.extend(request, query));
        }
        else if (type === 'swap') {
            request['account-category'] = accountCategory;
            response = await this.v2PrivateAccountGroupDeleteFuturesOrder(this.extend(request, query));
        }
        else {
            throw new errors.NotSupported(this.id + ' cancelOrder() is not currently supported for ' + type + ' markets');
        }
        //
        // AccountCategoryDeleteOrder
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "accountId": "cshQtyfq8XLAA9kcf19h8bXHbAwwoqDo",
        //             "ac": "CASH",
        //             "action": "cancel-order",
        //             "status": "Ack",
        //             "info": {
        //                 "id":        "wv8QGquoeamhssvQBeHOHGQCGlcBjj23",
        //                 "orderId":   "16e6198afb4s8bXHbAwwoqDo2ebc19dc",
        //                 "orderType": "", // could be empty
        //                 "symbol":    "ETH/USDT",
        //                 "timestamp":  1573594877822
        //             }
        //         }
        //     }
        //
        // AccountGroupDeleteFuturesOrder
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "meta": {
        //                 "id": "foobar",
        //                 "action": "cancel-order",
        //                 "respInst": "ACK"
        //             },
        //             "order": {
        //                 "ac": "FUTURES",
        //                 "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //                 "time": 1640244480476,
        //                 "orderId": "r17de63086f4U0711043490bbtcpPUF4",
        //                 "seqNum": 28795959269,
        //                 "orderType": "Limit",
        //                 "execInst": "NULL_VAL",
        //                 "side": "Buy",
        //                 "symbol": "BTC-PERP",
        //                 "price": "30000",
        //                 "orderQty": "0.0021",
        //                 "stopPrice": "0",
        //                 "stopBy": "market",
        //                 "status": "New",
        //                 "lastExecTime": 1640244480491,
        //                 "lastQty": "0",
        //                 "lastPx": "0",
        //                 "avgFilledPx": "0",
        //                 "cumFilledQty": "0",
        //                 "fee": "0",
        //                 "cumFee": "0",
        //                 "feeAsset": "BTCPC",
        //                 "errorCode": "",
        //                 "posStopLossPrice": "0",
        //                 "posStopLossTrigger": "market",
        //                 "posTakeProfitPrice": "0",
        //                 "posTakeProfitTrigger": "market",
        //                 "liquidityInd": "n"
        //             }
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const order = this.safeDict2(data, 'order', 'info', {});
        return this.parseOrder(order, market);
    }
    /**
     * @method
     * @name ascendex#cancelAllOrders
     * @description cancel all open orders
     * @see https://ascendex.github.io/ascendex-pro-api/#cancel-all-orders
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#cancel-all-open-orders
     * @param {string} symbol unified market symbol, only orders in the market of this symbol are cancelled when symbol is not undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list with a single [order structure]{@link https://docs.ccxt.com/#/?id=order-structure} with the response assigned to the info property
     */
    async cancelAllOrders(symbol = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        const [type, query] = this.handleMarketTypeAndParams('cancelAllOrders', market, params);
        const accountsByType = this.safeDict(this.options, 'accountsByType', {});
        const accountCategory = this.safeString(accountsByType, type, 'cash');
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
            'account-category': accountCategory,
            'time': this.milliseconds(),
        };
        if (symbol !== undefined) {
            request['symbol'] = market['id'];
        }
        let response = undefined;
        if ((type === 'spot') || (type === 'margin')) {
            response = await this.v1PrivateAccountCategoryDeleteOrderAll(this.extend(request, query));
        }
        else if (type === 'swap') {
            request['account-category'] = accountCategory;
            response = await this.v2PrivateAccountGroupDeleteFuturesOrderAll(this.extend(request, query));
        }
        else {
            throw new errors.NotSupported(this.id + ' cancelAllOrders() is not currently supported for ' + type + ' markets');
        }
        //
        // AccountCategoryDeleteOrderAll
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "ac": "CASH",
        //             "accountId": "cshQtyfq8XLAA9kcf19h8bXHbAwwoqDo",
        //             "action": "cancel-all",
        //             "info": {
        //                 "id":  "2bmYvi7lyTrneMzpcJcf2D7Pe9V1P9wy",
        //                 "orderId": "",
        //                 "orderType": "NULL_VAL",
        //                 "symbol": "",
        //                 "timestamp": 1574118495462
        //             },
        //             "status": "Ack"
        //         }
        //     }
        //
        // AccountGroupDeleteFuturesOrderAll
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "ac": "FUTURES",
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "action": "cancel-all",
        //             "info": {
        //                 "symbol":"BTC-PERP"
        //             }
        //         }
        //     }
        //
        return [this.safeOrder({
                'info': response,
            })];
    }
    parseDepositAddress(depositAddress, currency = undefined) {
        //
        //     {
        //         "address": "0xe7c70b4e73b6b450ee46c3b5c0f5fb127ca55722",
        //         "destTag": "",
        //         "tagType": "",
        //         "tagId": "",
        //         "chainName": "ERC20",
        //         "numConfirmations": 20,
        //         "withdrawalFee": 1,
        //         "nativeScale": 4,
        //         "tips": []
        //     }
        //
        const address = this.safeString(depositAddress, 'address');
        const tagId = this.safeString(depositAddress, 'tagId');
        const tag = this.safeString(depositAddress, tagId);
        this.checkAddress(address);
        const code = (currency === undefined) ? undefined : currency['code'];
        const chainName = this.safeString(depositAddress, 'blockchain');
        const network = this.networkIdToCode(chainName, code);
        return {
            'info': depositAddress,
            'currency': code,
            'network': network,
            'address': address,
            'tag': tag,
        };
    }
    /**
     * @method
     * @name ascendex#fetchDepositAddress
     * @description fetch the deposit address for a currency associated with this account
     * @see https://ascendex.github.io/ascendex-pro-api/#query-deposit-addresses
     * @param {string} code unified currency code
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.network] unified network code for deposit chain
     * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
     */
    async fetchDepositAddress(code, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const networkCode = this.safeString2(params, 'network', 'chainName');
        const networkId = this.networkCodeToId(networkCode);
        params = this.omit(params, ['chainName']);
        const request = {
            'asset': currency['id'],
            'blockchain': networkId,
        };
        const response = await this.v1PrivateGetWalletDepositAddress(this.extend(request, params));
        //
        //     {
        //         "code":0,
        //         "data":{
        //             "asset":"USDT",
        //             "assetName":"Tether",
        //             "address":[
        //                 {
        //                     "address":"1N22odLHXnLPCjC8kwBJPTayarr9RtPod6",
        //                     "destTag":"",
        //                     "tagType":"",
        //                     "tagId":"",
        //                     "chainName":"Omni",
        //                     "numConfirmations":3,
        //                     "withdrawalFee":4.7,
        //                     "nativeScale":4,
        //                     "tips":[]
        //                 },
        //                 {
        //                     "address":"0xe7c70b4e73b6b450ee46c3b5c0f5fb127ca55722",
        //                     "destTag":"",
        //                     "tagType":"",
        //                     "tagId":"",
        //                     "chainName":"ERC20",
        //                     "numConfirmations":20,
        //                     "withdrawalFee":1.0,
        //                     "nativeScale":4,
        //                     "tips":[]
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const addresses = this.safeList(data, 'address', []);
        const numAddresses = addresses.length;
        let address = undefined;
        if (numAddresses > 1) {
            const addressesByChainName = this.indexBy(addresses, 'chainName');
            if (networkId === undefined) {
                const chainNames = Object.keys(addressesByChainName);
                const chains = chainNames.join(', ');
                throw new errors.ArgumentsRequired(this.id + ' fetchDepositAddress() returned more than one address, a chainName parameter is required, one of ' + chains);
            }
            address = this.safeDict(addressesByChainName, networkId, {});
        }
        else {
            // first address
            address = this.safeDict(addresses, 0, {});
        }
        const result = this.parseDepositAddress(address, currency);
        return this.extend(result, {
            'info': response,
        });
    }
    /**
     * @method
     * @name ascendex#fetchDeposits
     * @description fetch all deposits made to an account
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch deposits for
     * @param {int} [limit] the maximum number of deposits structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchDeposits(code = undefined, since = undefined, limit = undefined, params = {}) {
        const request = {
            'txType': 'deposit',
        };
        return await this.fetchTransactions(code, since, limit, this.extend(request, params));
    }
    /**
     * @method
     * @name ascendex#fetchWithdrawals
     * @description fetch all withdrawals made from an account
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch withdrawals for
     * @param {int} [limit] the maximum number of withdrawals structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchWithdrawals(code = undefined, since = undefined, limit = undefined, params = {}) {
        const request = {
            'txType': 'withdrawal',
        };
        return await this.fetchTransactions(code, since, limit, this.extend(request, params));
    }
    /**
     * @method
     * @name ascendex#fetchDepositsWithdrawals
     * @description fetch history of deposits and withdrawals
     * @param {string} [code] unified currency code for the currency of the deposit/withdrawals, default is undefined
     * @param {int} [since] timestamp in ms of the earliest deposit/withdrawal, default is undefined
     * @param {int} [limit] max number of deposit/withdrawals to return, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchDepositsWithdrawals(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const request = {
        // 'asset': currency['id'],
        // 'page': 1,
        // 'pageSize': 20,
        // 'startTs': this.milliseconds (),
        // 'endTs': this.milliseconds (),
        // 'txType': undefned, // deposit, withdrawal
        };
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
            request['asset'] = currency['id'];
        }
        if (since !== undefined) {
            request['startTs'] = since;
        }
        if (limit !== undefined) {
            request['pageSize'] = limit;
        }
        const response = await this.v1PrivateGetWalletTransactions(this.extend(request, params));
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "data": [
        //                 {
        //                     "requestId": "wuzd1Ojsqtz4bCA3UXwtUnnJDmU8PiyB",
        //                     "time": 1591606166000,
        //                     "asset": "USDT",
        //                     "transactionType": "deposit",
        //                     "amount": "25",
        //                     "commission": "0",
        //                     "networkTransactionId": "0xbc4eabdce92f14dbcc01d799a5f8ca1f02f4a3a804b6350ea202be4d3c738fce",
        //                     "status": "pending",
        //                     "numConfirmed": 8,
        //                     "numConfirmations": 20,
        //                     "destAddress": { address: "0xe7c70b4e73b6b450ee46c3b5c0f5fb127ca55722" }
        //                 }
        //             ],
        //             "page": 1,
        //             "pageSize": 20,
        //             "hasNext": false
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const transactions = this.safeList(data, 'data', []);
        return this.parseTransactions(transactions, currency, since, limit);
    }
    parseTransactionStatus(status) {
        const statuses = {
            'reviewing': 'pending',
            'pending': 'pending',
            'confirmed': 'ok',
            'rejected': 'rejected',
        };
        return this.safeString(statuses, status, status);
    }
    parseTransaction(transaction, currency = undefined) {
        //
        //     {
        //         "requestId": "wuzd1Ojsqtz4bCA3UXwtUnnJDmU8PiyB",
        //         "time": 1591606166000,
        //         "asset": "USDT",
        //         "transactionType": "deposit",
        //         "amount": "25",
        //         "commission": "0",
        //         "networkTransactionId": "0xbc4eabdce92f14dbcc01d799a5f8ca1f02f4a3a804b6350ea202be4d3c738fce",
        //         "status": "pending",
        //         "numConfirmed": 8,
        //         "numConfirmations": 20,
        //         "destAddress": {
        //             "address": "0xe7c70b4e73b6b450ee46c3b5c0f5fb127ca55722",
        //             "destTag": "..." // for currencies that have it
        //         }
        //     }
        //
        const destAddress = this.safeDict(transaction, 'destAddress', {});
        const address = this.safeString(destAddress, 'address');
        const tag = this.safeString(destAddress, 'destTag');
        const timestamp = this.safeInteger(transaction, 'time');
        const currencyId = this.safeString(transaction, 'asset');
        let amountString = this.safeString(transaction, 'amount');
        const feeCostString = this.safeString(transaction, 'commission');
        amountString = Precise["default"].stringSub(amountString, feeCostString);
        const code = this.safeCurrencyCode(currencyId, currency);
        return {
            'info': transaction,
            'id': this.safeString(transaction, 'requestId'),
            'txid': this.safeString(transaction, 'networkTransactionId'),
            'type': this.safeString(transaction, 'transactionType'),
            'currency': code,
            'network': undefined,
            'amount': this.parseNumber(amountString),
            'status': this.parseTransactionStatus(this.safeString(transaction, 'status')),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'address': address,
            'addressFrom': undefined,
            'addressTo': address,
            'tag': tag,
            'tagFrom': undefined,
            'tagTo': tag,
            'updated': undefined,
            'comment': undefined,
            'fee': {
                'currency': code,
                'cost': this.parseNumber(feeCostString),
                'rate': undefined,
            },
            'internal': false,
        };
    }
    /**
     * @method
     * @name ascendex#fetchPositions
     * @description fetch all open positions
     * @param {string[]|undefined} symbols list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
     */
    async fetchPositions(symbols = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
        };
        const response = await this.v2PrivateAccountGroupGetFuturesPosition(this.extend(request, params));
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "ac": "FUTURES",
        //             "collaterals": [
        //                 {
        //                     "asset": "USDT",
        //                     "balance": "44.570287262",
        //                     "referencePrice": "1",
        //                     "discountFactor": "1"
        //                 }
        //             ],
        //             "contracts": [
        //                 {
        //                     "symbol": "BTC-PERP",
        //                     "side": "LONG",
        //                     "position": "0.0001",
        //                     "referenceCost": "-3.12277254",
        //                     "unrealizedPnl": "-0.001700233",
        //                     "realizedPnl": "0",
        //                     "avgOpenPrice": "31209",
        //                     "marginType": "isolated",
        //                     "isolatedMargin": "1.654972977",
        //                     "leverage": "2",
        //                     "takeProfitPrice": "0",
        //                     "takeProfitTrigger": "market",
        //                     "stopLossPrice": "0",
        //                     "stopLossTrigger": "market",
        //                     "buyOpenOrderNotional": "0",
        //                     "sellOpenOrderNotional": "0",
        //                     "markPrice": "31210.723063672",
        //                     "indexPrice": "31223.148857925"
        //                 },
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const position = this.safeList(data, 'contracts', []);
        const result = [];
        for (let i = 0; i < position.length; i++) {
            result.push(this.parsePosition(position[i]));
        }
        symbols = this.marketSymbols(symbols);
        return this.filterByArrayPositions(result, 'symbol', symbols, false);
    }
    parsePosition(position, market = undefined) {
        //
        //     {
        //         "symbol": "BTC-PERP",
        //         "side": "LONG",
        //         "position": "0.0001",
        //         "referenceCost": "-3.12277254",
        //         "unrealizedPnl": "-0.001700233",
        //         "realizedPnl": "0",
        //         "avgOpenPrice": "31209",
        //         "marginType": "isolated",
        //         "isolatedMargin": "1.654972977",
        //         "leverage": "2",
        //         "takeProfitPrice": "0",
        //         "takeProfitTrigger": "market",
        //         "stopLossPrice": "0",
        //         "stopLossTrigger": "market",
        //         "buyOpenOrderNotional": "0",
        //         "sellOpenOrderNotional": "0",
        //         "markPrice": "31210.723063672",
        //         "indexPrice": "31223.148857925"
        //     },
        //
        const marketId = this.safeString(position, 'symbol');
        market = this.safeMarket(marketId, market);
        let notional = this.safeString(position, 'buyOpenOrderNotional');
        if (Precise["default"].stringEq(notional, '0')) {
            notional = this.safeString(position, 'sellOpenOrderNotional');
        }
        const marginType = this.safeString(position, 'marginType');
        const marginMode = (marginType === 'crossed') ? 'cross' : 'isolated';
        let collateral = undefined;
        if (marginMode === 'isolated') {
            collateral = this.safeString(position, 'isolatedMargin');
        }
        return this.safePosition({
            'info': position,
            'id': undefined,
            'symbol': market['symbol'],
            'notional': this.parseNumber(notional),
            'marginMode': marginMode,
            'liquidationPrice': undefined,
            'entryPrice': this.safeNumber(position, 'avgOpenPrice'),
            'unrealizedPnl': this.safeNumber(position, 'unrealizedPnl'),
            'percentage': undefined,
            'contracts': this.safeNumber(position, 'position'),
            'contractSize': this.safeNumber(market, 'contractSize'),
            'markPrice': this.safeNumber(position, 'markPrice'),
            'lastPrice': undefined,
            'side': this.safeStringLower(position, 'side'),
            'hedged': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'lastUpdateTimestamp': undefined,
            'maintenanceMargin': undefined,
            'maintenanceMarginPercentage': undefined,
            'collateral': collateral,
            'initialMargin': undefined,
            'initialMarginPercentage': undefined,
            'leverage': this.safeInteger(position, 'leverage'),
            'marginRatio': undefined,
            'stopLossPrice': this.safeNumber(position, 'stopLossPrice'),
            'takeProfitPrice': this.safeNumber(position, 'takeProfitPrice'),
        });
    }
    parseFundingRate(contract, market = undefined) {
        //
        //      {
        //          "time": 1640061364830,
        //          "symbol": "EOS-PERP",
        //          "markPrice": "3.353854865",
        //          "indexPrice": "3.3542",
        //          "openInterest": "14242",
        //          "fundingRate": "-0.000073026",
        //          "nextFundingTime": 1640073600000
        //      }
        //
        const marketId = this.safeString(contract, 'symbol');
        const symbol = this.safeSymbol(marketId, market);
        const currentTime = this.safeInteger(contract, 'time');
        const nextFundingRate = this.safeNumber(contract, 'fundingRate');
        const nextFundingRateTimestamp = this.safeInteger(contract, 'nextFundingTime');
        return {
            'info': contract,
            'symbol': symbol,
            'markPrice': this.safeNumber(contract, 'markPrice'),
            'indexPrice': this.safeNumber(contract, 'indexPrice'),
            'interestRate': this.parseNumber('0'),
            'estimatedSettlePrice': undefined,
            'timestamp': currentTime,
            'datetime': this.iso8601(currentTime),
            'previousFundingRate': undefined,
            'nextFundingRate': undefined,
            'previousFundingTimestamp': undefined,
            'nextFundingTimestamp': undefined,
            'previousFundingDatetime': undefined,
            'nextFundingDatetime': undefined,
            'fundingRate': nextFundingRate,
            'fundingTimestamp': nextFundingRateTimestamp,
            'fundingDatetime': this.iso8601(nextFundingRateTimestamp),
            'interval': undefined,
        };
    }
    /**
     * @method
     * @name ascendex#fetchFundingRates
     * @description fetch the funding rate for multiple markets
     * @param {string[]|undefined} symbols list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [funding rates structures]{@link https://docs.ccxt.com/#/?id=funding-rates-structure}, indexe by market symbols
     */
    async fetchFundingRates(symbols = undefined, params = {}) {
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols);
        const response = await this.v2PublicGetFuturesPricingData(params);
        //
        //     {
        //          "code": 0,
        //          "data": {
        //              "contracts": [
        //                  {
        //                      "time": 1640061364830,
        //                      "symbol": "EOS-PERP",
        //                      "markPrice": "3.353854865",
        //                      "indexPrice": "3.3542",
        //                      "openInterest": "14242",
        //                      "fundingRate": "-0.000073026",
        //                      "nextFundingTime": 1640073600000
        //                  },
        //              ],
        //              "collaterals": [
        //                  {
        //                      "asset": "USDTR",
        //                      "referencePrice": "1"
        //                  },
        //              ]
        //          }
        //      }
        //
        const data = this.safeDict(response, 'data', {});
        const contracts = this.safeList(data, 'contracts', []);
        return this.parseFundingRates(contracts, symbols);
    }
    async modifyMarginHelper(symbol, amount, type, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        const market = this.market(symbol);
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        amount = this.amountToPrecision(symbol, amount);
        const request = {
            'account-group': accountGroup,
            'symbol': market['id'],
            'amount': amount, // positive value for adding margin, negative for reducing
        };
        const response = await this.v2PrivateAccountGroupPostFuturesIsolatedPositionMargin(this.extend(request, params));
        //
        // Can only change margin for perpetual futures isolated margin positions
        //
        //     {
        //          "code": 0
        //     }
        //
        if (type === 'reduce') {
            amount = Precise["default"].stringAbs(amount);
        }
        return this.extend(this.parseMarginModification(response, market), {
            'amount': this.parseNumber(amount),
            'type': type,
        });
    }
    parseMarginModification(data, market = undefined) {
        //
        // addMargin/reduceMargin
        //
        //     {
        //          "code": 0
        //     }
        //
        const errorCode = this.safeString(data, 'code');
        const status = (errorCode === '0') ? 'ok' : 'failed';
        return {
            'info': data,
            'symbol': market['symbol'],
            'type': undefined,
            'marginMode': 'isolated',
            'amount': undefined,
            'total': undefined,
            'code': market['quote'],
            'status': status,
            'timestamp': undefined,
            'datetime': undefined,
        };
    }
    /**
     * @method
     * @name ascendex#reduceMargin
     * @description remove margin from a position
     * @param {string} symbol unified market symbol
     * @param {float} amount the amount of margin to remove
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [margin structure]{@link https://docs.ccxt.com/#/?id=reduce-margin-structure}
     */
    async reduceMargin(symbol, amount, params = {}) {
        return await this.modifyMarginHelper(symbol, -amount, 'reduce', params);
    }
    /**
     * @method
     * @name ascendex#addMargin
     * @description add margin
     * @param {string} symbol unified market symbol
     * @param {float} amount amount of margin to add
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [margin structure]{@link https://docs.ccxt.com/#/?id=add-margin-structure}
     */
    async addMargin(symbol, amount, params = {}) {
        return await this.modifyMarginHelper(symbol, amount, 'add', params);
    }
    /**
     * @method
     * @name ascendex#setLeverage
     * @description set the level of leverage for a market
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#change-contract-leverage
     * @param {float} leverage the rate of leverage
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} response from the exchange
     */
    async setLeverage(leverage, symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setLeverage() requires a symbol argument');
        }
        if ((leverage < 1) || (leverage > 100)) {
            throw new errors.BadRequest(this.id + ' leverage should be between 1 and 100');
        }
        await this.loadMarkets();
        await this.loadAccounts();
        const market = this.market(symbol);
        if (!market['swap']) {
            throw new errors.BadSymbol(this.id + ' setLeverage() supports swap contracts only');
        }
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
            'symbol': market['id'],
            'leverage': leverage,
        };
        return await this.v2PrivateAccountGroupPostFuturesLeverage(this.extend(request, params));
    }
    /**
     * @method
     * @name ascendex#setMarginMode
     * @description set margin mode to 'cross' or 'isolated'
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#change-margin-type
     * @param {string} marginMode 'cross' or 'isolated'
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} response from the exchange
     */
    async setMarginMode(marginMode, symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setMarginMode() requires a symbol argument');
        }
        marginMode = marginMode.toLowerCase();
        if (marginMode === 'cross') {
            marginMode = 'crossed';
        }
        if (marginMode !== 'isolated' && marginMode !== 'crossed') {
            throw new errors.BadRequest(this.id + ' setMarginMode() marginMode argument should be isolated or cross');
        }
        await this.loadMarkets();
        await this.loadAccounts();
        const market = this.market(symbol);
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
            'symbol': market['id'],
            'marginType': marginMode,
        };
        if (!market['swap']) {
            throw new errors.BadSymbol(this.id + ' setMarginMode() supports swap contracts only');
        }
        return await this.v2PrivateAccountGroupPostFuturesMarginType(this.extend(request, params));
    }
    /**
     * @method
     * @name ascendex#fetchLeverageTiers
     * @description retrieve information on the maximum leverage, and maintenance margin for trades of varying trade sizes
     * @param {string[]|undefined} symbols list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [leverage tiers structures]{@link https://docs.ccxt.com/#/?id=leverage-tiers-structure}, indexed by market symbols
     */
    async fetchLeverageTiers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.v2PublicGetFuturesContract(params);
        //
        //     {
        //         "code":0,
        //         "data":[
        //             {
        //                 "symbol":"BTC-PERP",
        //                 "status":"Normal",
        //                 "displayName":"BTCUSDT",
        //                 "settlementAsset":"USDT",
        //                 "underlying":"BTC/USDT",
        //                 "tradingStartTime":1579701600000,
        //                 "priceFilter":{"minPrice":"1","maxPrice":"1000000","tickSize":"1"},
        //                 "lotSizeFilter":{"minQty":"0.0001","maxQty":"1000000000","lotSize":"0.0001"},
        //                 "commissionType":"Quote",
        //                 "commissionReserveRate":"0.001",
        //                 "marketOrderPriceMarkup":"0.03",
        //                 "marginRequirements":[
        //                     {"positionNotionalLowerBound":"0","positionNotionalUpperBound":"50000","initialMarginRate":"0.01","maintenanceMarginRate":"0.006"},
        //                     {"positionNotionalLowerBound":"50000","positionNotionalUpperBound":"200000","initialMarginRate":"0.02","maintenanceMarginRate":"0.012"},
        //                     {"positionNotionalLowerBound":"200000","positionNotionalUpperBound":"2000000","initialMarginRate":"0.04","maintenanceMarginRate":"0.024"},
        //                     {"positionNotionalLowerBound":"2000000","positionNotionalUpperBound":"20000000","initialMarginRate":"0.1","maintenanceMarginRate":"0.06"},
        //                     {"positionNotionalLowerBound":"20000000","positionNotionalUpperBound":"40000000","initialMarginRate":"0.2","maintenanceMarginRate":"0.12"},
        //                     {"positionNotionalLowerBound":"40000000","positionNotionalUpperBound":"1000000000","initialMarginRate":"0.333333","maintenanceMarginRate":"0.2"}
        //                 ]
        //             }
        //         ]
        //     }
        //
        const data = this.safeList(response, 'data', []);
        symbols = this.marketSymbols(symbols);
        return this.parseLeverageTiers(data, symbols, 'symbol');
    }
    parseMarketLeverageTiers(info, market = undefined) {
        /**
         * @param {object} info Exchange market response for 1 market
         * @param {object} market CCXT market
         */
        //
        //    {
        //        "symbol":"BTC-PERP",
        //        "status":"Normal",
        //        "displayName":"BTCUSDT",
        //        "settlementAsset":"USDT",
        //        "underlying":"BTC/USDT",
        //        "tradingStartTime":1579701600000,
        //        "priceFilter":{"minPrice":"1","maxPrice":"1000000","tickSize":"1"},
        //        "lotSizeFilter":{"minQty":"0.0001","maxQty":"1000000000","lotSize":"0.0001"},
        //        "commissionType":"Quote",
        //        "commissionReserveRate":"0.001",
        //        "marketOrderPriceMarkup":"0.03",
        //        "marginRequirements":[
        //            {"positionNotionalLowerBound":"0","positionNotionalUpperBound":"50000","initialMarginRate":"0.01","maintenanceMarginRate":"0.006"},
        //            {"positionNotionalLowerBound":"50000","positionNotionalUpperBound":"200000","initialMarginRate":"0.02","maintenanceMarginRate":"0.012"},
        //            {"positionNotionalLowerBound":"200000","positionNotionalUpperBound":"2000000","initialMarginRate":"0.04","maintenanceMarginRate":"0.024"},
        //            {"positionNotionalLowerBound":"2000000","positionNotionalUpperBound":"20000000","initialMarginRate":"0.1","maintenanceMarginRate":"0.06"},
        //            {"positionNotionalLowerBound":"20000000","positionNotionalUpperBound":"40000000","initialMarginRate":"0.2","maintenanceMarginRate":"0.12"},
        //            {"positionNotionalLowerBound":"40000000","positionNotionalUpperBound":"1000000000","initialMarginRate":"0.333333","maintenanceMarginRate":"0.2"}
        //        ]
        //    }
        //
        const marginRequirements = this.safeList(info, 'marginRequirements', []);
        const marketId = this.safeString(info, 'symbol');
        market = this.safeMarket(marketId, market);
        const tiers = [];
        for (let i = 0; i < marginRequirements.length; i++) {
            const tier = marginRequirements[i];
            const initialMarginRate = this.safeString(tier, 'initialMarginRate');
            tiers.push({
                'tier': this.sum(i, 1),
                'symbol': this.safeSymbol(marketId, market, undefined, 'contract'),
                'currency': market['quote'],
                'minNotional': this.safeNumber(tier, 'positionNotionalLowerBound'),
                'maxNotional': this.safeNumber(tier, 'positionNotionalUpperBound'),
                'maintenanceMarginRate': this.safeNumber(tier, 'maintenanceMarginRate'),
                'maxLeverage': this.parseNumber(Precise["default"].stringDiv('1', initialMarginRate)),
                'info': tier,
            });
        }
        return tiers;
    }
    parseDepositWithdrawFee(fee, currency = undefined) {
        //
        // {
        //     "assetCode":      "USDT",
        //     "assetName":      "Tether",
        //     "precisionScale":  9,
        //     "nativeScale":     4,
        //     "blockChain": [
        //         {
        //             "chainName":        "Omni",
        //             "withdrawFee":      "30.0",
        //             "allowDeposit":      true,
        //             "allowWithdraw":     true,
        //             "minDepositAmt":    "0.0",
        //             "minWithdrawal":    "50.0",
        //             "numConfirmations":  3
        //         },
        //     ]
        // }
        //
        const blockChains = this.safeList(fee, 'blockChain', []);
        const blockChainsLength = blockChains.length;
        const result = {
            'info': fee,
            'withdraw': {
                'fee': undefined,
                'percentage': undefined,
            },
            'deposit': {
                'fee': undefined,
                'percentage': undefined,
            },
            'networks': {},
        };
        for (let i = 0; i < blockChainsLength; i++) {
            const blockChain = blockChains[i];
            const networkId = this.safeString(blockChain, 'chainName');
            const currencyCode = this.safeString(currency, 'code');
            const networkCode = this.networkIdToCode(networkId, currencyCode);
            result['networks'][networkCode] = {
                'deposit': { 'fee': undefined, 'percentage': undefined },
                'withdraw': { 'fee': this.safeNumber(blockChain, 'withdrawFee'), 'percentage': false },
            };
            if (blockChainsLength === 1) {
                result['withdraw']['fee'] = this.safeNumber(blockChain, 'withdrawFee');
                result['withdraw']['percentage'] = false;
            }
        }
        return result;
    }
    /**
     * @method
     * @name ascendex#fetchDepositWithdrawFees
     * @description fetch deposit and withdraw fees
     * @see https://ascendex.github.io/ascendex-pro-api/#list-all-assets
     * @param {string[]|undefined} codes list of unified currency codes
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure}
     */
    async fetchDepositWithdrawFees(codes = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.v2PublicGetAssets(params);
        const data = this.safeList(response, 'data');
        return this.parseDepositWithdrawFees(data, codes, 'assetCode');
    }
    /**
     * @method
     * @name ascendex#transfer
     * @description transfer currency internally between wallets on the same account
     * @param {string} code unified currency codeåå
     * @param {float} amount amount to transfer
     * @param {string} fromAccount account to transfer from
     * @param {string} toAccount account to transfer to
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
     */
    async transfer(code, amount, fromAccount, toAccount, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const currency = this.currency(code);
        const accountsByType = this.safeDict(this.options, 'accountsByType', {});
        const fromId = this.safeString(accountsByType, fromAccount, fromAccount);
        const toId = this.safeString(accountsByType, toAccount, toAccount);
        if (fromId !== 'cash' && toId !== 'cash') {
            throw new errors.ExchangeError(this.id + ' transfer() only supports direct balance transfer between spot and swap, spot and margin');
        }
        const request = {
            'account-group': accountGroup,
            'amount': this.currencyToPrecision(code, amount),
            'asset': currency['id'],
            'fromAccount': fromId,
            'toAccount': toId,
        };
        const response = await this.v1PrivateAccountGroupPostTransfer(this.extend(request, params));
        //
        //    { "code": "0" }
        //
        const transferOptions = this.safeDict(this.options, 'transfer', {});
        const fillResponseFromRequest = this.safeBool(transferOptions, 'fillResponseFromRequest', true);
        const transfer = this.parseTransfer(response, currency);
        if (fillResponseFromRequest) {
            transfer['fromAccount'] = fromAccount;
            transfer['toAccount'] = toAccount;
            transfer['amount'] = amount;
            transfer['currency'] = code;
        }
        return transfer;
    }
    parseTransfer(transfer, currency = undefined) {
        //
        //    { "code": "0" }
        //
        const status = this.safeString(transfer, 'code');
        const currencyCode = this.safeCurrencyCode(undefined, currency);
        return {
            'info': transfer,
            'id': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'currency': currencyCode,
            'amount': undefined,
            'fromAccount': undefined,
            'toAccount': undefined,
            'status': this.parseTransferStatus(status),
        };
    }
    parseTransferStatus(status) {
        if (status === '0') {
            return 'ok';
        }
        return 'failed';
    }
    /**
     * @method
     * @name ascendex#fetchFundingHistory
     * @description fetch the history of funding payments paid and received on this account
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#funding-payment-history
     * @param {string} [symbol] unified market symbol
     * @param {int} [since] the earliest time in ms to fetch funding history for
     * @param {int} [limit] the maximum number of funding history structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [available parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {object} a [funding history structure]{@link https://docs.ccxt.com/#/?id=funding-history-structure}
     */
    async fetchFundingHistory(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchFundingHistory', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallIncremental('fetchFundingHistory', symbol, since, limit, params, 'page', 25);
        }
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
        };
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        if (limit !== undefined) {
            request['pageSize'] = limit;
        }
        const response = await this.v2PrivateAccountGroupGetFuturesFundingPayments(this.extend(request, params));
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "data": [
        //                 {
        //                     "timestamp": 1640476800000,
        //                     "symbol": "BTC-PERP",
        //                     "paymentInUSDT": "-0.013991178",
        //                     "fundingRate": "0.000173497"
        //                 },
        //             ],
        //             "page": 1,
        //             "pageSize": 3,
        //             "hasNext": true
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const rows = this.safeList(data, 'data', []);
        return this.parseIncomes(rows, market, since, limit);
    }
    parseIncome(income, market = undefined) {
        //
        //     {
        //         "timestamp": 1640476800000,
        //         "symbol": "BTC-PERP",
        //         "paymentInUSDT": "-0.013991178",
        //         "fundingRate": "0.000173497"
        //     }
        //
        const marketId = this.safeString(income, 'symbol');
        const timestamp = this.safeInteger(income, 'timestamp');
        return {
            'info': income,
            'symbol': this.safeSymbol(marketId, market, '-', 'swap'),
            'code': 'USDT',
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'id': undefined,
            'amount': this.safeNumber(income, 'paymentInUSDT'),
        };
    }
    /**
     * @method
     * @name ascendex#fetchMarginModes
     * @description fetches the set margin mode of the user
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#position
     * @param {string[]} [symbols] a list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [margin mode structures]{@link https://docs.ccxt.com/#/?id=margin-mode-structure}
     */
    async fetchMarginModes(symbols = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
        };
        const response = await this.v2PrivateAccountGroupGetFuturesPosition(this.extend(request, params));
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "ac": "FUTURES",
        //             "collaterals": [
        //                 {
        //                     "asset": "USDT",
        //                     "balance": "44.570287262",
        //                     "referencePrice": "1",
        //                     "discountFactor": "1"
        //                 }
        //             ],
        //             "contracts": [
        //                 {
        //                     "symbol": "BTC-PERP",
        //                     "side": "LONG",
        //                     "position": "0.0001",
        //                     "referenceCost": "-3.12277254",
        //                     "unrealizedPnl": "-0.001700233",
        //                     "realizedPnl": "0",
        //                     "avgOpenPrice": "31209",
        //                     "marginType": "isolated",
        //                     "isolatedMargin": "1.654972977",
        //                     "leverage": "2",
        //                     "takeProfitPrice": "0",
        //                     "takeProfitTrigger": "market",
        //                     "stopLossPrice": "0",
        //                     "stopLossTrigger": "market",
        //                     "buyOpenOrderNotional": "0",
        //                     "sellOpenOrderNotional": "0",
        //                     "markPrice": "31210.723063672",
        //                     "indexPrice": "31223.148857925"
        //                 },
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const marginModes = this.safeList(data, 'contracts', []);
        return this.parseMarginModes(marginModes, symbols, 'symbol');
    }
    parseMarginMode(marginMode, market = undefined) {
        const marketId = this.safeString(marginMode, 'symbol');
        const marginType = this.safeString(marginMode, 'marginType');
        const margin = (marginType === 'crossed') ? 'cross' : 'isolated';
        return {
            'info': marginMode,
            'symbol': this.safeSymbol(marketId, market),
            'marginMode': margin,
        };
    }
    /**
     * @method
     * @name ascendex#fetchLeverages
     * @description fetch the set leverage for all contract markets
     * @see https://ascendex.github.io/ascendex-futures-pro-api-v2/#position
     * @param {string[]} [symbols] a list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [leverage structures]{@link https://docs.ccxt.com/#/?id=leverage-structure}
     */
    async fetchLeverages(symbols = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        const account = this.safeDict(this.accounts, 0, {});
        const accountGroup = this.safeString(account, 'id');
        const request = {
            'account-group': accountGroup,
        };
        const response = await this.v2PrivateAccountGroupGetFuturesPosition(this.extend(request, params));
        //
        //     {
        //         "code": 0,
        //         "data": {
        //             "accountId": "fut2ODPhGiY71Pl4vtXnOZ00ssgD7QGn",
        //             "ac": "FUTURES",
        //             "collaterals": [
        //                 {
        //                     "asset": "USDT",
        //                     "balance": "44.570287262",
        //                     "referencePrice": "1",
        //                     "discountFactor": "1"
        //                 }
        //             ],
        //             "contracts": [
        //                 {
        //                     "symbol": "BTC-PERP",
        //                     "side": "LONG",
        //                     "position": "0.0001",
        //                     "referenceCost": "-3.12277254",
        //                     "unrealizedPnl": "-0.001700233",
        //                     "realizedPnl": "0",
        //                     "avgOpenPrice": "31209",
        //                     "marginType": "isolated",
        //                     "isolatedMargin": "1.654972977",
        //                     "leverage": "2",
        //                     "takeProfitPrice": "0",
        //                     "takeProfitTrigger": "market",
        //                     "stopLossPrice": "0",
        //                     "stopLossTrigger": "market",
        //                     "buyOpenOrderNotional": "0",
        //                     "sellOpenOrderNotional": "0",
        //                     "markPrice": "31210.723063672",
        //                     "indexPrice": "31223.148857925"
        //                 },
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const leverages = this.safeList(data, 'contracts', []);
        return this.parseLeverages(leverages, symbols, 'symbol');
    }
    parseLeverage(leverage, market = undefined) {
        const marketId = this.safeString(leverage, 'symbol');
        const leverageValue = this.safeInteger(leverage, 'leverage');
        const marginType = this.safeString(leverage, 'marginType');
        const marginMode = (marginType === 'crossed') ? 'cross' : 'isolated';
        return {
            'info': leverage,
            'symbol': this.safeSymbol(marketId, market),
            'marginMode': marginMode,
            'longLeverage': leverageValue,
            'shortLeverage': leverageValue,
        };
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const version = api[0];
        const access = api[1];
        const type = this.safeString(api, 2);
        let url = '';
        const accountCategory = (type === 'accountCategory');
        if (accountCategory || (type === 'accountGroup')) {
            url += this.implodeParams('/{account-group}', params);
            params = this.omit(params, 'account-group');
        }
        let request = this.implodeParams(path, params);
        url += '/api/pro/';
        if (version === 'v2') {
            if (type === 'data') {
                request = 'data/' + version + '/' + request;
            }
            else {
                request = version + '/' + request;
            }
        }
        else {
            url += version + '/';
        }
        if (accountCategory) {
            url += this.implodeParams('{account-category}/', params);
        }
        params = this.omit(params, 'account-category');
        url += request;
        if ((version === 'v1') && (request === 'cash/balance') || (request === 'margin/balance')) {
            request = 'balance';
        }
        if ((version === 'v1') && (request === 'spot/fee')) {
            request = 'fee';
        }
        if (request.indexOf('subuser') >= 0) {
            const parts = request.split('/');
            request = parts[2];
        }
        params = this.omit(params, this.extractParams(path));
        if (access === 'public') {
            if (Object.keys(params).length) {
                url += '?' + this.urlencode(params);
            }
        }
        else {
            this.checkRequiredCredentials();
            const timestamp = this.milliseconds().toString();
            const payload = timestamp + '+' + request;
            const hmac = this.hmac(this.encode(payload), this.encode(this.secret), sha256.sha256, 'base64');
            headers = {
                'x-auth-key': this.apiKey,
                'x-auth-timestamp': timestamp,
                'x-auth-signature': hmac,
            };
            if (method === 'GET') {
                if (Object.keys(params).length) {
                    url += '?' + this.urlencode(params);
                }
            }
            else {
                headers['Content-Type'] = 'application/json';
                body = this.json(params);
            }
        }
        url = this.urls['api']['rest'] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
    handleErrors(httpCode, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return undefined; // fallback to default error handler
        }
        //
        //     {"code": 6010, "message": "Not enough balance."}
        //     {"code": 60060, "message": "The order is already filled or canceled."}
        //     {"code":2100,"message":"ApiKeyFailure"}
        //     {"code":300001,"message":"Price is too low from market price.","reason":"INVALID_PRICE","accountId":"cshrHKLZCjlZ2ejqkmvIHHtPmLYqdnda","ac":"CASH","action":"place-order","status":"Err","info":{"symbol":"BTC/USDT"}}
        //
        const code = this.safeString(response, 'code');
        const message = this.safeString(response, 'message');
        const error = (code !== undefined) && (code !== '0');
        if (error || (message !== undefined)) {
            const feedback = this.id + ' ' + body;
            this.throwExactlyMatchedException(this.exceptions['exact'], code, feedback);
            this.throwExactlyMatchedException(this.exceptions['exact'], message, feedback);
            this.throwBroadlyMatchedException(this.exceptions['broad'], message, feedback);
            throw new errors.ExchangeError(feedback); // unknown message
        }
        return undefined;
    }
}

module.exports = ascendex;
