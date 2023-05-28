import { PRODUCTS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: PRODUCTS_URL,
				keepUnusedDataFor: 5,
			}),
			providesTags: ['Product'],
		}),
		getProduct: builder.query({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
				keepUnusedDataFor: 5,
			}),
			providesTags: ['Product'],
		}),
		createProduct: builder.mutation({
			query: (product) => ({
				url: PRODUCTS_URL,
				method: 'POST',
				body: product,
			}),
			invalidatesTags: ['Product'],
		}),
		updateProduct: builder.mutation({
			query: (product) => ({
				url: `${PRODUCTS_URL}/${product._id}`,
				method: 'PUT',
				body: product,
			}),
			invalidatesTags: ['Product'],
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Product'],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productsApiSlice;