import { Grid, Card, makeStyles } from "@material-ui/core";
import CounterItemsCard from "../components/CounterItemsCard";
import { primary } from "../constants/styles";
import Timer from "./Timer";


const useStyles = makeStyles({
    container: {
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        borderTop: '1px solid rgba(0,0,0,0.1)',
    },
    basicInfoCard: {
        minHeight: '15%',
        width: '13%',
        marginLeft: '10px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginRight: '15px',

    },
    infoCard: {
        minHeight: '15%',
        minWidth: '7%',
        marginLeft: '10px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: '15px'
        // borderRight: '1px solid rgba(0,0,0,0.1)'
    },
    itemsCard: {
        minHeight: '15%',
        minWidth: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '10px',
    },
    isTakeOut: {
        fontSize: '15px',
        color: 'rgba(0,0,0,0.5)',
        textAlign: 'right',
        // background: 'red',
        width: '100%',
        marginTop: '5px'
    },
    tableNo: {
        fontSize: '18px',
        width: '100%',
        textAlign: 'center',
    },
    customerName: {
        fontSize: '22px',
        width: '100%',
        textAlign: 'center'
    },
    totalPrice: {
        fontSize: '15px',
        color: 'red',
        textAlign: 'right',
        width: '100%',
        marginTop: '5px'
    }
});

const CounterOrderList = ({ key, order }) => {
    const classes = useStyles();
    return (
        <Grid container direction='row' className={classes.container}>
            <Grid className={classes.infoCard} direction='column' spacing={1}>
                <Grid className={classes.tableNo}>
                    {order.tableNo} 桌
                </Grid>
                <Grid className={classes.isTakeOut}>
                    {order.isTakeOut === 'true' ? "外帶" : "內用"}
                </Grid>

            </Grid>
            <Grid className={classes.basicInfoCard} direction='column'>
                <Grid className={classes.customerName}>
                    {order.customerName}
                </Grid>

                <Grid className={classes.totalPrice}>
                    $ {order.totalPrice}
                </Grid>

            </Grid>


            <Grid className={classes.basicInfoCard}>
                <Timer time={order.arrivedTime} />
            </Grid>

            <Grid className={classes.itemsCard}>
                <CounterItemsCard items={order.items} />
            </Grid>
        </Grid>
    );
}

export default CounterOrderList;
