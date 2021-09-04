import React from 'react';

//bootstrap
import { Container, Row, Col, Card, Button} from 'react-bootstrap';

//images
import acer1 from '../img/acer1.jpg'
import lenovo1 from '../img/lenovo1.jpg'
import asus1 from '../img/asus1.jpg'
import msi1 from '../img/msi1.jpg'
import dell1 from '../img/dell1.jpg'

export default function Highlights(){

	return(
		<>
			<Container>
				<div className="my-5">
					<Row>
						<Col xs={12} md={4}>
							<div class="homePageProductCard">
								<img id="productHighlightsCard" variant="top" src={acer1}/>
								<p class="title">ACER NITRO 5</p>
								<div class="overlay"></div>
								<div class="DIVbuyNowBtn"><Button className="buyNowBtn px-5 font-weight-bold" variant="outline-light">Buy Now</Button></div>
							</div>
							
							
							<div class="homePageProductCard mt-4">
								<img id="productHighlightsCard" variant="top" src={lenovo1}/>
								<p class="titleLenovo">LENOVO LEGION 5</p>
								<div class="overlay"></div>
								<div class="DIVbuyNowBtn"><Button className="buyNowBtn px-5 font-weight-bold" variant="outline-light">Buy Now</Button></div>
							</div>
						</Col>

						<Col xs={12} md={4}>
							<div className="homePageProductCard">
								<img id="productHighlightsCardCenter" variant="top" src={asus1}/>
								<p class="titleAsus">ASUS ROG STRIX</p>
								<div class="overlay"></div>
								<div class="DIVbuyNowBtnAsus"><Button className="buyNowBtn px-5 font-weight-bold" variant="outline-light">Buy Now</Button></div>
							</div>
						</Col>

						<Col xs={12} md={4}>
							<div class="homePageProductCard">
								<img id="productHighlightsCard" variant="top" src={msi1}/>
								<p class="titleMSI">MSI GT76 TITAN</p>
								<div class="overlay"></div>
								<div class="DIVbuyNowBtn"><Button className="buyNowBtn px-5 font-weight-bold" variant="outline-light">Buy Now</Button></div>
							</div>
							<div class="homePageProductCard mt-4">
								<img id="productHighlightsCard" variant="top" src={dell1}/>
								<p class="titleDell">DELL G5 15</p>
								<div class="overlay"></div>
								<div class="DIVbuyNowBtn"><Button className="buyNowBtn px-5 font-weight-bold" variant="outline-light">Buy Now</Button></div>
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</>
		)
}