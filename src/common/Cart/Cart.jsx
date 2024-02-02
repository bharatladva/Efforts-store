/** @format */

import React, { useState, useEffect } from "react";
import "./style.css";
import { useAuth } from "../../components/user/AuthContext";
const API_URL = process.env.REACT_APP_API_URL;

const Cart = () => {
	const dataType = "cart";
	const { currentUser } = useAuth();
	const [dbList, setDbList] = useState([]);
	const [productData, setProductData] = useState([]);

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
	}, [dataType, currentUser]);

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

				setProductData(resolvedProductData);
			} catch (error) {
				console.error("Error fetching product data:", error);
			}
		};

		if (dbList.length > 0) {
			fetchDataForProductCards();
		}
	}, [dbList]);

	const totalPrice = productData.reduce((price, item) => price + item.qty * item.price, 0);

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

							{productData.map((response, index) => {
								const data = response.data.product;
								const productQty = data.price * data.qty;

								return (
									<div
										className='cart-list product d_flex'
										key={data.id}
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
												${data.price}.00 * {data.qty}
												<span>${productQty}.00</span>``
											</h4>
										</div>
										<div className='cart-items-function'>
											<div className='removeCart'>
												<button className='removeCart'>
													<i className='fa-solid fa-xmark'></i>
												</button>
											</div>
											{/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
											<div className='cartControl d_flex'>
												<button
													className='incCart'
													//onClick={() => addToCart(item)}
												>
													<i className='fa-solid fa-plus'></i>
												</button>
												<button
													className='desCart'
													//onClick={() => decreaseQty(item)}
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
