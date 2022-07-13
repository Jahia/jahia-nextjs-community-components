import React, {useContext} from 'react';
import {JahiaCtx, MainResourceCtx, ComponentPropsType} from '@jahia/nextjs-sdk';
import {useQuery} from '@apollo/client';
import {queryGrid} from './gqlQuery';
import {
    BS4Section as Section,
    BS4Container as Container,
    BS4Row as Row
} from './components';


export const BS4Grid = ({id}: ComponentPropsType) => {
    const {workspace, locale} = useContext(JahiaCtx);
    // const mainResourcePath = React.useContext(MainResourceCtx);

    const {data, error, loading} = useQuery(queryGrid, {
        variables: {
            workspace,
            id,
            animate:true //how to configure this ? env var?
        },
    });

    // Const divs = useMemo(() => !loading && getJahiaDivsProps(data.jcr?.nodeById?.renderedContent?.output), [data, loading]);

    if (loading) {
        return 'loading';
    }

    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>;
    }

    const grid = data?.jcr?.nodeById;
    // Console.log("[BS4Grid] grid : ",grid);
    const mixins = grid.mixinTypes?.map((mixin: { name: string; }) => mixin.name) || [];

    return (
        <Section grid={grid} mixins={mixins}>
            <Container grid={grid} mixins={mixins}>
                <Row grid={grid} mixins={mixins}/>
            </Container>
        </Section>
    );
}
