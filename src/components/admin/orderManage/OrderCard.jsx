/** @format */

import React from "react";

export default function OrderCard() {
	return (
		<div
			className='orderCard'
			key={1}
		>
			<div className='order-box'>
				<h2>Customer</h2>
				<div className='order-box-values'>
					<h3>Name</h3>
				</div>
				<div className='order-box-values'>
					<h3>Email</h3>
				</div>
				<div className='order-box-values'>
					<h3>Phone</h3>
				</div>
				<div className='order-box-values'>
					<h3>Date</h3>
				</div>
			</div>
			<div className='order-box'>
				<h2>Order</h2>

				<div className='order-box-values'>
					<h3>Order Id</h3>
				</div>
				<div className='order-box-values'>
					<h3>Order Status</h3>
				</div>
				<div className='order-box-values'>
					<h3>Paymet Id</h3>
				</div>
				<div className='order-box-values'>
					<h3>Paymet Status</h3>
				</div>
			</div>
			<div className='order-box'>
				<h2>Address</h2>
			</div>
			<div className='order-box'>
				<h2>products</h2>
			</div>
		</div>
	);
}
