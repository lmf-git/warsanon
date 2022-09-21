import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
  footer: {
    paddingTop: '7.5em',
    paddingBottom: '2.5em'
  }
}));


export default function PageContentTitle(props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
            { title }
        </Typography>
    </Box>
  );
}
