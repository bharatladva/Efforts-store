/** @format */

import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch (error) {
			console.error(error);
			setError("Failed to log in");
		}

		setLoading(false);
	}

	return (
		<>
			<form
				action=''
				className='signin-form'
				id='b-form'
				onSubmit={handleSubmit}
			>
				<h2 className='form_title title'>Sign in to Efforts</h2>

				<div className={`error-alert ${error === "" ? "" : "show-erorr-alert"}`}>
					{error}
				</div>
				<label className='label-text'>Email</label>
				<input
					type='text'
					className='form__input'
					placeholder='Email'
					ref={emailRef}
					onChange={() => setError("")}
				/>
				<label className='label-text'>Password</label>
				<input
					type='password'
					className='form__input Password'
					placeholder='Password'
					ref={passwordRef}
					onChange={() => setError("")}
				/>

				<p className='signin-form-link'>
					<Link
						to='/forgot-password'
						style={{ color: "var(--primary-font-color-4)" }}
					>
						Forgot Password?
					</Link>
				</p>

				<button
					className='form__button signin-button submit'
					disabled={loading}
					type='submit'
				>
					Sign In
				</button>
			</form>
		</>
	);
}
