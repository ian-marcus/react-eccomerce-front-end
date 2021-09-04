import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';

import product1 from '../img/product1.jpg'

export default function Products({productProp, breakpoint}){

	const {_id, name, price, productImage } = productProp;
	
	productImage.map(image => {
		return(
				console.log(image.img)
			)
	})

	return(
		<>
				<Col xs={12} md={breakpoint}>
					<Card id="productCard" className="mb-4">
						<Link to={`/products/${_id}`}><Card.Img variant="top" src={product1} className="pt-3"/></Link>
						<Card.Body>
							<Card.Text id="linkToProduct">
								<Link to={`/products/${_id}`}><p className="productName">{name}</p></Link>
							</Card.Text>
							<Card.Text>
								<h5>&#8369;{price}</h5>
							</Card.Text> 
						</Card.Body>
					</Card>
				</Col>			
		</>	
		)
}


Products.propTypes = {
	//let's call on the property to check the data
	//shape() is used to check that a prop object conforms to a specific "shape"
	product: PropTypes.shape({
		//define the properties and their exepected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}
