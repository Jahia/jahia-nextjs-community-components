import {gql} from '@apollo/client';
import {CORE_NODE_FIELDS} from '@jahia/nextjs-sdk';
import {ANIMATE_FIELDS} from '../Animate';
export const queryGrid = gql`query (
        $workspace:Workspace!,
        $id: String!,
        $animate: Boolean!
    ){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                ...CoreNodeFields
                ...SectionFields
                ...ContainerFields
                ...RowFields
                ...AnimateFields @include(if: $animate)
                children{
                    nodes{
                        ...CoreNodeFields
                        ...AnimateFields @include(if: $animate)
                    }
                }
            }
        }
    }
    fragment SectionFields on JCRNode {
        sectionElement:property(name:"sectionElement") {value}
        sectionId:property(name:"sectionId") {value}
        sectionCssClass:property(name:"sectionCssClass") {value}
        sectionStyle:property(name:"sectionStyle") {value}
        sectionRole:property(name:"sectionRole") {value}
        sectionAria:property(name:"sectionAria") {value}
    }
    fragment ContainerFields on JCRNode {
        containerId:property(name:"containerId") {value}
        containerCssClass:property(name:"containerCssClass") {value}
        gridLayout:property(name:"gridLayout") {value}
    }
    fragment RowFields on JCRNode {
        typeOfGrid:property(name:"typeOfGrid") {value}
        grid:property(name:"grid") {value}
        gridClasses:property(name:"gridClasses") {value}
        rowId:property(name:"rowId") {value}
        rowCssClass:property(name:"rowCssClass") {value}
        rowVerticalAlignment:property(name:"rowVerticalAlignment") {value}
        rowHorizontalAlignment:property(name:"rowHorizontalAlignment") {value}
        
    }
    ${CORE_NODE_FIELDS}
    ${ANIMATE_FIELDS}`;
