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

### API Server in development

When running in development mode, values in `.env.development` will be used.  
To override these default values, create a `.env.local` (e.g. `cp .env.sample .env.local`) and set values as you please.
