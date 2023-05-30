import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (body) => ({
                url: ORDERS_URL,
                method: 'POST',
                body,
            }),
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ORDERS_URL,
        }),
        getOrderById: builder.query({
            query: (id) => `${ORDERS_URL}/${id}`,
        }),
        addOrderItems: builder.mutation({
            query: (body) => ({
                url: ORDERS_URL,
                method: 'POST',
                body,
            }),
        }),
        updateOrderToPaid: builder.mutation({
            query: ({ id, paymentResult }) => ({
                url: `${ORDERS_URL}/${id}/pay`,
                method: 'PUT',
                body: paymentResult,
            }),
        }),
        updateOrderToDelivered: builder.mutation({
            query: ({ id }) => ({
                url: `${ORDERS_URL}/${id}/deliver`,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useAddOrderItemsMutation,
    useUpdateOrderToPaidMutation,
    useUpdateOrderToDeliveredMutation,
} = ordersApiSlice;