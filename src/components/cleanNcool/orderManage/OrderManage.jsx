/** @format */

import { useState, useEffect } from "react";
import "./orderManage.css";
import OrderCard from "./OrderCard";
const API_URL = process.env.REACT_APP_API_URL;

export default function orderManage() {
	const [services, setservices] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/service`);

			const data = await response.json();
			console.log(data);
			setservices(data.data.services);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};
	return (
		<>
			<div className='orderManage'>
				<div className='ordersList'>
					{services ? (
						services.map((service) => (
							<OrderCard
								key={service._id}
								service={service}
							/>
						))
					) : (
						<p>No movies found</p>
					)}
				</div>
			</div>
		</>
	);
}
