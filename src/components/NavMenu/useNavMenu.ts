import {ComponentPropsType, JahiaCtx, useNode, GqlNode} from '@jahia/nextjs-sdk';
import {navMenuProperties} from './properties';
import {NavMenuTreePropsType, NavMenuSetPropsType} from './types';
import {getNavMenuTreeQuery, navMenuSetQuery} from './graphql';
import React from 'react';
import {useQuery} from '@apollo/client';

export const useNavMenuTree = (props:NavMenuTreePropsType) => {
    console.log('[useNavMenuTree] props:', props);
    const {workspace, locale} = React.useContext(JahiaCtx);
    const baseNode = props['j:baseNode'];
    const excludePages = props['j:excludePages']?.map(node => node.uuid) || [];
    const includeBaseNode = props['j:includeBaseNode'] === 'true';
    const maxDepth = Number.parseInt(props['j:maxDepth'] as string, 10) || 0;

    console.log('[useNavMenuTree] maxDepth:', maxDepth);

    const {data, error, loading} = useQuery(getNavMenuTreeQuery(maxDepth), {
        variables: {
            workspace,
            language: locale,
            baseNodeId: baseNode.uuid
        }
    });

    if (data?.jcr?.nodeById) {
        const baseTreeNode: GqlNode | null = data.jcr.nodeById;

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

        if (baseTreeNode) {
            return {
                data: removeExcludedPages(baseTreeNode),
                loading,
                error
            };
        }

        return {
            loading,
            error
        };
    }

    return {
        loading,
        error
    };
};

export const useNavMenuSet = (props:NavMenuSetPropsType) => {
    const {workspace, locale} = React.useContext(JahiaCtx);
    const menuNodes = props['j:menuNodes'];

    const {data, error, loading} = useQuery(navMenuSetQuery, {
        variables: {
            workspace,
            language: locale,
            menuNodesId: '1112' // [id,id,]
        }
    });

    return {
        loading,
        error
    };
};
