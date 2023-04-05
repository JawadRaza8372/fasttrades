import React, { useState } from "react";
import Sidebar from "../../layout/sidebar/Sidebar";
import Topbar from "../../layout/topbar/Topbar";
import { useSelector } from "react-redux";
import "./Chatlist.scss";
import { useNavigate } from "react-router-dom";
const ChatList = () => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { rooms } = useSelector((state) => state.project);

	const handle = () => {
		setOpen(!open);
	};

	return (
		<>
			<Sidebar open={open} setOpen={setOpen} handle={handle} />
			<div className='layout-2'>
				<Topbar open={open} setOpen={setOpen} handle={handle} />
				<div className='category' style={{ color: "#fff", padding: "40px" }}>
					<h2 style={{ textAlign: "center" }}>Chat</h2>
					<div className='chatListContainer'>
						{rooms?.map((dat, index) => (
							<div key={index} className='ownCustomCard'>
								<div className='imgContainer'>
									<img src={dat?.data?.img} alt='profile' />
								</div>
								<h4>{dat?.data?.name ? dat?.data?.name : "---"}</h4>
								<p>{dat?.data?.emailId ? dat?.data?.emailId : "---"}</p>
								<span>{dat?.data?.lastMsg ? dat?.data?.lastMsg : "---"}</span>
								<button
									onClick={() =>
										navigate(`/chatRoom/${dat?.data?.roomId}_@${dat?.data?.id}`)
									}
									className='btn btn-success'>
									Chat
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatList;
