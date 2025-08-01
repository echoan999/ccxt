'use strict';

var coinspot$1 = require('./abstract/coinspot.js');
var errors = require('./base/errors.js');
var number = require('./base/functions/number.js');
var sha512 = require('./static_dependencies/noble-hashes/sha512.js');
var Precise = require('./base/Precise.js');

// ----------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class coinspot
 * @augments Exchange
 */
class coinspot extends coinspot$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'coinspot',
            'name': 'CoinSpot',
            'countries': ['AU'],
            'rateLimit': 1000,
            'pro': false,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'addMargin': false,
                'borrowCrossMargin': false,
                'borrowIsolatedMargin': false,
                'borrowMargin': false,
                'cancelOrder': true,
                'closeAllPositions': false,
                'closePosition': false,
                'createMarketOrder': false,
                'createOrder': true,
                'createOrderWithTakeProfitAndStopLoss': false,
                'createOrderWithTakeProfitAndStopLossWs': false,
                'createPostOnlyOrder': false,
                'createReduceOnlyOrder': false,
                'createStopLimitOrder': false,
                'createStopMarketOrder': false,
                'createStopOrder': false,
                'fetchBalance': true,
                'fetchBorrowInterest': false,
                'fetchBorrowRate': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchBorrowRates': false,
                'fetchBorrowRatesPerSymbol': false,
                'fetchCrossBorrowRate': false,
                'fetchCrossBorrowRates': false,
                'fetchFundingHistory': false,
                'fetchFundingInterval': false,
                'fetchFundingIntervals': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchGreeks': false,
                'fetchIndexOHLCV': false,
                'fetchIsolatedBorrowRate': false,
                'fetchIsolatedBorrowRates': false,
                'fetchIsolatedPositions': false,
                'fetchLeverage': false,
                'fetchLeverages': false,
                'fetchLeverageTiers': false,
                'fetchLiquidations': false,
                'fetchLongShortRatio': false,
                'fetchLongShortRatioHistory': false,
                'fetchMarginAdjustmentHistory': false,
                'fetchMarginMode': false,
                'fetchMarginModes': false,
                'fetchMarketLeverageTiers': false,
                'fetchMarkOHLCV': false,
                'fetchMarkPrices': false,
                'fetchMyLiquidations': false,
                'fetchMySettlementHistory': false,
                'fetchMyTrades': true,
                'fetchOpenInterest': false,
                'fetchOpenInterestHistory': false,
                'fetchOpenInterests': false,
                'fetchOption': false,
                'fetchOptionChain': false,
                'fetchOrderBook': true,
                'fetchPosition': false,
                'fetchPositionHistory': false,
                'fetchPositionMode': false,
                'fetchPositions': false,
                'fetchPositionsForSymbol': false,
                'fetchPositionsHistory': false,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchSettlementHistory': false,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': false,
                'fetchVolatilityHistory': false,
                'reduceMargin': false,
                'repayCrossMargin': false,
                'repayIsolatedMargin': false,
                'repayMargin': false,
                'setLeverage': false,
                'setMargin': false,
                'setMarginMode': false,
                'setPositionMode': false,
                'ws': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28208429-3cacdf9a-6896-11e7-854e-4c79a772a30f.jpg',
                'api': {
                    'public': 'https://www.coinspot.com.au/pubapi',
                    'private': 'https://www.coinspot.com.au/api',
                },
                'www': 'https://www.coinspot.com.au',
                'doc': 'https://www.coinspot.com.au/api',
                'referral': 'https://www.coinspot.com.au/register?code=PJURCU',
            },
            'api': {
                'public': {
                    'get': [
                        'latest',
                    ],
                },
                'private': {
                    'post': [
                        'orders',
                        'orders/history',
                        'my/coin/deposit',
                        'my/coin/send',
                        'quote/buy',
                        'quote/sell',
                        'my/balances',
                        'my/orders',
                        'my/buy',
                        'my/sell',
                        'my/buy/cancel',
                        'my/sell/cancel',
                        'ro/my/balances',
                        'ro/my/balances/{cointype}',
                        'ro/my/deposits',
                        'ro/my/withdrawals',
                        'ro/my/transactions',
                        'ro/my/transactions/{cointype}',
                        'ro/my/transactions/open',
                        'ro/my/transactions/{cointype}/open',
                        'ro/my/sendreceive',
                        'ro/my/affiliatepayments',
                        'ro/my/referralpayments',
                    ],
                },
            },
            'markets': {
                'ADA/AUD': this.safeMarketStructure({ 'id': 'ada', 'symbol': 'ADA/AUD', 'base': 'ADA', 'quote': 'AUD', 'baseId': 'ada', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'BTC/AUD': this.safeMarketStructure({ 'id': 'btc', 'symbol': 'BTC/AUD', 'base': 'BTC', 'quote': 'AUD', 'baseId': 'btc', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'ETH/AUD': this.safeMarketStructure({ 'id': 'eth', 'symbol': 'ETH/AUD', 'base': 'ETH', 'quote': 'AUD', 'baseId': 'eth', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'XRP/AUD': this.safeMarketStructure({ 'id': 'xrp', 'symbol': 'XRP/AUD', 'base': 'XRP', 'quote': 'AUD', 'baseId': 'xrp', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'LTC/AUD': this.safeMarketStructure({ 'id': 'ltc', 'symbol': 'LTC/AUD', 'base': 'LTC', 'quote': 'AUD', 'baseId': 'ltc', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'DOGE/AUD': this.safeMarketStructure({ 'id': 'doge', 'symbol': 'DOGE/AUD', 'base': 'DOGE', 'quote': 'AUD', 'baseId': 'doge', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'RFOX/AUD': this.safeMarketStructure({ 'id': 'rfox', 'symbol': 'RFOX/AUD', 'base': 'RFOX', 'quote': 'AUD', 'baseId': 'rfox', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'POWR/AUD': this.safeMarketStructure({ 'id': 'powr', 'symbol': 'POWR/AUD', 'base': 'POWR', 'quote': 'AUD', 'baseId': 'powr', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'NEO/AUD': this.safeMarketStructure({ 'id': 'neo', 'symbol': 'NEO/AUD', 'base': 'NEO', 'quote': 'AUD', 'baseId': 'neo', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'TRX/AUD': this.safeMarketStructure({ 'id': 'trx', 'symbol': 'TRX/AUD', 'base': 'TRX', 'quote': 'AUD', 'baseId': 'trx', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'EOS/AUD': this.safeMarketStructure({ 'id': 'eos', 'symbol': 'EOS/AUD', 'base': 'EOS', 'quote': 'AUD', 'baseId': 'eos', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'XLM/AUD': this.safeMarketStructure({ 'id': 'xlm', 'symbol': 'XLM/AUD', 'base': 'XLM', 'quote': 'AUD', 'baseId': 'xlm', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'RHOC/AUD': this.safeMarketStructure({ 'id': 'rhoc', 'symbol': 'RHOC/AUD', 'base': 'RHOC', 'quote': 'AUD', 'baseId': 'rhoc', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
                'GAS/AUD': this.safeMarketStructure({ 'id': 'gas', 'symbol': 'GAS/AUD', 'base': 'GAS', 'quote': 'AUD', 'baseId': 'gas', 'quoteId': 'aud', 'type': 'spot', 'spot': true }),
            },
            'commonCurrencies': {
                'DRK': 'DASH',
            },
            'options': {
                'fetchBalance': 'private_post_my_balances',
            },
            'features': {
                'spot': {
                    'sandbox': false,
                    'createOrder': {
                        'marginMode': false,
                        'triggerPrice': false,
                        'triggerPriceType': undefined,
                        'triggerDirection': false,
                        'stopLossPrice': false,
                        'takeProfitPrice': false,
                        'attachedStopLossTakeProfit': undefined,
                        'timeInForce': {
                            'IOC': false,
                            'FOK': false,
                            'PO': false,
                            'GTD': false,
                        },
                        'hedged': false,
                        'trailing': false,
                        'leverage': false,
                        'marketBuyByCost': false,
                        'marketBuyRequiresPrice': false,
                        'selfTradePrevention': false,
                        'iceberg': false,
                    },
                    'createOrders': undefined,
                    'fetchMyTrades': {
                        'marginMode': false,
                        'limit': undefined,
                        'daysBack': 100000,
                        'untilDays': 100000,
                        'symbolRequired': false,
                    },
                    'fetchOrder': undefined,
                    'fetchOpenOrders': undefined,
                    'fetchOrders': undefined,
                    'fetchClosedOrders': undefined,
                    'fetchOHLCV': undefined,
                },
                'swap': {
                    'linear': undefined,
                    'inverse': undefined,
                },
                'future': {
                    'linear': undefined,
                    'inverse': undefined,
                },
            },
            'precisionMode': number.TICK_SIZE,
        });
    }
    parseBalance(response) {
        const result = { 'info': response };
        const balances = this.safeValue2(response, 'balance', 'balances');
        if (Array.isArray(balances)) {
            for (let i = 0; i < balances.length; i++) {
                const currencies = balances[i];
                const currencyIds = Object.keys(currencies);
                for (let j = 0; j < currencyIds.length; j++) {
                    const currencyId = currencyIds[j];
                    const balance = currencies[currencyId];
                    const code = this.safeCurrencyCode(currencyId);
                    const account = this.account();
                    account['total'] = this.safeString(balance, 'balance');
                    result[code] = account;
                }
            }
        }
        else {
            const currencyIds = Object.keys(balances);
            for (let i = 0; i < currencyIds.length; i++) {
                const currencyId = currencyIds[i];
                const code = this.safeCurrencyCode(currencyId);
                const account = this.account();
                account['total'] = this.safeString(balances, currencyId);
                result[code] = account;
            }
        }
        return this.safeBalance(result);
    }
    /**
     * @method
     * @name coinspot#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @see https://www.coinspot.com.au/api#listmybalance
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    async fetchBalance(params = {}) {
        await this.loadMarkets();
        const method = this.safeString(this.options, 'fetchBalance', 'private_post_my_balances');
        const response = await this[method](params);
        //
        // read-write api keys
        //
        //     ...
        //
        // read-only api keys
        //
        //     {
        //         "status":"ok",
        //         "balances":[
        //             {
        //                 "LTC":{"balance":0.1,"audbalance":16.59,"rate":165.95}
        //             }
        //         ]
        //     }
        //
        return this.parseBalance(response);
    }
    /**
     * @method
     * @name coinspot#fetchOrderBook
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://www.coinspot.com.au/api#listopenorders
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'cointype': market['id'],
        };
        const orderbook = await this.privatePostOrders(this.extend(request, params));
        return this.parseOrderBook(orderbook, market['symbol'], undefined, 'buyorders', 'sellorders', 'rate', 'amount');
    }
    parseTicker(ticker, market = undefined) {
        //
        //     {
        //         "btc":{
        //             "bid":"51970",
        //             "ask":"53000",
        //             "last":"52806.47"
        //         }
        //     }
        //
        const symbol = this.safeSymbol(undefined, market);
        const last = this.safeString(ticker, 'last');
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': undefined,
            'datetime': undefined,
            'high': undefined,
            'low': undefined,
            'bid': this.safeString(ticker, 'bid'),
            'bidVolume': undefined,
            'ask': this.safeString(ticker, 'ask'),
            'askVolume': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': undefined,
            'quoteVolume': undefined,
            'info': ticker,
        }, market);
    }
    /**
     * @method
     * @name coinspot#fetchTicker
     * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://www.coinspot.com.au/api#latestprices
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTicker(symbol, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const response = await this.publicGetLatest(params);
        let id = market['id'];
        id = id.toLowerCase();
        const prices = this.safeDict(response, 'prices', {});
        //
        //     {
        //         "status":"ok",
        //         "prices":{
        //             "btc":{
        //                 "bid":"52732.47000022",
        //                 "ask":"53268.0699976",
        //                 "last":"53284.03"
        //             }
        //         }
        //     }
        //
        const ticker = this.safeDict(prices, id);
        return this.parseTicker(ticker, market);
    }
    /**
     * @method
     * @name coinspot#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://www.coinspot.com.au/api#latestprices
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTickers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.publicGetLatest(params);
        //
        //    {
        //        "status": "ok",
        //        "prices":   {
        //            "btc":   {
        //                "bid": "25050",
        //                "ask": "25370",
        //                "last": "25234"
        //            },
        //            "ltc":   {
        //                "bid": "79.39192993",
        //                "ask": "87.98",
        //                "last": "87.95"
        //            }
        //        }
        //    }
        //
        const result = {};
        const prices = this.safeDict(response, 'prices', {});
        const ids = Object.keys(prices);
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const market = this.safeMarket(id);
            if (market['spot']) {
                const symbol = market['symbol'];
                const ticker = prices[id];
                result[symbol] = this.parseTicker(ticker, market);
            }
        }
        return this.filterByArrayTickers(result, 'symbol', symbols);
    }
    /**
     * @method
     * @name coinspot#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://www.coinspot.com.au/api#orderhistory
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
            'cointype': market['id'],
        };
        const response = await this.privatePostOrdersHistory(this.extend(request, params));
        //
        //     {
        //         "status":"ok",
        //         "orders":[
        //             {"amount":0.00102091,"rate":21549.09999991,"total":21.99969168,"coin":"BTC","solddate":1604890646143,"market":"BTC/AUD"},
        //         ],
        //     }
        //
        const trades = this.safeList(response, 'orders', []);
        return this.parseTrades(trades, market, since, limit);
    }
    /**
     * @method
     * @name coinspot#fetchMyTrades
     * @description fetch all trades made by the user
     * @see https://www.coinspot.com.au/api#rotransaction
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        if (since !== undefined) {
            request['startdate'] = this.yyyymmdd(since);
        }
        const response = await this.privatePostRoMyTransactions(this.extend(request, params));
        //  {
        //      "status": "ok",
        //      "buyorders": [
        //          {
        //              "otc": false,
        //              "market": "ALGO/AUD",
        //              "amount": 386.95197925,
        //              "created": "2022-10-20T09:56:44.502Z",
        //              "audfeeExGst": 1.80018002,
        //              "audGst": 0.180018,
        //              "audtotal": 200
        //          },
        //      ],
        //      "sellorders": [
        //          {
        //              "otc": false,
        //              "market": "SOLO/ALGO",
        //              "amount": 154.52345614,
        //              "total": 115.78858204658796,
        //              "created": "2022-04-16T09:36:43.698Z",
        //              "audfeeExGst": 1.08995731,
        //              "audGst": 0.10899573,
        //              "audtotal": 118.7
        //          },
        //      ]
        // }
        const buyTrades = this.safeList(response, 'buyorders', []);
        for (let i = 0; i < buyTrades.length; i++) {
            buyTrades[i]['side'] = 'buy';
        }
        const sellTrades = this.safeList(response, 'sellorders', []);
        for (let i = 0; i < sellTrades.length; i++) {
            sellTrades[i]['side'] = 'sell';
        }
        const trades = this.arrayConcat(buyTrades, sellTrades);
        return this.parseTrades(trades, market, since, limit);
    }
    parseTrade(trade, market = undefined) {
        //
        // public fetchTrades
        //
        //     {
        //         "amount":0.00102091,
        //         "rate":21549.09999991,
        //         "total":21.99969168,
        //         "coin":"BTC",
        //         "solddate":1604890646143,
        //         "market":"BTC/AUD"
        //     }
        //
        // private fetchMyTrades
        //     {
        //       "otc": false,
        //       "market": "ALGO/AUD",
        //       "amount": 386.95197925,
        //       "created": "2022-10-20T09:56:44.502Z",
        //       "audfeeExGst": 1.80018002,
        //       "audGst": 0.180018,
        //       "audtotal": 200,
        //       "total": 200,
        //       "side": "buy",
        //       "price": 0.5168600000125209
        //     }
        let timestamp = undefined;
        let priceString = undefined;
        let fee = undefined;
        const audTotal = this.safeString(trade, 'audtotal');
        const costString = this.safeString(trade, 'total', audTotal);
        const side = this.safeString(trade, 'side');
        const amountString = this.safeString(trade, 'amount');
        const marketId = this.safeString(trade, 'market');
        const symbol = this.safeSymbol(marketId, market, '/');
        const solddate = this.safeInteger(trade, 'solddate');
        if (solddate !== undefined) {
            priceString = this.safeString(trade, 'rate');
            timestamp = solddate;
        }
        else {
            priceString = Precise["default"].stringDiv(costString, amountString);
            const createdString = this.safeString(trade, 'created');
            timestamp = this.parse8601(createdString);
            const audfeeExGst = this.safeString(trade, 'audfeeExGst');
            const audGst = this.safeString(trade, 'audGst');
            // The transaction fee which consumers pay is inclusive of GST by default
            const feeCost = Precise["default"].stringAdd(audfeeExGst, audGst);
            const feeCurrencyId = 'AUD';
            fee = {
                'cost': this.parseNumber(feeCost),
                'currency': this.safeCurrencyCode(feeCurrencyId),
            };
        }
        return this.safeTrade({
            'info': trade,
            'id': undefined,
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'order': undefined,
            'type': undefined,
            'side': side,
            'takerOrMaker': undefined,
            'price': this.parseNumber(priceString),
            'amount': this.parseNumber(amountString),
            'cost': this.parseNumber(costString),
            'fee': fee,
        }, market);
    }
    /**
     * @method
     * @name coinspot#createOrder
     * @description create a trade order
     * @see https://www.coinspot.com.au/api#placebuyorder
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} type must be 'limit'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount how much of currency you want to trade in units of base currency
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets();
        const method = 'privatePostMy' + this.capitalize(side);
        if (type === 'market') {
            throw new errors.ExchangeError(this.id + ' createOrder() allows limit orders only');
        }
        const market = this.market(symbol);
        const request = {
            'cointype': market['id'],
            'amount': amount,
            'rate': price,
        };
        const response = await this[method](this.extend(request, params));
        return this.parseOrder(response);
    }
    /**
     * @method
     * @name coinspot#cancelOrder
     * @description cancels an open order
     * @see https://www.coinspot.com.au/api#cancelbuyorder
     * @see https://www.coinspot.com.au/api#cancelsellorder
     * @param {string} id order id
     * @param {string} symbol not used by coinspot cancelOrder ()
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelOrder(id, symbol = undefined, params = {}) {
        const side = this.safeString(params, 'side');
        if (side !== 'buy' && side !== 'sell') {
            throw new errors.ArgumentsRequired(this.id + ' cancelOrder() requires a side parameter, "buy" or "sell"');
        }
        params = this.omit(params, 'side');
        const request = {
            'id': id,
        };
        let response = undefined;
        if (side === 'buy') {
            response = await this.privatePostMyBuyCancel(this.extend(request, params));
        }
        else {
            response = await this.privatePostMySellCancel(this.extend(request, params));
        }
        //
        // status - ok, error
        //
        return this.safeOrder({
            'info': response,
        });
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        const url = this.urls['api'][api] + '/' + path;
        if (api === 'private') {
            this.checkRequiredCredentials();
            const nonce = this.nonce();
            body = this.json(this.extend({ 'nonce': nonce }, params));
            headers = {
                'Content-Type': 'application/json',
                'key': this.apiKey,
                'sign': this.hmac(this.encode(body), this.encode(this.secret), sha512.sha512),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
}

module.exports = coinspot;
