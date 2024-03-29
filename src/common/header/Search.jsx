/** @format */

import React, { useState } from "react";
import logo from "../../components/assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/user/AuthContext";
import Navbar from "./Navbar";
import { SearchBar } from "./searchBar/SearchBar";
import { SearchResultsList } from "./searchBar/SearchResultsList";

const Search = () => {
	let { currentUser } = useAuth();
	const [results, setResults] = useState([]);
	// fixed Header
	window.addEventListener("scroll", function () {
		const search = document.querySelector(".search");
		if (search) {
			search.classList.toggle("active", window.scrollY > 100);
		}
	});

	return (
		<>
			<section className='search'>
				<div className='container c_flex'>
					<div className='logo width '>
						<Link to='/'>
							{
								<img
									src={logo}
									alt=''
								/>
							}
						</Link>
					</div>
					<SearchBar setResults={setResults} />
					{results && results.length > 0 && <SearchResultsList results={results} />}
					<Navbar />

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
							<Link to='/cart'>
								<i className='fa fa-shopping-bag icon-circle'></i>
								{/*<span>{CartItem.length === 0 ? "" : CartItem.length}</span>*/}
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Search;
