export const animateProperties = [
    'j:animation',
    'j:animationDelay',
    'j:animationDuration',
    'j:animationIterationCount',
    'j:animationDelayUsage'
];

export const getAnimateProps = (properties:{[key:string]:any} = {}) => Object.keys(properties)
    .filter(key=>animateProperties.includes(key))
    .reduce((props:{[key: string]:string},key) =>{
        if(typeof properties[key] === 'string'){
            props[key]=properties[key];
        }else{
            props[key]=properties[key].value;
        }
        return props;
    },{});
