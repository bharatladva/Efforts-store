/** @format */

import React, { createContext, useState } from "react";
import { useAuth } from "./AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

export const UserDataContext = createContext();

export function UserDataProvider({ children }) {
	let { currentUser } = useAuth();

	const [itemsState, setItemsState] = useState({});

	async function handleFavorite(_id) {
		if (!currentUser) {
			window.alert(`Please Log in to your Account to Add This To Your Favorites`);
			return;
		}
		try {
			let itemToAdd = { _id };
			let uid = currentUser.uid;

			// Retrieve the current state of the item
			const currentItemState = itemsState[_id] || {};
			const currentIsFavoriteState = currentItemState.isFavorite || false;

			const response = await fetch(`${API_URL}/user/add-to-favorites`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
					itemToAdd,
					isFavorite: currentIsFavoriteState, // Use the retrieved state
				}),
			});

			const responseData = await response.json();

			setItemsState((prevState) => ({
				...prevState,
				[_id]: {
					...prevState[_id],
					isFavorite: responseData.isAdded
						? !currentIsFavoriteState
						: currentIsFavoriteState,
				},
			}));
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

			const isProductInCart = itemsState[_id]?.inCart;
			console.log(isProductInCart);

			const response = await fetch(`${API_URL}/user/add-to-cart`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
					itemToAdd,
					inCart: isProductInCart, // Use the retrieved state
				}),
			});

			const responseData = await response.json();

			setItemsState((prevState) => ({
				...prevState,
				[_id]: {
					...prevState[_id],
					inCart: responseData.isAddedInCart ? !isProductInCart : isProductInCart,
				},
			}));
		} catch (error) {
			console.error("Error adding item to cart:", error);
		}
	}

	async function handleAddress(address) {
		if (!currentUser) {
			window.alert(`Please Log in to your Account to Rate this Movie`);
			return;
		}

		try {
			console.log("address: ", address);
			let uid = currentUser.uid;
			const response = await fetch(`${API_URL}/user/add-address`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uid,
					address,
				}),
			});

			const responseData = await response.json();
			console.log(responseData);
		} catch (error) {
			console.error("Error adding address:", error);
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

			setItemsState((prevState) => ({
				...prevState,
				[_id]: {
					...prevState[_id],
					selectedRating: responseData.updatedTo,
				},
			}));
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

				// Ensure that the item state has all necessary properties
				const initialItemState = {
					isFavorite: false,
					inCart: false,
					selectedRating: 0,
				};

				setItemsState((prevState) => ({
					...prevState,
					[_id]: {
						...initialItemState, // Spread the initial state here
						...prevState[_id], // Then spread the previous state
						isFavorite: data.favorited
							? !prevState[_id]?.isFavorite // Use optional chaining to prevent accessing undefined
							: prevState[_id]?.isFavorite,
						inCart: data.cart ? !prevState[_id]?.inCart : prevState[_id]?.inCart,
						selectedRating: data.rated,
					},
				}));
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}
	}

	const value = {
		handleFavorite,
		handleAddToCart,
		handleRate,
		handleAddress,
		itemsState,
		fetchUserData,
	};

	return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}
