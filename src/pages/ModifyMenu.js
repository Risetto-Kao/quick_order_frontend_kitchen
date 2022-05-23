import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
// import ImageUpload from "./ImageUpload";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
  // const loading = false;
  // const error = false;

  const { loading, error, data } = useQuery(QUERY_ITEMS, { variables: { restaurantId: "s001" } });




  // const [deleteItemAPI, { data, loading, error }] = useMutation(DELETE_ITEM);
  // const [updateItemAPI, { updateData, updateLoading, updateError }] = useMutation(UPDATE_ITEM);

  // const [values, setValues] = useState(
  //     {
  //         name: item.name,
  //         price: item.price,
  //         img: item.img
  //     }
  // );



  // const handleChange = (prop) => (event) => {
  //     var value = event.target.value;
  //     if (prop === 'price') value = parseInt(value);
  //     setValues({ ...values, [prop]: value });
  // };

  // const handleMode = () => {
  //     setIsEditMode(!isEditMode);
  // }


  // const deleteItem = async () => {
  //     await deleteItemAPI({ variables: { deleteItemId: item.id } });
  //     window.location.reload();
  // }

  // const updateItem = async () => {

  //     if (needUpdate()) {
  //         await updateItemAPI({ variables: { updateItemId: item.id, data: values } });
  //         window.location.reload();
  //     } else {
  //         handleMode();
  //     }
  // }

  useEffect(() => {
    if (data) {
      setItems(data.items)
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