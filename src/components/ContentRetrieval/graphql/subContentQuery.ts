import {CORE_NODE_FIELDS, Node} from '@jahia/nextjs-sdk'
import {SubContentQueryProps} from "../types";
import {gql} from '@apollo/client';

const getLimit = (maxItems:string|undefined) => (maxItems?`limit:${maxItems}`:'');
const getPaths = (startNode:Node|undefined) => (startNode?`paths:["${startNode.path}"]`:'');
const getNodeConstraint = (filter:Node[]|undefined) => {
    if(!Array.isArray(filter) || filter.length === 0)
        return '';

    const any = filter.reduce((constraint : string,categoryNode : Node) => {
        constraint +=`
            {
                property:"j:defaultCategory",
                equals:"${categoryNode.uuid}"
            }
            `
        return constraint
    },'')
    return `nodeConstraint:{any:[${any}]}`
};

const getOrdering = (sortCriteria:string|undefined,sortDirection:string) => {
    if(!sortCriteria) return '';

    return `
            ordering:{
              orderType:${sortDirection.toUpperCase()},
              property:"${sortCriteria}"
            }
        `
}

export const getSubContentQuery = ({nodeType,startNode,filter,maxItems,sortCriteria,sortDirection,locale}:SubContentQueryProps) => {
    const query = `
        query($workspace: Workspace!){
            jcr(workspace: $workspace) {
                workspace
                nodesByCriteria(
                    ${getLimit(maxItems)}
                    criteria:{
                        language:"${locale}"
                        nodeType:"${nodeType}"
                        pathType:ANCESTOR
                        ${getPaths(startNode)}
                        ${getNodeConstraint(filter)}
                        ${getOrdering(sortCriteria,sortDirection)}
                    }
                ){
                    nodes{
                        ...CoreNodeFields
                        properties(names:["j:defaultCategory"]){
                            name
                            refNodes{
                                ...CoreNodeFields
                            }
                        }
                    }
                }
            }
        }
    `;
    // console.log("query :",query);
    // return query;
    return gql`${query}${CORE_NODE_FIELDS}`;
}
