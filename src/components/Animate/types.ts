import {Properties} from "@jahia/nextjs-sdk/dist/types";
import React from "react";

export enum AnimateContentTypesEnum {
    animate = "jmix:animate"
}

export type AnimatePropsType = {
    properties?: Properties  ,
    component?:React.ElementType,//React.ReactElement,
    offset?:string,
    className?:string,
    children?:React.ReactNode,
    props?: object
}
