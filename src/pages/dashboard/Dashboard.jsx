import React, { useState } from "react";
import "./dashboard.scss";
import Topbar from "../../layout/topbar/Topbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import Card from "./Card";
import SearchIcon from "@mui/icons-material/Search";
import { db } from "../../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setUsers } from "../../store/projectSlice";
import { toast } from "react-toastify";
const Dashboard = () => {
	const { users } = useSelector((state) => state.project);
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const dispatch = useDispatch();
	const handle = () => {
		setOpen(!open);
	};

	const check = (id, value) => {
		const docRef = doc(db, "Users", id);
		updateDoc(docRef, { ban: value })
			.then(() => {
				console.log("yes!!");
				toast.success(`User Updated Successfully`, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				dispatch(
					setUsers({
						users: users.map((dat) => {
							if (dat.data.UserID === id) {
								return { data: { ...dat.data, ban: value }, id };
							} else {
								return dat;
							}
						}),
					})
				);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const filterData = () => {
		if (name.length > 0) {
			return users?.filter(
				(item) =>
					item.data.name.toLowerCase().includes(name?.toLowerCase()) ||
					item.data.name.toLowerCase() === name?.toLowerCase()
			);
		} else {
			return users;
		}
	};
	return (
		<>
			<Sidebar open={open} setOpen={setOpen} handle={handle} />
			<div className='layout-2'>
				<Topbar open={open} setOpen={setOpen} handle={handle} />
				<div className='dashboard'>
					<div className='search__bar'>
						<SearchIcon className='rightIcon' />
						<input
							type='text'
							placeholder='SEARCH'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='dashboard__left'>
						{filterData().length > 0 ? (
							filterData().map((curElm) => (
								<>
									<Card
										image={curElm.data.image}
										location={curElm.data.location}
										ban={curElm.data.ban}
										name={curElm.data.name}
										userId={curElm.data.UserID}
										onClick={check}
									/>
								</>
							))
						) : (
							<h1>No results found!</h1>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
