import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import PageContentTitle from '../src/layout/elements/page-content-title';


export default class DonatePage extends Component {
  render() {
    return (
      <Container maxWidth="lg">
        <PageContentTitle title="Donate" />
      </Container>
    );
  }
}