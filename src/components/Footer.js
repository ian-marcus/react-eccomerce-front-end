import React, {useState} from 'react';
import { Row, Col, Form, Button, Navbar } from 'react-bootstrap';

import visa from '../img/visa.png';
import mastercard from '../img/mastercard.png';
import bdo from '../img/bdo.png';
import gcash from '../img/gcash.png';

export default function Footer(){

	const [email, setEmail] = useState("")
	const [emailInvalid, setEmailInvalid] = useState("")

	function checkEmail(e){
	e.preventDefault();

	fetch(`${ process.env.REACT_APP_API_URL }/users/validate-email-reg`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,	
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === false){
				setEmailInvalid("Email address is invalid.")
			}
		})
	}
	

	return(
  		<div className="px-5 pt-5 footerBackgroundColor" >
  			<Row>
  				<Col md={3}>
  					<div>
  						<h5>About Us</h5>
  						<p className="text-justify">Nixon Tech is your go-to store for good laptop deals and other tech products. We offer the best prices on laptops, keyboards, and other tech accessories. We're here to help you find the right gadget you need for your lifestyle.</p>
  					</div>
  				</Col>
  				<Col md={3}>
  					<div>
  						<h5>Subscribe</h5>
  						<Form onSubmit={e => checkEmail(e)}>
  							<Form.Group>
  								<Form.Label>
  									Enter your e-mail address to get the latest deals and more.
  								</Form.Label>
  								<Form.Control type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required/>
  								<Form.Text className="text-danger">{emailInvalid}</Form.Text>
  								<Button className="mt-3" type="submit" variant="warning">Sign up</Button>
  							</Form.Group>
  						</Form>
  					</div>
  				</Col>
  				<Col md={3}>
  					<div>
  						<h5>Social Media</h5>
  					</div>
  				</Col>
  				<Col md={3}>
  					<div>
  						<h5>We accept</h5>
  						<div>
  							<img height="30" width="60"src={visa}/>
  							<img height="30" width="60" src={mastercard}/>
  							<img height="30" width="60" src={bdo}/>
  							<img height="40" width="100" src={gcash}/>
  						</div>
  					</div>
  				</Col>
  			</Row>
  			<hr/>
  			<p className="text-center footerText pb-3">© 2021 Nixon Tech. All Rights Reserved</p>
  		</div>
	)
	
}