/** @format */

import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import TopCart from "./TopCart";
const API_URL = "https://effortsstoreserver.onrender.com";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
	{
		url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712578199/category-1_sudxbz.jpg",
		title: "beach",
	},
	{
		url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712578200/category-2_ef2rmp.jpg",
		title: "boat",
	},
	{
		url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712578199/category-3_gxwblm.webp",
		title: "forest",
	},
];

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
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: false,
		//nextArrow: <SampleNextArrow />,
		//prevArrow: <SamplePrevArrow />,
	};

	return (
		<>
			<section className='TopCate '>
				<div className='container'>
					<div className='heading d_flex'>
						<div className='heading-left row  f_flex'>
							<i className='fa-solid fa-border-all'></i>
						</div>
						<div className='heading-right row '>
							<span>View all</span>
							<i className='fa-solid fa-caret-right'></i>
						</div>
					</div>

					{slides ? (
						<Slider {...settings}>
							{slides.map((productItem) => (
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
