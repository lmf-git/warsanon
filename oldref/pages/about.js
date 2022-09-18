import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import PageContentTitle from '../src/layout/elements/page-content-title';


export default class About extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <PageContentTitle title="About" />
      </Container>
    );
  }
}