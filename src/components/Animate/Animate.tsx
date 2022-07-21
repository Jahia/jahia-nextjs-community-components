import React from "react";
import {JahiaCtx} from "@jahia/nextjs-sdk";
// import 'animate.css/animate.css';
// import 'animate.css';
import {AnimatePropsType} from './types';
import { Waypoint } from 'react-waypoint';

export const Animate = ({properties, component, offset, children, className, ...props} : AnimatePropsType) => {
    const {isEditMode} = React.useContext(JahiaCtx);
    const cmp = React.useRef(null);
    const Component = component || 'div';
    const style = isEditMode?{}:{opacity: 0};
    // console.log("[Animate] properties: ",properties);
    // console.log("[Animate] props: ",props);
    if(!(properties && properties['j:animation']))
        return (<Component className={className} {...props}>{children}</Component>);

    const handleWaypointEnter = () =>{
        // console.log("[handleWaypointEnter] start");
        const element = cmp.current;
        // console.log("[handleWaypointEnter] element: ",element);


        if (!element.className.includes('animate__animated')) {
            const run = () => {
                element.style.setProperty('opacity', '1');
                element.classList.add(`animate__${properties['j:animation']}`, 'animate__animated');
            }

            if(properties['j:animationDuration'])
                element.style.setProperty('--animate-duration', `${properties['j:animationDuration']}s`);
            if(properties['j:animationIterationCount'])
                element.style.setProperty('animation-iteration-count', properties['j:animationIterationCount']);

            const delay = Number.parseFloat(properties['j:animationDelay'] as string);
            if(delay && delay > 0){

                if(properties['j:animationDelayUsage'] === "delayBeforeDisplay"){
                    setTimeout(run, delay*1000);
                    return;
                }

                if(properties['j:animationDelayUsage'] === "delayBeforeAnimation")
                    element.style.setProperty('animation-delay', `${properties['j:animationDelay']}s`);
            }
            run();
        }
    }

    //
    return (
        <>
            <Waypoint
                onEnter={() => handleWaypointEnter()}
                topOffset={offset || "0"}/>

            <Component
                ref={cmp}
                style={style}
                className={className}
                {...props}
            >
                {children}
            </Component>

        </>

    )
}
