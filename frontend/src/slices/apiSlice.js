import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants.js';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
	baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => '/api/orders',
            providesTags: ['Order'],
        }),
        getOrder: builder.query({
            query: (id) => `/api/orders/${id}`,
            providesTags: ['Order'],
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/api/orders',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['Order'],
        }),
        updateOrder: builder.mutation({
            query: (order) => ({
                url: `/api/orders/${order._id}`,
                method: 'PUT',
                body: order,
            }),
            invalidatesTags: ['Order'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/api/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        }),
        getUsers: builder.query({
            query: () => '/api/users',
            providesTags: ['User'],
        }),
        getUser: builder.query({
            query: (id) => `/api/users/${id}`,
            providesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/api/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/api/users/${user._id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        signin: builder.mutation({
            query: (user) => ({
                url: '/api/users/signin',
                method: 'POST',
                body: user,
            }),
        }),
        register: builder.mutation({
            query: (user) => ({
                url: '/api/users/register',
                method: 'POST',
                body: user,
            }),
        }),
        getPaypalClientId: builder.query({
            query: () => '/api/config/paypal',
        }),
    }),
});
