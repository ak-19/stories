import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Typography, AppBar, Grow, Grid } from '@mui/material';

import memories from './images/memories.png'
import Form from './components/Form/form';
import Posts from './components/Posts/posts';
import { getPost } from './actions/posts'

import './application.css';

const Application = () => {
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])

  return (
    <Container maxwidth="lg">
      <AppBar className="appBar" position="static" color="inherit">
        <Typography className="heading" variant="h2" align="center"> My stories </Typography>
        <img className="image" src={memories} alt="memories" height="120" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}><Posts setCurrentId={setCurrentId} /></Grid>
            <Grid item xs={12} sm={4}><Form currentId={currentId} setCurrentId={setCurrentId} /></Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default Application;
