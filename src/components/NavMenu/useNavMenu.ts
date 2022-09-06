import {JahiaCtx, GqlNode, ComponentPropsType, useNode} from '@jahia/nextjs-sdk';
import {NavMenuTreePropsType, NavMenuPropsType} from './types';
import {getNavMenuTreeQuery, navMenuSetQuery} from './graphql';
import React from 'react';
import {useQuery} from '@apollo/client';
import {navMenuProperties} from './properties';

// Export const useNavMenuTree = (props:NavMenuTreePropsType) => {
//     console.log('[useNavMenuTree] props:', props);
//     const {workspace, locale} = React.useContext(JahiaCtx);
//     const baseNode = props['j:baseNode'];
//     const excludePages = props['j:excludePages']?.map(node => node.uuid) || [];
//     const includeBaseNode = props['j:includeBaseNode'] === 'true';
//     const maxDepth = Number.parseInt(props['j:maxDepth'] as string, 10) || 0;
//
//     console.log('[useNavMenuTree] maxDepth:', maxDepth);
//
//     const {data, error, loading} = useQuery(getNavMenuTreeQuery(maxDepth), {
//         variables: {
//             workspace,
//             language: locale,
//             baseNodeId: baseNode.uuid
//         }
//     });
//
//     if (data?.jcr?.nodeById) {
//         const baseTreeNode: GqlNode | null = data.jcr.nodeById;
//
//         const removeExcludedPages = (node:GqlNode) => {
//             if (excludePages.includes(node.uuid)) {
//                 return null;
//             }
//
//             if (node.children && node.children.nodes) {
//                 return {
//                     ...node,
//                     children: {
//                         nodes: node.children.nodes.reduce((nodes:GqlNode[], childNode) => {
//                             const validNode = removeExcludedPages(childNode);
//                             if (validNode) {
//                                 nodes.push(validNode);
//                             }
//
//                             return nodes;
//                         }, [])
//                     }
//                 };
//             }
//
//             return node;
//         };
//
//         if (baseTreeNode) {
//             return {
//                 data: removeExcludedPages(baseTreeNode),
//                 loading,
//                 error
//             };
//         }
//
//         return {
//             loading,
//             error
//         };
//     }
//
//     return {
//         loading,
//         error
//     };
// };

// export const useNavMenuSet = (props:NavMenuSetPropsType) => {
//     const {workspace, locale} = React.useContext(JahiaCtx);
//     const menuNodes = props['j:menuNodes'];
//
//     const {data, error, loading} = useQuery(navMenuSetQuery, {
//         variables: {
//             workspace,
//             language: locale,
//             menuNodesId: '1112' // [id,id,]
//         }
//     });
//
//     return {
//         loading,
//         error
//     };
// };

export const cleanNavMenuTree = ({baseTreeNode, excludePages}:NavMenuTreePropsType) => {
    console.log('[useNavMenuTree] excludePages:', excludePages);
    const removeExcludedPages = (node:GqlNode) => {
        if (excludePages.includes(node.uuid)) {
            return null;
        }

        if (node.children && node.children.nodes) {
            return {
                ...node,
                children: {
                    nodes: node.children.nodes.reduce((nodes:GqlNode[], childNode) => {
                        const validNode = removeExcludedPages(childNode);
                        if (validNode) {
                            nodes.push(validNode);
                        }

                        return nodes;
                    }, [])
                }
            };
        }

        return node;
    };

    return removeExcludedPages(baseTreeNode);
};

export const useNavMenuItems = (props:NavMenuPropsType) => {
    console.log('[useNavMenuItems] props:', props);
    const {workspace, locale} = React.useContext(JahiaCtx);

    const title = props['jcr:title'];
    const menuType = props['j:menuType'];
    const baseNode = props['j:baseNode'];
    const menuNodes = props['j:menuNodes']?.map(node => node.uuid);
    const excludePages = props['j:excludePages']?.map(node => node.uuid) || [];
    const maxDepth = Number.parseInt(props['j:maxDepth'] as string, 10) || 0;
    // Const includeBaseNode = props['j:includeBaseNode'] === 'true';

    console.log('[useNavMenuItems] menuType:', menuType);

    const {data: treeData, error: treeError, loading: treeLoading} = useQuery(getNavMenuTreeQuery(maxDepth), {
        variables: {
            workspace,
            language: locale,
            baseNodeId: baseNode?.uuid
        },
        skip: menuType !== 'tree'
    });

    const {data: setData, error: setError, loading: setLoading} = useQuery(navMenuSetQuery, {
        variables: {
            workspace,
            language: locale,
            menuNodesId: menuNodes
        },
        skip: menuType !== 'set'
    });

    switch (menuType) {
        case 'tree': {
            if (treeData?.jcr?.nodeById) {
                return {
                    data: {navMenuTitle: title, ...cleanNavMenuTree({baseTreeNode: treeData.jcr.nodeById, excludePages})},
                    loading: treeLoading,
                    error: treeError
                };
            }

            return {
                loading: treeLoading,
                error: treeError
            };
        }

        case 'set':
            if (setData?.jcr?.nodesById) {
                return {
                    data: {navMenuTitle: title, children: setData.jcr.nodesById},
                    loading: setLoading,
                    error: setError
                };
            }

            return {
                loading: setLoading,
                error: setError
            };

        default: return {
            loading: true
            // Error: `Oups no rendering for menuType ${menuType}`
        };
    }
};

export const useNavMenu = ({id}:ComponentPropsType) => {
    const {data, loading, error} = useNode(id, [...navMenuProperties, 'jcr:title']);
    const {data: itemsData, loading: itemsLoading, error: itemsError} = useNavMenuItems(data?.properties as NavMenuPropsType || {'j:menuType': 'loading'});

    return {
        data: itemsData,
        loading: loading || itemsLoading,
        error: error || itemsError
    };
};
