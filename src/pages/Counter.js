import CounterOrderList from "../containers/CounterOrderList";
import { useCallback, useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ORDERS } from "../graphql/queries";
import { CREATE_ORDER, SUBSCRIPTION_ORDER } from "../graphql";

const Counter = () => {

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
                setOrderList(subscriptionData.data.order)
            }
        })
    }, [data, subscribeToMore]);

    // useEffect(() => {
    //     try {
    //         subscribeToMore({
    //             document: SUBSCRIPTION_ORDER,
    //             variables: { restaurantId: "s001" },
    //             updateQuery: (prev, { subscriptionData }) => {
    //                 if (!subscriptionData.data) return prev;
    //                 const newOrder = subscriptionData.data;

    //                 console.log(newOrder);
    //                 console.log(prev.todayOrders);

    //                 return {
    //                     ...prev,
    //                     todayOrders: [newOrder, ...prev.todayOrders],
    //                 };
    //             },
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, [subscribeToMore]);


    return (
        <div>
            <Grid container direction='column-reverse' spacing={3}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error ^U^</p>
                ) : (
                    orderList.map(order =>
                    (<Grid item key={order.id}>
                        <CounterOrderList order={order} />
                    </Grid>))
                )}
            </Grid>
        </div>
    );
}
//todo:------------------------------------------------------------------------------------
//todo:------------------------------------------------------------------------------------
// const Counter = () => {

//     const [orderList, setOrderList] = useState([]);
//     const loading = false;
//     const error = false;

//     useEffect(() => {
//         getData();
//     }, []);

//     const getData = () => {
//         fetch('http://localhost:8000/orders')
//             .then(function (response) {
//                 return response.json();
//             }).then(function (data) {
//                 setOrderList(data);
//                 console.log(data);
//             }).catch((e) => console.log("error" + e));
//     }


//     return (
//         <div>
//             <Grid container direction='column-reverse' spacing={3}>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : error ? (
//                     <p>Error ^U^</p>
//                 ) : (
//                     orderList.map(order =>
//                     (<Grid item key={order.id}>
//                         <CounterOrderList order={order} />
//                     </Grid>))
//                 )}
//             </Grid>
//         </div>
//     );
// }


export default Counter;
