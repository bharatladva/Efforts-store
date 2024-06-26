/** @format */

import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Pages from "./pages/Pages";
import Cart from "./common/Cart/Cart";
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
import ProductPage from "./components/ProductPage/ProductPage";
import Products from "./components/products/Products";

import { AuthProvider } from "./components/user/AuthContext";
import { UserDataProvider } from "./components/user/UserDataContext";

import SignInPage from "./components/user/SignInPage";
import UpdateProfile from "./components/user/UpdateProfile";
import Account from "./components/user/Account";
import ForgotPassword from "./components/user/ForgotPassword";
import PrivateRoute from "./components/user/PrivateRoute";
import UserDataLists from "./components/user/UserDataList";

import AdminDaskbord from "./components/admin/AdminDaskbord";
import ManageProduct from "./components/admin/mangaeProduct/ManageProduct";
import OrderManage from "./components/admin/orderManage/OrderManage";
import ContectUs from "./components/contectUs/ContectUs";
import AboutUs from "./components/abautus/AboutUs";

import ServicePage from "./components/cleanNcool/servicePage/ServicePage";
import ServiceDetailes from "./components/cleanNcool/serviceDetailels/ServiceDetailes";
import ServiceBookPage from "./components/cleanNcool/serviceBookPage/ServiceBookPage";
import OrderManage2 from "./components/cleanNcool/orderManage/OrderManage";

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
					<UserDataProvider>
						<Header />
						<PrivateRoute
							path='/'
							element={<Pages />}
						/>

						<Routes>
							{/* ------------------------------------------ */}
							<Route
								path='/admin'
								element={<AdminDaskbord />}
							/>
							<Route
								path='/manageProduct'
								element={<ManageProduct />}
							/>
							<Route
								path='/orderManage'
								element={<OrderManage />}
							/>

							{/* -------------------------------------- */}

							<Route
								path='/'
								element={<Pages />}
							/>
							<Route
								path='/cart'
								element={<Cart />}
							/>
							<Route
								path='/products'
								element={<Products />}
							/>
							<Route
								path='/contectUs'
								element={<ContectUs />}
							/>
							<Route
								path='/AbautUs'
								element={<AboutUs />}
							/>
							<Route
								path='/productPage/:_id'
								element={<ProductPage />}
							/>
							{/*<Route
								path='/t&c'
								element={<TAndc />}
							/>*/}
							{/* ---------------------------------------------- */}
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
							{/* ----------------------------------------------- */}

							<Route
								path='/ServicePage/:id'
								element={<ServicePage />}
							/>
							<Route
								path='/Service/:id'
								element={<ServiceDetailes />}
							/>
							<Route
								path='/ServiceBookPage'
								element={<ServiceBookPage />}
							/>
							<Route
								path='/MyService'
								element={<OrderManage2 />}
							/>

							{/* ----------------------------------------------- */}
						</Routes>
						<Footer />
					</UserDataProvider>
				</AuthProvider>
			</Router>
		</>
	);
}

export default App;
