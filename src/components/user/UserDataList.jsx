/** @format */

// UserDataLists.js

/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./UserDataLists.css"; // Import CSS file for styling

const API_URL = process.env.REACT_APP_API_URL;

import FlashCard from "../flashDeals/FlashCard";

export default function UserDataLists() {
	const { dataType } = useParams();

	const { currentUser } = useAuth();

	const [dbList, setDbList] = useState([]);
	const [productData, setProductData, itemsState] = useState([]);

	useEffect(() => {
		if (currentUser) {
			const uid = currentUser.uid;

			fetch(`${API_URL}/Firebaseuser/get-user-data-list?uid=${uid}&dataType=${dataType}`, {
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
				const productItems = response.data.product;
				if (productItems && productItems._id) {
					return (
						<FlashCard
							key={index}
							productItems={productItems}
						/>
					);
				} else {
					return null; // Or any fallback component you want
				}
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
					<div className='user-data-slides'>{renderMovieCards()}</div>
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
