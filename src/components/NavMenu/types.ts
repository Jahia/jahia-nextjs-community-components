import {ComponentPropsType, Node} from '@jahia/nextjs-sdk';
import React from 'react';

export enum MenuTypeEnum {
    base = 'base',
    select = 'select'
}
export type NavMenuTreePropsType = {
    'j:baseNode': Node,
    'j:includeBaseNode': string,
    'j:maxDepth'?: string,
    'j:excludePages'?:Node[]
}

export type NavMenuSetPropsType = {
    'j:menuNodes':Node[]
}

