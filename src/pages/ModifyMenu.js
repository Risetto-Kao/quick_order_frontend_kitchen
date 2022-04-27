import * as React from 'react';
import ReactDOM from "react-dom";
import ImageUpload from "./ImageUpload";
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

// 根據餐點數量產生對應數量的cards
const cards = [1, 2, 3, 4, 5, 6, 7]; //數字應替換成ItemID(餐點ID)
const add = [1]; //新增餐點那格

cards[1] = '001';

const theme = createTheme();

const galleryImageList = [

];

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://aot-wpengine.netdna-ssl.com/wp-content/uploads/2013/07/east-african-food.jpg" /*此處放入餐點照片連結*/
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      此處串接餐點名稱
                    </Typography>
                    <Typography>
                      此處串接餐點簡介
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="medium">刪除餐點</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Grid container spacing={4}></Grid>
            {add.map((add) => (
              <Grid item key={add} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                >
                  <CardContent sx={{ flexGrow: 1 }} align="center" justify="center">
                    <ImageUpload cardName="Input Image" width= "100%" imageGallery={galleryImageList} justify='center' align='center'/>
                  </CardContent>

                  <CardContent sx={{ flexGrow: 1 }} align="center" justify="center">
                    <TextField id="ItemName" label="輸入餐點名稱"/>
                  </CardContent>

                  <CardContent sx={{ flexGrow: 1 }} align="center" justify="center" height="50%">
                    <TextField id="ItemDescription" label="輸入餐點描述" multiline={true} rows={5}/>
                  </CardContent>
                  
                  <CardActions>
                    <Button size="medium">新增餐點（更新至資料庫）</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            
          </Grid>
        </Container>
      </main>
      
    </ThemeProvider>
  );
}