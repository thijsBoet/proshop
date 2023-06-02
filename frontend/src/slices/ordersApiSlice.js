import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

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
				method: 'GET',
			}),
			keepUnusedDataFor: 5,
		}),
		payOrder: builder.mutation({
			query: ({ orderId, details }) => ({
				url: `${ORDERS_URL}/${orderId}/pay`,
				method: 'PUT',
				body: { ...details },
			}),
		}),
		getPaypalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL,
				method: 'GET',
			}),
			keepUnusedDataFor: 5,
		}),
		getMyOrders: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/myorders`,
				method: 'GET',
			}),
			keepUnusedDataFor: 5,
		}),
		getOrders: builder.query({
			query: () => ({
				url: ORDERS_URL,
				method: 'GET',
			}),
			keepUnusedDataFor: 5,
		}),
		deliverOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}/deliver`,
				method: 'PUT',
			}),
		}),
		getOrderById: builder.query({
			query: (id) => ({
				url: `${ORDERS_URL}/${id}`,
				method: 'GET',
			}),
		}),
		addOrderItems: builder.mutation({
			query: (body) => ({
				url: ORDERS_URL,
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	useGetOrdersQuery,
	usePayOrderMutation,
	useGetMyOrdersQuery,
	useGetPaypalClientIdQuery,
	useGetOrderQuery,
	useDeliverOrderMutation,
	useGetOrderByIdQuery,
	useAddOrderItemsMutation,
} = ordersApiSlice;
