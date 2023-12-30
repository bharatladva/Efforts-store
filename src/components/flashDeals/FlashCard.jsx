/** @format */

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "./Data";
import { Link } from "react-router-dom";

const SampleNextArrow = (props) => {
	const { onClick } = props;
	return (
		<div
			className='control-btn'
			onClick={onClick}
		>
			<button className='next'>
				<i className='fa fa-long-arrow-alt-right'></i>
			</button>
		</div>
	);
};

const SamplePrevArrow = (props) => {
	const { onClick } = props;
	return (
		<div
			className='control-btn'
			onClick={onClick}
		>
			<button className='prev'>
				<i className='fa fa-long-arrow-alt-left'></i>
			</button>
		</div>
	);
};
const { productItems } = data;

const FlashCard = () => {
	const [count, setCount] = useState(0);
	const increment = () => {
		setCount(count + 1);
	};

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,

		autoplay: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<>
			<Slider {...settings}>
				{productItems.map((productItems) => {
					return (
						<Link to={`/productPage/${productItems.id}`}>
							<div className='box'>
								<div className='product mtop'>
									<div className='img'>
										<span className='discount'>
											{productItems.discount}% Off
										</span>
										<img
											src={productItems.mainImage}
											alt=''
										/>
										<div className='product-like'>
											<label>{count}</label> <br />
											<i
												className='fa-regular fa-heart'
												onClick={increment}
											></i>
										</div>
									</div>
									<div className='product-details'>
										<h3>{productItems.name}</h3>
										<div className='rate'>
											<i className='fa fa-star'></i>
											<i className='fa fa-star'></i>
											<i className='fa fa-star'></i>
											<i className='fa fa-star'></i>
											<i className='fa fa-star'></i>
										</div>
										<div className='price'>
											<h4>₹{productItems.price}.00 </h4>
											<button
											//</div>onClick={() => addToCart(productItems)}
											>
												<i className='fa fa-plus'></i>
											</button>
										</div>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</Slider>
		</>
	);
};

export default FlashCard;
