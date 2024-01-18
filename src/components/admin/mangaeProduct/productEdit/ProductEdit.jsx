/** @format */

/** @format */

import React, { useContext, useState, useEffect } from "react";
import ReviewEdit from "./../reviews/ReviewEdit";
import { ProductContext } from "./../ManageProduct";
import { v4 as uuidv4 } from "uuid";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";

import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

const API_URL = "http://localhost:5000/products";

export default function ProductEdit({ product }) {
	const { handleProductChange, handleProductSelect } = useContext(ProductContext);
	const [formData, setFormData] = useState(product);

	const [publicId, setPublicId] = useState("");

	const [cloudName] = useState("drpsngpm1");

	const [uploadPreset] = useState("ml_default");

	const [uwConfig] = useState({
		cloudName,
		uploadPreset,
		// cropping: true, //add a cropping step
		// showAdvancedOptions: true,  //add advanced options (public_id and tag)
		// sources: [ "local", "url"], // restrict the upload sources to URL and local files
		// multiple: false,  //restrict upload to a single file
		// folder: "user_images", //upload files to the specified folder
		// tags: ["users", "profile"], //add the given tags to the uploaded files
		// context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
		// clientAllowedFormats: ["images"], //restrict uploading to image files only
		// maxImageFileSize: 2000000,  //restrict file size to less than 2MB
		// maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
		theme: "purple", //change to a purple theme
	});

	const cld = new Cloudinary({
		cloud: {
			cloudName,
		},
	});

	const myImage = cld.image(publicId);

	function handleChange(changes) {
		const updatedProduct = { ...product, ...changes };
		handleProductChange(product._id, updatedProduct);
		setFormData(updatedProduct);
	}

	useEffect(() => {
		setFormData(product);
	}, [product]);

	function handleReviewChange(id, review) {
		const newReviews = [...product.reviews];
		const index = newReviews.findIndex((i) => i.id === id);
		newReviews[index] = review;
		handleChange({ reviews: newReviews });
	}

	function handleReviewAdd() {
		const newReview = {
			id: uuidv4(),
			name: "",
			msg: "",
		};
		handleChange({ reviews: [...product.reviews, newReview] });
	}
	function handleReviewDelete(id) {
		handleChange({
			reviews: product.reviews.filter((i) => i.id !== id),
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			const response = await fetch(`${API_URL}/${product._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			handleChange(data.data.product);

			console.log("Form submitted:", data.data.product);
		} catch (error) {
			console.error("Error updating product:", error);
		}
	}

	return (
		<form
			className='recipe-edit'
			onSubmit={handleSubmit}
		>
			<div className='recipe-edit__remove-button-container'>
				<button
					className='btn recipe-edit__remove-button'
					onClick={() => handleProductSelect(undefined)}
				>
					&times;
				</button>
			</div>
			<div className='recipe-edit__details-grid'>
				<label
					htmlFor='name'
					className='recipe-edit__label'
				>
					Name
				</label>
				<input
					type='text'
					name='name'
					id='name'
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					className='recipe-edit__input'
				/>

				<label
					htmlFor='tital'
					className='recipe-edit__label'
				>
					Tital
				</label>
				<input
					type='text'
					name='tital'
					id='tital'
					value={formData.tital}
					onChange={(e) => setFormData({ ...formData, tiral: e.target.value })}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='catagoriy'
					className='recipe-edit__label'
				>
					catagoriy
				</label>
				<input
					type='text'
					name='catagoriy'
					id='catagoriy'
					value={formData.catagoriy}
					onChange={(e) => setFormData({ ...formData, catagoriy: e.target.value })}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='price'
					className='recipe-edit__label'
				>
					Price
				</label>
				<input
					type='number'
					min='1'
					name='servings'
					id='servings'
					value={formData.price}
					onChange={(e) =>
						setFormData({ ...formData, price: parseInt(e.target.value) || "" })
					}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='discount'
					className='recipe-edit__label'
				>
					discount
				</label>
				<input
					type='number'
					min='1'
					name='discount'
					id='discount'
					value={formData.discount}
					onChange={(e) =>
						setFormData({ ...formData, discount: parseInt(e.target.value) || "" })
					}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='stock'
					className='recipe-edit__label'
				>
					stock
				</label>
				<input
					type='number'
					min='1'
					name='stock'
					id='stock'
					value={formData.stock}
					onChange={(e) =>
						setFormData({ ...formData, stock: parseInt(e.target.value) || "" })
					}
					className='recipe-edit__input'
				/>
				<label
					htmlFor='addTo'
					className='recipe-edit__label'
				>
					addTo
				</label>
				<select
					className='recipe-edit__input'
					name='addTo'
					id='addTo'
					value={formData.addTo}
					onChange={(e) => setFormData({ ...formData, addTo: e.target.value })}
				>
					<option value=''>Select AddTo</option>
					<option value='Flash Delas'>Flash Delas</option>
					<option value='Big Discounts'>Big Discounts</option>
					<option value='Top products'>Top products</option>
					<option value='New Arrivals'>New Arrivals</option>
				</select>

				<label
					htmlFor='discription'
					className='recipe-edit__label'
				>
					discription
				</label>
				<textarea
					name='discription'
					className='recipe-edit__input'
					onChange={(e) => setFormData({ ...formData, discription: e.target.value })}
					value={formData.discription}
					id='discription'
				/>
			</div>
			<br />
			<label className='recipe-edit__label'>reviews</label>
			<div className='recipe-edit__ingredient-grid'>
				<div>Name</div>
				<div>msg</div>
				<div></div>
				{formData.reviews.map((review) => (
					<ReviewEdit
						key={review.id}
						handleReviewChange={handleReviewChange}
						handleReviewDelete={handleReviewDelete}
						review={review}
					/>
				))}
			</div>
			<div className='recipe-edit__add-ingredient-btn-container'>
				<button
					className='btn btn--primary'
					onClick={() => handleReviewAdd()}
				>
					Add Ingredient
				</button>
			</div>
			<br />
			<div className='App'>
				<CloudinaryUploadWidget
					uwConfig={uwConfig}
					setPublicId={(publicId) => {
						setPublicId(publicId);
						handleChange({
							mainImage: `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`,
						});
					}}
				/>

				{formData.mainImage ? (
					<img
						src={formData.mainImage}
						alt='not found'
						style={{ width: "200px" }}
					/>
				) : (
					<p>No main image.</p>
				)}

				<div style={{ width: "200px" }}>
					<AdvancedImage
						style={{ maxWidth: "100%" }}
						cldImg={myImage}
						plugins={[responsive(), placeholder()]}
					/>
				</div>
			</div>

			<div className='recipe-edit__add-ingredient-btn-container'>
				<button
					type='submit'
					className='btn btn--primary'
				>
					Submit
				</button>
			</div>
		</form>
	);
}
