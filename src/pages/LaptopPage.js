import React, { useState, useEffect, useContext } from 'react';


//bootstrap
import { Container } from 'react-bootstrap';
import UserContext from '../UserContext';

//components
import LaptopCategory from '../components/LaptopCategory';

export default function ProductsPage(){

	const [ allProducts, setAllProducts ] = useState([])

	const fetchData = () =>{
		fetch(`${ process.env.REACT_APP_API_URL }/products/all`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setAllProducts(data)
		})
	}

	useEffect(()=>{
		fetchData()
	}, [])
	//useEffect - use this when we want to update/render the data
		
		return(
				<Container fluid>
					{
						<>
						< LaptopCategory productData={allProducts} />
						</>
					}
				</Container>
			)
	}


