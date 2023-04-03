import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import { auth } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
export default function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const signupacc = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				window.localStorage.setItem(
					"fasttrade@dminPanel",
					JSON.stringify({ userid: user.uid, email: user.email })
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
			})
			.catch((err) => {
				console.log(err);
				toast.error(`${err.message}`, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			});
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
				<p>
					{" "}
					Don't have an account? <Link to='/signup'>Signup</Link>{" "}
				</p>
			</form>
		</>
	);
}
