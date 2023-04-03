import React, { useEffect } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import FAQ from "./pages/faq/FAQ";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Subscription from "./pages/subscription/Subscription";
import Category from "./pages/category/Category";
import AllServices from "./pages/allServices/AllServices";
import Forget from "./pages/signup/Forget";
import Reports from "./pages/reports/Reports";
import SubCategorys from "./pages/subCategory/SubCategorys";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	setUsers,
	setCategories,
	setPosts,
	setAds,
	setSubscription,
} from "./store/projectSlice";
import { setAuth } from "./store/authSlice";
import { db } from "./Firebase";
import { Navigate, Link } from "react-router-dom";
const App = () => {
	let ProtectedRoute = ({ children }) => {
		const { isAuth } = useSelector((state) => state.auth);
		return isAuth ? children : <Navigate to='/' />;
	};
	let AuthRoute = ({ children }) => {
		const { isAuth } = useSelector((state) => state.auth);
		return isAuth ? <Navigate to='/home' /> : children;
	};
	const dispatch = useDispatch();
	const getLogin = async () => {
		let result = await window.localStorage.getItem("fasttrade@dminPanel");

		dispatch(setAuth({ isAuth: JSON.parse(result) }));
	};
	function getUsers() {
		const usersCollectionRef = collection(db, "Users");
		getDocs(usersCollectionRef)
			.then((response) => {
				dispatch(
					setUsers({
						users: response.docs.map((doc) => ({
							data: doc.data(),
							id: doc.id,
						})),
					})
				);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function getCategory() {
		const categoryCollectionRef = collection(db, "Category");
		getDocs(categoryCollectionRef)
			.then((response) => {
				dispatch(
					setCategories({
						categories: response.docs.map((doc) => ({
							data: doc.data(),
							id: doc.id,
						})),
					})
				);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function getPosts() {
		const categoryCollectionRef = collection(db, "Post");
		getDocs(categoryCollectionRef)
			.then((response) => {
				dispatch(
					setPosts({
						posts: response.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
						})),
					})
				);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function getAds() {
		const categoryCollectionRef = collection(db, "Ads");
		getDocs(categoryCollectionRef)
			.then((response) => {
				dispatch(
					setAds({
						ads: response.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
						})),
					})
				);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	function getSubscription() {
		const categoryCollectionRef = collection(db, "Subscription");
		getDocs(categoryCollectionRef)
			.then((response) => {
				dispatch(
					setSubscription({
						subscription: response.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
						})),
					})
				);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	useEffect(() => {
		getLogin();
		getUsers();
		getCategory();
		getPosts();
		getAds();
		getSubscription();
	});

	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
			<Routes>
				<Route
					path='/'
					element={
						<AuthRoute>
							<Login />
						</AuthRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<AuthRoute>
							<Signup />
						</AuthRoute>
					}
				/>
				<Route
					path='/home'
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/subscription'
					element={
						<ProtectedRoute>
							<Subscription />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/category'
					element={
						<ProtectedRoute>
							<Category />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/sub-category'
					element={
						<ProtectedRoute>
							<SubCategorys />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/approve'
					element={
						<ProtectedRoute>
							<FAQ />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/all-posts'
					element={
						<ProtectedRoute>
							<AllServices />
						</ProtectedRoute>
					}
				/>
				<Route path='/forget' element={<Forget />} />
				<Route
					path='/reports'
					element={
						<ProtectedRoute>
							<Reports />
						</ProtectedRoute>
					}
				/>
				<Route
					path='*'
					element={
						<div
							style={{
								width: "100%",
								height: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
							}}>
							<h1 style={{ color: "#3d3d3d", marginTop: "20%" }}>
								{" "}
								Page Not Found{" "}
							</h1>
							<Link
								to='/'
								className='btn'
								style={{
									background: "black",
									color: "white",
									border: "1px solid white",
								}}>
								Home
							</Link>
						</div>
					}
				/>
			</Routes>
		</>
	);
};

export default App;
