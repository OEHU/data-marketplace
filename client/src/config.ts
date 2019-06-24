//
// commons-server connection
//
export const serviceUri =
    process.env.REACT_APP_SERVICE_URI || 'http://localhost:4000'

//
// OCEAN REMOTE CONNECTIONS
//
export const nodeUri =
    process.env.REACT_APP_NODE_URI || 'https://nile.dev-ocean.com'
export const aquariusUri =
    process.env.REACT_APP_AQUARIUS_URI || 'https://nginx-aquarius.dev-ocean.com'
export const brizoUri =
    process.env.REACT_APP_BRIZO_URI || 'https://nginx-brizo.dev-ocean.com'
export const brizoAddress =
    process.env.REACT_APP_BRIZO_ADDRESS ||
    '0x4aaab179035dc57b35e2ce066919048686f82972'
export const secretStoreUri =
    process.env.REACT_APP_SECRET_STORE_URI ||
    'https://secret-store.dev-ocean.com'
export const faucetUri =
    process.env.REACT_APP_FAUCET_URI || 'https://faucet.nile.dev-ocean.com'

//
// APP CONFIG
//
export const verbose = true
export const analyticsId = 'UA-60614729-11'
