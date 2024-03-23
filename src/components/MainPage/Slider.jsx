/** @format */

import React, { useState, useEffect } from "react";
import SlideCard from "./SlideCard";
const API_URL = process.env.REACT_APP_API_URL;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderHome = () => {
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
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		appendDots: (dots) => {
			return <ul style={{ margin: "0px" }}>{dots}</ul>;
		},
	};
	return (
		<>
			<section className='homeSlide contentWidth'>
				<div className='container'>
					{products ? (
						<Slider {...settings}>
							{products.map((productItem) => (
								<SlideCard
									key={productItem._id}
									productItem={productItem}
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

export default SliderHome;
