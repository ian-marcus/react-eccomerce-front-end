import React, { useState, useEffect, useContext } from 'react'

import { Container, Table, Button, Card } from 'react-bootstrap';

import UserContext from '../UserContext'

//react-router
import { Link } from 'react-router-dom';

export default function Cart() {

    const {user} = useContext(UserContext);

    const [ table, setTable ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/users/myOrders', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const list = data.map(orders => {
                return(
                    <tr>
                        {orders.orderedItems.map(subItems => {
                            console.log(subItems.productName)
                            return (
                                <>
                                    <td>{subItems.productName}</td>
                                    <td>{subItems.productDescription}</td>
                                    <td>{subItems.productPrice}</td>
                                    <td>{subItems.quantity}</td>
                                    <td>{subItems.totalAmount}</td>
                                    <td>
                                    <Button variant="danger">Remove</Button>
                                    </td>
                                </>
                                )
                            })}
                    </tr>
                )
        })
         setTable(list)     
    }, [])
}

useEffect(() => {
        fetch('http://localhost:4000/users/myOrders', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // localStorage.setItem('list', JSON.stringify(data))
            console.log(data)
            const list = data.map(orders => {
                return(
                    <tr>
                        {orders.orderedItems.map(subItems => {
                            console.log(subItems.productName)
                            return (
                                <>
                                    <td>{subItems.productName}</td>
                                    <td>{subItems.productDescription}</td>
                                    <td>{subItems.productPrice}</td>
                                    <td>{subItems.quantity}</td>
                                    <td>{subItems.totalAmount}</td>
                                    <td>
                                    <Button variant="danger">Remove</Button>
                                    </td>
                                </>
                                )
                            })}
                    </tr>
                )
            })
            setTable(list)   
        })
    }, [])
