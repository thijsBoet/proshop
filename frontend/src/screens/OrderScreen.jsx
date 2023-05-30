import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

import Message from '../components/Message';
import Loader from '../components/Loader';

import React from 'react'

const OrderScreen = () => {
    const { id: orderId } = useParams()
    const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderId)

    console.log(order);

    return (
        <div>OrderScreen</div>
    )
}

export default OrderScreen