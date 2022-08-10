export const animateProperties = [
    'j:animation',
    'j:animationDelay',
    'j:animationDuration',
    'j:animationIterationCount',
    'j:animationDelayUsage'
];

export const convert = (properties:Array<{[k: string]: string}>) =>
    properties.reduce((props:{[k: string]: string}, prop) => {
        props[prop.name] = prop.value;
        return props;
    }, {});

export const getAnimateProps = (properties:{[key:string]:any} = {}) => Object.keys(properties)
    .filter(key => animateProperties.includes(key))
    .reduce((props:{[k: string]: string}, key) => {
        props[key] = properties[key];
        return props;
    }, {});
