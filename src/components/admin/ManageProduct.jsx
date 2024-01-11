/** @format */

import React, { useState } from "react";
import "./mangeProduct.css";

const ProductForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		tital: "",
		catagoriy: "",

		price: "",
		discount: "",
		stock: "",
		discription: "",
		addTo: [
			{
				name: "",
				display: false,
			},
		],
		reviews: [
			{
				name: "user",
				msg: "",
			},
		],
	});

	const handleNameChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleTaitalChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleCatagoriyChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handlePriceChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleDiscountChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleStockChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleDiscriptionChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleAddToChange = (index, e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			addTo: formData.addTo.map((item, i) =>
				i === index ? { ...item, [name]: value } : item
			),
		});
	};

	const handleReviewsChange = (index, e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			reviews: formData.reviews.map((item, i) =>
				i === index ? { ...item, [name]: value } : item
			),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Perform actions with the form data, e.g., send it to a server or perform validation.

		// Reset the form after submission
		setFormData({
			name: "",
			tital: "",
			catagoriy: "",

			price: "",
			discount: "",
			stock: "",
			discription: "",
			addTo: [
				{
					name: "",
					display: false,
				},
			],
			reviews: [
				{
					name: "user",
					msg: "",
				},
			],
		});
	};

	return (
		<div className='addProduct'>
			<form onSubmit={handleSubmit}>
				{/* Render input fields for each property in the schema */}

				<label>
					Name:
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleNameChange}
					/>
				</label>
				<label>
					Tital:
					<input
						type='text'
						name='tital'
						value={formData.tital}
						onChange={handleTaitalChange}
					/>
				</label>

				<label>
					Catagoriy:
					<input
						type='text'
						name='catagoriy'
						value={formData.catagoriy}
						onChange={handleCatagoriyChange}
					/>
				</label>
				<label>
					Price:
					<input
						type='number'
						name='price'
						value={formData.price}
						onChange={handlePriceChange}
					/>
				</label>
				<label>
					Discount:
					<input
						type='number'
						name='discount'
						value={formData.discount}
						onChange={handleDiscountChange}
					/>
				</label>
				<label>
					Stock:
					<input
						type='number'
						name='stock'
						value={formData.stock}
						onChange={handleStockChange}
					/>
				</label>

				<label>
					discription:
					<input
						type='text'
						name='discription'
						value={formData.discription}
						onChange={handleDiscriptionChange}
					/>
				</label>
				{/* Repeat similar labels and inputs for other properties in the schema */}

				{/* Example for rendering the 'addTo' array */}
				{formData.addTo.map((item, index) => (
					<div key={index}>
						<label>
							Add To Name:
							<input
								type='text'
								name='name'
								value={item.name}
								onChange={(e) => handleAddToChange(index, e)}
							/>
						</label>
						<label>
							Display:
							<input
								type='checkbox'
								name='display'
								checked={item.display}
								onChange={(e) => handleAddToChange(index, e)}
							/>
						</label>
					</div>
				))}

				<input
					type='file'
					name='file'
				/>
				<button type='submit'>Upload</button>

				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default ProductForm;
