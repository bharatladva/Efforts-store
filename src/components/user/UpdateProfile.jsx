/** @format */

import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const currentPasswordRef = useRef();
	const { currentUser, updatePassword, updateEmail } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const Navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		const promises = [];
		setLoading(true);
		setError("");

		if (!currentPasswordRef.current.value || !passwordRef.current.value) {
			return setError("Passwords cannot be empty");
		}

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}

		if (currentPasswordRef.current.value && passwordRef.current.value) {
			promises.push(
				updatePassword(currentPasswordRef.current.value, passwordRef.current.value)
			);
		}

		Promise.all(promises)
			.then(() => {
				Navigate("/");
			})
			.catch((error) => {
				console.error(error);
				setError("Failed to update account");
			})

			.finally(() => {
				setLoading(false);
			});
	}

	return (
		// The rest of your code remains unchanged
		<div className='signin-page-container'>
			<div className='signin-page-main'>
				<h2 className='form_title title'>Update Profile</h2>
				<div className='w-100 text-center mt-2'>
					<Link to='/'>Cancel</Link>
				</div>

				<div className={`error-alert ${error === "" ? "" : "show-erorr-alert"}`}>
					{error}
				</div>

				<form
					className='signin-form'
					style={{
						height: "60%",
					}}
					onSubmit={handleSubmit}
				>
					<label className='label-text'>Email</label>
					<input
						className='form__input'
						type='email'
						ref={emailRef}
						required
						defaultValue={currentUser.email}
					/>

					<label className='label-text'>Current Password</label>
					<input
						className='form__input'
						type='password'
						ref={currentPasswordRef}
						placeholder='Enter your current password'
						required
					/>

					<label className='label-text'>Password</label>
					<input
						className='form__input'
						type='password'
						ref={passwordRef}
						placeholder='Leave blank to keep the same'
					/>

					<label className='label-text'>Password Confirmation</label>
					<input
						className='form__input'
						type='password'
						ref={passwordConfirmRef}
						placeholder='Leave blank to keep the same'
					/>

					<button
						disabled={loading}
						className='form__button signin-button submit'
						type='submit'
					>
						Update
					</button>
				</form>
			</div>
		</div>
	);
}
