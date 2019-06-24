[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Commons</h1>

> 🏄‍♀️ Marketplace front-end and backend server to explore, download, and publish open data sets.
> https://commons.oceanprotocol.com

[![Build Status](https://travis-ci.com/oceanprotocol/commons.svg?branch=master)](https://travis-ci.com/oceanprotocol/commons)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6a19987e62344b1c9c1d5bc9f315c733)](https://www.codacy.com/app/ocean-protocol/commons)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/6a19987e62344b1c9c1d5bc9f315c733)](https://www.codacy.com/app/ocean-protocol/commons)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-7b1173.svg?style=flat-square)](https://github.com/prettier/prettier)
[![js oceanprotocol](https://img.shields.io/badge/js-oceanprotocol-7b1173.svg)](https://github.com/oceanprotocol/eslint-config-oceanprotocol)
[![css bigchaindb](https://img.shields.io/badge/css-bigchaindb-39BA91.svg)](https://github.com/bigchaindb/stylelint-config-bigchaindb)

<img width="1218" alt="Commons UI" src="https://user-images.githubusercontent.com/90316/55874266-296ef080-5b92-11e9-8ac6-2423cb2a80fb.png">

---

<h3 align="center">🦑🦑🦑<br />This marketplace is deployed under <a href="https://commons.oceanprotocol.com">commons.oceanprotocol.com</a> and can be used there. Feel free to <a href="https://github.com/oceanprotocol/commons/issues">report any issues</a> you encounter.<br />🦑🦑🦑</h3>

---

If you're a developer and want to contribute to, or want to utilize this marketplace's code in your projects, then keep on reading.

- [🏄 Get Started](#-get-started)
  - [🏖 Remote Ocean: Nile](#-remote-ocean-nile)
  - [🐳 Use with Barge](#-use-with-barge)
  - [⛵️ Environment Variables](#️-environment-variables)
- [👩‍🔬 Testing](#-testing)
- [✨ Code Style](#-code-style)
- [🛳 Production](#-production)
- [⬆️ Releases](#️-releases)
- [📜 Changelog](#-changelog)
- [🎁 Contributing](#-contributing)
- [🏛 License](#-license)

## 🏄 Get Started

This repo contains a client and a server, both written in TypeScript:

- **client**: React app setup with [squid-js](https://github.com/oceanprotocol/squid-js), bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- **server**: Node.js app, utilizing [Express](https://expressjs.com). The server provides various microservices, like remote file checking.

To spin up both, the client and the server in a watch mode for local development, execute:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the client in the browser. The page will reload if you make edits to files in either `./client` or `./server`.

### 🏖 Remote Ocean: Nile

To make use of all the functionality, you need to connect to the Ocean network. By default, the client will connect to Ocean components running within [Ocean's Nile test network](https://docs.oceanprotocol.com/concepts/testnets/#the-nile-testnet) remotely.

This means you need to connect with your MetaMask to the Nile network too. To do this:

1. select Custom RPC in the network dropdown in MetaMask
2. under New Network, enter `https://nile.dev-ocean.com` as the custom RPC URL
3. Hit _Save_, and you’re now connected to Nile

### 🐳 Use with Barge

If you prefer to connect to locally running components instead of remote connections to Ocean's Nile network, you can spin up [`barge`](https://github.com/oceanprotocol/barge) and use a local network:

```bash
git clone git@github.com:oceanprotocol/barge.git
cd barge

./start_ocean.sh --latest --no-pleuston --local-spree-node
```

Modify `./client/src/config.ts` or set environment variables to use those local connections.

### ⛵️ Environment Variables

The `./client/src/config.ts` file is setup to prioritize environment variables for setting each Ocean component endpoint.

By setting environment variables, you can easily switch between Ocean networks the commons client connects to, without directly modifying `./client/src/config.ts`. This is helpful e.g. for local development so you don't accidentially commit changes to the config file.

For local development, you can use a `.env.local` file. There's an example file with the most common network configurations preconfigured:

```bash
cp client/.env.local.example client/.env.local

# uncomment the config you need
vi client/.env.local
```

## 👩‍🔬 Testing

Test suite is setup with [Jest](https://jestjs.io) and [react-testing-library](https://github.com/kentcdodds/react-testing-library).

To run all tests, including all linting tests:

```bash
npm test
```

For local development, you can start the test runners for client & server in a watch mode.

```bash
npm run test:watch
```

This will work for daily development but it misses the full interactivity of the test runner. If you need that, you will need to run them in individual terminal sessions:

```bash
cd client/
npm run test:watch

cd server/
npm run test:watch
```

## ✨ Code Style

For linting and auto-formatting you can use from the root of the project:

```bash
# auto format all ts & css with eslint & stylelint
npm run lint

# auto format all ts & css with prettier, taking all configs into account
npm run format
```

## 🛳 Production

To create a production build of both, the client and the server, run from the root of the project:

```bash
npm run build
```

Builds the client for production to the `./client/build` folder, and the server into the `./server/dist` folder.

## ⬆️ Releases

From a clean `master` branch you can run any release task doing the following:

- bumps the project version in `package.json`, `client/package.json`, `server/package.json`
- auto-generates and updates the CHANGELOG.md file from commit messages
- creates a Git tag
- commits and pushes everything
- creates a GitHub release with commit messages as description

You can execute the script using {major|minor|patch} as first argument to bump the version accordingly:

- To bump a patch version: `npm run release`
- To bump a minor version: `npm run release minor`
- To bump a major version: `npm run release major`

By creating the Git tag with these tasks, Travis will trigger a new Kubernetes live deployment automatically, after a successful tag build.

For the GitHub releases steps a GitHub personal access token, exported as `GITHUB_TOKEN` is required. [Setup](https://github.com/release-it/release-it#github-releases)

## 📜 Changelog

See the [CHANGELOG.md](./CHANGELOG.md) file. This file is auto-generated during the above mentioned release process.

## 🎁 Contributing

See the page titled "[Ways to Contribute](https://docs.oceanprotocol.com/concepts/contributing/)" in the Ocean Protocol documentation.

## 🏛 License

```text
Copyright 2018 Ocean Protocol Foundation Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
