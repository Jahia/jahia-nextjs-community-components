import React from "react";
import { useQuery} from "@apollo/client";
import {getComponent, JahiaCtx, GqlNode, Node, convert} from "@jahia/nextjs-sdk";
import {Col, Row} from "react-bootstrap";
import {SubContentPropsType} from "../types";
import {getSubContentQuery} from "../graphql/subContentQuery";

export const SubContent= ({queryProps,referenceComponent,className,subNodesView,noResultsMessage}:SubContentPropsType) => {
    const {workspace} = React.useContext(JahiaCtx);

    const {data, error, loading} = useQuery(getSubContentQuery(queryProps), {
        variables: {
            workspace
        },
    });

    if (loading) {
        return <div>loading</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const {nodes} = data.jcr.nodesByCriteria;
    if(!Array.isArray(nodes) || nodes.length === 0)
        return <div className="text-warning">{noResultsMessage || "No result"}</div>

    const getNodeDisplay =(gqlNode:GqlNode)  => {
        let node = convert(gqlNode);

        node = {
            ...node,
            view : subNodesView || 'default'
        }
        const Component = referenceComponent ? referenceComponent : getComponent(node);
        const contentProps : {[key:string]:string}={
            id: node.uuid,
            path: node.path
        }
        return (
            <Col lg={3} md={4} sm={6}>
                <Component {...contentProps}/>
            </Col>
        )
    }

    return (
        <Row className={className}>
            {nodes.map((node:GqlNode) => getNodeDisplay(node))}
        </Row>
    )
}
