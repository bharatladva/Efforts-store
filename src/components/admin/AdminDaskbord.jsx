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
					<h2>Products</h2>
					<p>manage your products </p>
				</div>
			</Link>
			<div className='box box2'>
				<h2>Orders</h2>
				<p>manage your products</p>
			</div>
		</div>
	);
};

export default AdminDaskbord;
