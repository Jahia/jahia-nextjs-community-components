import React from "react";

export enum AnimateContentTypesEnum {
    animate = "jmix:animate"
}

export type AnimatePropsType = {
    properties?: {[k: string]: string}  ,
    component?:React.ElementType,//React.ReactElement,
    offset?:string,
    className?:string,
    children?:React.ReactNode,
    props?: object
}
