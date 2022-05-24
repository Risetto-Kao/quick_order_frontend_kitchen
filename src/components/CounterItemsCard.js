import styled from 'styled-components'
import { Grid, makeStyles } from "@material-ui/core";
import { Col, Row } from 'react-bootstrap';
import { Circle } from '@mui/icons-material';
import { doing, done, primary, raw } from '../constants/styles';
import { useEffect } from 'react';

const useStyles = makeStyles({
    list: {
        marginBottom: "0.8rem",
        // borderBottom: '1px solid rgba(0,0,0,0.1)'
    },
    quantity: {
        fontWeight: 'bold',
        marginRight: '7px',
        fontSize: '15px'
    },
    state: {
        marginRight: '7px',
    },
    container: {
        verticalAlign: 'middle',
        // maxHeight: '20%',
    },
    bundle: {
        // borderLeft: '1px solid rgba(0,0,0,0.1)'
    }
});

const statusColor = (status) => {
    if (status === 'unready') return raw;
    if (status === 'preparing') return doing;
    if (status === 'ready') return done;
    return raw;
}

const CounterItemsCard = ({ items }) => {

    const classes = useStyles();

    var itemBundle = [];
    const bundleSize = 3;


    for (var i = 0; i < items.length; i += 3) {
        var bundle = [items[i]];
        if (i + 1 < items.length) bundle.push(items[i + 1]);
        if (i + 2 < items.length) bundle.push(items[i + 2]);

        itemBundle.push(bundle);
    }

    return (
        <Grid className={classes.container} container direction='row' spacing={2}>
            {itemBundle.map(bundle => {
                return <Grid item className={classes.bundle}> {
                    bundle.map(item => {
                        var quantity;
                        if (item.orderItemInfo) {
                            quantity = item.orderItemInfo.quantity;
                        } else {
                            quantity = 0;
                        }
                        var color = statusColor(item.orderItemInfo.state);

                        return (
                            <Grid key={item.id} container className={classes.list} direction='row'>
                                <Grid item className={classes.state}>
                                    <Circle fontSize="small" style={{ color: color }} />
                                </Grid>
                                <Grid className={classes.quantity}>
                                    {quantity} *
                                </Grid>

                                <Grid>
                                    {item.name}

                                </Grid>
                            </Grid>
                        );

                    })}</Grid>
            })}


        </Grid>
    );
}

export default CounterItemsCard;
