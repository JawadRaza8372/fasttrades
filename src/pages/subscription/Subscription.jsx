import React, { useState } from "react";
import Topbar from "../../layout/topbar/Topbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import "./subscription.scss";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { toast } from "react-toastify";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setSubscription } from "../../store/projectSlice";

const Subscription = () => {
	const [open, setOpen] = useState(false);
	const [days, setDays] = useState();
	const [price, setPrice] = useState();
	const { subscription } = useSelector((state) => state.project);
	const dispatch = useDispatch();
	const handle = () => {
		setOpen(!open);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (days === "" && price === "") {
			return;
		}
		const subCollRef = doc(collection(db, "Subscription"));
		setDoc(subCollRef, { days, price, subId: subCollRef.id })
			.then((response) => {
				console.log(response);
				dispatch(
					setSubscription({
						subscription: [
							...subscription,
							{ days, price, subId: subCollRef.id, id: subCollRef.id },
						],
					})
				);
				toast.success(`Subscription Added Successfully`, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				setDays("");
				setPrice("");
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	function deletePost(id) {
		const docRef = doc(db, "Subscription", id);
		deleteDoc(docRef)
			.then(() => {
				console.log("Document Deleated");
				dispatch(
					setSubscription({
						subscription: subscription?.filter((dat) => dat.id !== id),
					})
				);
				toast.success(`Document Deleted Successfully`, {
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
				console.log(error.message);
			});
	}
	return (
		<>
			<Sidebar open={open} setOpen={setOpen} handle={handle} />
			<div className='layout-2'>
				<Topbar open={open} setOpen={setOpen} handle={handle} />
				<div className='sub' style={{ color: "#fff", padding: "40px" }}>
					<h2> Subscription </h2>
					<div className='form'>
						<div>
							<input
								type='text'
								placeholder='how many days?'
								name='days'
								value={days}
								onChange={(e) => setDays(e.target.value)}
							/>
						</div>
						<div>
							<input
								type='num'
								placeholder='Price'
								name='price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
					</div>
					<button onClick={handleSubmit} className='sub__btn'>
						{" "}
						Subscribe{" "}
					</button>

					<div className='box'>
						<ul>
							<li>
								{subscription.map((item) => (
									<>
										<div key={item.id} className='one__box'>
											<div className='left'>
												<h2>
													{" "}
													Days: <span> {item.days} </span>{" "}
												</h2>
												<h2>
													{" "}
													Price: <span> {item.price} </span>{" "}
												</h2>
											</div>
											<div className='right'>
												<button onClick={() => deletePost(item.id)}>
													{" "}
													<BsFillTrashFill /> Delete{" "}
												</button>
											</div>
										</div>
									</>
								))}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Subscription;
