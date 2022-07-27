import React from "react";
import {Node, Properties} from "@jahia/nextjs-sdk/dist/types";
import {AnimatePropsType} from "../Animate";

export enum BS4ContentTypesEnum {
    createRow = 'bootstrap4mix:createRow',
    createSection = 'bootstrap4mix:createSection',
    createContainer = 'bootstrap4mix:createContainer',
    predefinedGrid = 'bootstrap4mix:predefinedGrid',
    customGrid = 'bootstrap4mix:customGrid'
}

export type BS4PropsType = {
    grid: { [key: string]: any },
    mixins: string[],
    children?: React.ReactNode
}

export type SectionPropsType = {
    id?: string,
    className?:string,
    role?:string,
    style?:string,
    'aria-label'?:string
}

export type ContainerPropsType = AnimatePropsType & {
    id?: string,
    class?:string,
    fluid?:string | boolean
}

export type RowPropsType = AnimatePropsType & {
    id?: string,
    className?:string
}

export type RowNodeType = Node & {
    nodetypes?: Properties,
    listlimit?: Properties
}

export type BreakpointType = {
    [key:string] : string
}
export type RowColType ={
    breakpoint : BreakpointType,
    className?: string
}

export type RowColsType = RowColType[]
