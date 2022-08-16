import React from 'react';
import {useNode} from '@jahia/nextjs-sdk';
import {MenuBtnIsotopePropsType} from '../types';
import classnames from 'classnames';

export const MenuBtn = ({id, handleClick, activeClass, styles}:MenuBtnIsotopePropsType) => {
    const {data, loading, error} = useNode(id, ['jcr:title']);

    if (loading) {
        return <div>loading</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    if (!data || !data.properties) {
        return <div>No data returned by IsotopeContentRetrieval</div>;
    }

    const {name, properties} = data;
    let label = name;
    if (properties && properties['jcr:title']) {
        label = properties['jcr:title'] as string;
    }

    return (
        <button
            type="button"
            className={classnames(
                'btn',
                styles,
                {active: activeClass === name})}
            onClick={handleClick(name)}
        >
            {label.toLowerCase()}
        </button>
    );
};
