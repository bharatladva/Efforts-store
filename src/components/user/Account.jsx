/** @format */

import React, { useState } from "react";
import { useAuth } from "../user/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();

	const favorites = "favorites";
	const Cart = "cart";
	const Ratings = "ratings";
	const MyOders = "My Oders";

	const navigate = useNavigate();

	async function handleLogout() {
		setError("");
		try {
			await logout();
			navigate("/signup");
		} catch {
			setError("Failed to log out");
		}
	}

	function navigateTofavorites() {
		navigate(`/user/${favorites}`);
	}
	function navigateToCart() {
		navigate(`/user/${Cart}`);
	}
	function navigateToRatings() {
		navigate(`/user/${Ratings}`);
	}

	return (
		<div className='signin-page-container'>
			<div className='signin-page-main'>
				<div className='account-head'>
					<h2
						className='form_title title'
						style={{
							color: "#0f3460",
						}}
					>
						User Profile
					</h2>
					{error && <div className='alert'>{error}</div>}

					<p style={{ fontFamily: "Oswald , sans-serif", fontSize: "18px" }}>
						Name : {currentUser ? currentUser.displayName : "No name available"}
					</p>

					<p style={{ fontFamily: "Oswald , sans-serif", fontSize: "18px" }}>
						Email : {currentUser ? currentUser.email : "No email available"}
					</p>

					<div className='userimage'></div>
				</div>

				<div className='accout-userdata'>
					<div
						className='category-box'
						onClick={navigateTofavorites}
					>
						<div>
							<div className='icon-button acc-heart-btn'></div>
							<label htmlFor=''>{favorites}</label>
						</div>
					</div>

					<div
						className='category-box'
						onClick={navigateToRatings}
					>
						<div>
							<div className='icon-button rat-btn'></div>
							<label htmlFor=''>{Ratings}</label>
						</div>
					</div>
					<div
						className='category-box'
						onClick={navigateToCart}
					>
						<div>
							<div className='icon-button acc-bookmark-btn'></div>
							<label htmlFor=''>{Cart}</label>
						</div>
					</div>

					<div
						className='category-box'
						onClick={navigateToRatings}
					>
						<div>
							<div className='icon-button rat-btn'></div>
							<label htmlFor=''>{MyOders}</label>
						</div>
					</div>
				</div>
				<div
					style={{
						width: "100%",
						display: "flex",
						gap: "5%",
						height: "100%",
						alignItems: "flex-end",
						position: "absolute",
						top: "-10%",
					}}
				>
					<Link to='/update-profile'>
						<button className='form__button signin-button'>Update Profile</button>
					</Link>

					<button
						className='form__button signin-button submit'
						onClick={handleLogout}
					>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}
