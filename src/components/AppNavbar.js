import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import {Nav, Navbar, NavDropdown, Form, Button, } from 'react-bootstrap'; 

import UserContext from '../UserContext';

import logo1 from '../img/logo1.png'

export default function AppNavbar(){
	const history = useHistory(); 

	const { user, unsetUser } = useContext(UserContext);

	const [userName, setUserName] = useState(true)
	// const [removeCartForAdmin, setRemoveCartForAdmin] = useState(true)

	// useEffect(()=>{
	// 	if(user.isAdmin === true){
	// 		setRemoveCartForAdmin(false)
	// 	} else {
	// 		setRemoveCartForAdmin(true)
	// 	}
	// },[removeCartForAdmin])

	const logout = ()=> {
		unsetUser();
		
		history.push('/login')
	}

	useEffect(()=>{
		if(user.isAdmin === true){
			setUserName("Admin's Account")
		} else{
			setUserName(`${user.firstName}'s Account`)
		}
	},[userName, user.isAdmin, user.firstName])
	 
	//Apply conditional rendering in AppNavbar component such that a logout link will be shown instead of Login and Register when a user is logged in.


	let rightNav = (user.email !== null) ? 
	(
		<>
		<NavDropdown title={userName} >
		<NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
		</NavDropdown>
		{user.isAdmin !== true ?
			<>
			<Nav.Link >My item</Nav.Link>	
			<Nav.Link >Cart</Nav.Link>
			</>
			:
			<Link to="/dashboard"><Button variant="warning">Dashboard</Button></Link>	
		}
		
		</>
	)
	:
	(
		<>
		<NavDropdown title="Account">
		<NavDropdown.Item as={NavLink} to="/login">Login</NavDropdown.Item>
		<NavDropdown.Item as={NavLink} to="/register">Register</NavDropdown.Item>
		</NavDropdown>
			<Nav.Link >My item</Nav.Link>	
			<Nav.Link >Cart</Nav.Link>
		</>
	)

	return(
		<Navbar className="navBar" variant="dark"  expand="lg" sticky="top">
			<Navbar.Brand as={Link} to="/" >
				<img heigth="90" width="210" src={logo1}/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav>
					<NavDropdown title="Categories" id="basic-nav-dropdown" className="mr-3">
					    <NavDropdown.Item as={Link} to="/products">All Products</NavDropdown.Item>
					    <NavDropdown.Divider />
					    <NavDropdown.Item as={Link} to="/products/category-laptop">Laptop</NavDropdown.Item>
					    <NavDropdown.Item as={Link} to="/products/category-keyboard">Keyboard</NavDropdown.Item>
					    <NavDropdown.Item as={Link} to="/products/category-accessories">Accessories</NavDropdown.Item>
					</NavDropdown>					
				</Nav>
				<Form className="d-flex searchBar mr-auto">
				     <Form.Control
				       type="search"
				       placeholder="What are you looking for today?"
				       className="mr-2 "
				       aria-label="Search"

				     />
				     <Button variant="outline-warning">Search</Button>
				   </Form>
				<Nav>
					{rightNav}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		)
}