/** @format */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "./service.json";

import "./ServiceDetailes.css";
import ImageSlider from "../ImageSlider/ImageSlider";

import Timeline from "../Timeline/Timeline";
import Faqs from "../faqs/Faqs";
import Wrapper from "../wrapper/Wrapper";
import ServieBookpage from "../serviceBookPage/ServiceBookPage";

export default function ServiceDetailes() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [service, setService] = useState(null);
	const [isPopupOpen, setPopupOpen] = useState(false);

	const [isLoginPromptOpen, setLoginPromptOpen] = useState(false); // Added state for login prompt

	useEffect(() => {
		const foundService = services.find((service) => service.id === id);

		setService(foundService);
	}, [id]);

	if (!service) {
		return <div>Loading...</div>;
	}

	const slides = [
		{
			url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712577247/pexels-los-muertos-crew-8853503_r8ylbu.jpg",
			title: "beach",
		},
		{
			url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712577278/pexels-los-muertos-crew-8853537_obcrnh.jpg",
			title: "boat",
		},
		{
			url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712577302/pexels-los-muertos-crew-8853536_exlhxo.jpg",
			title: "forest",
		},
		{
			url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712577313/pexels-los-muertos-crew-8853502_g4zb8y.jpg",
			title: "italy",
		},
		{
			url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712577278/pexels-los-muertos-crew-8853537_obcrnh.jpg",
			title: "city",
		},
	];
	const containerStyles = {
		width: "100%",
		height: "100%",
		margin: "0 auto",
	};

	const openPopup = () => {
		setPopupOpen(true);
	};

	const closePopup = () => {
		setPopupOpen(false);
	};

	const closeLoginPrompt = () => {
		setLoginPromptOpen(false);
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<section>
			<div className='ServiceDetailes'>
				<div className='serviceHead'>
					<div className='services-slider'>
						<div style={containerStyles}>
							<ImageSlider slides={slides} />
						</div>
					</div>
					<div className='services-options'>
						<div>
							<h1> Solar Service {service.name}</h1>
							<p>
								<i className='fa-solid fa-star'></i> {service.ratings}
							</p>
							<br />
							<p>₹{service.price}</p>
						</div>

						<div style={{ display: "flex", flexDirection: "column" }}>
							<button
								className='add'
								onClick={openPopup}
							>
								Book Now
							</button>
							<button
								className='back-button'
								onClick={handleGoBack}
							>
								Go Back
							</button>
						</div>
						{isPopupOpen && (
							<ServieBookpage
								onClose={closePopup}
								service={{
									name: service.name,
									price: service.price,
									id: service.id,
								}}
							/>
						)}
						{isLoginPromptOpen && (
							<div className='login-prompt'>
								<button
									className='close-button'
									onClick={closeLoginPrompt}
								>
									x
								</button>
								<div className='register-option'>
									<p>Don't have an account?</p>
									<a>Register</a>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className='included-exclude'>
					<div>
						<h2>Services Included:</h2>
						<ul className='included-list'>
							{service.included ? (
								service.included.map((p, index) => <li>{p}</li>)
							) : (
								<p>Loading...</p>
							)}
						</ul>
					</div>
					<div>
						<h2>Services Excluded:</h2>
						<ul className='excluded-list'>
							{service.excluded ? (
								service.excluded.map((p, index) => <li>{p}</li>)
							) : (
								<p>Loading...</p>
							)}
						</ul>
					</div>
				</div>

				<div className='overview'>
					<Wrapper />
				</div>

				<div className='stepsOfProsess'>
					<h1>How It Works</h1>
					<Timeline steps={service.steps} />
				</div>

				<div className='faqs-list'>
					<Faqs faqs={service.faqs} />
				</div>
			</div>
		</section>
	);
}
