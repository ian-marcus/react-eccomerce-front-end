import React, { useState } from 'react'

//bootstrap
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

export default function ForgotPassword(){
	const history = useHistory();

	const [newPassword, setNewPassword] = useState("")
	const [reEnterPassword, setReEnterPassword] = useState("")

	function changePass(e){
		e.preventDefault();

		fetch(`${ process.env.REACT_APP_API_URL }/users/validate-email-log`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				// email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true){
				console.log(data)
				history.push('./login')
			} else {
				console.log(data)
				
			}
		})
	}

	return(
		<>
		{/*{emailNotMatched === true ? 

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
		}*/}

		<Row className="d-flex justify-content-center mb-5">
			<Col xs={12} md={4}>
				<div className="forgotPassword border border-muted p-4 mt-3">
					<h3 className="text-center">Create new password</h3>
					<p className="text-justify forgotPasswordText">We'll ask for this password whenever you Sign-In.</p>
					<Form onSubmit={e => changePass(e)}>
						<Form.Group className="form-group">
							<Form.Control className="input" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}required/>
							<Form.Label className="label">New password</Form.Label>
							<Form.Text className="text-muted spaceForText">{/*{passwordLength}*/}</Form.Text>
						</Form.Group>

						<Form.Group className="form-group">
							<Form.Control className="input" type="password"  value={reEnterPassword} onChange={e => setReEnterPassword(e.target.value)} required/>
							<Form.Label className="label">Re-enter password</Form.Label>
							<Form.Text className="text-danger spaceForText">{/*{passwordNotMatch}*/}</Form.Text>
						</Form.Group>
						<Button id="loginBtn" block type="submit" className="mt-3">Save changes and Sign-in</Button>
					</Form>
				</div>
				<div className="mt-3">
					<h5>Quick-Guide to Secure Passwords:</h5>
					<ul className="text-justify">
						<li>Use at least 8 characters, a combination of numbers and letters is best.</li>
						<li>Do not use the same password you have used with us previously.</li>
						<li>Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.</li>
						<li>Do not use the same password for multiple online accounts.</li>
					</ul>
				</div>
			</Col>
		</Row>
		</>
	)
} 