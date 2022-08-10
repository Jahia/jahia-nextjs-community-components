import {gql} from '@apollo/client';
// Import {animateProperties} from "../properties";

// const fragment = `
//     fragment AnimateFields on JCRNode {
//         properties(names:[${[...animateProperties]}]){
//             name
//             value
//         }
//     }
// `
const fragment = `
    fragment AnimateFields on JCRNode {
        properties(names:[
            "j:animation",
            "j:animationDelay",
            "j:animationDuration",
            "j:animationIterationCount",
            "j:animationDelayUsage"
        ]){
            name
            value
        }
    }
`;

export const ANIMATE_FIELDS = gql(fragment);

