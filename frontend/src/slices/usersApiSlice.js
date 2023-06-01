import { USERS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const UsersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				body: data,
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: USERS_URL,
				method: 'POST',
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
		profile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
			}),
		}),
		getUser: builder.query({
			query: (id) => ({
				url: `${USERS_URL}/${id}`,
				method: 'GET',
				keepUnusedDataFor: 5,
			}),
		}),
		updateUser: builder.mutation({
			query: (User) => ({
				url: `${USERS_URL}/${User._id}`,
				method: 'PUT',
				body: User,
			}),
		}),
		createUser: builder.mutation({
			query: (User) => ({
				url: USERS_URL,
				method: 'POST',
				body: User,
			}),
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `${USERS_URL}/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
	useProfileMutation,
	useGetUserQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = UsersApiSlice;
