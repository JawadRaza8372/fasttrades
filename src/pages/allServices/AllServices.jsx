import React, { useState } from "react";
import Topbar from "../../layout/topbar/Topbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import "./allservices.scss";
import ServiceCard from "./ServiceCard";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { setPosts } from "../../store/projectSlice";
import { toast } from "react-toastify";
const AllServices = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.project);
	const [open, setOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const handle = () => {
		setOpen(!open);
	};
	function delPostFunction(id) {
		const docRef = doc(db, "Post", id);
		deleteDoc(docRef)
			.then(() => {
				console.log("Document Deleated");
				dispatch(setPosts({ posts: posts.filter((dat) => dat.id !== id) }));
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
	const handleSearch = (event) => {
		const value = event.target.value;
		setSearchTerm(value);
	};
	const filteredDataFun = () => {
		if (searchTerm) {
			const filtered = posts.filter((item) =>
				item.Title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			return filtered;
		} else {
			return posts;
		}
	};

	return (
		<>
			<Sidebar open={open} setOpen={setOpen} handle={handle} />
			<div className='layout-2'>
				<Topbar open={open} setOpen={setOpen} handle={handle} />
				<div className='search__bar'>
					<SearchIcon className='rightIcon' />
					<input
						type='text'
						placeholder='SEARCH'
						value={searchTerm}
						onChange={handleSearch}
					/>
				</div>
				<div className='Services' style={{ color: "#fff", padding: "40px" }}>
					{filteredDataFun().map((item) => (
						<ServiceCard
							delPostFunction={delPostFunction}
							img={item.images}
							title={item.Title}
							desc={item.Description}
							id={item.id}
							price={item.Price}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default AllServices;
