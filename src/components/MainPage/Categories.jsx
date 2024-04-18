/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
	const data = [
		{
			cateImg: "./images/category/cat1.png",
			cateName: "Solar Panels",
		},
		{
			cateImg: "./images/category/cat2.png",
			cateName: "Solar Inverters",
		},
		{
			cateImg: "./images/category/cat3.png",

			cateName: "solar rooftop",
		},
		{
			cateImg: "./images/category/cat4.png",
			cateName: "Solar Lights",
		},
		{
			cateImg: "./images/category/cat5.png",
			cateName: "Solar Water Heaters",
		},
		{
			cateImg: "./images/category/cat6.png",

			cateName: "Solar home Lights",
		},
		{
			cateImg: "./images/category/cat7.png",
			cateName: "Solar Pumps",
		},
		{
			cateImg: "./images/category/cat8.png",
			cateName: "Solar Batteries",
		},
		{
			cateImg: "./images/category/cat9.png",
			cateName: "Solar Chargers",
		},
		{
			cateImg: "./images/category/cat10.png",
			cateName: "Solar home Lights",
		},
		{
			cateImg: "./images/category/cat11.png",
			cateName: "Solar Lights",
		},
	];

	return (
		<>
			<div className='category'>
				<div className='catgrories d_flex'>
					<span className='fa-solid fa-border-all'></span>
					<h4 className='catagori-name'>
						Categories <i className='fa fa-chevron-down'></i>
					</h4>
				</div>

				{data.map((value, index) => {
					return (
						<div
							className='box f_flex'
							key={index}
						>
							<Link
								rel='stylesheet'
								to='/products'
							>
								<img
									src={value.cateImg}
									alt=''
								/>
								<span className='catagori-name'>{value.cateName}</span>
							</Link>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Categories;
