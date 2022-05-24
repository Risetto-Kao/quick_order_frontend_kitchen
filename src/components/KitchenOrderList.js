import KitchenItemCard from "../containers/KitchenItemCard";
import { Card, Grid, makeStyles } from "@material-ui/core";
import { opposite } from "../constants/styles";

const useStyles = makeStyles({
    infoCard: {
        minHeight: '15%',
        minWidth: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    tableNo: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});


const KitchenOrderList = ({ order }) => {

    const classes = useStyles();

    return (
        <Grid container >
            <div className={classes.tableNo}>
                {order.tableNo} 桌
            </div>
            <Grid container direction="row">
                {/* <div className={classes.infoCard}>
                {order.tableNo} 桌
            </div> */}
                {order.items.map(item => (
                    <KitchenItemCard orderID={order.id} key={item.id} item={item} />
                ))}

            </Grid>
        </Grid>

    );
}

export default KitchenOrderList;