/** @format */

import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import TopCart from "./TopCart";
const API_URL = process.env.REACT_APP_API_URL;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const TopCate = () => {
	const [products, setProducts] = useState();

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/products?addTo=Top products`);
			const data = await response.json();

			setProducts(data.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<>
			<section className='TopCate background'>
				<div className='container'>
					<div className='heading d_flex'>
						<div className='heading-left row  f_flex'>
							<i className='fa-solid fa-border-all'></i>
							<h2>Top Categories</h2>
						</div>
						<div className='heading-right row '>
							<span>View all</span>
							<i className='fa-solid fa-caret-right'></i>
						</div>
					</div>

					{products ? (
						<Slider {...settings}>
							{products.map((productItem) => (
								<TopCart
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

export default TopCate;
