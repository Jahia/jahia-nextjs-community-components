import {gql} from "@apollo/client";
import {animateProperties} from "../properties";

const fragment = `
    fragment AnimateFields on JCRNode {
        properties(names:[${[...animateProperties]}]){
            name
            value
        }
    }
`
export const ANIMATE_FIELDS = gql(fragment);

