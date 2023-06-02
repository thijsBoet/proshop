import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {
	useUpdateProductMutation,
	useGetProductDetailsQuery,
} from '../../slices/productsApiSlice';

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'


const ProductEditScreen = () => {
    const { id: productId } = useParams()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);

    console.log(product);

    return (
        <div>ProductEditScreen</div>
    )
}

export default ProductEditScreen