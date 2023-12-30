/** @format */

import React from "react";
import "./Header.css";
import Head from "./Head";
import Search from "./Search";
import Navbar from "./Navbar";

import { useAuth } from "../../components/user/AuthContext";

const Header = () => {
	let { currentUser } = useAuth();
	return (
		<>
			<Head />
			<Search />
			{currentUser ? <Navbar /> : ""}
		</>
	);
};

export default Header;
