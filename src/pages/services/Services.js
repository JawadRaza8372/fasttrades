import React, { useState } from "react";
import Topbar from "../../layout/topbar/Topbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import { setDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../../store/projectSlice";
import "../category/category.scss";
const Services = () => {
	const { services } = useSelector((state) => state.project);
	const dispatch = useDispatch();

	const [myCategory, setMyCategory] = useState("");
	const [open, setOpen] = useState(false);

	const handle = () => {
		setOpen(!open);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (myCategory === "") {
			return;
		}

		const categoryCollRef = doc(collection(db, "Services"));
		setDoc(categoryCollRef, {
			serviceId: categoryCollRef.id,
			title: myCategory,
		})
			.then((doc) => {
				dispatch(
					setServices({
						services: [
							...services,
							{
								id: categoryCollRef.id,
								data: {
									serviceId: categoryCollRef.id,
									title: myCategory,
								},
							},
						],
					})
				);
				toast.success(`Your category Created`, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				setMyCategory("");
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	function deletePost(id) {
		const docRef = doc(db, "Services", id);
		deleteDoc(docRef)
			.then(() => {
				dispatch(
					setServices({
						services: services.filter((dat) => dat.id !== id),
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
				<div className='category' style={{ color: "#fff", padding: "40px" }}>
					<h2> Services </h2>
					<div className='input__field'>
						<input
							type='text'
							placeholder='Enter Your Category...'
							name='myCategory'
							value={myCategory}
							onChange={(e) => setMyCategory(e.target.value)}
						/>
						<button onClick={handleSubmit} className='sub__btn'>
							{" "}
							Create{" "}
						</button>
					</div>

					<div className='box'>
						{services?.map((item) => (
							<div>
								<div className='one__box'>
									{/* <IoMdAdd
										className='plus'
										type='button'
										data-toggle='modal'
										data-target='#myModal'
									/> */}
									<h2> {item?.data?.title} </h2>
									<button onClick={() => deletePost(item.id)}>
										{" "}
										<BsFillTrashFill /> Delete{" "}
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Services;
