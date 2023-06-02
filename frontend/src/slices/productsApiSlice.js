import { PRODUCTS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: PRODUCTS_URL,
			}),
			provideTags: ['Products'],
			keepUnusedDataFor: 5,
		}),
		getProductDetails: builder.query({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCTS_URL,
				method: 'POST',
			}),
			invalidatesTags: ['Products'],
		}),
		updateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTS_URL}/${data.productId}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Products'],
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productsApiSlice;
