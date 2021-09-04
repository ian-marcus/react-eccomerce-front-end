import React, {Fragment} from 'react';

import Carousels from '../components/Carousel';
import Highlights from '../components/Highlights'
import NewArrivals from '../components/NewArrivals'
import StoreFeatures from '../components/StoreFeatures'

export default function Home(){
	return(
			<Fragment>
				< Carousels />
				< Highlights />
				< NewArrivals />
				< StoreFeatures />
			</Fragment>
		)
}
