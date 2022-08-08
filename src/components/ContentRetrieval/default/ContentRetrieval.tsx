import React from "react";
import {useNode, Node, ComponentPropsType, JahiaCtx} from "@jahia/nextjs-sdk";
import {SubContent} from "./SubContent";
import {Col, Container, Row} from "react-bootstrap";
import {contentRetrievalProperties} from "../properties";
import {ContentRetrievalPropsType, SubContentQueryProps} from "../types";
import classnames from "classnames";

export const ContentRetrieval = ({id, referenceComponent,className}: ContentRetrievalPropsType) => {
    const {locale} = React.useContext(JahiaCtx);
    const {data, loading, error} = useNode(id, [...contentRetrievalProperties])

    if (loading) {
        return <div>loading</div>;
    }
    if (error) {
        console.error(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    if(!data || !data.properties)
        return <div className="text-warning">No data returned by ContentRetrieval</div>


    const properties  = data.properties;
    const queryProps : SubContentQueryProps = {
        nodeType:properties['j:type'] as string,
        startNode:properties['j:startNode'] as Node,
        filter:properties['j:filter'] as Node[],
        maxItems: properties.maxItems as string,
        sortCriteria: properties['j:criteria'] as string,
        sortDirection: properties['j:sortDirection'] as string,
        locale:locale as string
    }

    return (
        <div className={classnames("section",className)}>
            <Container>
                <Row className="justify-content-center mb-5">
                    <Col lg={8} className="text-center">
                        <h2 className="heading mb-4">{properties['jcr:title'] as string}</h2>
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
