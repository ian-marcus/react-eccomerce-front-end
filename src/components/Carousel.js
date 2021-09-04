import React from 'react';

//bootstrap 
import { Carousel, Row, Col } from 'react-bootstrap';

//images
import laptop1 from '../img/laptop1.jpg'
import laptop2 from '../img/laptop2.jpg'
import laptop3 from '../img/laptop3.jpg'
import laptop4 from '../img/laptop4.jpg'
import laptop5 from '../img/laptop5.jpg'

export default function Carousels(){
	return(
		<>
			<Carousel>
				  <Carousel.Item interval={2500}>
				    <img
				      className="d-block w-100"
				      src={laptop1}
				      height="450"
				      alt="First slide"
				    />
				  </Carousel.Item>
				  <Carousel.Item interval={2500}>
				    <img
				      className="d-block w-100"
				      src={laptop2}
				      height="450"
				      alt="Second slide"
				    />
				  </Carousel.Item>
				  <Carousel.Item interval={2500}>
				    <img
				      className="d-block w-100"
				      src={laptop3}
				      height="450"
				      alt="Third slide"
				    />
				  </Carousel.Item>
				  <Carousel.Item interval={2500}>
				    <img
				      className="d-block w-100"
				      src={laptop4}
				      height="450"
				      alt="Fourth slide"
				    />
				  </Carousel.Item>
				  <Carousel.Item interval={2500}>
				    <img
				      className="d-block w-100"
				      src={laptop5}
				      height="450"
				      alt="Fourth slide"
				    />
				  </Carousel.Item>
				</Carousel>	
		</>
		)
}