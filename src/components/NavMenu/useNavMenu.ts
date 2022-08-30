import {ComponentPropsType, JahiaCtx, useNode} from '@jahia/nextjs-sdk';
import {navMenuProperties} from './properties';
import {MenuTypeEnum, TreeBaseNodePropsType} from './types';
import React from 'react';

const useTreeFromBaseNode = (props:TreeBaseNodePropsType) => {
    const {workspace} = React.useContext(JahiaCtx);

    const {
        'j:baseNode': baseNode,
        'j:includeBaseNode': includeBaseNode,
        'j:maxDepth': maxDepth,
        'j:excludePages': excludePages
    } = props;
};

export const useNavMenu = ({id}: ComponentPropsType) => {
    const {data, error, loading} = useNode(id, [...navMenuProperties]);

    if (data && data.properties) {
        const {'j:menuType': menuType} = data.properties;
        switch (menuType as string) {
            case MenuTypeEnum.base: {
                return;
            }

            case MenuTypeEnum.select:
                return;
            default: break;
        }
    }

    return {
        loading,
        error
    };
};
