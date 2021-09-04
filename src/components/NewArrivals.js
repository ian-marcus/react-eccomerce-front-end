import React, {useState} from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import product1 from '../img/product1.jpg'

export default function NewArrivals(){
	
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [_id, set_id] = useState("")

	return(
		<Container >
		<h4>New Arrivals</h4>
		<Row>
			<Col xs={12} md={3}>
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
			<Col xs={12} md={3}>
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
			<Col xs={12} md={3}>
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
			<Col xs={12} md={3}>
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
		</Row>
		</Container>
		)
}