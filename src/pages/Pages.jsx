/** @format */

import React from "react";
import Home from "../components/MainPage/Home";
import FlashDeals from "../components/flashDeals/FlashDeals";
import TopCate from "../components/top/TopCate";
import NewArrivals from "../components/newarrivals/NewArrivals";
import Discount from "../components/discount/Discount";
import Shop from "../components/shops/Shop";
import Annocument from "../components/annocument/Annocument";
import Wrapper from "../components/wrapper/Wrapper";
import MainHome from "./../components/cleanNcool/MainHome/MainHome";
import TopCate2 from "../components/cleanNcool/top/TopCate";

const Pages = () => {
	return (
		<>
			<Home />
			<FlashDeals />
			<TopCate />
			<NewArrivals />
			<Discount />
			<MainHome />
			<TopCate2 />
			<Shop />
			<Annocument />
			<Wrapper />
		</>
	);
};

export default Pages;
