import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
	const { pageNumber, keyword } = useParams();

	const { data, isLoading, isError } = useGetProductsQuery({
		keyword,
		pageNumber,
	});

	return (
		<>
			{!keyword && <ProductCarousel />}
			{keyword &&  <Link to='/' className='btn btn-light mb-4'>Back</Link>}
			{isLoading ? (
				<Loader />
			) : isError ? (
				<Message variant='danger'>
					{isError?.data?.message || isError?.error}
				</Message>
			) : (
				<>
					{!keyword ? <h1>Latest Products</h1> : <h1>Search Results for {keyword}</h1>}
					<Row>
						{data.products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						page={data.page}
						pages={data.pages}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
