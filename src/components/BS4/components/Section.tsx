import React from 'react';
import {BS4ContentTypesEnum as BS4, BS4PropsType, SectionPropsType} from '../types';
import {Animate, convert} from '../../Animate';

export const BS4Section = ({grid, mixins, children} : BS4PropsType) => {
    if (!mixins.includes(BS4.createSection) || !grid.sectionElement?.value) {
        return <>{children}</>;
    }

    const sectionProps : SectionPropsType = {};
    if (grid.sectionId?.value) {
        sectionProps.id = grid.sectionId.value;
    }

    if (grid.sectionCssClass?.value) {
        sectionProps.className = grid.sectionCssClass.value;
    }

    if (grid.sectionRole?.value) {
        sectionProps.role = grid.sectionRole.value;
    }

    if (grid.sectionStyle?.value) {
        sectionProps.style = JSON.parse(grid.sectionStyle.value);
    }

    if (grid.sectionAria?.value) {
        sectionProps['aria-label'] = grid.sectionAria.value;
    }

    // Console.log("[BS4Section] mixins : ",mixins);
    // console.log("[BS4Section] children : ",children);
    // console.log("[BS4Section] sectionProps : ",sectionProps);
    // if(mixins.includes(animateMix.animate))
    return (
        <Animate
                properties={convert(grid.properties)}
                component={grid.sectionElement.value}
                {...sectionProps}
        >
            {children}
        </Animate>
    );

    // Return React.createElement(grid.sectionElement.value, sectionProps, children);
};
