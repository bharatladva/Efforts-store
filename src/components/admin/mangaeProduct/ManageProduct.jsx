/** @format */

import React, { useState, useEffect, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import ProductList from "./productList/PmProductList";
import "./mangeProduct.css";
import ProductEdit from "./productEdit/ProductEdit";

export const ProductContext = createContext();

// API URL for your server
const API_URL = process.env.API_URL;

export default function ManageProduct() {
	const [selectedProductId, setSelectedProductId] = useState();
	const [products, setProducts] = useState([]);

	const selectedProduct = products.find((product) => product.id === selectedProductId);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${API_URL}/products`);
			const data = await response.json();
			console.log(data);
			setProducts(data.data.products);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const productContextValue = {
		handleProductAdd,
		handleProductDelete,
		handleProductSelect,
		handleProductChange,
	};

	async function handleProductSelect(id) {
		setSelectedProductId(id);
	}

	async function handleProductAdd() {
		try {
			const newProduct = {
				mainImage: "./images/discount/discount-1.png",
				name: "name",
				price: 0,

				id: uuidv4(),
				otherImage: [
					"./images/discount/discount-1.png",
					"./images/discount/discount-1.png",
					"./images/discount/discount-1.png",
				],
				tital: "Lorem ipsum dolor sit amet.",
				catagoriy: "catagoriy",
				discount: 0,
				stock: 5,
				discription:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, amet, neque id cupiditate esse deserunt labore veniam perspiciatis illum libero recusandae velit distinctio dolor voluptatum blanditiis eaque earum in ratione eligendi porro? Facere, nemo! Tempore at explicabo laboriosam, fuga pariatur enim nihil quisquam atque, ratione totam deleniti quis officia dolores.",

				addTo: "Flash Delas",

				reviews: [
					{
						name: "bharat",
						msg: "good product",
					},
				],
			};

			// Make a POST request to add a new product
			const response = await fetch(`${API_URL}/products`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});

			const data = await response.json();

			// Update the local state with the newly added product
			setProducts([...products, data.data.product]);

			// Set the selected product
			setSelectedProductId(data.data.product.id);
		} catch (error) {
			console.error("Error adding product:", error);
		}
	}

	async function handleProductChange(_id, product) {
		try {
			// Make a PUT request to update the product
			const response = await fetch(`${API_URL}/products/${_id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(product),
			});

			const data = await response.json();

			// Update the local state with the updated product
			setProducts(products.map((p) => (p._id === _id ? data.data.product : p)));
		} catch (error) {
			console.error("Error updating product:", error);
		}
	}

	async function handleProductDelete(_id) {
		try {
			// Make a DELETE request to remove the product
			await fetch(`${API_URL}/products/${_id}`, {
				method: "DELETE",
			});

			// Update the local state by filtering out the deleted product
			setProducts(products.filter((product) => product._id !== _id));

			// Clear the selected product if it's the one being deleted
			if (selectedProductId === _id) {
				setSelectedProductId(undefined);
			}
		} catch (error) {
			console.error("Error deleting product:", error);
		}
	}

	return (
		<ProductContext.Provider value={productContextValue}>
			<div className='mangeProduct'>
				<ProductList products={products} />
				{selectedProduct && <ProductEdit product={selectedProduct} />}
			</div>
		</ProductContext.Provider>
	);
}
