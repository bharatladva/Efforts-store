/** @format */

import React from "react";
import "./Header.css";
import Head from "./Head";
import Search from "./Search";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../components/user/AuthContext";

const Header = () => {
	let { currentUser } = useAuth();
	const location = useLocation();
	let pathname = location.pathname;

	return (
		<>
			{currentUser ? (
				<>
					{pathname === "/" ? <Head /> : ""}

					<Search />
				</>
			) : (
				""
			)}
		</>
	);
};

export default Header;
