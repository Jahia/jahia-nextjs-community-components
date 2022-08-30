import {ComponentPropsType, Node} from '@jahia/nextjs-sdk';
import React from 'react';

export enum MenuTypeEnum {
    base = 'base',
    select = 'select'
}
export type TreeBaseNodePropsType = {
    'j:baseNode': Node,
    'j:includeBaseNode': string,
    'j:maxDepth'?: string,
    'j:excludePages'?:Node[],
}

export type TreeFromBaseNodeQueryType = {
    baseNodeId: string,
    maxDepth?: number,
    excludePages?:string[],
    locale:string
}

export type SubContentQueryProps = {
    nodeType: string,
    startNode?:Node,
    filter?:Node[],
    maxItems?:string,
    sortCriteria?:string,
    sortDirection:string,
    locale:string
}

export type MenuBtnIsotopePropsType = ComponentPropsType & {
    handleClick: (key: string) => () => void,
    activeClass: string,
    styles: string
}

export type SubContentPropsType = {
    queryProps:SubContentQueryProps
    referenceComponent: React.ComponentType
    className?: string
    subNodesView?: string
    noResultsMessage?: string
}

export type SubContentIsotopePropsType = SubContentPropsType & {
    isotopeId: string
}
