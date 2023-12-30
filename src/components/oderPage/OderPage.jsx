/** @format */

// OderPage.js
import React from "react";
import "./OderPage.css";
import { useAuth } from "../../components/user/AuthContext";

export default function OderPage({ onClose, price }) {
	const { currentUser } = useAuth();

	const amount = price * 100;
	const currency = "INR";
	const receiptId = "qwsaq1";

	const paymentHandler = async (e) => {
		const response = await fetch("http://localhost:4000/order", {
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
			key: "rzp_live_DpYY2HqyIwGXKC", // Enter the Key ID generated from the Dashboard
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

				const validateRes = await fetch("http://localhost:4000/order/validate", {
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
					X
				</button>
				<div className='address'>
					Address Content
					<button className='oderPageBtn  submitAddres'>Submit Addres</button>
				</div>
				<div className='totalPrice'>
					Total Price Content
					<button
						className='oderPageBtn chackOut'
						onClick={paymentHandler}
					>
						Chack Out
					</button>
				</div>
			</div>
		</div>
	);
}
