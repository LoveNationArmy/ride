# ride

Ride sharing platform.

## Getting started

Make sure you have [node](https://nodejs.org), [yarn](https://yarnpkg.com) and [now](https://zeit.co/now) installed and updated to their **latest** versions.

To install dependencies, run on project root:

```sh
yarn
```

To run the API (backend) server:

```sh
yarn api:start
```

To run the Web (frontend) server:

```sh
yarn web:start
```

To deploy these two servers with **now**:

```sh
yarn api:deploy
yarn web:deploy
```

To clean up installation and start fresh in case of issues:

```sh
yarn clean
```

## Development

As this is a **monorepo**, currently it is advised that you **cd** inside the specific package you wish to develop on and follow its instructions (README).
