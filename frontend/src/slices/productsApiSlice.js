import { PRODUCTS_URL, UPLOAD_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';


export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: PRODUCTS_URL,
				params: {
					keyword,
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
			provideTags: ['Products'],
		}),
		getProductDetails: builder.query({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
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
			query: (product) => ({
				url: `${PRODUCTS_URL}/${product.productId}`,
				method: 'PUT',
				body: product,
			}),
			invalidatesTags: ['Products'],
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: `${UPLOAD_URL}/upload`,
				method: 'POST',
				body: data,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
				method: 'DELETE',
			}),
		}),
		createReview: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTS_URL}/${data.productId}/reviews`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Product'],
		}),
		getTopProducts: builder.query({
			query: () => ({
				url: `${PRODUCTS_URL}/top`,
			}),
			keepUnusedDataFor: 5,
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
	useCreateReviewMutation,
	useGetTopProductsQuery,
} = productsApiSlice;
