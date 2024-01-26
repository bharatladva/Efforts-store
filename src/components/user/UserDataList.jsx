/** @format */

// UserDataLists.js

/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./UserDataLists.css"; // Import CSS file for styling

const API_URL = "http://localhost:5000";

export default function UserDataLists() {
	const navigate = useNavigate();
	function sanitizePath(path) {
		return path.replace(/\/+/g, "/");
	}

	function navigateToProductPage(e, _id) {
		e.preventDefault();
		navigate(sanitizePath(`/productPage/${_id}`));
	}

	const { dataType } = useParams();
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
					console.log("server response  dblist", data);

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
				console.log(resolvedProductData);

				setProductData(resolvedProductData);
			} catch (error) {
				console.error("Error fetching product data:", error);
			}
		};

		if (dbList.length > 0) {
			fetchDataForProductCards();
		}
	}, [dbList]);
	console.log("productData", productData);

	function renderMovieCards() {
		if (
			Array.isArray(productData) &&
			Array.isArray(dbList) &&
			productData.length === dbList.length
		) {
			return productData.map((response, index) => {
				const data = response.data.product;
				return (
					<div
						className='box'
						key={index}
						onClick={(e) => navigateToProductPage(e, data._id)}
					>
						<div className='product mtop'>
							<div className='img'>
								<span className='discount'>{data.discount}% Off</span>
								<img
									src={data.mainImage}
									alt=''
								/>
								<div className='product-like'>
									<i
										className='fa-regular fa-heart'
										onClick={(e) => {
											e.stopPropagation();
										}}
									></i>
								</div>
							</div>
							<div className='product-details'>
								<h3>{data.name}</h3>
								<div className='rate'>
									<i className='fa fa-star'></i>
									<i className='fa fa-star'></i>
									<i className='fa fa-star'></i>
									<i className='fa fa-star'></i>
									<i className='fa fa-star'></i>
								</div>
								<div className='price'>
									<h4>₹{data.price}.00 </h4>
									<button>
										<i className='fa fa-plus'></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				);
			});
		} else {
			return "Loading...";
		}
	}

	return (
		<div className='dataList'>
			{currentUser ? (
				<div>
					<div className='list-titele'>
						<h1>{dataType}</h1>
					</div>
					<div className='movies-slides'>{renderMovieCards()}</div>
				</div>
			) : (
				<div className='login-container'>
					<p>Please log in to add to {dataType}</p>
					<button
						className='normal-button'
						onClick={() => navigate("/signup")}
					>
						Log In
					</button>
				</div>
			)}
		</div>
	);
}
