import React, {useState} from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import original from '../img/original.png'

export default function StoreFeatures(){
	return(
		<div className="storeFeatures p-4 pl-5 pt-5">
			<Row>
			<Col md={3}>
				<h5>Trusted Tech Store</h5>
				<p>100% All Brand New & Original. Shop with confidence!</p>
			</Col>
			<Col md={2}>
				<h5>Fast Shipping Nationwide</h5>
				<p>Ships in 24 Hours! Express Shipping within Metro Manila!</p>
			</Col>
			<Col md={2}>
				<h5>Save on Loyalty Rewards</h5>
				<p>Sign in to start earning Loyalty Rewards Points!</p>
			</Col>
			<Col md={3}>
				<h5>100% Safe and Secure</h5>
				<p>All Transactions are Fully Encrypted with State of the Art Technology!</p>
			</Col>
			<Col md={2}>
				<img className="ml-3" height="150" width="160" src={original}/>
			</Col>
		</Row>
		</div>
		
	)
}