import { CardMedia, Grid, List, TextField, Button, Input, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react"
import { useMutation, gql, useQuery } from "@apollo/client"
import { QUERY_ITEMS } from "../graphql/queries";
import { CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM } from "../graphql/mutations";
import { Box } from "@mui/material";
import { ClassNames } from "@emotion/react";
import DropdownType from "../containers/DropdownType";


const useStyle = makeStyles({
    fullWidth: {
        background: 'rgba(0,0,0,0.05)',
        marginTop: '5px',
        marginBottom: '5px',

        // border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '10px'
    },
    textField: {

    },
    button: {

    }
});


const Detail = () => {
    const classes = useStyle();

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
    }, [data]);

    const [createItemAPI, { createDate, createLoading, createError }] = useMutation(CREATE_ITEM);
    const [updateItemAPI, { updateData, updateLoading, updateError }] = useMutation(UPDATE_ITEM);
    const [deleteItemAPI, { deletedata, deleteLoading, deleteError }] = useMutation(DELETE_ITEM);

    const isAddPage = () => {
        return id === "add";
    }



    const getData = () => {
        if (id === null) return;
        if (isAddPage()) return;
        if (loading) return;
        if (error) return;
        for (var i = 0; i < data.itemAllLang.length; i++) {
            if (data.itemAllLang[i].id === id) {
                setCurrentItem({
                    ...data.itemAllLang[i],
                });
                return;
            }
        }
    }

    const endEdit = () => {
        window.location.replace("/modify-menu");
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

    const setType = (newType) => {
        setCurrentItem({ ...currentItem, type: typeTranslation[newType], englishType: newType })
    }


    const typeTranslation = {
        'Main': '主食',
        'Dessert': '點心',
        'Beverage': '飲料'
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setCurrentFile(file);
        setCurrentItem({ ...currentItem, img: URL.createObjectURL(file) });
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
                    <DropdownType setItemType={setType} />
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
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="描述"
                        multiline
                        minRows={4}
                        onChange={handleChange("description")}
                        className={classes.fullWidth}

                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="英文描述"
                        multiline
                        minRows={4}
                        onChange={handleChange("englishDescription")}
                        className={classes.fullWidth}

                    />
                </Grid>
                <Grid item >
                    <Button style={{ background: 'yellow', marginLeft: '20px', marginTop: '20px' }} variant="contained" onClick={handleCreate}>新增餐點</Button>
                </Grid>
                <Grid item >
                    <Button style={{ marginLeft: '20px', marginTop: '20px' }} variant="contained" onClick={endEdit}>取消新增</Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <>
            <Grid container style={{ marginBottom: '20px' }}>
                <Grid item spacing={2} xs={9}>
                    <Image height={400} src={currentItem.img} />
                    <input type="file" onChange={handleFileChange} />
                </Grid>
                <Grid item container xs={3}>
                    <DropdownType currentType={currentItem.englishType} setItemType={setType} />
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
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder='描述'
                        color='primary'
                        multiline
                        minRows={4}
                        defaultValue={currentItem.description}
                        onChange={handleChange('description')}
                        className={classes.fullWidth}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder="英文描述"
                        multiline
                        minRows={4}
                        defaultValue={currentItem.englishDescription}
                        onChange={handleChange('englishDescription')}
                        className={classes.fullWidth}
                    />
                </Grid>

                <Grid item xs={2}>
                    <Button style={{ background: 'yellow', marginLeft: '20px', marginTop: '20px' }} variant="contained" onClick={handleUpdate}>更新資料</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button style={{ background: '#FF7575', marginLeft: '20px', marginTop: '20px' }} variant="contained" onClick={handleDelete}>刪除資料</Button>
                </Grid>

            </Grid>
            <Grid>
                評論
                <List>
                    {currentItem.comments.map(c => (<div id={c.name}>{c.name} {c.content} {c.rate}</div>))}
                </List>
            </Grid>
        </>
    );
}

export default Detail;