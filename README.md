# Union
StyleGuide for theknot.com

# Development

<details>
<summary>
Short version
</summary>

```sh
npm install
npm run bootstrap
# Start dev server
npm start
# Open docs page
npm run open

# Run this when configurations or dependencies change
npm restart
```
</details>

### Install dependencies
> The first step is to install all dependencies.

```sh
npm install
```

### Bootstrap packages
> xogroup/union is a monorepo. This means that it is a repo which hosts many smaller, independently consumable packages. This step is to create a development environment where all packages which depend on each other are linked, allowing changes in one package to be reflected across the whole ecosystem.

```sh
npm run bootstrap
```

> NOTE: This step will need to be run each time a new internal dependency is established.

### Documentation Driven Development

**Start dev server + watch mode**
> The next step is to start a webpack-dev-server which will host the documentation app and a webpack process which will compile the union packages

> NOTE: This will run the processes as daemons, so it will exit immediately.

```sh
npm start
```
> At this point, you should be able to run the following command to get to the docs page

```sh
npm run open
```

**Configuration changes**
> When making configuration changes or adding packages to the ecosystem, you will need to restart the webpack processes, to do this, run:

```sh
npm restart
```
