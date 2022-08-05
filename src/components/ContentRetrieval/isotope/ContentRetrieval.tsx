import React from "react";
import {useNode, Node, ComponentPropsType, getComponent, JahiaCtx, CORE_NODE_FIELDS} from "@jahia/nextjs-sdk";
import {SubContent} from "./SubContent";
import {Col, Container, Row} from "react-bootstrap";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import {ContentRetrievalPropsType, SubContentQueryProps} from "../types";
import {contentRetrievalProperties} from "../properties";

const useStyles = makeStyles((theme?: any) => ({
// alimeProjectsMenu {
//     position: "relative",
//     zIndex: 1,
//     marginBottom: "40px",
//
//     ".portfolio-menu .btn" {
//         position: relative;
//         z-index: 1;
//         padding: 0;
//         border: 0;
//         background-color: transparent;
//         font-size: 20px;
//         font-weight: 600;
//         border-radius: 0;
//         margin: 0 25px;
//
//
//     @media #{$breakpoint-xs} {
//             font-size: 14px;
//         margin: 0 5px;
//     }
//
//     &::after {
//         @include transition-duration(500ms);
//             position: absolute;
//             width: 0%;
//             height: 3px;
//             background-color: $primary;
//             content: '';
//             bottom: -5px;
//             left: 0;
//             right: 0;
//             z-index: 1;
//         }
//
//     &.active {
//         &::after {
//                 width: 100%;
//             }
//         }
//     }
// }
}));

export const IsotopeContentRetrieval = ({id, referenceComponent,className}: ContentRetrievalPropsType) => {
    const {locale} = React.useContext(JahiaCtx);
    const styles = useStyles();

    // init one ref to store the future isotope object
    const isotope = React.useRef<Isotope | null>()
    // store the filter keyword in a state
    const [filterKey, setFilterKey] = React.useState('*')
    const [activeClass, setActiveClass] = React.useState('*')

    // initialize an Isotope object with configs
    React.useEffect(() => {
        if (typeof window !== 'undefined'){
            import("isotope-layout").then( Isotope => {
                isotope.current = new Isotope.default('.alime-portfolio', {
                    // itemSelector: ".all",
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.single_gallery_item'
                    }
                })
                return () => isotope.current?.destroy()
            })
        }
    }, [])

    // handling filter key change
    React.useEffect(() => {
        if (typeof window !== 'undefined' && isotope.current){
            filterKey === '*'
                ? isotope.current.arrange({filter: `*`})
                : isotope.current.arrange({filter: `.${filterKey}`})
            setActiveClass(filterKey);
        }
    }, [filterKey])

    const {data, loading, error} = useNode(id, [...contentRetrievalProperties])

    if (loading) {
        return <div>loading</div>;
    }
    if (error) {
        console.error(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    if(!data || !data.properties)
        return <div className="text-warning">No data returned by IsotopeContentRetrieval</div>

    const properties  = data.properties;
    const filter = properties['j:filter'] as Node[];
    const queryProps : SubContentQueryProps = {
        nodeType:properties['j:type'] as string,
        startNode:properties['j:startNode'] as Node,
        filter,
        maxItems: properties.maxItems as string,
        sortCriteria: properties['j:criteria'] as string,
        sortDirection: properties['j:sortDirection'] as string,
        locale:locale as string
    }

    const handleFilterKeyChange = (key: string) => () => setFilterKey(key)

    return (
        <div className="section">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="alime-projects-menu">
                            <div className="portfolio-menu text-center">
                                <button
                                    className={classnames(
                                        "btn",
                                        {active : activeClass === '*'})
                                    }
                                    onClick={handleFilterKeyChange('*')}>ALL</button>

                                {filter.map(category =>(<button
                                    key={category.uuid}
                                    className={classnames(
                                        "btn",
                                        {active : activeClass === category.name})
                                    }
                                    onClick={handleFilterKeyChange(category.name)}>{category.name.toUpperCase()}</button>))
                                }

                            </div>
                        </div>

                    </Col>
                </Row>

                <SubContent
                    queryProps={queryProps}
                    referenceComponent={referenceComponent}
                    subNodesView={properties['j:subNodesViewNextjs'] as string}
                    noResultsMessage={properties['j:noResultsMessage'] as string}
                />

            </Container>
        </div>
    )
}
