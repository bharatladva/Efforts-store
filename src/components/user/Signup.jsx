/** @format */

import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [username, setUsername] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		if (username.length < 4 || username.length > 20) {
			return setError("Length of Name must be in range of 4-20 charecters");
		}

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			// console.log("signup", username);
			await signup(emailRef.current.value, passwordRef.current.value, username);
			navigate("/");
		} catch (error) {
			console.error(error);
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				action=''
				id='a-form'
				className='signin-form'
			>
				<h2 className='form_title title'>Create Account</h2>

				<div className={`error-alert ${error === "" ? "" : "show-erorr-alert"}`}>
					{error}
				</div>
				<span
					className='form__span'
					style={{ color: "var(--primary-font-color-4)" }}
				>
					Use Email for Registration
				</span>
				<label className='label-text'>Name</label>

				<input
					type='text'
					name='username'
					className='form__input'
					value={username}
					onChange={(e) => {
						setError("");
						setUsername(e.target.value);
					}}
					placeholder='abc'
				/>
				<label className='label-text'>Email</label>
				<input
					type='email'
					className='form__input'
					placeholder='abc@gmail.com'
					ref={emailRef}
					onChange={() => setError("")}
				/>
				<label className='label-text'>Password</label>
				<input
					type='password'
					className='form__input Password'
					placeholder='******'
					ref={passwordRef}
					onChange={() => setError("")}
				/>
				<label className='label-text'>Password</label>
				<input
					type='password'
					className='form__input Password'
					placeholder='******'
					ref={passwordConfirmRef}
					onChange={() => setError("")}
				/>
				<button
					className='form__button signin-button submit'
					disabled={loading}
					type='submit'
				>
					Sign Up
				</button>
			</form>
		</>
	);
}
