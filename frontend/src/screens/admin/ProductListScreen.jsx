import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import {
	useGetProductsQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
	const { pageNumber } = useParams();

	const { data, isLoading, error, refetch } = useGetProductsQuery({
		pageNumber,
	});

	const [
		createProduct,
		{ isLoading: loadingCreateProduct, error: errorCreate },
	] = useCreateProductMutation();

	const [
		deleteProduct,
		{ isLoading: loadingDeleteProduct, error: errorDelete },
	] = useDeleteProductMutation();

	const deleteHandler = async (id) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await deleteProduct(id);
				refetch();
				toast.success('Product deleted successfully');
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};

	const createProductHandler = async () => {
		if (window.confirm('Are you sure you want to create a new product?')) {
			try {
				await createProduct();
				refetch();
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-end'>
					<Button
						className='btn-sm m-3'
						onClick={createProductHandler}>
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>
			{loadingCreateProduct && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}

			{loadingDeleteProduct && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data.products &&
								data.products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td>
											<LinkContainer
												to={`/admin/product/${product._id}/edit`}>
												<Button
													variant='primary'
													className='btn-sm mx-2'>
													<FaEdit />
												</Button>
											</LinkContainer>
											<Button
												onClick={() =>
													deleteHandler(product._id)
												}
												variant='danger'
												className='btn-sm mx-2'>
												<FaTrash
													style={{
														color: 'white',
													}}
												/>
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
					<Paginate page={data.page} pages={data.pages} isAdmin />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
