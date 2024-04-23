/** @format */
import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function OrderCard({ service }) {
	const [showConfirmation, setShowConfirmation] = useState(false);

	async function handleCancelOrder() {
		setShowConfirmation(true);
	}

	async function confirmCancelOrder() {
		try {
			const response = await fetch(`${API_URL}/service/${service._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ orderStatus: "cancel" }),
			});

			const data = await response.json();

			if (data.success) {
				// Handle success
			}
		} catch (error) {
			console.error("Error canceling order:", error);
		}
		setShowConfirmation(false);
	}

	function cancelCancelOrder() {
		setShowConfirmation(false);
	}

	return (
		<div
			className='orderCard'
			key={1}
		>
			<div>
				<div className='order-box'>
					<h2>Customer</h2>
					<div className='order-box-values'>
						<h3>Name</h3> <span>{service.name}</span>
					</div>
					<div className='order-box-values'>
						<h3>Email</h3> <span>{service.email}</span>
					</div>
					<div className='order-box-values'>
						<h3>Phone</h3> <span>{service.address.phone}</span>
					</div>
					<div className='order-box-values'>
						<h3>Date</h3> <span>{service.date}</span>
					</div>
					<div className='order-box-values'>
						<h3>totalPrice</h3> <span>{service.totalPrice}</span>
					</div>
				</div>
				<div className='order-box'>
					<h2>service</h2>

					<div className='order-box-values'>
						<h3>service Id</h3> <span>{service.serviceId}</span>
					</div>
					<div className='order-box-values'>
						<h3>service Status</h3> <span>{service.serviceStatus}</span>
					</div>
					<div className='order-box-values'>
						<h3>Paymet Id</h3>
						<span>{service.paymentId}</span>
					</div>
					<div className='order-box-values'>
						<h3>Paymet Status</h3>
						<span>{service.paymentStatus}</span>
					</div>
				</div>
				<div className='order-box orderCard-address'>
					<h2>Address</h2>
					<p>{service.address.fullAddress}</p>
					<span>{service.address.city},</span>
					<span>{service.address.state},</span>
					<span>{service.address.zipcode},</span>
					<span>{service.address.lendMarck},</span>
					<span>{service.address.country}</span>
				</div>
				<div className='order-box'>
					<h2>serviceName</h2>
					<span>{service.serviceName}</span>
				</div>
			</div>

			<div className='order-box'>
				<h2>Service History</h2>
				{service.serviceHistory.map((historyItem, index) => (
					<div
						className='service-history-item'
						key={index}
					>
						<p>
							<strong>Date:</strong> {historyItem.date}
						</p>
						<p>
							<strong>Employee:</strong> {historyItem.employeeName}
						</p>
						<p>
							<strong>Problems:</strong> {historyItem.problems}
						</p>
						{/* Display beforeImages */}
						<div>
							<p>
								<strong>Before Images:</strong>
							</p>
							{historyItem.beforeImages.map((image, imgIndex) => (
								<img
									className='service-image'
									key={imgIndex}
									src={image}
									alt={`Before Image ${imgIndex + 1}`}
								/>
							))}
						</div>
						{/* Display afterImages */}
						<div>
							<p>
								<strong>After Images:</strong>
							</p>
							{historyItem.afterImages.map((image, imgIndex) => (
								<img
									className='service-image'
									key={imgIndex}
									src={image}
									alt={`After Image ${imgIndex + 1}`}
								/>
							))}
						</div>
					</div>
				))}
			</div>
			<button
				className='button'
				onClick={handleCancelOrder}
			>
				Cancel Order
			</button>
			{showConfirmation && (
				<div className='confirmationDialog'>
					<p>Are you sure you want to cancel this order?</p>
					<div>
						<button
							className='confirmButton'
							onClick={confirmCancelOrder}
						>
							Yes
						</button>
						<button
							className='cancelButton'
							onClick={cancelCancelOrder}
						>
							No
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
