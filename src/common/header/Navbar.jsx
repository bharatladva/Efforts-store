/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/user/AuthContext";

const Navbar = () => {
	// Toogle Menu
	let { currentUser } = useAuth();
	const [MobileMenu, setMobileMenu] = useState(false);

	return (
		<>
			<header className='header'>
				<div className='container d_flex'>
					<div className='navlink'>
						<ul
							className={
								MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
							}
							onClick={() => setMobileMenu(false)}
						>
							<li>
								<Link to='/Products'>Products</Link>
							</li>

							{currentUser.email === "bharatladva77@gmail.com" ? (
								<li>
									<Link to='/admin'>Admin</Link>
								</li>
							) : (
								" "
							)}

							<li>
								<Link to='/orderManage'>order</Link>
							</li>
							<li>
								<Link to='/MyService'>MyService</Link>
							</li>
							<li>
								<Link to='/contectUs'>contact</Link>
							</li>
							<li>
								<Link to='/AbautUs'>About us</Link>
							</li>
						</ul>

						<button
							className='toggle'
							onClick={() => setMobileMenu(!MobileMenu)}
						>
							{MobileMenu ? (
								<i className='fas fa-times close home-btn'></i>
							) : (
								<i className='fas fa-bars open'></i>
							)}
						</button>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
