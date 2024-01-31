/** @format */

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

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

const FlashCard = () => {
	const navigate = useNavigate();
	function sanitizePath(path) {
		return path.replace(/\/+/g, "/");
	}
	const [products, setProducts] = useState();

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/products?addTo=Flash Delas`);
			const data = await response.json();

			setProducts(data.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
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

	function navigateToProductPage(e, _id) {
		e.preventDefault();
		navigate(sanitizePath(`/productPage/${_id}`));
	}

	return (
		<>
			{products ? (
				<Slider {...settings}>
					{products.map((productItems) => (
						<div
							className='box'
							onClick={(e) => navigateToProductPage(e, productItems._id)}
						>
							<div className='product mtop'>
								<div className='img'>
									<span className='discount'>{productItems.discount}% Off</span>
									<img
										src={productItems.mainImage}
										alt=''
									/>
									<div className='product-like'>
										<i
											className='fa-regular fa-heart'
											onClick={(e) => {
												e.stopPropagation();
											}}
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
					))}
				</Slider>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default FlashCard;
