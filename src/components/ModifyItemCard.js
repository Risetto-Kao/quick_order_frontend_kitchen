import { useMutation } from "@apollo/client";
import { Button, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@material-ui/core";
import { Delete, Edit, MoreVert } from "@material-ui/icons";
import { valueToPercent } from "@mui/base";
import { SaveAs } from "@mui/icons-material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { DELETE_ITEM, UPDATE_ITEM, UPLOAD_FILE } from "../graphql/mutations";

const ModifyItemCard = ({ item }) => {

    // const [isEditMode, setIsEditMode] = useState(false);
    const [uploadImage, setUploadImage] = useState("")
    const [deleteItemAPI] = useMutation(DELETE_ITEM);
    const [updateItemAPI] = useMutation(UPDATE_ITEM);

    const [values, setValues] = useState(
        {
            name: item.name,
            price: item.price,
            img: item.img
        }
    );

    const history = useHistory();


    const handleChange = (prop) => (event) => {
        var value = event.target.value;
        if (prop === 'price') value = parseInt(value);
        setValues({ ...values, [prop]: value });
    };

    const deleteItem = async () => {
        await deleteItemAPI({ variables: { deleteItemId: item.id } });
        window.location.reload();
    }

    const updateItem = async () => {

        if (needUpdate()) {
            await updateItemAPI({ variables: { updateItemId: item.id, data: values, file: uploadImage } });
            window.location.reload();
        } else {
            // handleMode();
        }
    }

    const needUpdate = () => {
        if (values.name !== item.name) return true;
        if (values.price !== item.price) return true;
        if (values.img !== item.img) return true;
        if (uploadImage !== "") return true;
        return false;
    }
    const handleImgChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setUploadImage(file)
    }

    return (<Grid item key={item.id} xs={6} sm={3} md={3}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardHeader titleTypographyProps={{ variant: 'h6' }} action={
                <IconButton aria-label="settings" onClick={() => window.location.replace(`/detail/${item.id}`)}>
                    <Edit />
                </IconButton>
            }
                title={item.name}>

            </CardHeader>
            <CardContent>
                $ {item.price}
            </CardContent>
        </Card>
    </Grid>);
    // }

}

export default ModifyItemCard;