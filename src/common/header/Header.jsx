/** @format */

import React from "react";
import "./Header.css";
import Head from "./Head";
import Search from "./Search";

import { useAuth } from "../../components/user/AuthContext";

const Header = () => {
	let { currentUser } = useAuth();
	return (
		<>
			{currentUser ? (
				<>
					<Head />
					<Search />
				</>
			) : (
				""
			)}
		</>
	);
};

export default Header;
