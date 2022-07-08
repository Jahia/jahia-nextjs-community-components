import {gql} from "@apollo/client";
import {animateProperties} from "../properties";

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
`

export const ANIMATE_FIELDS = gql(fragment);

