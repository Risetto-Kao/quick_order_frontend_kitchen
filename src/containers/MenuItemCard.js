// import { Card, CardContent, CardHeader, IconButton, ListItemSecondaryAction, makeStyles, Typography } from "@material-ui/core";
// import { ArrowBack } from "@material-ui/icons";
// import React, { useState } from "react";

// const useStyles = makeStyles({
//     test: {
//         border: (item) => {
//             if (item.price > 50) {
//                 return '2px solid green';
//             }
//         }
//     }
// });

// const MenuItemCard = ({ item }) => {

//     const classes = useStyles(item);

//     return (

//         <Card elevation={3} className={classes.test} >
//             <CardHeader
//                 title={item.name}
//                 subheader={item.type}
//             />
//             <CardContent>
//                 <Typography color='textSecondary'>
//                     {item.description}
//                 </Typography>
//             </CardContent>
//         </Card>
//     );
// }

// export default MenuItemCard;