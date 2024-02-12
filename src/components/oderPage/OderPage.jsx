/** @format */

// OderPage.js
import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import "./OderPage.css";
import { useAuth } from "../../components/user/AuthContext";
import AddresValues from "./AddresValues";

const API_URL = process.env.REACT_APP_API_URL;

export default function OderPage({ onClose, cartItems }) {
	const { currentUser } = useAuth();

	const [errorMessage, setErrorMessage] = useState(null);

	const [quantities, setQuantities] = useState([]);

	useEffect(() => {
		if (cartItems && cartItems.length > 0) {
			const initialQuantities = cartItems.map((item) => item.quantity || 1);
			setQuantities(initialQuantities);
		}
	}, [cartItems]);

	const handleDecreaseQuantity = (index) => {
		if (quantities[index] > 1) {
			const newQuantities = [...quantities];
			newQuantities[index] -= 1;
			setQuantities(newQuantities);
		}
	};

	const handleIncreaseQuantity = (index) => {
		const newQuantities = [...quantities];
		newQuantities[index] += 1;
		setQuantities(newQuantities);
	};

	const calculateTotalPrice = () => {
		let totalPrice = 0;
		cartItems.forEach((item, index) => {
			totalPrice += item.price * quantities[index];
		});
		return totalPrice.toFixed(2);
	};

	const handleIncreaseQuantityForStock = () => {
		if (quantity < stock) {
			setQuantity(quantity + 1);
		} else {
			setErrorMessage("Order Quantity cannot exceed the available stock.");
		}
	};

	const amount = calculateTotalPrice() * 100;
	console.log(amount);
	const currency = "INR";
	const receiptId = uuidv4();

	const paymentHandler = async (e) => {
		const response = await fetch(`${API_URL}/order`, {
			method: "POST",
			body: JSON.stringify({
				amount,
				currency,
				receipt: receiptId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const order = await response.json();
		console.log(order);

		var options = {
			key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
			amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency,
			name: "Efforts Store", //your business name
			description: "Test Transaction",
			image: "../assets/images/logo.jpeg",
			order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			handler: async function (response) {
				const body = {
					...response,
				};

				const validateRes = await fetch(`${API_URL}/validate`, {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
					},
				});
				const jsonRes = await validateRes.json();
				console.log(jsonRes);
			},
			prefill: {
				//We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
				name: currentUser.displayName, //your customer's name
				email: currentUser.email, //your customer's email
				contact: "9000000000", //Provide the customer's phone number for better conversion rates
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#691192",
			},
		};
		var rzp1 = new window.Razorpay(options);

		rzp1.on("payment.success", async function (response) {
			const { payment_id: payment_id } = response;
			// Create the object containing order details
			const orderDetails = {
				receiptId: receiptId,

				payment_id: payment_id,
				paymentStatus: "success",
				totalPrice: calculateTotalPrice(),

				products: cartItems.map((item) => ({
					_id: item._id,
					name: item.name,
					quantity: quantities[cartItems.indexOf(item)],
					price: item.price.toFixed(2),
				})),
			};
			console.log(orderDetails);
			// Perform further actions like sending order details to server
		});
		rzp1.open();
		e.preventDefault();

		rzp1.on("payment.failed", function (response) {
			setErrorMessage(
				response.error.code,
				response.error.description,
				response.error.source,
				response.error.step,
				response.error.reason,
				response.error.metadata.order_id,
				response.error.metadata.payment_id
			);
			alert(response.error.code);
			alert(response.error.description);
			alert(response.error.source);
			alert(response.error.step);
			alert(response.error.reason);
			alert(response.error.metadata.order_id);
			alert(response.error.metadata.payment_id);
		});
		rzp1.open();
		e.preventDefault();
	};

	return (
		<div className='popup'>
			<div className='popup-content'>
				<button
					className='close-button'
					onClick={onClose}
				>
					x
				</button>
				{errorMessage && (
					<div className='error-popup'>
						<p>{errorMessage}</p>
						<button onClick={() => setErrorMessage(null)}>Ok</button>
					</div>
				)}

				<AddresValues />
				<div className='totalPrice address'>
					<div className='container '>
						<h1>Invoice</h1>
						<div>
							<div className='invoiceDiv'>
								<strong>Invoice ID:</strong>
								<span
									style={{
										textWrap: "wrap",
										width: "200px",
									}}
								>
									{receiptId}
								</span>
							</div>
							<div className='invoiceDiv'>
								<strong>Invoice Date:</strong> {new Date().toLocaleDateString()}
							</div>
							<hr />
							<div className='invoiceDiv'>
								<div className='invoiceDiv2'>
									<strong>Products:</strong>
									<div>
										{Array.isArray(cartItems) &&
											cartItems.map((item, index) => (
												<div
													key={index}
													style={{ margin: "5px 0" }}
												>
													{item.name}
												</div>
											))}
									</div>
								</div>
								<div className='invoiceDiv2'>
									<strong>Quantity:</strong>

									<div>
										{Array.isArray(cartItems) &&
											cartItems.map((item, index) => (
												<div
													key={index}
													style={{ margin: "5px 0" }}
												>
													<button
														onClick={() =>
															handleDecreaseQuantity(index)
														}
													>
														-
													</button>
													{quantities[index]}
													<button
														onClick={() =>
															handleIncreaseQuantity(index)
														}
													>
														+
													</button>
												</div>
											))}
									</div>
								</div>
								<div className='invoiceDiv2'>
									<strong>Price:</strong>
									{Array.isArray(cartItems) &&
										cartItems.map((item, index) => (
											<div
												key={index}
												style={{ margin: "5px 0" }}
											>
												₹{item.price.toFixed(2)}
											</div>
										))}
								</div>
							</div>

							<hr />
							<div className='invoiceDiv'>
								<strong>Total Price:</strong> ₹{calculateTotalPrice()}
							</div>
						</div>
						<hr />
						<button
							className='button chackOut'
							onClick={paymentHandler}
						>
							Chack Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
