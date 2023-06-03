import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
	useGetUsersQuery,
	useDeleteUserMutation,
} from '../../slices/usersApiSlice.js';

import Message from '../../components/Message.jsx';
import Loader from '../../components/Loader.jsx';
const UserListScreen = () => {
	const { data: users, refetch, isLoading, error } = useGetUsersQuery();

	const [deleteUser, { isLoading: isDeleting, error: errorDelete }] =
		useDeleteUserMutation();

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			try {
				deleteUser(id);
				refetch();
				toast.success('User deleted successfully');
			} catch (error) {
				toast.error(errorDelete?.data?.message || errorDelete?.error);
			}
		}
	};

	return (
		<>
			<h1>Users</h1>
			{isDeleting && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map((user) => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>
										<a href={`mailto:${user.email}`}>
											{user.email}
										</a>
									</td>
									<td>
										{user.isAdmin ? (
											<FaCheck
												style={{ color: 'green' }}
											/>
										) : (
											<FaTimes
												style={{ color: 'salmon' }}
											/>
										)}{' '}
									</td>
									<td>
										<LinkContainer
											to={`/admin/user/${user._id}/edit`}>
											<Button
												variant='primary'
												className='btn-sm'>
												<FaEdit />
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm mx-1'
											onClick={() =>
												deleteHandler(user._id)
											}>
											<FaTrash
												style={{ color: 'white' }}
											/>
										</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
