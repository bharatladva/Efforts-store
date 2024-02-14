/** @format */

import React from "react";
import "./orderManage.css";
import OrderCard from "./OrderCard";

export default function orderManage() {
	return (
		<>
			<div className='orderManage'>
				<div className='ordersList'>
					<OrderCard />
					<OrderCard />
					<OrderCard />
					<OrderCard />
					<OrderCard />
					<OrderCard />
					<OrderCard />
					<OrderCard />
					<OrderCard />
					<OrderCard />
				</div>
			</div>
		</>
	);
}
