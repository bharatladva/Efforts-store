/** @format */

import React from "react";
import "./adminDaskbord.css"; // Import the CSS file
import { Link } from "react-router-dom";

const AdminDaskbord = () => {
	return (
		<div className='adminDaskbordcontainer'>
			<Link
				className='box box1'
				to={`/manageProduct`}
			>
				<div>
					<h1>Products</h1>
					<p>manage your products </p>
				</div>
			</Link>
			<Link
				className='box box2'
				to={`/orderManage`}
			>
				<div>
					<h1>Orders</h1>
					<p>manage your products</p>
				</div>
			</Link>
			<div className='box box2'>
				<h1>FAQ'S</h1>
				<p>manage your FAQ'S</p>
			</div>
			<div className='box box2'>
				<h1>Services</h1>
				<p>manage your services</p>
			</div>
		</div>
	);
};

export default AdminDaskbord;
