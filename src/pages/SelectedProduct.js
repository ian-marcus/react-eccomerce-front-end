import React, { useState, useEffect, useContext } from 'react';
//bootstrap
import { Container, Card, Button, Row, Col, Carousel } from 'react-bootstrap';
//import router
import { Link, useHistory, useParams } from 'react-router-dom';

import UserContext from '../UserContext';

import Swal from 'sweetalert2';
//images
import product1 from '../img/product1.jpg';
import product2 from '../img/product2.jpg';
import product3 from '../img/product3.jpg';

export default function SelectedProduct(){
	const history = useHistory(); 

	const { user } = useContext(UserContext);

	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [price, setPrice] = useState("")
	
	const [quantity, setQuantity] = useState(1)

	const { productId } = useParams();

	
	useEffect(()=>{
		fetch(`${ process.env.REACT_APP_API_URL }/products/select/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})
	},[])

	if(quantity === "" || quantity === "0"){
		setQuantity(parseInt(1))
	} 
	console.log(quantity)

	function decrement(){
		if(quantity < 2){
			
		} else {
			setQuantity(quantity - 1)
		}
	}

	function increment(){
		if(quantity < 20){
			if(quantity === String){
				setQuantity(parseInt(quantity, 10) + 1)
			} else {
				setQuantity(parseInt(quantity, 10) + 1)
			}
		}
		
	}

	console.log(typeof(quantity))

	function addToCart(productId){

        fetch(`${ process.env.REACT_APP_API_URL }/cart/add-to-cart`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            	productId: productId,
                quantity: quantity,   
            })
        })
        .then(res => res.json())
        .then(data => {
        	if(data === true){
        		console.log(data)
        		Swal.fire({
        			icon: 'success',
        		  	title: 'Success!',
        		  	text: `You have added ${quantity} item/s in your cart`,
        		  	showDenyButton: true,
        		  	confirmButtonText: `Continue Shopping`,
        		  	denyButtonText: `Proceed to Checkout`,
        		  	confirmButtonColor: "#f0ad4e",
        		  	denyButtonColor: "#071a36"
        		}).then((result) => {
        		  /* Read more about isConfirmed, isDenied below */
        		  if (result.isDenied) {
        		    history.push('/add-to-cart')
        		  }
        		})

				
        	} else {
        		Swal.fire({
				icon: 'error',
				title: 'Something went wrong.',
				text: 'Please try again.'
				})
        	}
        })
    }

	let buttonsForUserAndAdmin = (user.email !== null) ?
	(
		<>
			{user.isAdmin === true ?
				<div className="mt-4">
				<Button disabled={true} size="lg"  className="mr-3" id="addToWishList" variant="outline-secondary">
					Add to wishlist
				</Button>
				<Button disabled={true} variant="dark" id="addToCartBtn" size="lg">
					Add to cart
				</Button>
				</div>
				:
				<div className="mt-4">
				<Button size="lg"  className="mr-3" id="addToWishList" variant="outline-secondary">
					Add to wishlist
				</Button>
				<Button variant="dark" id="addToCartBtn" size="lg" onClick={() => addToCart(productId)}>
					Add to cart
				</Button>
				</div>
			}
			
		</>
	)
	:
	(
		<>
			<div className="mt-4">
			<Link to="/login"><Button size="lg"  className="mr-3" id="addToWishList" variant="outline-secondary">
				Add to wishlist
			</Button></Link>
			<Link to="/login"><Button id="addToCartBtn" size="lg">Add to cart</Button></Link>
			</div>
		</>
	)

	return(
		<Container className="mb-5">
			<Row className="mt-5">
				<Col xs={12} md={6}>
					<Carousel interval={null} variant="dark">
					  <Carousel.Item >
					    <img
					      className="d-block w-100"
					      src={product1}
					      height="350"
					      alt="First slide"
					    />
					  </Carousel.Item>
					  <Carousel.Item >
					    <img
					      className="d-block w-100"
					      src={product2}
					      height="350"
					      alt="Second slide"
					    />
					  </Carousel.Item>
					  <Carousel.Item >
					    <img
					      className="d-block w-100"
					      src={product3}
					      height="350"
					      alt="Third slide"
					    />
					  </Carousel.Item>
					</Carousel>
				</Col>
				<Col xs={12} md={6} >
					<Card className="productCard">
						<Card.Header>
							<h4>{name}</h4>
						</Card.Header>
						<Card.Body>
							<h2 className="text-primary mb-3">&#8369;{price}</h2>
							<p>Shipping	<strong>Standard Delivery &#8369;200</strong></p>
							<div class="input-group mb-3 cartItems">
								<div class="input-group-prepend">
									<p className="quantity">Quantity</p>
								  	<button class="btn btn-outline-secondary" type="button" onClick={decrement}>-</button>
								</div>
							  	<input InputProps={{ inputProps: { min: 1, max: 20 } }} id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} type="number" class="cartItems focus-visible data-focus-visible-added" parse={value => parseInt(value, 10)}/>
							  	<div class="input-group-append">
							    <button class="btn btn-outline-secondary" type="button" onClick={increment}>+</button>
							  	</div>
							</div>

							{buttonsForUserAndAdmin}

						</Card.Body>	
					</Card>
				</Col>
			</Row>
			<Row className="mt-3">
				<Col>
					<Card>
						<div className="p-3 text-justify">
						<h5>Description:</h5>
						<p>{description}</p>
					</div>
					</Card>
				</Col>
			</Row>
		</Container>
		)
}