/** @format */

import React from "react";
import "./contectUs.css";

export default function ContectUs() {
	return (
		<div className='ContectUs'>
			<div className='contectUs-box'>
				<div className='ContectUs-input'>
					<form>
						<h3>Send message</h3>
						<div className='float'>
							<div className='form-control'>
								<label for='name'>Name</label>
								<input
									type='text'
									name='name'
									id='name'
									title='Enter name'
									placeholder='Enter your name'
								/>
							</div>
						</div>
						<div className='form-control'>
							<label for='email'>Email</label>
							<input
								type='email'
								name='email'
								id='email'
								title='Enter email'
								placeholder='Enter your email'
							/>
						</div>
						<div className='form-control'>
							<label for='number'>Phone Number</label>
							<input
								type='number'
								name='number'
								id='number'
								title='Enter Number'
								placeholder='Enter your Number'
							/>
						</div>

						<div className='form-control'>
							<label for='message'>Message</label>
							<textarea
								name='discription'
								className='contectUs-msg'
								id='discription'
							/>
						</div>
						<div
							className='form-control'
							id='btngrp'
						>
							<input
								type='submit'
								name='name'
								id='name'
								title='Send Email'
								value='send email'
								className='btn'
							/>
						</div>
					</form>
				</div>
				<div className='suggest'>
					<h3>Info</h3>
					<div className='form-control'>
						<label for='email'>Phone Number</label>
						<h4> +91 8000 628 628 </h4>
					</div>
					<div className='form-control'>
						<label for='email'>Email</label>
						<h4> Sales@effortsgroup.in </h4>
					</div>
				</div>
			</div>
			<div className='contectUs-map'>
				<iframe
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.2380809053634!2d73.18048497584304!3d22.306833942657793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf8446e9dd69%3A0x86c2d3de1fa639e4!2sEfforts%20Solar%20%26%20EV!5e0!3m2!1sen!2sin!4v1708498395864!5m2!1sen!2sin'
					width='100%'
					height='100%'
					style={{
						border: "0",
						borderRadius: "10px",
						boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
					}}
					allowfullscreen=''
					loading='lazy'
					referrerpolicy='no-referrer-when-downgrade'
				></iframe>
			</div>
		</div>
	);
}
