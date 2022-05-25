import CounterOrderList from "../containers/CounterOrderList";
import { useCallback, useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ORDERS } from "../graphql/queries";
import { CREATE_ORDER, SUBSCRIPTION_ORDER } from "../graphql";
import DropdownMenuButton from "../containers/DropdownMenuButton";

const Counter = () => {

    const [orderList, setOrderList] = useState([]);
    const [sortingArg, setSortingArg] = useState('arrivedTime');
    const { loading, error, data, subscribeToMore } = useQuery(QUERY_ORDERS, { variables: { restaurantId: "s001" } });

    useEffect(() => {
        if (data) {
            setOrderList(data.todayOrders);
        }
        subscribeToMore({
            document: SUBSCRIPTION_ORDER,
            variables: { restaurantId: "restautantID" },
            updateQuery: (prev, { subscriptionData }) => {
                // setOrderList(subscriptionData.data.order)
                setOrderList([...subscriptionData.data.order]);

            }
        })
    }, [data, subscribeToMore]);

    useEffect(() => {
        sorting();
    }, [sortingArg])

    const sorting = () => {
        var sortingFunction = byArrivedTime;
        if (sortingArg === 'arrivedTime') sortingFunction = byArrivedTime;
        else if (sortingArg === 'totalPrice') sortingFunction = byTotalPrice;
        else if (sortingArg === 'tableNo') sortingFunction = byTableNo;

        setOrderList([...orderList].sort(sortingFunction));
    }

    const byArrivedTime = (a, b) => {
        return a.arrivedTime.localeCompare(b.arrivedTime);
    }

    const byTotalPrice = (a, b) => {
        return a.totalPrie > b.totalPrice ? 1 : -1;
    }

    const byTableNo = (a, b) => {
        return a.tableNo.localeCompare(b.tableNo);
    }

    if (loading) return <>loading</>;
    if (error) return <>error</>
    if (!orderList.length) {
        return <>loading...</>
    }

    return (
        <div>
            <DropdownMenuButton setSortingArg={setSortingArg} />
            <Grid container direction='column'>
                {orderList.map(order =>
                    <CounterOrderList key={order.id} order={order} />)}
            </Grid>
        </div>
    );
}

export default Counter;
