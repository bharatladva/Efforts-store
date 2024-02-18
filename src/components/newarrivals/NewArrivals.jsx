/** @format */

import React from "react";
import Dcard from "../discount/Dcard";
import "./style.css";
import Ndata from "./Ndata";

const NewArrivals = () => {
	return (
		<>
			<section className='NewArrivals background'>
				<div className='container'>
					<div className='heading d_flex'>
						<div className='heading-left row f_flex'>
							<img
								src='https://img.icons8.com/glyph-neue/64/26e07f/new.png'
								alt=''
							/>
							<h2>New Arrivals </h2>
						</div>
						<div className='heading-right row'>
							<span>View all</span>
							<i className='fa-solid fa-caret-right'></i>
						</div>
					</div>
					<div className='content grid product'>
						{Ndata ? (
							Ndata.map((productItem) => (
								<Dcard
									key={productItem._id}
									productItems={productItem}
								/>
							))
						) : (
							<p>Loading...</p>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default NewArrivals;
