import React from "react";
import {useQuery} from "@apollo/client";
import {getComponent, JahiaCtx, GqlNode, Node, convert} from "@jahia/nextjs-sdk";
import {Col, Row} from "react-bootstrap";
import classNames from "classnames";
import {getSubContentQuery} from "../graphql/subContentQuery";
import {SubContentPropsType} from "../types";
import classnames from "classnames";

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
        let categories : string[] = [];
        if(node.properties){
            const nodeCat = node.properties['j:defaultCategory'] as unknown as Node[]
            categories = nodeCat.map(cat => cat.name)
        }

        node = {
            ...node,
            view : subNodesView || 'isotope'
        }
        const Component = referenceComponent ? referenceComponent : getComponent(node);
        const contentProps : {[key:string]:string}={
            id: node.uuid,
            path: node.path
        }
        return (
            <Col xs={12} sm={6} lg={3} className={classNames("single_gallery_item wow mb-30",categories)}>
                <Component {...contentProps}/>
            </Col>
        )
    }

    return (
        <Row className={classnames("alime-portfolio",className)}>
            {nodes.map((node:GqlNode) => getNodeDisplay(node))}
        </Row>
    )
}
