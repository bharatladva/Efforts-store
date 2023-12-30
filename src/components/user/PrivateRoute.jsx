/** @format */

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../user/AuthContext";

function PrivateRoute({ children }) {
	let { currentUser } = useAuth();
	let location = useLocation();

	return currentUser ? (
		children
	) : (
		<Navigate
			to='/signup'
			state={{ from: location }}
		/>
	);
}

export default PrivateRoute;
