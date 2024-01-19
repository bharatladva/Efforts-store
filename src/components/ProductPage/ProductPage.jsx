/** @format */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

import OderPage from "../oderPage/OderPage";
const API_URL = "http://localhost:5000/products";

const ProductPage = () => {
	let { _id } = useParams();

	const [product, setProduct] = useState();

	useEffect(() => {
		fetchProducts();
	}, [_id]);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/${_id}`);
			const data = await response.json();
			setProduct(data.data.product);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};
	const [isPopupOpen, setPopupOpen] = useState(false);

	const openPopup = () => {
		setPopupOpen(true);
	};

	const closePopup = () => {
		setPopupOpen(false);
	};

	return (
		<>
			{product ? (
				<div className='mainpage'>
					<div className='productPage'>
						<div
							className='details'
							key={product.id}
						>
							<div className='big-img'>
								<img
									src={product.mainImage}
									alt=''
								/>
								<div className='otherImage'>
									{product.otherImage.map((image, index) => (
										<img
											key={index}
											src={image}
											alt={` `}
										/>
									))}
								</div>
							</div>
							<div className='box'>
								<div className='row'>
									<h2>{product.name}</h2>
									<p>{product.tital}</p>
									<span>{product.catagoriy}</span>
								</div>
								<p>{product.discription}</p>
								<span>₹{product.price} </span>
								<span>{product.discount} % discount </span>
								<br />
								<button className='cart'>Add to cart</button>
								<button
									className='cart'
									onClick={openPopup}
								>
									Buy Now
								</button>
								{isPopupOpen && (
									<OderPage
										onClose={closePopup}
										price={product.price}
										name={product.name}
										stock={product.stock}
									/>
								)}
							</div>
						</div>
					</div>
					<div className='reviewsSection'>
						<h1>Comments</h1>
						{product.reviews.map((review) => (
							<div className='reviews'>
								<h3 className='reviews-name'> {review.name}</h3>
								<div className='massage'>
									<p className='reviews-message'>{review.msg}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default ProductPage;
