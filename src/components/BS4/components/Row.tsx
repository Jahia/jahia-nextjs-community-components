import React from 'react';
import * as PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Area} from '@jahia/nextjs-sdk';

import {
    BS4ContentTypesEnum as BS4,
    BS4PropsType,
    RowPropsType,
    RowNodeType,
    RowColsType,
    BreakpointType
} from '../types';

import {Animate, getAnimateProps} from '../../Animate';

// import {JahiaComponent} from '@jahia/nextjs-sdk';

// const renderComponent = (node : RowNodeType) => (
//     <JahiaComponent
//         key={node.uuid}
//         node={node}
//         tagProps={{
//             type: 'area',
//             nodetypes: node.nodetypes?.values || ['jmix:droppableContent'],
//             listlimit: node.listlimit?.value,
//             // Note : get this dynamically
//             referencetypes: ['jnt:fileReference[jnt:file]', 'jnt:fileI18nReference[jnt:file]', 'jnt:contentReference[jmix:droppableContent]', 'jnt:contentFolderReference[jnt:contentFolder]', 'jnt:portletReference[jnt:portlet]', 'jnt:imageReferenceLink[jmix:image]', 'jnt:imageReference[jmix:image]', 'jnt:nodeLinkImageReference[jmix:image]', 'jnt:nodeLinkI18nImageReference[jmix:image]', 'jnt:externalLinkImageReference[jmix:image]', 'jnt:externalLinkI18nImageReference[jmix:image]', 'jnt:imageI18nReference[jmix:image]'],
//             allowreferences: true,
//         }}
//     />
// );

export const BS4Row = ({grid, mixins, children} : BS4PropsType) => {

    if (!mixins.includes(BS4.createRow)) {
        if (children) {
            return <>{children}</>;
        }

        //return or create section or container area in case there is no row
        if(Array.isArray(grid.children.nodes) && grid.children.nodes.length > 0){
            return grid.children.nodes.map( (node : RowNodeType) =>
                <Area key={node.uuid} name={node.name} path={grid.path} />
            );
        }else{
            const prefix = mixins.includes(BS4.createContainer)?"container":"section";
            return <Area name={`${prefix}-area`} path={grid.path} />
        }
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

    const renderCols = ({cols} : {cols : RowColsType}) =>
        cols.map((col, index) => {
            const node = grid.children?.nodes[index];
            const {breakpoint, className} = col;
            // return (
            //     <Col key={node?.uuid || index} {...breakpoint} className={className}>
            //         <Area name={node?.name || `col${index}`} path={grid.path} />
            //     </Col>
            // );
            return (
                <Animate key={node?.uuid || index} properties={getAnimateProps(node)} component={Col} {...breakpoint} className={className}>
                    <Area name={node?.name || `col${index}`} path={grid.path} />
                </Animate>
            );
        })

    function renderRow({cols} : {cols : RowColsType}) {
        if(!cols)
            return <div>No columns defined for the row, please update your content</div>;

        const useAnimate = (!mixins.includes(BS4.createSection) || !grid.sectionElement?.value) && !mixins.includes(BS4.createContainer)
        const Component = useAnimate ? Animate : Row;

        if(useAnimate){
            rowProps.properties = getAnimateProps(grid);
            rowProps.component = Row
        }


        return (
            <Component {...rowProps}>
                {renderCols({cols})}
            </Component>
        );
    }

    function getGrid() {

        if (mixins.includes(BS4.predefinedGrid)) {
            const cols = grid.grid?.value?.split('_')
                .map( (col :string) => ({breakpoint: {md: col}}));
            return renderRow({cols});
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
            return renderRow({cols});
        }

    }

    return getGrid();
}

BS4Row.propTypes = {
    grid: PropTypes.object.isRequired,
    mixins: PropTypes.array,
    children: PropTypes.node,
};
