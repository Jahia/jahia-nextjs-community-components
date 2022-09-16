import React from 'react';
import {useNode, Node, JahiaCtx} from '@jahia/nextjs-sdk';
import {SubContent} from './SubContent';
import {MenuBtn} from './MenuBtn';
import {Col, Container, Row} from 'react-bootstrap';
import classnames from 'classnames';
import {makeStyles} from '~/makesStyles';
import {ContentRetrievalPropsType, SubContentQueryProps} from '../types';
import {contentRetrievalProperties} from '../properties';

const useStyles = makeStyles()(theme => ({
    menu: {
        position: 'relative',
        zIndex: 1,
        marginBottom: '40px'
    },

    btn: {
        position: 'relative',
        zIndex: 1,
        padding: 0,
        border: 0,
        backgroundColor: 'transparent',
        fontSize: '20px',
        fontWeight: 600,
        borderRadius: 0,
        margin: '0 25px 25px',
        transitionDuration: '500ms',
        textTransform: 'capitalize',

        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            margin: '0 5px'
        },

        '&::after': {
            transitionDuration: '500ms',
            position: 'absolute',
            width: '0%',
            height: '3px',
            backgroundColor: 'var(--primary)',
            content: '\'\'',
            bottom: '-5px',
            left: 0,
            right: 0,
            zIndex: 1
        },

        '&.active': {
            '&::after': {
                width: '100%'
            }
        }
    }
}));

export const IsotopeContentRetrieval = ({id, referenceComponent, className}: ContentRetrievalPropsType) => {
    const {locale} = React.useContext(JahiaCtx);
    const {classes} = useStyles();

    // Init one ref to store the future isotope object
    const isotope = React.useRef<Isotope | null>();
    // Store the filter keyword in a state
    const [filterKey, setFilterKey] = React.useState('*');
    const [activeClass, setActiveClass] = React.useState('*');
    const isotopeId = `isotope-${id}`;
    // Initialize an Isotope object with configs
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            import('isotope-layout').then(Isotope => {
                setTimeout(() => {
                    isotope.current = new Isotope.default(`#${isotopeId}`, {
                        // ItemSelector: ".all",
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.single_gallery_item'
                        }
                    });
                    return () => isotope.current?.destroy();
                }, 250);
            });
        }
    }, []);

    // Handling filter key change
    React.useEffect(() => {
        if (typeof window !== 'undefined' && isotope.current) {
            if (filterKey === '*') {
                isotope.current.arrange({filter: '*'});
            } else {
                isotope.current.arrange({filter: `.${filterKey}`});
            }

            setActiveClass(filterKey);
        }
    }, [filterKey]);

    const {data, loading, error} = useNode(id, [...contentRetrievalProperties]);

    if (loading) {
        return <div>loading</div>;
    }

    if (error) {
        console.error(error);
        return <div>[IsotopeContentRetrieval] Error when loading ${JSON.stringify(error)}</div>;
    }

    if (!data || !data.properties) {
        return <div>No data returned by IsotopeContentRetrieval</div>;
    }

    const properties = data.properties;
    const filter = properties['j:filter'] as Node[] | [];
    const queryProps : SubContentQueryProps = {
        nodeType: properties['j:type'] as string,
        startNode: properties['j:startNode'] as Node,
        filter,
        maxItems: properties.maxItems as string,
        sortCriteria: properties['j:criteria'] as string,
        sortDirection: properties['j:sortDirection'] as string,
        locale: locale as string
    };

    const handleFilterKeyChange = (key: string) => () => setFilterKey(key);

    return (
        <div className={classnames('section', className)}>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className={classes.menu}>
                            <div className="text-center">
                                {filter.length > 1 &&
                                    <button
                                        type="button"
                                        className={classnames(
                                            'btn',
                                            classes.btn,
                                            {active: activeClass === '*'})}
                                        onClick={handleFilterKeyChange('*')}
                                    >All
                                    </button>}
                                {filter.map(category => (
                                    <MenuBtn key={category.uuid}
                                             id={category.uuid}
                                             activeClass={activeClass}
                                             handleClick={handleFilterKeyChange}
                                             styles={classes.btn}/>
                                  )
                                )}
                            </div>
                        </div>

                    </Col>
                </Row>

                <SubContent
                    queryProps={queryProps}
                    referenceComponent={referenceComponent}
                    subNodesView={properties['j:subNodesViewNextjs'] as string}
                    noResultsMessage={properties['j:noResultsMessage'] as string}
                    isotopeId={isotopeId}
                />

            </Container>
        </div>
    );
};
