/** @format */

import { useState, useEffect } from "react";
import "./orderManage.css";
import OrderCard from "./OrderCard";
const API_URL = process.env.REACT_APP_API_URL;
import { useAuth } from "../../user/AuthContext";

export default function orderManage() {
	let { currentUser } = useAuth();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			let response;
			if (currentUser.email !== "bharatladva77@gmail.com") {
				response = await fetch(`${API_URL}/order?email=${currentUser.email}`);
			} else {
				response = await fetch(`${API_URL}/order`);
			}
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
