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
The SDK is available as an [npm package][npm-package].
To install the sdk in a project, run one of this command :
```shell
# with npm
npm install @jahia/nextjs-community-components

# with yarn
yarn add @jahia/nextjs-community-components
```
To know more about the full configuration of a project using
**Jahia** and **Nextjs** read the [setup][setup.md].

<!--
## Quick start to use the sdk in a Nextjs project
To understand in details the architecture of a **Nextjs** project using **Jahia**, have a look at the
[architecture][archi.md].

>In this section we present source code extracted from the [nextjs-industrial] project.
This project is a fully functional website using **Jahia** and **Nextjs**.

### Pages
Pages are created and managed in **Jahia**, and the page url is based on the jahia page path.
To render the page in **Nextjs** you have to create a `[[slug.js]]` file in the **pages**
folder and copy/past the following code :
```js
import {JahiaPage} from '@jahia/nextjs-sdk';

export default JahiaPage.Component;
export const {getStaticPaths} = JahiaPage;
export const {getStaticProps} = JahiaPage;
```

To render the pages properly you have to :
- register templates and components
- get initial propertie

This is done in the `_app.jsx` file:

```js
import React from 'react';
import {JahiaNextApp} from '@jahia/nextjs-sdk';

import '../styles/style.scss';
import {registerTemplates} from '../templates/registerTemplates';
import {registerComponents} from '../components/registerComponents';

registerTemplates();
registerComponents();

JahiaNextApp.useRender = () => {
    /* Do extra stuff if needed*/
};

export default JahiaNextApp;
```

The **templates** folder contains the webpage templates (Open and FixedStructure)
and the registration element :

```js
import Open from "./Open";
import FixedStructure from "./FixedStructure";
import {templates} from "@jahia/nextjs-sdk";

export const registerTemplates = () => {
    Object.assign(templates, {
        'open': Open,
        'fixedstructure': FixedStructure,
        'default': Open
    });
}
```
> Note : a special api service is used to select from the Jahia UI
> the available templates. See this [file][api-templates].

You can now start to use Jahia components or create your own.

### SDK Components
|Name|Props|Description|
|---|---|---|
|Area| `name`, `tagProps`, `componentProps` |This component enable the **in-context** contribution in the webpage. The **Area** is used by Jahia to create a slot in edit mode where a contributor can create or copy/past a content.|
|JahiaLink| same as **Link** from Next |This component is a wrapper of the **Link** component provided by Next. The **JahiaLink** generate the appropriate link to browse the website in edit or preview mode from Jahia, or in live mode from Vercel. The live link is generated with the **Link** component provided by Next.|
|DefaultImage| `path`, `alt`, `className` |This component is use to render an image. For the moment (alpha release) it doesn't use the Next **Image** componen.t|
|ImageReferenceLink| `id`, `referenceComponent`, `className` |This component is used to render the default Jahia content type: **Image (from the document manager)**. Link rendering is not implemented yet (alpha release).|
|RichText| `id` |This component is used to render the default Jahia content type: **Rich text**.|

### GraphQL helper function
The sdk exports the **useNode** function, which resumes in one line the GraphQL call needed
to get content properties.

typescript signature:
```js
const useNode = (uuid: string, properties: string[]=[], children= false)
```

#### Example of usage
Let consider a content using this content definition:
```
[hicnt:featureContentBloc]> jnt:content
  - title (string) internationalized
  - teaser (string) internationalized
  - iconName (string)
```
To retrieve the value of the properties in your React component, use the **useNode()** function 
as follows:
```js
import {useNode} from '@jahia/nextjs-sdk';

function FeatureContentBloc({id}) {
    const {data, error, loading} = useNode(id, ['title', 'teaser', 'iconName']);
    ...
```
The function returns a **data** object with a **properties** object which contains the props.
```js
const {title, teaser, iconName} = data.properties;
```
The function returns also core properties accessible directly from the **data** object:
- `uuid`: unique id of the content 
- `path`: path of the content in the content tree
- `name`: technical name of the content
- `primaryNodeType.name`: type of content
- `mixinTypes[{name}]`: name of the mixins associated to the content

>Note: you can always write your own GraphQL query and use it with the apollo useQuery function.
> Don't forget to use the CORE_NODE_FIELDS fragment for apollo cache purpose 
-->
[jahia-website]: https://www.jahia.com
[vercel-website]: https://vercel.com
[initiative.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/README.md
[npm-package]:https://www.npmjs.com/package/@jahia/nextjs-sdk

[env-var]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/setup.md#next-industrial-webapp-configuration
[setup.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/setup.md
[archi.md]: https://github.com/Jahia/jahia-nextjs-initiative/blob/main/doc/architecture.md
[nextjs-industrial]:https://github.com/Jahia/nextjs-industrial
[api-templates]:https://github.com/Jahia/nextjs-industrial/blob/main/pages/api/jahia/templates.js
