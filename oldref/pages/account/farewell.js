import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PageContentTitle from '../../src/layout/elements/page-content-title';

export default class Farewell extends Component {

    render(props) {

        return (
            <Container maxWidth="lg">
                <PageContentTitle title="Goodbye, thanks for visiting!" />
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Goodbye, thanks for visiting!
                    </Typography>
                </Box>
            </Container>
        );
    }

}