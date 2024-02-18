/** @format */

import React from "react";
import "./style.css";
import TopCart from "./TopCart";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tdata from "./Tdata";

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

					{Tdata ? (
						<Slider {...settings}>
							{Tdata.map((productItem) => (
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
