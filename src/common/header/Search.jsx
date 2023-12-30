/** @format */

import React from "react";
import logo from "../../components/assets/images/984024fe-c3a8-4d83-8d7b-fcbb34e068f8.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/user/AuthContext";

const Search = () => {
	let { currentUser } = useAuth();
	// fixed Header
	window.addEventListener("scroll", function () {
		const search = document.querySelector(".search");
		search.classList.toggle("active", window.scrollY > 100);
	});

	return (
		<>
			<section className='search'>
				<div className='container c_flex'>
					<div className='logo width '>
						{
							<img
								src={logo}
								alt=''
							/>
						}
					</div>

					<div className='search-box f_flex'>
						<i className='fa fa-search'></i>
						<input
							type='text'
							placeholder='Search and hit enter...'
						/>
						<span>All Category</span>
					</div>

					<div className='icon f_flex width'>
						{currentUser ? (
							<Link to='/account'>
								<i className='fa fa-user icon-circle'></i>
							</Link>
						) : (
							<Link to='/signup'>
								<i className='fa fa-user icon-circle'></i>
							</Link>
						)}

						<div className='cart'>
							{currentUser ? (
								<Link to='/cart'>
									<i className='fa fa-shopping-bag icon-circle'></i>
									{/*<span>{CartItem.length === 0 ? "" : CartItem.length}</span>*/}
								</Link>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Search;
