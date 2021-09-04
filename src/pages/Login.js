

import React, {useState, useEffect, useContext } from 'react';
//bootstrap
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
//React Context
import UserContext from '../UserContext';

import { Link, Redirect, useHistory } from 'react-router-dom';

import logo2 from '../img/logo2.png'
 
export default function Login(){

	const history = useHistory();

	const { user, setUser } = useContext(UserContext)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loginBtn, setLoginBtn] = useState(false)

	const [emailNotMatched, setEmailNotMatched] = useState(false)
	const [emailNotMatchedText, setEmailNotMatchedText] = useState("")
	const [passwordNotMatched, setPasswordNotMatched] = useState(false)
	const [passwordNotMatchedText, setPasswordNotMatchedText] = useState(false)


	useEffect(()=>{
		if(email && password){
			setLoginBtn(false)
		} else{
			setLoginBtn(true)
		}
	},[email, password, loginBtn])

	useEffect(()=>{
		if(emailNotMatched === true){
			setEmailNotMatchedText("We cannot find an account with that email address")
			setPasswordNotMatchedText("")
		}

		if(passwordNotMatched){
			setPasswordNotMatchedText(true)
			setEmailNotMatchedText("")
		}
	}, [emailNotMatched, passwordNotMatched, emailNotMatchedText, passwordNotMatchedText])

	function loginUser(e){
		e.preventDefault();

		fetch(`${ process.env.REACT_APP_API_URL }/users/validate-email-log`, {
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
				fetch(`${ process.env.REACT_APP_API_URL }/users/validate-password-log`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
				.then(res => res.json())
				.then(data => {
					if(data === true){
						console.log(data)
						fetch(`${ process.env.REACT_APP_API_URL }/users/login`, {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										email: email,
										password: password
									})
								})
								.then(response => response.json())
								.then(data => {
									console.log(data)

									//let's set our function in login page
									if(data.accessToken !== undefined){
										localStorage.setItem('accessToken', data.accessToken)
										setUser({accessToken: data.accessToken})

										Swal.fire({
											icon: 'success',
											title: 'Success!',
											text: 'Logged in successfully!'
										})

										//fetch user's details from out token
										fetch(`${ process.env.REACT_APP_API_URL }/users/profile`,{
											headers: {
												//automatic GET method is being read, no need to include method: 'GET'
												Authorization: `Bearer ${data.accessToken}`
											}
										})
										.then(res => res.json())
										.then(result => {
											console.log(result)
											 
											//we will check if the user is Admin or not. if admin, we will redirect to /courses. if not, redierect to homepage
											if(result.isAdmin === true){
												localStorage.setItem('email', result.email)
												localStorage.setItem('isAdmin', result.isAdmin)
												localStorage.setItem('firstName', result.firstName)
												setUser({
													firstName: result.firstName,
													email: result.email,
													isAdmin: result.isAdmin
												})
												//we will redirect the page to /courses
												history.push('/dashboard')
											} else{
												localStorage.setItem('firstName', result.firstName)
												setUser({
													firstName: result.firstName,
													isAdmin: result.isAdmin
												})
												//redirect to homepage
												history.push('/')
											}
										})
									} else{
										Swal.fire({
											icon: 'error',
											title: 'Something went wrong.',
											text: 'Please try again.'
										})
									}

									setEmail("")
									setPassword("")
								})
					} else {
						console.log(data)
						setPasswordNotMatched(true)
					}	
				})

			} else {
				setEmailNotMatched(true)
			}
		})
	}

	if(user.email !== null){
		return <Redirect to="/" />
	}

	return(
		<>

		{emailNotMatched || passwordNotMatched === true ? 

			<Row className="d-flex justify-content-center">
				<Col xs={12} md={4}>
					<div className="loginInvalid border border-danger px-3 pt-3 mt-3">
						<h5 className="text-danger">There was a problem</h5>
						{passwordNotMatchedText === true ?
							<p>Your password is incorrect. Please try again or <Link to="/forgotPassword">Reset Your Password.</Link></p>
							:
							<></>
						}
						<p>{emailNotMatchedText}</p>
					</div>
				</Col>
			</Row>

			:
			<></>
		}
		
		{/*login card*/}
		<Row className="fuckingRow d-flex justify-content-center mb-5">
				<Col xs={12} md={4}>
					<Card className="mt-3">
						<Card.Title> 
							<h3 className="mx-3 mt-3">Login</h3>
						</Card.Title>
						<Card.Body>
							<Form onSubmit={e => loginUser(e)}>
								<Form.Group className="form-group">
									<Form.Control className="input-email" type="email" placeholder=" " value={email} onChange={e => setEmail(e.target.value)}required/>
									<Form.Label className="label">Email address</Form.Label>
									<Form.Text className="text-danger spaceForText">{emailNotMatched}</Form.Text>
								</Form.Group>
								<Form.Group className="form-group text-right">
									<Form.Control className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
									<Form.Label className="label">Password</Form.Label>
									<Form.Label className="mt-2"><Link to="/forgotPassword" className="text-dark">Forgot Password?</Link></Form.Label>
								</Form.Group>

								<Button id="loginBtn" className="mb-3"disabled={loginBtn} block type="submit" variant="dark">Login</Button>
								<Form.Text>
									By continuing, you agree to Nixon Tech's Conditions of Use and Privacy Notice.
								</Form.Text>
							</Form>
						</Card.Body>
						<Card.Footer>
							<span className="d-flex justify-content-center mb-3">New to Nixon Tech? </span>
								<Link to="/register" className="text-decoration-none"><Button  variant="outline-dark" block type="submit">Create account</Button></Link>
							
							
						</Card.Footer>
					</Card>
				</Col>
			</Row>	
		</>
		)
}