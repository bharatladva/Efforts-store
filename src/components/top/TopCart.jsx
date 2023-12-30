/** @format */

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tdata from "./Tdata";
import { Link } from "react-router-dom";

const TopCart = () => {
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
	};
	return (
		<>
			<Slider {...settings}>
				{Tdata.map((value, index) => {
					return (
						<>
							<Link to={`/productPage/${value.id}`}>
								<div
									className='box product'
									key={index}
								>
									<div className='nametop d_flex'>
										<span className='tleft'>{value.para}</span>
										<span className='tright'>{value.desc}</span>
									</div>
									<div className='img'>
										<img
											src={value.mainImage}
											alt=''
										/>
									</div>
								</div>
							</Link>
						</>
					);
				})}
			</Slider>
		</>
	);
};

export default TopCart;
