# Architecture
In this document is the architecture of the client-rexrap defined:

## General

The whole project is based on [react.js](https://reactjs.org/), was created with the [create-react-app](https://github.com/facebook/create-react-app) and uses a flux based architecture. To be more precise we use [redux](https://redux.js.org/).
For easier usage we don't use redux directly instead we use [redux-toolkit](https://redux-toolkit.js.org/) combined with [rtk-query](https://rtk-query-docs.netlify.app/) for network requests.

*For in detail decision explanations see `entscheidungen.md` in the `Documentation exRap` Repository.*

## API
Our API is based on an [OpenAPI](https://swagger.io/specification/) specification which is generated from the backend.
This way we make sure our API is always stable and changes will be reflected in the frontend instant.
We use the generated specifications to generate the endpoints in the frontend.
For the generation we use: [rtk-query-codegen](https://github.com/rtk-incubator/rtk-query-codegen)

*`rtk-query-codegen` is part of the `rtk-query` Tool.*

### `/api/*.json`
Here are all the OpenAPI specifications. In the `package.json` are commands which turn these specifications into code.
For a description of the task see the `README.md`.

### `/src/gen/*`
Here are all the generated files based on the specified *.json. For each API there is one file.\
**IMPORTANT: Do not modify these files, because they are generated.**

### `/src/service/*`
To enhance the generated endpoints with additional parameters without losing the changes when they are generated again you can add stuff in these services.
These will be used in the end in the components.

## Store (`/src/store/*`)
Because we use rkt-query we don't need to define all "slices" by ourselves.
Every endpoint only need to be registered in the `rootReducer.ts` and in the `index.ts` as a middleware and all reducers and actions are done by rtk-query.

If we need a custom "slice" we define them with a new folder with the **entity**-Name and add them in de `rootReducer.ts`

### `/src/store/[entity]/actions.ts`
Here are all actions defined for the entity

### `/src/store/[entity]/reducers.ts`
Here are all reducers defined for the entity

### `/src/store/[entity]/types.ts`
Here are all types defined for the entity to prevent circular dependencies in files.

*For more information what are [actions](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions) and [reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#writing-reducers) see the [core concepts of redux](https://redux.js.org/introduction/core-concepts). These concepts are with the redux-toolkit less clear, because the toolkit hides some verbose code to make it easier for developers*

## Components
Most components we use will come from [Material-UI](https://material-ui.com/). Our tsx-files are separated into 4 parts.

### `src/index.tsx`
Is the entrypoint for the application and are here for doing global stuff over the whole application like setting the context for example.

### `src/App.tsx`
Is the first layer of the app. Stuff that comes here are components, that need to be rendered on every page like the navigation.

### Pages (`src/pages/*.tsx`)
For every route we have, we create a page. In every page there are 1 or more custom or Material-UI components.

### Components (`src/components/*.tsx`)
If we need to create components, which are used in multiple pages or are big enough to be extracted we create them in the `components`-folder

## Tests
All our tests will be in the `__tests__`-Folder. We will use the same structure in the tests as well in the project itself.