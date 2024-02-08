/** @format */

import React, { createContext, useState } from "react";
import { useAuth } from "./AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
	let { currentUser } = useAuth();

	const [isFavorite, setIsFavorite] = useState(false);
	const [inCart, setInCart] = useState(false);
	const [selectedRating, setSelectedRating] = useState(0);

	async function handleFavorite(_id) {
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
			console.error(error);
		}
	}

	async function handleAddToCart(_id) {
		if (!currentUser) {
			window.alert(`Please Log in to your Account to Add This To Your Cart`);
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

			if (!response.ok) {
				const errorMessage = await response.text();
				throw new Error(`Failed to add item to cart: ${errorMessage}`);
			}

			const responseData = await response.json();

			setInCart((old) => {
				return responseData.isAddedInCart ? !old : old;
			});
		} catch (error) {
			console.error("Error adding item to cart:", error);
		}
	}

	async function handleRate(_id, value) {
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
				console.log("Error", error.message);
			}
			console.log(error.config);
		}
	}

	async function fetchUserData(_id) {
		if (currentUser) {
			try {
				const response = await fetch(
					`${API_URL}/user/search-media-data?uid=${currentUser.uid}&id=${_id}`
				);
				const data = await response.json();

				setIsFavorite(data.favorited);
				setSelectedRating(data.rated);
				setInCart(data.cart);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}
	}

	const value = {
		handleFavorite,
		isFavorite,
		handleAddToCart,
		inCart,
		handleRate,
		selectedRating,
		fetchUserData,
	};

	return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}
