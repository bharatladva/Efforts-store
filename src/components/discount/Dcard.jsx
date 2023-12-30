/** @format */

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ddata from "./Ddata";
import "../newarrivals/style.css";
import { Link } from "react-router-dom";

const Dcard = () => {
	const settings = {
		dots: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
	};
	return (
		<>
			<Slider {...settings}>
				{Ddata.map((value, index) => {
					return (
						<>
							<Link to={`/productPage/${value.id}`}>
								<div
									className='box product'
									key={index}
								>
									<div className='img'>
										<img
											src={value.mainImage}
											alt=''
											width='100%'
										/>
									</div>
									<h4>{value.name}</h4>
									<span>₹{value.price}</span>
								</div>
							</Link>
						</>
					);
				})}
			</Slider>
		</>
	);
};

export default Dcard;
