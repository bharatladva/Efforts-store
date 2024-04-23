/** @format */

import "./MainHome.css";
import { Link } from "react-router-dom";

const services = [
	{
		imgSrc: "https://www.informatica.com/content/dam/informatica-marketplace/public/images/logos/InfaTools_178_90.png",
		title: "Appliance Repair",
	},
	{
		imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxwloyJcFm6cxApuBs0PnvfIKK5akc37Kx3Q&usqp=CAU",
		title: "Home Painting",
	},
	{
		imgSrc: "https://school.iqdoodle.com/wp-content/uploads/2018/09/how-to-doodle-Vacuum-Cleaner_05-269x300.jpg",
		title: "Cleaning & Pest",
	},
	{
		imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNfznm5pZRlvyqBwgea6J9XQhXZfrVaJmuvA&usqp=CAU",
		title: "Disinfection",
	},
	{
		imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Aud0ogDoFyDw40s_q4mx9LVDljC9k3d3jQ&usqp=CAU",
		title: "Home Repairs",
	},
	{
		imgSrc: "https://www.informatica.com/content/dam/informatica-marketplace/public/images/logos/InfaTools_178_90.png",
		title: "Bestsellar Package",
	},
];

function ServiceBox({ imgSrc, title }) {
	return (
		<Link
			key={1}
			to={`/ServicePage/${1}`}
		>
			<div
				className='ServiceBox'
				action=''
			>
				<img
					type='image'
					src={imgSrc}
				></img>
				<p>{title}</p>
			</div>
		</Link>
	);
}

export default function MainHome() {
	return (
		<div className='MainHome'>
			<div className='box-main'>
				<h1>Home services at your doorstep</h1>
				<div className='box-items'>
					<h2>What are you looking for?</h2>

					<div className='category_1'>
						{services ? (
							services.map((service, index) => (
								<ServiceBox
									key={index}
									imgSrc={service.imgSrc}
									title={service.title}
								/>
							))
						) : (
							<p>Loading...</p>
						)}
					</div>
				</div>
				<div className='achievement'>
					<div className='ach'>
						<h2>
							<i className='fa-regular fa-star'></i>
						</h2>
						<div className='ach-details'>
							<span>4.6</span>
							<span>Service Rating</span>
						</div>
					</div>

					<div className='ach'>
						<h2>
							<i className='fa-solid fa-users'> </i>
						</h2>
						<div className='ach-details'>
							<span>1m</span>
							<span>Customers Globally</span>
						</div>
					</div>
				</div>
			</div>
			<div className='box-main'>
				<div className='testimonials'>
					<div className='testimonial  testimonial--purple'>
						<img
							src='https://res.cloudinary.com/drpsngpm1/image/upload/v1712577247/pexels-los-muertos-crew-8853503_r8ylbu.jpg'
							alt=''
						/>
					</div>

					<div className='testimonial testimonial--blue-grey'>
						<img
							src='https://res.cloudinary.com/drpsngpm1/image/upload/v1712577278/pexels-los-muertos-crew-8853537_obcrnh.jpg'
							alt=''
						/>
					</div>
					<div className='testimonial testimonial--pink'>
						<img
							src='https://res.cloudinary.com/drpsngpm1/image/upload/v1712577302/pexels-los-muertos-crew-8853536_exlhxo.jpg'
							alt=''
						/>
					</div>

					<div className='testimonial testimonial--blue-black'>
						<img
							src='https://res.cloudinary.com/drpsngpm1/image/upload/v1712577313/pexels-los-muertos-crew-8853502_g4zb8y.jpg'
							alt=''
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
