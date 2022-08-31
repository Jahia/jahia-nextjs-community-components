import {CORE_NODE_FIELDS, Node} from '@jahia/nextjs-sdk';
import {gql} from '@apollo/client';

type GetChildrenPropsType = {
    maxDepth?:number
    index:number
}

function getChildren({maxDepth, index}: GetChildrenPropsType):string {
    console.log('[getChildren] maxDepth:', maxDepth);
    console.log('[getChildren] index:', index);

    if (!maxDepth || maxDepth === index) {
        return '';
    }

    const nextIndex = index + 1;
    return `children(typesFilter:{types:["jnt:page","jnt:navMenuText"]}) {
                nodes {
                    ...CorePageNodeFields
                    ${getChildren({maxDepth, index: nextIndex})}
                }
            }
    `;
}

export const getNavMenuTreeQuery = (maxDepth:number) => {
    const query = `
        query($workspace: Workspace!,$baseNodeId: String!,$language: String!){
            jcr(workspace: $workspace) {
                workspace
                nodeById(uuid: $baseNodeId) {
                    ...CorePageNodeFields
                    ${getChildren({maxDepth, index: 0})}
                }
               
            }
        }
        fragment CorePageNodeFields on JCRNode {
            ...CoreNodeFields
            page: isNodeType(type: {types:["jnt:page"]})
            title: property(name: "jcr:title", language: $language) { value }
        }
    `;
    console.log('query :', query);
    return gql`${query}${CORE_NODE_FIELDS}`;
};

export const navMenuSetQuery = gql`
        query($workspace: Workspace!,$menuNodesId: String!,$language: String!){
            jcr(workspace: $workspace) {
                workspace
                nodeById(uuid: $menuNodesId) {
                    ...CorePageNodeFields
                }
               
            }
        }
        fragment CorePageNodeFields on JCRNode {
            ...CoreNodeFields
            page: isNodeType(type: {types:["jnt:page"]})
            title: property(name: "jcr:title", language: $language) { value }
        }
        ${CORE_NODE_FIELDS}
    `;
