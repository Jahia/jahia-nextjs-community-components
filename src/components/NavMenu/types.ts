import {GqlNode, Node} from '@jahia/nextjs-sdk';

export type NavMenuPropsType = {
    'jcr:title'?:string
    'j:menuType':string
    'j:baseNode'?: Node,
    'j:maxDepth'?: string,
    'j:excludePages'?:Node[],
    'j:menuNodes'?:Node[]
}

export type NavMenuTreePropsType = {
    'baseTreeNode': GqlNode,
    'excludePages':string[]
}

