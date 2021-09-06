import React, { useState, useEffect, useContext } from 'react'

import { Container, Table, Button, Card, Row, Col } from 'react-bootstrap';

import UserContext from '../UserContext'

//react-router
import { Link } from 'react-router-dom';

export default function CartPage() {

    // const [productsArr, setProductsArr] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_API_URL }/cart/myOrders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // localStorage.setItem('list', JSON.stringify(data))
            console.log(data)
            const list = data.map(product => {
                return(
                    <tr>
                        {product.productInfo.map(subItems => {
                            return (
                                <>
                                    <td className="cartProductName">{subItems.productName}</td>
                                    <td>{subItems.productPrice}</td>
                                    <td >{subItems.quantity}</td>
                                    <td className="removeBtn">
                                    <Button variant="danger">Remove</Button>
                                    </td>
                                </>
                                )
                            })}
                    </tr>
                )
            })
            setCart(list)   
        })
    }, [])



    return (
    <>
        <Container className="cartPage mt-5">
                <Row>
                    <Col md={9}>
                        <Table striped hover responsive>
                            <thead className="bg-light" variant="dark">
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart}
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={3}>
                        <Card className="cartCard">
                            <Card.Body>

                            </Card.Body>
                            <Card.Footer>
                                <Button block variant="warning">Checkout</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
        </Container>
    </>
        
    )
}