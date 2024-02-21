/** @format */

import React from "react";
import "./style.css";
import logo from "../../components/assets/images/logo.jpeg";
import { Link } from "react-router-dom";

import { useAuth } from "../../components/user/AuthContext";

const Footer = () => {
	let { currentUser } = useAuth();
	return (
		<>
			{currentUser ? (
				<footer>
					<div className='footer-contener'>
						<div className='box'>
							<div className='logo'>
								{
									<img
										src={logo}
										alt=''
									/>
								}
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
								libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et
								lectus vel ut sollicitudin elit at amet.
							</p>
							<div className='icon d_flex'>
								<div className='img d_flex'>
									<i className='fa-brands fa-google-play'></i>
									<span>Google Play</span>
								</div>
								<div className='img d_flex'>
									<i className='fa-brands fa-app-store-ios'></i>
									<span>App Store</span>
								</div>
							</div>
						</div>

						<div className='box'>
							<h2>About Us</h2>
							<ul>
								<li>Our Stores</li>
								<li>Our Cares</li>
								<li>Terms & Conditions</li>
								<li>Privacy Policy</li>
								<li>
									<Link
										style={{
											color: "red",
											fontSize: "1.2rem",
										}}
										to='https://bharatladva.github.io/cv/'
									>
										Developer
									</Link>
								</li>
							</ul>
						</div>
						<div className='box'>
							<h2>Customer Care</h2>
							<ul>
								<li>Help Center </li>
								<li>How to Buy </li>
								<li>Track Your Order </li>
								<li>Corporate & Bulk Purchasing </li>
								<li>Returns & Refunds </li>
							</ul>
						</div>
						<div className='box'>
							<h2>Contact Us</h2>
							<ul>
								<li>
									Blue Chip Complex, 708/09, opp. Parsi agiyari ground, Sarod,
									Sayajiganj, Vadodara, Gujarat 390020{" "}
								</li>
								<li>Email: Sales@effortsgroup.in</li>
								<li>Phone: +91 8000 628 628</li>
							</ul>
						</div>
					</div>
				</footer>
			) : (
				""
			)}
		</>
	);
};

export default Footer;
