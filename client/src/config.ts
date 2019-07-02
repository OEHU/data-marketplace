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

// changed this
export const aquariusUri =
    process.env.REACT_APP_AQUARIUS_URI || 'https://aquarius.nile.dev-ocean.com'

// changed this
export const brizoUri =
    process.env.REACT_APP_BRIZO_URI || 'https://brizo.nile.dev-ocean.com'

// changed this
export const brizoAddress =
    process.env.REACT_APP_BRIZO_ADDRESS ||
    '0x376817c638d2a04f475a73af37f7b51a2862d567'

// changed this
export const secretStoreUri =
    process.env.REACT_APP_SECRET_STORE_URI ||
    'https://secret-store.nile.dev-ocean.com'
export const faucetUri =
    process.env.REACT_APP_FAUCET_URI || 'https://faucet.nile.dev-ocean.com'

//
// APP CONFIG
//
export const verbose = true
export const analyticsId = 'UA-60614729-11'
