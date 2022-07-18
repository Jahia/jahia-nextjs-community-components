import React from 'react';
import Container from 'react-bootstrap/Container';
import {BS4ContentTypesEnum as BS4,BS4PropsType,ContainerPropsType} from '../types';
import {Animate, convert} from '../../Animate';

export const BS4Container = ({grid, mixins, children} : BS4PropsType) => {
    if (!mixins.includes(BS4.createContainer)) {
        return <>{children}</>;
    }

    const containerProps : ContainerPropsType = {};
    if (grid.containerId?.value) {
        containerProps.id = grid.containerId.value;
    }

    if (grid.containerCssClass?.value) {
        containerProps.class = grid.containerCssClass.value;
    }

    if (grid.gridLayout?.value) {
        switch (true) {
            case grid.gridLayout.value === 'full-width':
                containerProps.fluid = true;
                break;

            case grid.gridLayout.value.includes('container-'):
                containerProps.fluid = grid.gridLayout.value.split('-')[1];
                break;

            default: break;
        }
    }

    // Console.log("[BS4Container] mixins : ",mixins);
    // console.log("[BS4Container] children : ",children);
    // console.log("[BS4Container] containerProps : ",containerProps);
    const useAnimate = !mixins.includes(BS4.createSection) || !grid.sectionElement?.value;
    const Component = useAnimate ? Animate : Container;
    if(useAnimate){
        containerProps.properties=convert(grid.properties);
        containerProps.component = Container
    }


    return(
        <Component {...containerProps}>
            {children}
        </Component>
    );


    // if(!mixins.includes(BS4.createSection) || !grid.sectionElement?.value)
    //     return (
    //         <Animate properties={getAnimateProps(grid)} component={Container} {...containerProps}>
    //             {children}
    //         </Animate>
    //     )
    // return (
    //     <Container {...containerProps}>
    //         {children}
    //     </Container>
    // );
}
