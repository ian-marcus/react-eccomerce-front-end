import React, { useState } from 'react'

//bootstrap
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

export default function ForgotPassword(){
	const history = useHistory();

	const [email, setEmail] = useState("")
	const [emailNotMatched, setEmailNotMatched] = useState(false)

	function forgotPass(e){
		e.preventDefault();

		fetch(`${ process.env.REACT_APP_API_URL }/users/changePassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true){
				console.log(data)
				history.push('./changePassword')
			} else {
				console.log(data)
				setEmailNotMatched(true)
			}
		})
	}

	return(
		<>
		{emailNotMatched === true ? 

			<Row className="d-flex justify-content-center">
				<Col xs={12} md={4}>
					<div className="loginInvalid border border-danger px-3 pt-3 mt-3">
						<h5 className="text-danger">There was a problem</h5>
						<p>We're sorry. We weren't able to identify you given the information provided.</p>
					</div>
				</Col>
			</Row>

			:
			<></>
		}

		<Row className="d-flex justify-content-center mb-5">
			<Col xs={12} md={4}>
				<div className="forgotPassword border border-muted p-4 mt-3">
					<h3 className="text-center">Forgor your password?</h3>		
					<h4 className="text-center">We can help</h4>
					<p className="text-justify forgotPasswordText">Enter the email address or mobile phone number associated with your Amazon account.</p>
					<Form onSubmit={e => forgotPass(e)}>
						<Form.Group className="form-group">
							
							<Form.Control className="input-email" type="email" placeholder=" " value={email} onChange={e => setEmail(e.target.value)}required/>
							<Form.Label className="label">Email address</Form.Label>
							<Button id="loginBtn" block type="submit" variant="dark" className="mt-3">Continue</Button>
						</Form.Group>
					</Form>
				</div>
			</Col>
		</Row>
		</>
	)
}