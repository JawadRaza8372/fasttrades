import React, { useState } from "react";
import "./signup.scss";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
export default function Signup() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleClick = (e) => {
		e.preventDefault();
	};

	const signupacc = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((auth) => {
				window.localStorage.setItem(
					"fasttrade@dminPanel",
					JSON.stringify({ userid: auth.user.uid, email: auth.user.email })
				);
				toast.success(`Account Created Successfully`, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			})
			.catch((error) => {
				toast.error(`${error.message}`, {
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

			<form className='form__login' onSubmit={handleClick}>
				<h1> Signup </h1>
				<div>
					<label> Username </label>
					<input
						type='text'
						placeholder='Enter email or phone'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div>
					<label> Password </label>
					<input
						type='password'
						placeholder='Enter Password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className='btn__login'>
					<button onClick={signupacc}> Signup </button>
				</div>
				<p style={{ paddingTop: "1rem" }}>
					{" "}
					<Link to='/forget'> Forget Password? </Link>{" "}
				</p>
				<p>
					{" "}
					Already have an account? <Link to='/'>Login</Link>{" "}
				</p>
			</form>
		</>
	);
}
