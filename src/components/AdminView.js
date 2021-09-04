import React, { useState, useEffect } from 'react'
//bootstrap
import { Table, Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function AdminView(props){

	const { productData, fetchData } = props
	
	//add a state for productID for the fetch URI
	const [productId, setProductId] = useState('')

	const [products, setProducts] = useState([]);
	
	//Add state for Form in Add product
	const [name, setName] = useState('')
	const [category, setCategory] = useState("") 
	const [description, setDescription] = useState('') 
	const [price, setPrice] = useState(0) 

	//Add state for Modal of Add Product
	const [showAdd, setShowAdd] = useState(false)
	//Add state for update product modals(open/close)
	const [showEdit, setShowEdit] = useState(false)

	//Functions to handle opening and closing our Add product Modal
	const openAdd = () => setShowAdd(true)
	const closeAdd = () => setShowAdd(false)

	const openEdit = (product)=>{
		// fetch(`http://localhost:4000/products/add/${productId}`)
		// .then(res => res.json())
		// .then(data => {
			//Populate all input values with the product information that we fetched
			setProductId(product._id)
			setName(product.name)
			setCategory(product.category)
			setDescription(product.description)
			setPrice(product.price)

			setShowEdit(true)
		} 


	//Function to handle opening and closing our Edit product Modal. We need to reset all relevant states back to their default values, so that we can reuse them.
	const closeEdit = ()=>{
		setShowEdit(false)
		setName('')
		setDescription('')
		setPrice('')
	}


	useEffect(()=>{
		const productsArr = productData.map(product => {
			return(
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.category}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>
						{product.isActive ? "Available" : "Unavailable"}
					</td>
					<td>
						<Button variant="primary" size="sm" onClick={()=> openEdit(product)}>Update</Button>
						{
							product.isActive 
							?
							<Button variant="danger" size="sm" onClick={()=> archiveToggle(product._id, product.isActive)}>Disable</Button> 
							:
							<Button variant="success" size="sm" onClick={()=> activateToggle(product._id, product.isActive)} >Enable</Button> 
						}
					</td>
				</tr>
				)
		})

		setProducts(productsArr)

	}, [productData])


	//function for the add product
	const addProduct = (e)=>{
		e.preventDefault();

		fetch('http://localhost:4000/products/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`
			},
			body: JSON.stringify({
				name: name,
				category: category,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data === true){
				
				fetchData()
				//Show a success message
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Product successfully added'
				})
				//Reset all states to their default values, for better user experience (inputs are blank again if the user decides to add another product)
				setName("")
				setCategory("")
				setDescription("")
				setPrice(0)

				//close our modal
				closeAdd()
			} else {
				fetchData()
				Swal.fire({
					icon: 'error',
					title: 'Something went wrong.',
					text: 'Please try again.'
				})
			}
		})
	}

	//function for the edit product
	const editProduct = (e, productId) =>{
		e.preventDefault()

		fetch(`http://localhost:4000/products/update/${ productId }`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				name: name,
				category: category,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data =>{
			if(data === true){
				fetchData()
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Product successfully updated'
				})
				closeEdit()
			}else{
				fetchData()
				Swal.fire({
					icon: 'error',
					title: 'Something went wrong.',
					text: 'Please try again.'
				})
			}
		})
	}

	//function for deleting/archive a product
	const archiveToggle = (productId, isActive) => {
		fetch(`http://localhost:4000/products/archive/${productId}`,{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true){
				fetchData()
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Product successfully archived'
				})
			} else{
				fetchData()
				Swal.fire({
					icon: 'error',
					title: 'Something went wrong',
					text: 'Please try again.'
				})
			}
		})
	}

	//function for activating/unarchive a product
	const activateToggle = (productId, isActive) => {
		fetch(`http://localhost:4000/products/activate/${productId}`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true){
				fetchData()
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Product successfully activated!'
				})
			} else{
				fetchData()
				Swal.fire({
					icon: 'error',
					title: 'Something went wrong',
					text: 'Please try again.'
				})
			}
		})
	}

	return(
			<>
				<div className="text-center my-4">
					<h2>Admin Dashboard</h2>

					<div className="d-flex justify-content-center">
						<Button variant="primary" onClick={openAdd}>Add New Product</Button>
					</div>
				</div>
				<Table striped bordered hover responsive>
					<thead className="bg-dark text-white">
						<tr>
							<th>Id</th>
							<th>Category</th>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Availability</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products}
					</tbody>
				</Table>
			{/*ADD Modal*/}
			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e=> addProduct(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							< Form.Control type="text" placeholder="Enter product name" required value={name} onChange={e=> setName(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Category</Form.Label>
							< Form.Control as="select" placeholder="Enter product name" required value={category} onChange={e=> setCategory(e.target.value)}>
								<option>Choose product category</option>
								<option>Laptop</option>
								<option>Keyboard</option>
								<option>Accessories</option>
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							< Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e=> setDescription(e.target.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							< Form.Control type="number" required value={price} onChange={e=> setPrice(e.target.value)}/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{/*EDIT Modal*/}
			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editProduct(e, productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter product name" required value={name} onChange={e => setName(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Category</Form.Label>
							< Form.Control as="select" placeholder="Enter product name" required value={category} onChange={e=> setCategory(e.target.value)}>
								<option>Choose product category</option>
								<option>Laptop</option>
								<option>Keyboard</option>
								<option>Accessories</option>
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" placeholder="Enter Description" required value={description} onChange={e => setDescription(e.target.value)}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" required value={price} onChange={e => setPrice(e.target.value)}/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>


			</>
		)
}
