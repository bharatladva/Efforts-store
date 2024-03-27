/** @format */

import React, { useState, useContext } from "react";
import { UserDataContext } from "../user/UserDataContext";

export default function AddresValues() {
	const { handleAddress } = useContext(UserDataContext);

	const [formValues, setFormValues] = useState({});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormValues({ ...formValues, [id]: value });
	};

	const handleAddressSubmit = (e) => {
		e.preventDefault();
		handleAddress(formValues);
	};

	return (
		<div className='address'>
			<div className='container'>
				<h1>Shipping</h1>
				<p>Please enter your shipping details. befor buy</p>
				<form onSubmit={handleAddressSubmit}>
					<div className='form'>
						<div className='fields fields--2'>
							<label className='field'>
								<span
									className='field__label'
									htmlFor='lendMarck'
								>
									lendMarck
								</span>
								<input
									className='field__input'
									type='text'
									id='lendMarck'
									required
									value={formValues.lendMarck || ""}
									onChange={handleChange}
								/>
							</label>
							<label class='field'>
								<span
									className='field__label'
									htmlForor='phonenumber'
								>
									Phone number
								</span>
								<input
									className='field__input'
									type='number'
									id='phone'
									value={formValues.phone || ""}
									onChange={handleChange}
								/>
							</label>
						</div>
						<label className='field'>
							<span
								className='field__label'
								htmlFor='FullAddress'
							>
								Full Address
							</span>
							<input
								className='field__input'
								type='text'
								id='fullAddress' // Changed from 'full address'
								value={formValues.fullAddress || ""}
								onChange={handleChange}
							/>
						</label>

						<label className='field'>
							<span
								className='field__label'
								htmlFor='country'
							>
								Country
							</span>
							<select
								className='field__input'
								id='country'
								value={formValues.country || ""}
								onChange={handleChange}
								defaultValue='india'
							>
								<option value>India</option>
							</select>
						</label>
						<div className='fields fields--3'>
							<label className='field'>
								<span
									className='field__label'
									htmlFor='zipcode'
								>
									Zip code
								</span>
								<input
									className='field__input'
									type='text'
									id='zipcode'
									value={formValues.zipcode || ""}
									onChange={handleChange}
								/>
							</label>
							<label class='field'>
								<span
									className='field__label'
									htmlFor='city'
								>
									City
								</span>
								<input
									className='field__input'
									type='text'
									id='city'
									value={formValues.city || ""}
									onChange={handleChange}
								/>
							</label>
							<label className='field'>
								<span
									className='field__label'
									htmlFor='state'
								>
									State
								</span>
								<select
									className='field__input'
									id='state'
									value={formValues.state || ""}
									onChange={handleChange}
									defaultValue='gujrat'
								>
									<option
										value='gujrat'
										selected
									>
										gujrat
									</option>
								</select>
							</label>
						</div>
					</div>
					<hr />
					<button
						className='button'
						type='submit'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
