/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	// Toogle Menu
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
							<li>
								<Link to='/admin'>Admin</Link>
							</li>
							<li>
								<Link to='/Abaut'>Abaut us</Link>
							</li>
							<li>
								<Link to='/track'>order</Link>
							</li>
							<li>
								<Link to='/contectUs'>contact</Link>
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
