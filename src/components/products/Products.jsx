/** @format */

import React, { useRef, useEffect, useState } from "react";
import FlashCard from "../flashDeals/FlashCard";
import "./DiscoverPage.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/products`);
			const data = await response.json();
			console.log(data);
			setProducts(data.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	return (
		<div>
			<div className='discover-section'>
				<div className='filters-slide'>
					<div className='filters-containar'>
						<h2 className='filter-containar-title'>Filters</h2>
						<ul className='filter-list'>
							<li className='filter-list-item'>
								<h3 className='filter-list-category-title'>Category</h3>
								<select
									className='filter-input-input'
									name='addTo'
									id='addTo'
								>
									<option value=''>Select</option>
									<option value='Flash Delas'>Flash Delas</option>
									<option value='Big Discounts'>Big Discounts</option>
									<option value='Top products'>Top products</option>
									<option value='New Arrivals'>New Arrivals</option>
								</select>
							</li>
						</ul>

						<ul className='filter-list'>
							<h3 className='filter-list-category-title'>sort_by</h3>
							<li className='filter-list-item'>
								<label className='filter-sortby-label'>
									<input
										type='radio'
										name='radio'
										value='revenue_asc'
									/>
									<span>Revenue</span>
								</label>
								<label className='desc-arrow'>
									<input
										type='radio'
										name='radio'
										value='revenue_desc'
									/>
									↓
								</label>
							</li>
							<li className='filter-list-item'>
								<label className='filter-sortby-label'>
									<input
										type='radio'
										name='radio'
										value='popularity_asc'
									/>
									<span>Popularity</span>
								</label>
								<label className='desc-arrow'>
									<input
										type='radio'
										name='radio'
										value='popularity_asc'
									/>
									↓
								</label>
							</li>
							<li className='filter-list-item'>
								<label className='filter-sortby-label'>
									<input
										type='radio'
										name='radio'
										value='vote_count_asc'
									/>
									<span>Vote Count</span>
								</label>
								<label className='desc-arrow'>
									<input
										type='radio'
										name='radio'
										value='vote_count_desc'
									/>
									↓
								</label>
							</li>

							<li className='filter-list-item'>
								<label className='filter-sortby-label'>
									<input
										type='radio'
										name='radio'
										value='vote_average_asc'
									/>
									<span>Vote Average</span>
								</label>
								<label className='desc-arrow'>
									<input
										type='radio'
										name='radio'
										value='vote_average_desc'
									/>
									↓
								</label>
							</li>
						</ul>
					</div>
				</div>
				<div className='movies-slides'>
					{products ? (
						products.map((product) => (
							<FlashCard
								key={product.id}
								productItems={product}
							/>
						))
					) : (
						<p>No movies found</p>
					)}
				</div>
			</div>
		</div>
	);
}
