/** @format */

import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { useAuth } from "../../components/user/AuthContext";
import { UserDataContext } from "../../components/user/UserDataContext";
import OderPage from "../../components/oderPage/OderPage";
const API_URL = process.env.REACT_APP_API_URL;

const Cart = () => {
	const dataType = "cart";
	const { currentUser } = useAuth();
	const [dbList, setDbList] = useState([]);
	const [productData, setProductData] = useState([]);

	const { handleAddToCart, itemsState } = useContext(UserDataContext);

	const handleAddToCartClick = async (_id) => {
		handleAddToCart(_id);
	};

	const [isPopupOpen, setPopupOpen] = useState(false);

	const openPopup = () => {
		console.log("Cart Items:", cartItems);
		setPopupOpen(true);
	};

	const closePopup = () => {
		setPopupOpen(false);
	};

	useEffect(() => {
		if (currentUser) {
			const uid = currentUser.uid;

			fetch(`${API_URL}/user/get-user-data-list?uid=${uid}&dataType=${dataType}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("HTTP error " + response.status);
					}
					return response.json();
				})
				.then((data) => {
					setDbList(data.arrayData);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [dataType, currentUser, itemsState]);

	useEffect(() => {
		const fetchDataForProductCards = async () => {
			const ProductDataPromises = dbList.map((item) => {
				console.log("item id", item._id);

				return fetch(`${API_URL}/products/${item._id}`).then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				});
			});

			try {
				const resolvedProductData = await Promise.all(ProductDataPromises);

				// Initialize quantity for each product to 1
				const updatedProductData = resolvedProductData.map((product) => ({
					...product,
					quantity: 1,
				}));

				console.log(updatedProductData);

				setProductData(updatedProductData);
			} catch (error) {
				console.error("Error fetching product data:", error);
			}
		};

		if (dbList.length > 0) {
			fetchDataForProductCards();
		}
	}, [dbList]);

	//----------------------------------------------------------------------------------------qty price productNames

	const handleDecreaseQuantity = (index) => {
		const updatedProductData = [...productData];
		if (updatedProductData[index].quantity > 1) {
			updatedProductData[index].quantity -= 1;
			setProductData(updatedProductData);
		}
	};

	const handleIncreaseQuantity = (index) => {
		const updatedProductData = [...productData];
		updatedProductData[index].quantity += 1;
		setProductData(updatedProductData);
	};

	const totalPrice = productData.reduce((total, product) => {
		const itemPrice = product.data.product.price || 0; // Use 0 if price is missing or falsy
		const itemQuantity = product.quantity || 0; // Use 0 if quantity is missing or falsy
		return total + itemPrice * itemQuantity;
	}, 0);

	const productNames = productData.map((product) => product.data.product.name);

	//-----------------------------------------------------------------------------------------------

	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		// Populate the cart items array when product data is available
		if (Array.isArray(productData) && productData.length > 0) {
			const updatedCartItems = productData.map((product) => {
				return {
					name: product.data.product.name,
					price: product.data.product.price,
					quantity: product.quantity,
				};
			});
			setCartItems(updatedCartItems);
		}
	}, [productData]);

	if (
		Array.isArray(productData) &&
		Array.isArray(dbList) &&
		productData.length === dbList.length
	) {
		return (
			<>
				<section className='cart-items'>
					<div className='container d_flex'>
						{/* if hamro cart ma kunai pani item xaina bhane no diplay */}

						<div className='cart-details'>
							{productData.length === 0 && (
								<h1 className='no-items product'>No Items are add in Cart</h1>
							)}

							{/* yasma hami le cart item lai display garaaxa */}

							{productData.map((product, index) => {
								const data = product.data.product;
								const productQty = data.price * product.quantity;

								return (
									<div
										className='cart-list product d_flex'
										key={data._id}
									>
										<div className='img'>
											<img
												src={data.mainImage}
												alt=''
											/>
										</div>
										<div className='cart-details'>
											<h3>{data.name}</h3>
											<h4>
												${data.price}.00 * {product.quantity}
												<span>${productQty}.00</span>
											</h4>
										</div>
										<div className='cart-items-function'>
											<div className='removeCart'>
												<button
													className='removeCart'
													onClick={() => {
														handleAddToCartClick(data._id);
													}}
												>
													<i className='fa-solid fa-xmark'></i>
												</button>
											</div>

											<div className='cartControl d_flex'>
												<button
													className='incCart'
													onClick={() => handleIncreaseQuantity(index)}
												>
													<i className='fa-solid fa-plus'></i>
												</button>
												<button
													className='desCart'
													onClick={() => handleDecreaseQuantity(index)}
												>
													<i className='fa-solid fa-minus'></i>
												</button>
											</div>
										</div>

										<div className='cart-item-price'></div>
									</div>
								);
							})}
						</div>

						<div className='cart-total product'>
							<h2>Cart Summary</h2>
							<div className=' d_flex'>
								<h4>Total Price :</h4>
								<h3>₹{totalPrice}.00</h3>
							</div>
							<button
								className='cart-btn'
								onClick={openPopup}
							>
								Buy Now
							</button>
							{isPopupOpen && (
								<OderPage
									onClose={closePopup}
									cartItems={cartItems}
									price={totalPrice}
									productNames={productNames}
								/>
							)}
						</div>
					</div>
				</section>
			</>
		);
	} else {
		return "Loading...";
	}
};

export default Cart;
