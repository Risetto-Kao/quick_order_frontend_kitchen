import { Grid, Card, makeStyles } from "@material-ui/core";
import CounterItemsCard from "../components/CounterItemsCard";
import { primary } from "../constants/styles";
import Timer from "./Timer";


const useStyles = makeStyles({
    infoCard: {
        // minHeight: '15%',
        minWidth: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '10vh',
        fontSize: 20,
        fontWeight: 'bold',
        border: '1px solid rgba(0,0,0,0.1)',
    },
    itemsCard: {
        minHeight: '15%',
        minWidth: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '10px',
        border: '1px solid rgba(0,0,0,0.1)',
    },
});

const CounterOrderList = ({ order }) => {

    const classes = useStyles();

    return (
        <Grid container direction="row">
            <Card className={classes.infoCard}>
                顧客：林先生
            </Card>
            <Card className={classes.infoCard}>
                {order.tableNo} 桌
            </Card>

            <Card className={classes.itemsCard}>
                <CounterItemsCard items={order.items} />
            </Card>

            <Card className={classes.infoCard}>
                $ {order.totalPrice}
            </Card>
            <Card className={classes.infoCard}>
                <Timer time={order.time} />
            </Card>
            <Card className={classes.infoCard}>
                備註
            </Card>
        </Grid>
    );
}

export default CounterOrderList;
