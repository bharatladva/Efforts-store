/** @format */
import React, { useState, useEffect } from "react";
import ProductList from "./productList/PmProductList";
import "./mangeProduct.css";

import ProductEdit from "./productEdit/ProductEdit";

export const ProductContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.products";

export default function ManageProduct() {
	const [selectedProductId, setSelectedProductId] = useState();
	const [products, setProducts] = useState(SampleProduct);
	const selectedproduct = products.find((product) => product.id === selectedProductId);

	useEffect(() => {
		const productJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (productJSON != null) setProducts(JSON.parse(productJSON));
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
	}, [products]);

	const productContextValue = {
		handleProductAdd,
		handleProductDelete,
		handleProductSelect,
		handleProductChange,
	};

	function handleProductSelect(id) {
		setSelectedProductId(id);
	}

	function handleProductAdd() {
		const newProduct = {
			mainImage: "./images/discount/discount-1.png",
			name: "BenuX 2022",
			price: 250,

			id: 1,
			otherImage: [
				"./images/discount/discount-1.png",
				"./images/discount/discount-1.png",
				"./images/discount/discount-1.png",
			],
			tital: "Lorem ipsum dolor sit amet.",
			catagoriy: "1",
			discount: 10,
			stock: 5,
			discription:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, amet, neque id cupiditate esse deserunt labore veniam perspiciatis illum libero recusandae velit distinctio dolor voluptatum blanditiis eaque earum in ratione eligendi porro? Facere, nemo! Tempore at explicabo laboriosam, fuga pariatur enim nihil quisquam atque, ratione totam deleniti quis officia dolores.",

			addTo: [
				{
					name: "flash",
					display: true,
				},
			],

			reviews: [
				{
					name: "bharat",
					msg: "good product",
				},
			],
		};

		setSelectedProductId(newProduct.id);
		setProducts([...products, newProduct]);
	}

	function handleProductChange(id, product) {
		const newProducts = [...products];
		const index = newProducts.findIndex((r) => r.id === id);
		newProducts[index] = product;
		setProducts(newProducts);
	}

	function handleProductDelete(id) {
		if (selectedProductId != null && selectedProductId === id) {
			setSelectedProductId(undefined);
		}
		setProducts(products.filter((product) => product.id !== id));
	}

	return (
		<ProductContext.Provider value={productContextValue}>
			<div className='mangeProduct'>
				<ProductList products={products} />
				{selectedproduct && <ProductEdit product={selectedproduct} />}
			</div>
		</ProductContext.Provider>
	);
}

const SampleProduct = [
	{
		mainImage: "./images/discount/discount-1.png",
		name: "BenuX 2022",
		price: 250,

		id: 1,
		otherImage: [
			"./images/discount/discount-1.png",
			"./images/discount/discount-1.png",
			"./images/discount/discount-1.png",
		],
		tital: "Lorem ipsum dolor sit amet.",
		catagoriy: "1",
		discount: 10,
		stock: 5,
		discription:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, amet, neque id cupiditate esse deserunt labore veniam perspiciatis illum libero recusandae velit distinctio dolor voluptatum blanditiis eaque earum in ratione eligendi porro? Facere, nemo! Tempore at explicabo laboriosam, fuga pariatur enim nihil quisquam atque, ratione totam deleniti quis officia dolores.",

		addTo: [
			{
				name: "flash",
				display: true,
			},
		],

		reviews: [
			{
				name: "bharat",
				msg: "good product",
			},
		],
	},
	{
		mainImage: "./images/discount/discount-2.png",
		name: "Sony TV 1080p",
		price: 450,

		id: 2,
		otherImage: [
			"./images/discount/discount-1.png",
			"./images/discount/discount-1.png",
			"./images/discount/discount-1.png",
		],
		tital: "Lorem ipsum dolor sit amet.",
		catagoriy: "1",
		discount: 10,
		stock: 5,
		discription:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, amet, neque id cupiditate esse deserunt labore veniam perspiciatis illum libero recusandae velit distinctio dolor voluptatum blanditiis eaque earum in ratione eligendi porro? Facere, nemo! Tempore at explicabo laboriosam, fuga pariatur enim nihil quisquam atque, ratione totam deleniti quis officia dolores.",

		addTo: [
			{
				name: "flash",
				display: true,
			},
		],

		reviews: [
			{
				name: "bharat",
				msg: "good product",
			},
		],
	},
];
