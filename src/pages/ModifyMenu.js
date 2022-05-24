import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import { QUERY_ITEMS } from '../graphql/queries';
import { CardHeader, IconButton } from '@material-ui/core';
import { MoreHoriz, MoreVert } from '@material-ui/icons';
import ModifyItemCard from '../components/ModifyItemCard';
import { useHistory } from 'react-router-dom';
import AddCard from '../containers/AddCard';

export default function Album() {

  // todo: add data from backend
  const [items, setItems] = useState([]);
  const theme = createTheme();

  const { loading, error, data } = useQuery(QUERY_ITEMS, { variables: { restaurantId: "s001" } });

  useEffect(() => {
    if (data) {
      setItems(data.itemAllLang);
      console.log(data.itemAllLang);
    }
  }, [loading]);

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error ^U^</div>

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container>
          <Grid container spacing={4}>
            <AddCard />
            {items.map((item) => (
              <ModifyItemCard key={item.id} item={item} />
            ))}
            <Grid container spacing={4}></Grid>
          </Grid>
        </Container>
      </main>

    </ThemeProvider>
  );
}