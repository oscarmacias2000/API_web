export const StableCOINS = {
    USDT: {name: "Tether", symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", color: "#26A17B"},
    USD: {name: "USD Coin", symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", color: "#2775CA"},
    BUSD: {name: "Binance USD", symbol: "BUSD", address: "0x4fabb145d64652a948d72533023f6e7a623c7c53", color: "#F0B90B"},
    DAI: {name: "Dai", symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", color: "#F5AC37"},
    TUSD: {name: "TrueUSD", symbol: "TUSD", address: "0x0000000000085d4780B73119b644AE5ecd22b376", color: "#2C7BB9"},   
}

export const API_ENDPOINTS = {
    PRICES: '/stablecoins/prices',
    VOLUMES: '/stablecoins/:symbol/history',
    CIRCULATIONS: '/metrics/market',
    MARKET_CAPS: '/arbitrage/opportunities',
}

export const REFREASH_INTERVALS = {
    FAST: 5000, // 5 seconds
    NORMAL: 30000, // 30 seconds
    SLOW: 60000, // 1 minute
}