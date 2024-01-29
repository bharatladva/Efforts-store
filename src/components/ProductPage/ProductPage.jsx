/** @format */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import { useAuth } from "./../user/AuthContext";

import OderPage from "../oderPage/OderPage";
const API_URL = "http://localhost:5000";

const ProductPage = () => {
	let { _id } = useParams();
	let { currentUser } = useAuth();

	const [product, setProduct] = useState();
	const [isFavorite, setIsFavorite] = useState(false);
	const [inCart, setInCart] = useState(false);
	const [selectedRating, setSelectedRating] = useState(0);

	const handleFavoriteClick = async () => {
		if (!currentUser) {
			window.alert(`Please Log in to your Account to Add This To Your Favorites`);
			return;
		}
		try {
			let itemToAdd = { _id };
			let uid = currentUser.uid;
			const response = await fetch(`${API_URL}/user/add-to-favorites`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
					itemToAdd,
					isFavorite,
				}),
			});

			const responseData = await response.json();

			setIsFavorite((old) => {
				return responseData.isAdded ? !old : old;
			});
		} catch (error) {
			// Handle error
			console.error(error);
		}
	};
	const handleAddToCartClick = async () => {
		if (!currentUser) {
			window.alert(`Please Log in to your Account to Add This To Your Favorites`);
			return;
		}

		try {
			let itemToAdd = { _id };
			let uid = currentUser.uid;
			const response = await fetch(`${API_URL}/user/add-to-cart`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
					itemToAdd,
					inCart,
				}),
			});

			const responseData = await response.json();

			setInCart((old) => {
				return responseData.isAddedInCart ? !old : old;
			});
		} catch (error) {
			// Handle error
			console.error(error);
		}
	};

	const handleRateClick = async (value) => {
		if (!currentUser) {
			window.alert(`Please Log in to your Account to Rate this Movie`);
			return;
		}
		try {
			let itemToAdd = { _id, selectedRating: value };
			let uid = currentUser.uid;
			const response = await fetch(`${API_URL}/user/rate-media`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
					itemToAdd,
				}),
			});

			// Handle success
			const responseData = await response.json();
			console.log(responseData);
			setSelectedRating(responseData.updatedTo);
		} catch (error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}
			console.log(error.config);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (currentUser) {
				try {
					const response = await fetch(
						`${API_URL}/user/search-media-data?uid=${currentUser.uid}&id=${_id}`
					);
					const data = await response.json();
					console.log(data);
					setIsFavorite(data.favorited);
					setSelectedRating(data.rated);
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [_id]);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/products/${_id}`);
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
								<div className='userdata'>
									<button
										className={`icon-button ${
											isFavorite ? "heart-btn-selected " : "heart-btn"
										}`}
										onClick={() => {
											handleFavoriteClick();
										}}
									></button>
									<div className='rating'>
										<label
											htmlFor='star6'
											className={selectedRating >= 5 ? "in-rate-range" : ""}
											onClick={() => handleRateClick(5)}
										></label>
										<label
											htmlFor='star7'
											className={selectedRating >= 4 ? "in-rate-range" : ""}
											onClick={() => handleRateClick(4)}
										></label>
										<label
											htmlFor='star8'
											className={selectedRating >= 3 ? "in-rate-range" : ""}
											onClick={() => handleRateClick(3)}
										></label>
										<label
											htmlFor='star9'
											className={selectedRating >= 2 ? "in-rate-range" : ""}
											onClick={() => handleRateClick(2)}
										></label>
										<label
											htmlFor='star10'
											className={selectedRating >= 1 ? "in-rate-range" : ""}
											onClick={() => handleRateClick(1)}
										></label>
									</div>
								</div>
								<button
									className={`cart ${inCart ? "cart-selected " : "cart"}`}
									//className='cart'
									onClick={() => {
										handleAddToCartClick();
									}}
								>
									Add to cart
								</button>
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
