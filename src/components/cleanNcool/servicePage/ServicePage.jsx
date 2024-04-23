/** @format */

import "./ServicePage.css";
import ImageSlider from "../ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
import ServiceCard from "../ServiceCard/ServiceCard";

export default function ServicePage() {
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

	const ServiceCardData = [
		{
			imgSrc: "https://www.informatica.com/content/dam/informatica-marketplace/public/images/logos/InfaTools_178_90.png",
			id: 1,
			name: "Plan A",
			retetings: "4.9(1.2M)",
			price: "₹ 3500  1 hrs 45 mins",
			details: ["full service", "monthly 2 times", "panal cleaning"],
			url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712577313/pexels-los-muertos-crew-8853502_g4zb8y.jpg",
		},
		{
			imgSrc: "https://school.iqdoodle.com/wp-content/uploads/2018/09/how-to-doodle-Vacuum-Cleaner_05-269x300.jpg",
			id: 2,
			name: "Plan B",
			retetings: "4.7 (800K)",
			price: "₹ 2500  1 hrs 45 mins",
			details: ["full service", "monthly", "panal cleaning"],
			url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712577247/pexels-los-muertos-crew-8853503_r8ylbu.jpg",
		},
		{
			imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Aud0ogDoFyDw40s_q4mx9LVDljC9k3d3jQ&usqp=CAU",
			id: 3,
			name: "Plan C",
			retetings: "4.5 (600K)",
			price: "₹ 1800 1 hrs 45 mins",
			details: ["full service", "direct call", "panal cleaning"],
			url: "https://res.cloudinary.com/drpsngpm1/image/upload/v1712577302/pexels-los-muertos-crew-8853536_exlhxo.jpg",
		},
	];

	function ServiceBox({ imgSrc, name, id }) {
		return (
			<div className='services-boxs'>
				<Link
					key={0}
					to={`/Service/${id}`}
				>
					{" "}
					<img
						src={imgSrc}
						alt=''
					/>{" "}
				</Link>

				<p>{name}</p>
			</div>
		);
	}

	return (
		<section>
			<div className='servicesPage'>
				<div className='services-options'>
					<h1> Solar Services </h1>
					<p>
						<i className='fa-solid fa-star'></i> 4.76 (978K)
					</p>

					<div className='services-box-items'>
						<h2>Select a service</h2>

						<div className='services-category_1'>
							{ServiceCardData ? (
								ServiceCardData.map((service, index) => (
									<ServiceBox
										key={index}
										imgSrc={service.imgSrc}
										name={service.name}
										id={service.id}
									/>
								))
							) : (
								<p>Loading...</p>
							)}
						</div>
					</div>
				</div>

				<div className='servis-details'>
					<div className='services-slider'>
						<div style={containerStyles}>
							<ImageSlider slides={slides} />
						</div>
					</div>

					<div className='services-cards-list'>
						<div className='services-cards'>
							{ServiceCardData ? (
								ServiceCardData.map((service, index) => (
									<ServiceCard
										key={index}
										service={service}
									/>
								))
							) : (
								<p>Loading...</p>
							)}
						</div>
						<div className='cart-offer'>
							<div id='cartpage'>
								<div>
									<p>
										{" "}
										<i className='fa-solid fa-star'></i> Save 15% on every order
									</p>
									<p> Get Plus now</p>
								</div>
								<div>
									<p>
										<i className='fa-solid fa-tag'></i> Upto 200 cashback
									</p>
									<p> on Amazon Pay</p>
								</div>
								<div>
									<p>
										{" "}
										<i className='fa-solid fa-tag'></i> 5% Simpl cashback up to
										750
									</p>
									<p>Pay via Simpl</p>
								</div>
								<div>
									<p>
										{" "}
										<i className='fa-solid fa-tag'></i> Assured Cashback
									</p>
									<p>Upto 500 off </p>
								</div>
								<div>
									<p>
										{" "}
										<i className='fa-solid fa-tag'></i> Get upto 500 cashback{" "}
									</p>
									<p> Valid on Mobiwik Wallet</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
