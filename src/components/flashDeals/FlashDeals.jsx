/** @format */

import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard";
import "./style.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const FlashDeals = () => {
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
	return (
		<>
			<section className='flash'>
				<div className='container'>
					<div className='heading f_flex'>
						<i className='fa fa-bolt'></i>
						<h1>Flash Delas</h1>
					</div>
					{products ? (
						<Slider {...settings}>
							{products.map((productItem) => (
								<FlashCard
									key={productItem._id}
									productItems={productItem}
								/>
							))}
						</Slider>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</section>
		</>
	);
};

export default FlashDeals;
