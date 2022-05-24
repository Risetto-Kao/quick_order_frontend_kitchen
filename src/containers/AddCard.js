import { CardContent, CardHeader, Grid, IconButton, makeStyles } from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    card: {
        border: "1px solid rgba(0,0,0,0.1)",
        color: "red"
    },
});


//     window.location.reload();


const AddCard = () => {
    const history = useHistory();
    const classes = useStyles();

    return (<Grid item key={"add"} xs={6} sm={3} md={3}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            className={classes.card}
        >
            <CardHeader titleTypographyProps={{ variant: 'h6' }} action={
                <IconButton aria-label="settings" onClick={() => history.push(`/detail/add`)}>
                    <Add />
                </IconButton>
            }
                title="新增菜單">

            </CardHeader>
            <CardContent>$</CardContent>
        </Card>
    </Grid>);
}

export default AddCard;