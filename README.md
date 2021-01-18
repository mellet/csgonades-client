# CSGO Nades Frontend Client

## Getting started

### Required dependencies

- [Node.JS](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)

### Starting dev server

```
yarn
yarn dev
```

## Architecture

### Technology

- [Next.JS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)

### Entry points

All pages on the site has it's entrypoint in `/src/pages`

### API Server in developement

When developing you can either run agains your local server or against prod for simplicity.
See `/src/constants/Constants.ts` to toggle between what API server to connect to.
