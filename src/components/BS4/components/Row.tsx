import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    BS4ContentTypesEnum as BS4,
    BS4PropsType,
    RowPropsType,
    RowNodeType,
    RowColsType,
    BreakpointType
} from '../types';
import {JahiaComponent} from '@jahia/nextjs-sdk';

const renderComponent = (node : RowNodeType) => (
    <JahiaComponent
        key={node.uuid}
        node={node}
        tagProps={{
            type: 'area',
            nodetypes: node.nodetypes?.values || ['jmix:droppableContent'],
            listlimit: node.listlimit?.value,
            // Note : get this dynamically
            referencetypes: ['jnt:fileReference[jnt:file]', 'jnt:fileI18nReference[jnt:file]', 'jnt:contentReference[jmix:droppableContent]', 'jnt:contentFolderReference[jnt:contentFolder]', 'jnt:portletReference[jnt:portlet]', 'jnt:imageReferenceLink[jmix:image]', 'jnt:imageReference[jmix:image]', 'jnt:nodeLinkImageReference[jmix:image]', 'jnt:nodeLinkI18nImageReference[jmix:image]', 'jnt:externalLinkImageReference[jmix:image]', 'jnt:externalLinkI18nImageReference[jmix:image]', 'jnt:imageI18nReference[jmix:image]'],
            allowreferences: true,
        }}
    />
);

export const BS4Row = ({grid, mixins, children} : BS4PropsType) => {

    if (!mixins.includes(BS4.createRow)) {
        if (children) {
            return children;
        }

        return grid.children?.nodes?.map( (node : RowNodeType) => renderComponent(node));
    }

    const rowProps : RowPropsType= {};
    if (grid.rowId?.value) {
        rowProps.id = grid.rowId.value;
    }

    if (grid.rowCssClass?.value) {
        rowProps.className = `${grid.rowCssClass?.value} ${grid.rowVerticalAlignment?.value || ''} ${grid.rowHorizontalAlignment?.value || ''}`;
    }

    // Console.log("[BS4Row] mixins : ",mixins);
    // console.log("[BS4Row] children : ",children);
    // console.log("[BS4Row] rowProps : ",rowProps);

    function renderRow({cols} : {cols : RowColsType}) {
        return (
            <Row {...rowProps}>
                {cols.map((col, index) => {
                    // Console.log("grid.children?.nodes: ",grid.children?.nodes)
                    const node = grid.children?.nodes[index];
                    // Console.log("node: ",node)

                    const {breakpoint, className} = col;
                    return (
                        <Col key={node.uuid} {...breakpoint} className={className}>
                            {renderComponent(node)}
                        </Col>
                    );
                })}
            </Row>
        );
    }

    function getGrid() {
        if (mixins.includes(BS4.predefinedGrid)) {
            // Console.log("cols 1: ",grid.grid?.value?.split('_'))
            const cols = grid.grid?.value?.split('_')
                .map( (col :string) => ({breakpoint: {md: col}}));
            // Console.log("cols 2: ",cols)
            return renderRow({
                cols,
            });
        }

        // Col-lg-4 order-lg-2,col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1,col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3
        if (mixins.includes(BS4.customGrid)) {
            // Console.log("customGrid : ",grid.gridClasses);
            const cols = grid.gridClasses?.value?.split(',')
                .map( (col : string) => {
                    // Col = "col-lg-4 order-lg-2"
                    const regex = /col-(?<key>[a-z]{2})-(?<value>[0-9]{1,2})/gm;
                    let className = col;
                    const breakpoint:BreakpointType = {};
                    col.replace(regex, (match, key:string, value:string) : any => {
                        breakpoint[key] = value;
                        className = className.replace(match, '');
                    });
                    return {breakpoint, className};
                    // Console.log("breakpoint :",breakpoint);
                    // console.log("className :",className);
                });
            return renderRow({
                cols,
            });
        }
    }

    return getGrid();
}