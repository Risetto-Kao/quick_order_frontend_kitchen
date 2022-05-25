import { useQuery } from "@apollo/client";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from 'react';
import KitchenOrderList from "../components/KitchenOrderList";
import { SUBSCRIPTION_ORDER } from "../graphql";
import { QUERY_ORDERS } from "../graphql/queries";


const useStyles = makeStyles({
    btn: {
        fontSize: 60,
        '&:hover': {
            backgroundColor: 'blue'
        }
    },
    title: {
        textDecoration: 'underline',
        margin: 20
    }
});

const Kitchen = () => {

    const [orderList, setOrderList] = useState([]);

    const { loading, error, data, subscribeToMore } = useQuery(QUERY_ORDERS, { variables: { restaurantId: "s001" } });


    useEffect(() => {
        if (data) {
            setOrderList(data.todayOrders);
        }
        subscribeToMore({
            document: SUBSCRIPTION_ORDER,
            variables: { restaurantId: "restautantID" },
            updateQuery: (prev, { subscriptionData }) => {
                setOrderList([...subscriptionData.data.order])
            }
        })
    }, [data, subscribeToMore]);

    if (loading) return <>loading...</>;
    if (error) return <>error</>;

    return (

        <Container>
            <Grid container spacing={3} direction="column-reverse">
                {
                    orderList.map(order =>
                        <Grid key={order.id} item>
                            <KitchenOrderList order={order} />
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    );
}

export default Kitchen;