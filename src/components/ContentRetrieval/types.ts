import {ComponentPropsType, Node} from "@jahia/nextjs-sdk";
import React from "react";

export type ContentRetrievalPropsType = ComponentPropsType & {
    className?: string,
    referenceComponent: React.ComponentType
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
