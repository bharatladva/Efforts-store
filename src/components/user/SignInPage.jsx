/** @format */

import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import Signup from "./Signup";
import Login from "./Login";
import { Navigate } from "react-router-dom";

export default function SignInPage() {
	const { googleSignIn, user } = useAuth();
	const [isSwitched, setIsSwitched] = React.useState(true);

	const handleButtonClick = (e) => {
		setIsSwitched((old) => !old);
	};

	//const handleGoogleSignIn = async () => {
	//	try {
	//		await googleSignIn();
	//	} catch (error) {
	//		console.log(error);
	//	}
	//};

	useEffect(() => {
		if (user != null) {
			Navigate("/");
		}
	}, [user]);

	return (
		<div className='signin-page-container'>
			<div className='signin-page-main'>
				<div
					className={`signin-container a-container ${isSwitched ? "is-txl" : ""}`}
					id='a-condtainer'
				>
					{/* <div className='googleButton'>
						<GoogleButton onClick={handleGoogleSignIn} />
					</div> */}
					<Signup />
				</div>
				<div
					className={`signin-container b-container ${isSwitched ? "is-txl is-z200" : ""}`}
					id='b-container'
				>
					{/* <div className='googleButton'>
						<GoogleButton onClick={handleGoogleSignIn} />
					</div> */}
					<Login />
				</div>

				<div
					className={`signin-switch ${isSwitched ? "is-txr" : ""}`}
					id='switch-cnt'
				>
					<div
						className={`switch-container ${isSwitched ? "is-hidden" : ""}`}
						id='switch-c1'
					>
						<div className='logo'>
							<img
								src='../assets/images/984024fe-c3a8-4d83-8d7b-fcbb34e068f8.jpg'
								alt=''
							/>
						</div>
						<h2 className='switch__title title'>Welcome Back!</h2>
						<p className='switch__description description'>
							To keep connected with us please LogIn with your personal info
						</p>
						<button
							className='form__button signin-button'
							onClick={handleButtonClick}
						>
							Sign In
						</button>
					</div>

					<div
						className={`switch-container ${!isSwitched ? "is-hidden" : ""}`}
						id='switch-c2'
					>
						<div className='logo'>
							<img
								src='../assets/images/984024fe-c3a8-4d83-8d7b-fcbb34e068f8.jpg'
								alt=''
							/>
						</div>
						<h2 className='switch__title title'>Hello Friends!</h2>
						<p className='switch__description description'>
							In order to stay connected with us, please log in using your personal
							information.
						</p>
						<button
							className='form__button signin-button'
							onClick={handleButtonClick}
						>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
