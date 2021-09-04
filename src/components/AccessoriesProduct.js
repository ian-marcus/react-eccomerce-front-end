import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AccessoriesProduct({productProp, breakpoint}){

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
						<Link to={`/products/${_id}`}><Card.Img variant="top" src={productImage[0]} className="pt-3"/></Link>
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
