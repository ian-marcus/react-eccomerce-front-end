import React, { useState, useEffect } from 'react'
import LaptopProduct from './LaptopProduct';

import { Row, Container } from 'react-bootstrap';

export default function UserView({productData}){
	const [products, setProducts] = useState([])

	useEffect(()=>{

		const productsArr = productData.map(product => {

			//only render active courses
			if(product.category === "Laptop"){
				return(
					< LaptopProduct breakpoint={3} key={product._id} productProp={product}/>
					)
			} else {
				return null
			}
		})
		
		setProducts(productsArr)

	},[productData])
	
	return(
		<>
			<Container>
			<Row className="mt-5">
				{products}
			</Row>
			</Container>
		</>
		)

}