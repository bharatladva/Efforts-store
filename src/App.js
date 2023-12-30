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
import ForgotPassword from "./components/user/ForgotPassword";
import Account from "./components/user/Account";

function ScrollToTop() {
	const location = useLocation();

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
					<Routes>
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
							path='/productPage/:id'
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
					</Routes>
					<Footer />
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
