import React, { useState } from "react";
import Topbar from "../../layout/topbar/Topbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import AdCard from "./AdCard";
import "./add.scss";
import { db } from "../../Firebase";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setAds } from "../../store/projectSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
const FAQ = () => {
	const { ads } = useSelector((state) => state.project);
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const handle = () => {
		setOpen(!open);
	};

	function deletePost(id) {
		const docRef = doc(db, "Ads", id);
		deleteDoc(docRef)
			.then(() => {
				dispatch(setAds({ ads: ads.filter((dat) => dat.id !== id) }));
				toast.success(`Ad Deleted Successfully`, {
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

	const videoAds = ads?.filter((dat) => dat.MediaType === "Videos");
	const imageAds = ads?.filter((dat) => dat.MediaType !== "Videos");
	return (
		<>
			<Sidebar open={open} setOpen={setOpen} handle={handle} />
			<div className='layout-2'>
				<Topbar open={open} setOpen={setOpen} handle={handle} />
				<div style={{ color: "#fff", padding: "40px" }}>
					<h1> Approve Ads </h1>
					<h3> Image Ads </h3>

					<div className='approve'>
						{imageAds?.map((item) => (
							<AdCard
								img={item.AdGraphicLink}
								mediaType={item.MediaType}
								type={item.MediaType}
								title={item.Adtype}
								price={item.ads}
								id={item.id}
								onDeltFunction={deletePost}
							/>
						))}
					</div>
					<h3> Video Ads </h3>

					<div className='approve'>
						{videoAds?.map((item) => (
							<AdCard
								img={item.AdGraphicLink}
								mediaType={item.MediaType}
								type={item.MediaType}
								title={item.Adtype}
								price={item.ads}
								id={item.id}
								onDeltFunction={deletePost}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default FAQ;
