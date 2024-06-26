/** @format */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import { UserDataContext } from "./../user/UserDataContext";
import { useAuth } from "../user/AuthContext";
import OderPage from "../oderPage/OderPage";
const API_URL = process.env.REACT_APP_API_URL;

const ProductPage = () => {
	let { _id } = useParams();
	const { currentUser } = useAuth();

	const { handleFavorite, handleAddToCart, fetchUserData, handleRate, itemsState } =
		useContext(UserDataContext);

	const [product, setProduct] = useState();
	const [comment, setComment] = useState("");

	const handleFavoriteClick = async () => {
		handleFavorite(_id);
	};

	const handleAddToCartClick = async () => {
		handleAddToCart(_id);
	};

	const handleRateClick = async (value) => {
		handleRate(_id, value);
	};

	useEffect(() => {
		const fetchData = async () => {
			fetchUserData(_id);
		};

		fetchData();
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [_id, comment]);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/products/${_id}`);
			const data = await response.json();
			setProduct(data.data.product);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const submitComment = async () => {
		try {
			// Assuming you have user data available to get the user's name and uid
			// Get the user's name and uid from user context or wherever it's available

			const response = await fetch(`${API_URL}/products/${_id}/reviews`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					comment: {
						name: currentUser.displayName,
						uid: currentUser.uid,
						msg: comment,
						product_id: _id,
					},
				}),
			});
			const data = await response.json();
			// Assuming the server responds with updated product data
			setProduct(data.updatedProduct);
			// Clear the comment input field
			setComment("");
		} catch (error) {
			console.error("Error submitting comment:", error);
		}
	};

	//----------------------------------------------------------------
	const [isPopupOpen, setPopupOpen] = useState(false);

	const openPopup = () => {
		setPopupOpen(true);
	};

	const closePopup = () => {
		setPopupOpen(false);
	};

	let cartItems = {};

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
											itemsState?.[_id]?.isFavorite
												? "heart-btn-selected "
												: "heart-btn"
										}`}
										onClick={() => {
											handleFavoriteClick();
										}}
									></button>
									<div className='rating'>
										<label
											htmlFor='star6'
											className={
												itemsState?.[_id]?.selectedRating >= 5
													? "in-rate-range"
													: ""
											}
											onClick={() => handleRateClick(5)}
										></label>
										<label
											htmlFor='star7'
											className={
												itemsState?.[_id]?.selectedRating >= 4
													? "in-rate-range"
													: ""
											}
											onClick={() => handleRateClick(4)}
										></label>
										<label
											htmlFor='star8'
											className={
												itemsState?.[_id]?.selectedRating >= 3
													? "in-rate-range"
													: ""
											}
											onClick={() => handleRateClick(3)}
										></label>
										<label
											htmlFor='star9'
											className={
												itemsState?.[_id]?.selectedRating >= 2
													? "in-rate-range"
													: ""
											}
											onClick={() => handleRateClick(2)}
										></label>
										<label
											htmlFor='star10'
											className={
												itemsState?.[_id]?.selectedRating >= 1
													? "in-rate-range"
													: ""
											}
											onClick={() => handleRateClick(1)}
										></label>
									</div>
								</div>
								<button
									className={`cart ${
										itemsState?.[_id]?.inCart ? "cart-selected " : "cart"
									}`}
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
										cartItems={[
											{
												_id: _id,
												name: product.name,
												price: product.price,
												quantity: 1,
											},
										]}
									/>
								)}
							</div>
						</div>
					</div>
					<div className='reviewsSection'>
						<h1>Comments</h1>
						{/* Render existing comments */}
						{product.reviews.map((review, index) => (
							<div
								key={index}
								className='reviews'
							>
								<h3 className='reviews-name'>{review.name}</h3>
								<div className='massage'>
									<p className='reviews-message'>{review.msg}</p>
								</div>
							</div>
						))}
						{/* Input field and send button for new comment */}
						<div className='comment-input'>
							<input
								type='text'
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder='Write your comment here'
							/>
							<button onClick={submitComment}>Send</button>
						</div>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default ProductPage;
