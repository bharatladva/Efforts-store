/** @format */

// OderPage.js
import React, { useState } from "react";
import "./OderPage.css";
import { useAuth } from "../../components/user/AuthContext";
const API_URL = process.env.REACT_APP_API_URL;

export default function OderPage({ onClose, price, productNames }) {
	const { currentUser } = useAuth();
	const [quantity, setQuantity] = useState(1);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleIncreaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const calculateTotalPrice = () => {
		return (quantity * price).toFixed(2);
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
	const receiptId = "qwsaq1";

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
			image: "../assets/images/984024fe-c3a8-4d83-8d7b-fcbb34e068f8.jpg",
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
				name: currentUser.name, //your customer's name
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
				<div className='address'>
					<div class='container'>
						<h1>Shipping</h1>
						<p>Please enter your shipping details.</p>

						<div class='form'>
							<div class='fields fields--2'>
								<label class='field'>
									<span
										class='field__label'
										for='firstname'
									>
										Full name
									</span>
									<input
										class='field__input'
										type='text'
										id='firstname'
									/>
								</label>
								<label class='field'>
									<span
										class='field__label'
										for='lastname'
									>
										Phone number
									</span>
									<input
										class='field__input'
										type='text'
										id='phone'
									/>
								</label>
							</div>
							<label class='field'>
								<span
									class='field__label'
									for='address'
								>
									Address
								</span>
								<input
									class='field__input'
									type='text'
									id='address'
								/>
							</label>
							<label class='field'>
								<span
									class='field__label'
									for='country'
								>
									Country
								</span>
								<select
									class='field__input'
									id='country'
								>
									<option value=''></option>
									<option value='unitedstates'>United States</option>
								</select>
							</label>
							<div class='fields fields--3'>
								<label class='field'>
									<span
										class='field__label'
										for='zipcode'
									>
										Zip code
									</span>
									<input
										class='field__input'
										type='text'
										id='zipcode'
									/>
								</label>
								<label class='field'>
									<span
										class='field__label'
										for='city'
									>
										City
									</span>
									<input
										class='field__input'
										type='text'
										id='city'
									/>
								</label>
								<label class='field'>
									<span
										class='field__label'
										for='state'
									>
										State
									</span>
									<select
										class='field__input'
										id='state'
									>
										<option value=''>gujrat</option>
									</select>
								</label>
							</div>
						</div>
						<hr />
						<button class='button'>Submit</button>
					</div>
				</div>
				<div className='totalPrice address'>
					<div className='container '>
						<h1>Invoice</h1>
						<div>
							<div className='invoiceDiv'>
								<strong>Invoice ID:</strong> #12345
							</div>
							<div className='invoiceDiv'>
								<strong>Invoice Date:</strong> {new Date().toLocaleDateString()}
							</div>
							<hr />
							<div className='invoiceDiv'>
								<strong>Product Names:</strong>

								<div>
									{Array.isArray(productNames) &&
										productNames.map((name, index) => (
											<div key={index}>{name}</div>
										))}
								</div>
							</div>
							<div className='invoiceDiv'>
								<strong>Quantity:</strong>
								<div>
									<button onClick={handleDecreaseQuantity}>-</button>
									{quantity}
									<button onClick={handleIncreaseQuantity}>+</button>
								</div>
							</div>
							<div className='invoiceDiv'>
								<strong>Product Price:</strong> ₹{price.toFixed(2)}
							</div>
							<hr />
							<div className='invoiceDiv'>
								<strong>Total Price:</strong> ₹{calculateTotalPrice()}
							</div>
						</div>
						<hr />
						<br />
						<br />
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
