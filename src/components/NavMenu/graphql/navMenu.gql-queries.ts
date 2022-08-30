import {CORE_NODE_FIELDS, Node} from '@jahia/nextjs-sdk';
import {SubContentQueryProps, TreeFromBaseNodeQueryType} from '../types';
import {gql} from '@apollo/client';

type GetChildrenPropsType = {
    maxDepth?:number
    index:number
}

function getChildren({maxDepth, index}: GetChildrenPropsType) {
    if (!maxDepth || maxDepth === index) {
        return '';
    }

    return `children(typesFilter:{types:["jnt:page","jnt:navMenuText"]}) {
                nodes {
                    ...CorePageNodeFields
                    ${(() => getChildren({maxDepth, index: index++}))}
                }
            }
    `;
}

export const getTreeFromBaseNodeQuery = ({baseNodeId, maxDepth, excludePages, locale}:TreeFromBaseNodeQueryType) => {
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
    // Console.log("query :",query);
    // return query;
    return gql`${query}${CORE_NODE_FIELDS}`;
};
