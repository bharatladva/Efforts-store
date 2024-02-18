/** @format */

import React from "react";
import Dcard from "./Dcard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ddata from "./Ddata";
import "../newarrivals/style.css";

const DiscountItems = Ddata;

const Discount = () => {
	const settings = {
		dots: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
	};

	return (
		<>
			<section className='Discount background NewArrivals'>
				<div className='container'>
					<div className='heading d_flex'>
						<div className='heading-left row  f_flex'>
							<img
								src='https://img.icons8.com/windows/32/fa314a/gift.png'
								alt=''
							/>
							<h2>Big Discounts</h2>
						</div>
						<div className='heading-right row '>
							<span>View all</span>
							<i className='fa-solid fa-caret-right'></i>
						</div>
					</div>

					{DiscountItems ? (
						<Slider {...settings}>
							{DiscountItems.map((DiscountItem) => (
								<Dcard
									key={DiscountItem._id}
									productItems={DiscountItem}
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

export default Discount;
