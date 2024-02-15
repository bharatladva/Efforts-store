/** @format */

import React from "react";
import orderManage from "./OrderManage";
import Products from "../../products/Products";

export default function OrderCard({ order }) {
	return (
		<div
			className='orderCard'
			key={1}
		>
			<div className='order-box'>
				<h2>Customer</h2>
				<div className='order-box-values'>
					<h3>Name</h3> <span>{order.name}</span>
				</div>
				<div className='order-box-values'>
					<h3>Email</h3> <span>{order.email}</span>
				</div>
				<div className='order-box-values'>
					<h3>Phone</h3> <span>{order.address.phone}</span>
				</div>
				<div className='order-box-values'>
					<h3>Date</h3> <span>{order.date}</span>
				</div>
				<div className='order-box-values'>
					<h3>totalPrice</h3> <span>{order.totalPrice}</span>
				</div>
			</div>
			<div className='order-box'>
				<h2>Order</h2>

				<div className='order-box-values'>
					<h3>Order Id</h3> <span>{order.orderId}</span>
				</div>
				<div className='order-box-values'>
					<h3>Order Status</h3> <span>{order.orderStatus}</span>
				</div>
				<div className='order-box-values'>
					<h3>Paymet Id</h3>
					<span>{order.paymentId}</span>
				</div>
				<div className='order-box-values'>
					<h3>Paymet Status</h3>
					<span>{order.paymentStatus}</span>
				</div>
			</div>
			<div className='order-box orderCard-address'>
				<h2>Address</h2>
				<p>{order.address.fullAddress}</p>
				<span>{order.address.city},</span>
				<span>{order.address.state},</span>
				<span>{order.address.zipcode},</span>
				<span>{order.address.lendMarck},</span>
				<span>{order.address.country}</span>
			</div>
			<div className='order-box'>
				<h2>products</h2>
				{order.Products ? (
					order.Products.map((Product) => (
						<div
							className='order-box-values'
							key={Product.id}
						>
							<span>{Product.name}</span>
							<span>{Product.quantity}</span>
							<span>{Product.price}</span>
						</div>
					))
				) : (
					<p>No products found</p>
				)}
			</div>
		</div>
	);
}
