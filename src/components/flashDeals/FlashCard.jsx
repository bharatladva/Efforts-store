/** @format */

import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { UserDataContext } from "./../user/UserDataContext";

const FlashCard = ({ productItems }) => {
	const { _id, name, price, mainImage, discount } = productItems;
	const {
		handleFavorite,
		isFavorite,
		handleAddToCart,
		inCart,
		fetchUserData,
		handleRate,
		selectedRating,
	} = useContext(UserDataContext);

	const handleFavoriteClick = async (_id) => {
		console.log(_id);
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
			await fetchUserData(_id);
		};

		fetchData();
	}, []);

	const navigate = useNavigate();
	function sanitizePath(path) {
		return path.replace(/\/+/g, "/");
	}
	function navigateToProductPage(e, _id) {
		e.preventDefault();
		navigate(sanitizePath(`/productPage/${_id}`));
	}

	//--------------------

	return (
		<>
			<div
				className='FlashCard-box'
				onClick={(e) => navigateToProductPage(e, _id)}
			>
				<div className='product mtop'>
					<div className='img'>
						<span className='discount'>{discount}% Off</span>
						<img
							className='product-mainImage'
							src={mainImage}
							alt=''
						/>
						<div className='product-like'>
							<button
								//className={`icon-button ${
								//	isFavorite ? "heart-btn-selected " : "heart-btn"
								//}`}

								className='icon-button heart-btn-selected'
								onClick={(e) => {
									e.stopPropagation();
									handleFavoriteClick(_id);
								}}
							></button>
						</div>
					</div>
					<div className='product-details'>
						<h3>{name}</h3>

						<div className='price'>
							<h4>₹{price}.00 </h4>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleAddToCartClick();
								}}
							>
								<i className={`fa fa-plus  ${inCart ? "fa fa-plus  " : " "}`}></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FlashCard;
