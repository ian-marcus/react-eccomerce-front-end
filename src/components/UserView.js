import React, { useState, useEffect } from 'react'
import Products from './Products';

import { Row, Container } from 'react-bootstrap';

export default function UserView({productData}){
	const [products, setProducts] = useState([])

	useEffect(()=>{
		//map through the data we receive from the parent component. in order to render our courses page's card

		const productsArr = productData.map(product => {

			//only render active courses
			if(product.isActive === true){
				return(
					< Products breakpoint={3} key={product._id} productProp={product}/>
					)
			} else {
				return null
			}
		})
		
		// set the courses state to the result of our app map function. to bring our returned course components outside of the scope of our useEffect where our return statement below can see
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