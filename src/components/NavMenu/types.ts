import {ComponentPropsType, GqlNode, Node} from '@jahia/nextjs-sdk';

// Export enum MenuTypeEnum {
//     base = 'base',
//     select = 'select'
// }
export type NavMenuPropsType = {
    'jcr:title'?:string
    'j:menuType':string
    'j:baseNode'?: Node,
    'j:maxDepth'?: string,
    'j:excludePages'?:Node[],
    'j:menuNodes'?:Node[]
}

// Export type NavMenuTreePropsType = {
//     'j:baseNode': Node,
//     'j:includeBaseNode': string,
//     'j:maxDepth'?: string,
//     'j:excludePages'?:Node[]
// }

export type NavMenuTreePropsType = {
    'baseTreeNode': GqlNode,
    'excludePages':string[]
}

// Export type NavMenuSetPropsType = {
//     'menuNodes':Node[]
// }

