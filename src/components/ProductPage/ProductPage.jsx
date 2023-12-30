/** @format */
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import Ddata from "../discount/Ddata";
import OderPage from "../oderPage/OderPage";

const ProductPage = () => {
	let { id } = useParams();
	id = id * 1;

	const productData = Ddata.find((p) => p.id === id);
	const product = productData ? productData : undefined;

	const [isPopupOpen, setPopupOpen] = useState(false);

	const openPopup = () => {
		setPopupOpen(true);
	};

	const closePopup = () => {
		setPopupOpen(false);
	};

	return (
		<>
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
								{product.otherImage.map((image) => (
									<img
										src={image}
										alt=''
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
		</>
	);
};

export default ProductPage;
