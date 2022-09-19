# The Jahia Nextjs initiative : *jahia community components for Nextjs*

The aim of the Jahia Nextjs initiative is to explore and explain
the Jahia capabilities to easily create and manage headless web project.
Solutions we use are :
- [Jahia][jahia-website] : a Cloud / On-premise *DXP* solution to create and contribute
- [Vercel][vercel-website] a next-js Cloud platform provider to render the web project

To know more about the Jahia Nextjs initiative [read this dedicated page][initiative.md].

## Why this community components ?
Use this package in **Nextjs** headless project:
- to add pre-build react components to render legacy jahia modules like Bootstrap grid or Animate
- and much more

## Installation
The community components is available as an [npm package][npm-package].
To install it in a project, run one of this command :
```shell
# with npm
npm install @jahia/nextjs-community-components

# with yarn
yarn add @jahia/nextjs-community-components
```
To know more about the full configuration of a project using
**Jahia** and **Nextjs** read the [setup][setup.md].
## Components
|Name|Props|Description|
|---|---|---|
|BS4Grid| `id` |This component is used to render the content type **bootstrap4nt:grid** coming from the boostrap 4 Jahia module.|
|ContentRetrieval| `id`  |This component is the default view to render the content type **jnt:contentRetrieval** coming from the Jahia Content retrieval (contentRetrieval) module.|
|IsotopeContentRetrieval| `id` |This component is the isotope view to render the content type **jnt:contentRetrieval** coming from the Jahia Content retrieval (contentRetrieval) module. By default the component expect that the child node has a view `isotope` registered.|


### GraphQL helper function
The module exports the **useNavMenu** function, which resumes in one line the GraphQL call needed
to get navigation menu properties.

typescript signature:
```js
const useNavMenu = ({id}:ComponentPropsType)
```

#### Example of usage
Let consider you want to create a navBar for the header part of your site. You create a new `jnt:navMenuNext`
aka **Navigation Menu** (provided by the nextjs-proxy module).

To retrieve the nodes of your navBar in your React component, use the **useNavMenu()** function
as follows:
```js
import {useNavMenu} from '@jahia/nextjs-community-components';

export function NavMenuHeader({id}) {
    const {data: navTree, loading, error} = useNavMenu({id});
    ...
}
```
This function returns a data object (renamed navTree in the example above) with as set of properties :
- `navMenuTitle`: the title of your navBar
- `children`: the list of page nodes below the base node (starting point) or the set of pages defined
by the user

The function returns also for each node, including the base node, the **core** properties accessible directly from the **data** object:
- `uuid`: unique id of the content
- `path`: path of the content in the content tree
- `name`: technical name of the content
- `primaryNodeType.name`: type of content
- `mixinTypes[{name}]`: name of the mixins associated to the content
- `view`: name of the component to call to render the content
- `page`: boolean set to true if the child node is a page (could be a label)
- `title`: title of the page in the appropriate language

[jahia-website]: https://www.jahia.com
[vercel-website]: https://vercel.com
[initiative.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/README.md
[npm-package]:https://www.npmjs.com/package/@jahia/nextjs-sdk

[env-var]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/setup.md#next-industrial-webapp-configuration
[setup.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/setup.md
[archi.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/architecture.md
[nextjs-industrial]:https://github.com/Jahia/nextjs-industrial
[api-templates]:https://github.com/Jahia/nextjs-industrial/blob/main/pages/api/jahia/templates.js
