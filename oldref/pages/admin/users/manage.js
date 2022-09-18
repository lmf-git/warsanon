import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default class UsersManage extends Component {

  render() {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create World
          </Typography>

          Allow banning, blocking, sending admin message to user, reset password, other common tasks.
        </Box>
      </Container>
    );
  }

}
