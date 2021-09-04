import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

//bootstrap
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import FloatingLabel from "react-bootstrap-floating-label";
import Swal from 'sweetalert2';

export default function Register(){
	const history = useHistory();

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [verifyPassword, setVerifyPassword] = useState("")
	
	const [emailInvalid, setEmailInvalid] = useState("")
	const [emailMatched, setEmailMatched] = useState("")
	const [passwordNotMatch, setPasswordNotMatch] = useState("")
	const [passwordLength, setPasswordLength] = useState("")

	const [registerButton, setRegisterButton] = useState(false)

	useEffect(()=>{
		if(email && password && verifyPassword && password === verifyPassword && password.length >= 8){
			setRegisterButton(true)
		} else {
			setRegisterButton(false)
		}
	}, [email, password, verifyPassword, registerButton])

	//password validation
	useEffect(()=>{
		if(password){
			if(password.length < 8){
				//console.log(passwordLength.length)
			setPasswordLength("Password must have atlease 8 characters.")
			} else if(verifyPassword) {
				if(verifyPassword !== password){
			setPasswordNotMatch("Password did not match.")
				} else{
				setPasswordNotMatch("")
				}
			} else {
				setPasswordLength("")
			}
		}
	}, [verifyPassword, password, passwordNotMatch, passwordLength])

	//
	
	
	function registerUser(e){
		//preventDefault - allows us to avoid redirection/refreshing of the page
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
			console.log(data)
			if(data === true){
				fetch(`${ process.env.REACT_APP_API_URL }/users/register`,{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password
					})
				})
				.then(response => response.json())
				.then(result => {
					console.log(result)
					if(result === true){
						Swal.fire({
							icon: 'success',
							title: 'Success!',
							text: 'Thank you for registering!'
						})
						history.push('/login')

						setFirstName("")
						setLastName("")
						setEmail("")
						setPassword("")
						setVerifyPassword("")
					} else {
						console.log(result)
						setEmailMatched("Email is already registered!")
					}
						
				})
			} else {
				console.log(data)
				setEmailInvalid("Email address is invalid.")
			}
		})
		
		setEmailMatched("")
		setEmailInvalid("")
		
	}

	return(
		<>
			<Row className="d-flex justify-content-center">
				<Col xs={12} md={4}>
					<Card className="mt-3">
						<Card.Title> 
							<h3 className="mx-3 mt-3">Create account</h3>
						</Card.Title>
						<Card.Body>
							<Form onSubmit={e => registerUser(e)}>

								<Form.Group className="form-group" >
										<Form.Control className="input spaceForNoText" type="text" value={firstName} onChange={e => setFirstName(e.target.value)}required/>
										<Form.Label className="label">First Name</Form.Label>
								</Form.Group>

								<Form.Group className="form-group">
										<Form.Control className="input spaceForNoText" type="text" value={lastName} onChange={e => setLastName(e.target.value)}required/>
										<Form.Label className="label">Last Name</Form.Label>
								</Form.Group>

								<Form.Group className="form-group">
									<Form.Control className="input-email" placeholder=" " value="" type="email" value={email} onChange={e => setEmail(e.target.value)}required/>
									<Form.Label className="label">Email Address</Form.Label>
									<Form.Text className="text-danger spaceForText">{emailInvalid}{emailMatched}</Form.Text>
								</Form.Group>
								
								<Form.Group className="form-group">
									<Form.Control className="input" type="password" value={password} onChange={e => setPassword(e.target.value)}required/>
									<Form.Label className="label">Password</Form.Label>
									<Form.Text className="text-muted spaceForText">{passwordLength}</Form.Text>
								</Form.Group>
								

								<Form.Group className="form-group">
									<Form.Control className="input" type="password"  value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)} required/>
									<Form.Label className="label">Confirm Password</Form.Label>
									<Form.Text className="text-danger spaceForText">{passwordNotMatch}</Form.Text>
								</Form.Group>
								

								<Form.Check type="checkbox" className="mb-3 text-muted" size="md" label="Email me about Rollbacks, special pricing, hot new items, gift ideas and more."/>
								
								{registerButton ? 
									<Button id="registerBtn" variant="dark" block type="submit">Create account</Button>
									:
									<Button id="registerBtn" disabled variant="dark" block type="submit">Create account</Button>
								}

								<Form.Text className="text-muted my-3">By creating an account, you agree to the AliExpress.com Free Membership Agreement and Privacy Policy</Form.Text>
							</Form>
						</Card.Body>
						<Card.Footer>
							<span>Already have an account? <Link to="/login"> Sign in</Link></span>
							
						</Card.Footer>
					</Card>
				</Col>
			</Row>
			
		</>	
		)
}

//Ternary Operator
/*
	if(registerButton){
		Button
	} else {
		disabledButton
	}
*/

/*
	Activity: 

	Using the code discussion about fetch, update the Register page component so that it sends the new user information localhost:4000/users via POST endpoint

	Add a fetch request to our register page.

		Create a new fetch request to the registerUSer function
			- add the appropriate URL
			- add the appropriate options
		Then, process the result of the fetch using .json()
		Then, show the processed data in the console and a sweet alert that congratulates our user for registering.

	Push your updates to you repo with commit message: "Fetch activity in Register"
*/
