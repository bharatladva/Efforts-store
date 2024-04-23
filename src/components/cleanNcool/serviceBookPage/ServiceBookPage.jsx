/** @format */

import React, { useState } from "react";
import "./serviceBookPage.css"; // Import your CSS file
import { v4 as uuidv4 } from "uuid";
const API_URL = process.env.REACT_APP_API_URL;

const ServiceBookPage = ({ onClose, service }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [formData, setFormData] = useState({
		address: {
			city: "",
			country: "India",
			fullAddress: "",
			lendMarck: "",
			phone: 0,
			state: "",
			zipcode: 0,
		},
		email: "",
		name: "",
		problems: "",
		note: "",
	});

	const [fieldErrors, setFieldErrors] = useState({
		email: "",
		phone: "",
		name: "",
		zipcode: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name.includes("address")) {
			const [parent, child] = name.split(".");
			setFormData({
				...formData,
				[parent]: {
					...formData[parent],
					[child]: value,
				},
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
		// Validate field on change
		validateField(name, value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!isFormValid()) {
			setErrorMessage("Please fill in all required fields with valid data.");
			return;
		}
		console.log(formData); // You can do something with the form data here, like sending it to a server
		// Proceed with payment
		paymentHandler();
	};

	const validateField = (name, value) => {
		switch (name) {
			case "email":
				setFieldErrors((prevErrors) => ({
					...prevErrors,
					email: validateEmail(value) ? "" : "Invalid email format",
				}));
				break;
			case "address.phone":
				setFieldErrors((prevErrors) => ({
					...prevErrors,
					phone: validatePhoneNumber(value) ? "" : "Invalid phone number format",
				}));
				break;
			case "name":
				setFieldErrors((prevErrors) => ({
					...prevErrors,
					name: validateName(value)
						? ""
						: "Name must be more than 3 characters and contain only letters",
				}));
				break;
			case "address.zipcode":
				setFieldErrors((prevErrors) => ({
					...prevErrors,
					zipcode: validateZipCode(value) ? "" : "Invalid zipcode format",
				}));
				break;
			case "address.fullAddress":
				setFieldErrors((prevErrors) => ({
					...prevErrors,
					fullAddress: validateFullAddress(value)
						? ""
						: "Full address must be 50 letters or more",
				}));
				break;
			default:
				break;
		}
	};

	const validateName = (name) => {
		const regex = /^[a-zA-Z]{3,}$/; // At least 3 characters and only letters
		return regex.test(name);
	};

	const validateFullAddress = (address) => {
		return address.length >= 50;
	};

	const isFormValid = () => {
		return Object.values(fieldErrors).every((error) => error === "");
	};

	const validateEmail = (email) => {
		const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return regex.test(email);
	};

	const validatePhoneNumber = (phone) => {
		const regex = /^\d{10}$/;
		return regex.test(phone);
	};

	const validateZipCode = (zipcode) => {
		const regex = /^\d{6}$/;
		return regex.test(zipcode);
	};

	const amount = service.price * 100;
	console.log("ammoount", amount);
	const currency = "INR";
	const receiptId = uuidv4();

	const paymentHandler = async (e) => {
		const response = await fetch(`${API_URL}/razorpay`, {
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
			key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
			amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency,
			name: "CleanNCool", //your business name
			description: "Test Transaction",
			image: "../assets/images/logo.jpeg",
			order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			handler: async function (response) {
				const body = {
					...response,
				};

				const validateRes = await fetch(`${API_URL}/razorpay/validate`, {
					method: "POST",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
					},
				});
				const jsonRes = await validateRes.json();

				const serviceData = {
					name: formData.name,
					email: formData.email,
					address: formData.address,

					date: new Date().toLocaleString(),
					serviceStatus: "created",
					serviceId: jsonRes.orderId,
					paymentId: jsonRes.paymentId,
					paymentStatus: jsonRes.msg,
					totalPrice: service.price,
					serviceName: service.name,
				};

				const serviceBookResponse = await fetch(`${API_URL}/orr`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(serviceData),
				});

				const data = await serviceBookResponse.json();
				console.log("orderCreated", data);

				console.log("orderData", serviceData);
			},

			prefill: {
				//We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
				name: formData.name, //your customer's name
				email: formData.email, //your customer's email
				contact: "9000000000", //Provide the customer's phone number for better conversion rates
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#115292",
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
		});
		rzp1.open();
		//e.preventDefault();
	};

	const indianStates = [
		{ id: 1, name: "Gujrat" },

		// Add all Indian states here
	];

	return (
		<div className='serviceBookPage-form-container'>
			<button
				className='close-button'
				onClick={onClose}
			>
				x
			</button>
			{Object.values(fieldErrors).some((error) => error !== "") && (
				<div className='error-message'>
					{Object.values(fieldErrors).map((error, index) => (
						<p key={index}>{error}</p>
					))}
				</div>
			)}
			{errorMessage && <div className='error-message'>{errorMessage}</div>}
			<form onSubmit={handleSubmit}>
				<div className='input-boxes'>
					<div>
						<h3>Input Form</h3>
						<label>
							Name:
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</label>
						<label>
							Email:
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</label>

						<h4>{service.name}</h4>
						<h4>₹{service.price}</h4>
					</div>
					<div className='address-box'>
						<h3>Address</h3>
						<div className='address-valiuse'>
							<label>
								City:
								<input
									type='text'
									name='address.city'
									value={formData.address.city}
									onChange={handleChange}
									required
								/>
							</label>
							<label>
								Country:
								<input
									type='text'
									name='address.country'
									value={formData.address.country}
									//onChange={handleChange}
								/>
							</label>
						</div>
						<label>
							Full Address:
							<input
								type='text'
								name='address.fullAddress'
								value={formData.address.fullAddress}
								onChange={handleChange}
								required
							/>
						</label>
						<div className='address-valiuse'>
							<label>
								Landmark:
								<input
									type='text'
									name='address.lendMarck'
									value={formData.address.lendMarck}
									onChange={handleChange}
									required
								/>
							</label>
							<label>
								Phone:
								<input
									type='number'
									name='address.phone'
									value={formData.address.phone}
									onChange={handleChange}
									required
								/>
							</label>
						</div>
						<div className='address-valiuse'>
							<label>
								State:
								<select
									name='address.state'
									value={formData.address.state}
									onChange={handleChange}
									required
								>
									<option value=''>Select State</option>
									{indianStates.map((state) => (
										<option
											key={state.id}
											value={state.name}
										>
											{state.name}
										</option>
									))}
								</select>
							</label>

							<label>
								Zipcode:
								<input
									type='number'
									name='address.zipcode'
									value={formData.address.zipcode}
									onChange={handleChange}
									required
								/>
							</label>
						</div>
					</div>
				</div>
				<div>
					<label>
						Problems:
						<input
							type='text'
							name='problems'
							value={formData.problems}
							onChange={handleChange}
						/>
					</label>
					<label>
						Note:
						<textarea
							name='note'
							value={formData.note}
							onChange={handleChange}
						/>
					</label>
				</div>
				<button
					type='submit'
					disabled={!isFormValid()}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ServiceBookPage;
