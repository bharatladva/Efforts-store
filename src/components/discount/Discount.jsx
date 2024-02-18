/** @format */

import React, { useRef, useEffect, useState } from "react";
import Dcard from "./Dcard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../newarrivals/style.css";
const API_URL = process.env.REACT_APP_API_URL;

const Discount = () => {
	const [products, setProducts] = useState();

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/products?addTo=Big Discounts`);
			const data = await response.json();

			setProducts(data.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

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

					{products ? (
						<Slider {...settings}>
							{products.map((DiscountItem) => (
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
