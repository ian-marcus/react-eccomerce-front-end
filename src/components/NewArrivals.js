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
								<Link to={`/products/${_id}`}><p className="productName">Acer Aspire Swift 1 SF114-33-P31M Intel Quad Core N5030 14-inch Windows 10</p></Link>
							</Card.Text>
							<Card.Text>
								<h5>&#8369;43000</h5>
							</Card.Text> 
						</Card.Body>
					</Card>
			</Col>
			<Col xs={12} md={3}>
					<Card id="productCard" className="mb-4">
						<Link to={`/products/${_id}`}><Card.Img variant="top" src={product1} className="pt-3"/></Link>
						<Card.Body>
							<Card.Text id="linkToProduct">
								<Link to={`/products/${_id}`}><p className="productName">Lenovo L340-15IRH (81LK00W5PH) Intel Core I5 GeForce Nvidia GTX1650</p></Link>
							</Card.Text>
							<Card.Text>
								<h5>&#8369;50000</h5>
							</Card.Text> 
						</Card.Body>
					</Card>
			</Col>
			<Col xs={12} md={3}>
					<Card id="productCard" className="mb-4">
						<Link to={`/products/${_id}`}><Card.Img variant="top" src={product1} className="pt-3"/></Link>
						<Card.Body>
							<Card.Text id="linkToProduct">
								<Link to={`/products/${_id}`}><p className="productName">Acer Aspire 5 A514-54-37YX 11th Gen Intel Core i3 14-inch Windows 10</p></Link>
							</Card.Text>
							<Card.Text>
								<h5>&#8369;35000</h5>
							</Card.Text> 
						</Card.Body>
					</Card>
			</Col>
			<Col xs={12} md={3}>
					<Card id="productCard" className="mb-4">
						<Link to={`/products/${_id}`}><Card.Img variant="top" src={product1} className="pt-3"/></Link>
						<Card.Body>
							<Card.Text id="linkToProduct">
								<Link to={`/products/${_id}`}><p className="productName">Acer Aspire 5 A514-53G-37FG Intel Core i3 GeForce MX350 14-inch Windows 10</p></Link>
							</Card.Text>
							<Card.Text>
								<h5>&#8369;75000</h5>
							</Card.Text> 
						</Card.Body>
					</Card>
			</Col>
		</Row>
		</Container>
		)
}