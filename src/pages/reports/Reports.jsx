import "./reports.scss";
import React, { useState } from "react";
import Topbar from "../../layout/topbar/Topbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import { useSelector } from "react-redux";
import ReportCard from "./ReportCard";
import { createChatRoom } from "../Chat/ChatCustomFun";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Reports = () => {
	const navigate = useNavigate();
	const { reports, users } = useSelector((state) => state.project);
	const [open, setOpen] = useState(false);
	const handle = () => {
		setOpen(!open);
	};
	const customChatCreateFun = async (rid, rname, rimg, remail) => {
		let roomid = v4();
		await createChatRoom(roomid, rid, rname, rimg, remail).then((dat) => {
			navigate(`/chatRoom/${dat?.roomId}_@${dat?.reciverId}`);
		});
	};
	return (
		<>
			<Sidebar open={open} setOpen={setOpen} handle={handle} />
			<div className='layout-2'>
				<Topbar open={open} setOpen={setOpen} handle={handle} />
				<div className='reports' style={{ color: "#fff", padding: "40px" }}>
					<h2> Reports </h2>
					<div className='reports__content'>
						{reports?.map((dat) => (
							<ReportCard
								key={dat.id}
								data={dat}
								users={users}
								createChatRoomFun={customChatCreateFun}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Reports;
