import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/sidebar/Sidebar";
import Topbar from "../../layout/topbar/Topbar";
import { getDatabase, ref, onValue } from "firebase/database";
const ChatList = () => {
	const [open, setOpen] = useState(false);
	const handle = () => {
		setOpen(!open);
	};
	const db = getDatabase();

	useEffect(() => {
		onValue(ref(db, `/chatlist/adminId`), (snapshot) => {
			const data = snapshot.val();
			console.log(data);
		});
	}, [db]);
	return (
		<>
			<Sidebar open={open} setOpen={setOpen} handle={handle} />
			<div className='layout-2'>
				<Topbar open={open} setOpen={setOpen} handle={handle} />
				<div className='category' style={{ color: "#fff", padding: "40px" }}>
					<h2 style={{ textAlign: "center" }}>Chat</h2>
				</div>
			</div>
		</>
	);
};

export default ChatList;
