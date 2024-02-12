/** @format */

// OderPage.js
import React, { useState, useEffect, useContext } from "react";
import "./OderPage.css";
import { useAuth } from "../../components/user/AuthContext";
import { UserDataContext } from "../user/UserDataContext";
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

	//---------------------------------------------------------------------------------address hendle

	const { handleAddress } = useContext(UserDataContext);

	const [formValues, setFormValues] = useState({});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormValues({ ...formValues, [id]: value });
	};

	const handleAddressSubmit = (e) => {
		e.preventDefault();
		handleAddress(formValues);
		//console.log(formValues);
	};

	//---------------------------------------------------------------------------------address hendle

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
					<div className='container'>
						<h1>Shipping</h1>
						<p>Please enter your shipping details.</p>
						<form onSubmit={handleAddressSubmit}>
							<div className='form'>
								<div className='fields fields--2'>
									<label className='field'>
										<span
											className='field__label'
											htmlFor='lendMarck'
										>
											lendMarck
										</span>
										<input
											className='field__input'
											type='text'
											id='lendMarck'
											value={formValues.lendMarck || ""}
											onChange={handleChange}
										/>
									</label>
									<label class='field'>
										<span
											className='field__label'
											htmlForor='phonenumber'
										>
											Phone number
										</span>
										<input
											className='field__input'
											type='text'
											id='phone'
											value={formValues.phone || ""}
											onChange={handleChange}
										/>
									</label>
								</div>
								<label className='field'>
									<span
										className='field__label'
										htmlFor='FullAddress'
									>
										Full Address
									</span>
									<input
										className='field__input'
										type='text'
										id='fullAddress' // Changed from 'full address'
										value={formValues.fullAddress || ""}
										onChange={handleChange}
									/>
								</label>

								<label className='field'>
									<span
										className='field__label'
										htmlFor='country'
									>
										Country
									</span>
									<select
										className='field__input'
										id='country'
										value={formValues.country || ""}
										onChange={handleChange}
									>
										<option value=''></option>
										<option value='india'>India</option>
									</select>
								</label>
								<div className='fields fields--3'>
									<label className='field'>
										<span
											className='field__label'
											htmlFor='zipcode'
										>
											Zip code
										</span>
										<input
											className='field__input'
											type='text'
											id='zipcode'
											value={formValues.zipcode || ""}
											onChange={handleChange}
										/>
									</label>
									<label class='field'>
										<span
											className='field__label'
											htmlFor='city'
										>
											City
										</span>
										<input
											className='field__input'
											type='text'
											id='city'
											value={formValues.city || ""}
											onChange={handleChange}
										/>
									</label>
									<label className='field'>
										<span
											className='field__label'
											htmlFor='state'
										>
											State
										</span>
										<select
											className='field__input'
											id='state'
											value={formValues.state || ""}
											onChange={handleChange}
										>
											<option value=''></option>
											<option value='gujrat'>gujrat</option>
										</select>
									</label>
								</div>
							</div>
							<hr />
							<button
								className='button'
								type='submit'
							>
								Submit
							</button>
						</form>
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
								<div className='invoiceDiv2'>
									<strong>Products:</strong>
									<div>
										{Array.isArray(cartItems) &&
											cartItems.map((item, index) => (
												<div key={index}>{item.name}</div>
											))}
									</div>
								</div>
								<div className='invoiceDiv2'>
									<strong>Quantity:</strong>

									<div>
										{Array.isArray(cartItems) &&
											cartItems.map((item, index) => (
												<div key={index}>
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
											<div key={index}>₹{item.price.toFixed(2)}</div>
										))}
								</div>
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
