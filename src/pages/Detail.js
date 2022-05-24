import { CardMedia, Grid, List, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
// import UploadImageButton from "./UploadImageButton";
import React from "react"
import { useMutation, gql, useQuery } from "@apollo/client"
import { QUERY_ITEMS } from "../graphql/queries";
import ImageUpload from "./ImageUpload";
import { CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../graphql/mutations";
import { Settings } from "@mui/icons-material";
import { Box } from "@mui/material";
import { primary } from "../constants/styles";


const Detail = () => {


    const history = useHistory();
    const { id } = useParams();
    const [currentFile, setCurrentFile] = useState({
        file: null
    });
    const { loading, error, data } = useQuery(QUERY_ITEMS, { variables: { restaurantId: "s001" } });
    const [currentItem, setCurrentItem] = useState(
        {
            id: "",
            name: "",
            price: 0,
            description: "",
            englishName: "",
            englishDescription: "",
            englishType: "main",
            img: "",
            type: "主食",
            comments: [],
        }
    );

    useEffect(() => {
        getData();
    }, []);

    const [createItemAPI, { createDate, createLoading, createError }] = useMutation(CREATE_ITEM);
    const [updateItemAPI, { updateData, updateLoading, updateError }] = useMutation(UPDATE_ITEM);
    const [deleteItemAPI, { deletedata, deleteLoading, deleteError }] = useMutation(DELETE_ITEM);

    const isAddPage = () => {
        return id === "add";
    }



    const getData = () => {
        if (id === null) return;
        if (isAddPage()) return;
        console.log(data.items);

        for (var i = 0; i < data.items.length; i++) {
            if (data.items[i].id === id) {
                setCurrentItem({
                    ...data.items[i], englishName: "",
                    englishDescription: "",
                    englishType: "main",
                });
                return;
            }
        }
    }

    const endEdit = () => {
        // history.goBack();
        history.push("/modify-menu");
        // history.go(0);
    }

    const handleCreate = async () => {
        try {
            await createItemAPI({
                variables: {
                    data: {
                        name: currentItem.name,
                        description: currentItem.description,
                        price: currentItem.price,
                        img: currentItem.img,
                        type: currentItem.type,
                        englishName: currentItem.englishName,
                        englishDescription: currentItem.englishDescription,
                        englishType: currentItem.englishType
                    },
                    file: currentFile
                }
            });
            console.log("create success");

        } catch (e) {
            console.log("error" + e);
        }

        endEdit();
    }

    const handleDelete = async () => {
        try {
            await deleteItemAPI({ variables: { deleteItemId: currentItem.id } });
            console.log("delete success");

        } catch (e) {
            console.log(e);
        }
        if (deleteError) console.log(deleteError);
        endEdit();
    }
    const handleUpdate = async () => {
        try {
            console.log(currentItem);
            await updateItemAPI({
                variables: {
                    updateItemId: currentItem.id,
                    data: {
                        name: currentItem.name,
                        description: currentItem.description,
                        price: currentItem.price,
                        img: currentItem.img,
                        type: currentItem.type,
                        englishName: currentItem.englishName,
                        englishDescription: currentItem.englishDescription,
                        englishType: currentItem.englishType
                    },

                    file: currentFile
                }
            });
            console.log("update success");

        } catch (e) {
            console.log("error" + e);
        }
        endEdit();
    }


    const handleChange = (prop) => (event) => {
        var value = event.target.value;
        if (value === "" && prop === "price") {
            value = 0;
        }
        if (prop === 'price') {
            value = parseInt(value);
        }
        setCurrentItem({ ...currentItem, [prop]: value });
    };



    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        console.log("file ", file)
        setCurrentFile(file);
        setCurrentItem({ ...currentItem, img: URL.createObjectURL(file) });
    }

    const MyPlaceHolder = () => {
        return <Box width={400} height={400} color="red"></Box>
    }

    if (loading) return <>loading...</>;
    if (error) return <>error</>

    if (id === "add") {
        return (
            <Grid container>
                <Grid item spacing={2} xs={9}>
                    <Image height={400} src={currentItem.img} />
                    <input type="file" onChange={handleFileChange} />
                </Grid>
                <Grid item container xs={3}>
                    <Grid spacing={2}>
                        <TextField style={{ marginBottom: "10px" }} variant="outlined" onChange={handleChange('name')} label="名稱" />
                    </Grid>
                    <Grid>
                        <TextField style={{ marginBottom: "10px" }} variant="outlined" onChange={handleChange('englishName')} label="英文名稱" />
                    </Grid>
                    <Grid>
                        <TextField style={{ marginBottom: "10px" }} variant="outlined" onChange={handleChange('price')} value={currentItem.price} label="價格" />
                    </Grid>
                </Grid>
                <Grid item lg={9} xs={9} spacing={1}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="描述"
                        multiline
                        rows={4}
                        onChange={handleChange("description")}
                    />
                </Grid>
                <Grid item lg={2}>
                    <Button onClick={handleCreate}>新增餐點</Button>
                </Grid>
                <Grid item lg={9} xs={9} spacing={1}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="英文描述"
                        multiline
                        rows={4}
                        onChange={handleChange("englishDescription")}
                    />
                </Grid>
                <Grid item lg={2}>
                    <Button onClick={endEdit}>取消新增</Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container>
            <Grid item spacing={2} xs={9}>
                <Image height={400} src={currentItem.img} />
                <input type="file" onChange={handleFileChange} />
            </Grid>
            <Grid item container xs={3}>
                <Grid spacing={2}>
                    <TextField variant="outlined" onChange={handleChange('name')} value={currentItem.name} label="名稱" />
                </Grid>
                <Grid>

                    <TextField variant="outlined" onChange={handleChange('englishName')} value={currentItem.englishName} label="英文名稱" />
                </Grid>
                <Grid>

                    <TextField variant="outlined" onChange={handleChange('price')} value={currentItem.price} label="價格" />
                </Grid>
            </Grid>
            <Grid item xs={9} spacing={1}>
                <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='描述'
                    color='primary'
                    multiline
                    rows={4}
                    defaultValue={currentItem.description}
                    onChange={handleChange('description')}
                // style={{ background:  }}
                />
            </Grid>
            <Grid item xs={3}>
                <Button onClick={handleUpdate}>更新資料</Button>
            </Grid>
            <Grid item xs={9} spacing={1}>
                <TextField
                    fullWidth
                    variant='outlined'
                    placeholder="英文描述"
                    multiline
                    rows={4}
                    defaultValue={currentItem.englishDescription}
                    onChange={handleChange('englishDescription')}
                />
            </Grid>
            <Grid item xs={3}>
                <Button onClick={handleDelete}>刪除資料</Button>
            </Grid>
            <Grid>
                評論
                <List>
                    {currentItem.comments.map(c => (<div id={c.name}>{c.name} {c.content} {c.rate}</div>))}
                </List>
            </Grid>
        </Grid>
    );
}

export default Detail;