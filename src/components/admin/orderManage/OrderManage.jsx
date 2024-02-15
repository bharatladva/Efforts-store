/** @format */

import { useState, useEffect } from "react";
import "./orderManage.css";
import OrderCard from "./OrderCard";
const API_URL = process.env.REACT_APP_API_URL;

export default function orderManage() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/order`);
			const data = await response.json();
			console.log(data);
			setOrders(data.data.orders);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};
	return (
		<>
			<div className='orderManage'>
				<div className='ordersList'>
					{orders ? (
						orders.map((order) => (
							<OrderCard
								key={order._id}
								order={order}
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
