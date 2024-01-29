/** @format */

import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Pages from "./pages/Pages";
import Cart from "./common/Cart/Cart";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
import ProductPage from "./components/ProductPage/ProductPage";

import { AuthProvider } from "./components/user/AuthContext";
import SignInPage from "./components/user/SignInPage";
import UpdateProfile from "./components/user/UpdateProfile";
import Account from "./components/user/Account";
import ForgotPassword from "./components/user/ForgotPassword";
import PrivateRoute from "./components/user/PrivateRoute";
import UserDataLists from "./components/user/UserDataList";

import AdminDaskbord from "./components/admin/AdminDaskbord";
import ManageProduct from "./components/admin/mangaeProduct/ManageProduct";

function ScrollToTop() {
	const location = useLocation();
	console.log(location);

	useEffect(() => {
		window.scroll({ top: 0, behavior: "smooth" });
	}, [location]);

	return null;
}

function App() {
	return (
		<>
			<Router>
				<ScrollToTop />
				<AuthProvider>
					<Header />
					<PrivateRoute
						path='/'
						element={<Pages />}
					/>

					<Routes>
						<Route
							path='/admin'
							element={<AdminDaskbord />}
						/>
						<Route
							path='/manageProduct'
							element={<ManageProduct />}
						/>

						<Route
							path='/'
							element={<Pages />}
						/>
						<Route
							path='/cart'
							element={<Cart />}
						/>
						<Route
							path='/about'
							element={<Cart />}
						/>
						<Route
							path='/productPage/:_id'
							element={<ProductPage />}
						/>
						<Route
							path='/update-profile'
							element={<UpdateProfile />}
						/>
						<Route
							path='/signup'
							element={<SignInPage />}
						/>
						<Route
							path='/forgot-password'
							element={<ForgotPassword />}
						/>
						<Route
							path='/account'
							element={<Account />}
						/>
						<Route
							path='/user/:dataType'
							element={<UserDataLists />}
						/>
					</Routes>
					<Footer />
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
