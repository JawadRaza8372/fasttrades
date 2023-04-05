import React, { useState } from "react";
import "../signup/signup.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";

export default function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const dispatch = useDispatch();
	const signupacc = (e) => {
		e.preventDefault();

		if (email === "freetrade@admin.com" && password === "admin1234") {
			dispatch(
				setAuth({ isAuth: { userid: "adminId", email: "freetrade@admin.com" } })
			);
			window.localStorage.setItem(
				"fasttrade@dminPanel",
				JSON.stringify({ userid: "adminId", email: "freetrade@admin.com" })
			);
			toast.success(`Login Successful`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		} else {
			toast.error(`Wrong Email or password`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	return (
		<>
			<div className='wrapper__form'></div>

			<form className='form__login'>
				<h1> Login </h1>
				<div>
					<label> Email </label>
					<input
						type='text'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<label> Password </label>
					<input
						type='password'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className='btn__login'>
					{" "}
					<button onClick={signupacc}> Login </button>{" "}
				</div>
			</form>
		</>
	);
}
