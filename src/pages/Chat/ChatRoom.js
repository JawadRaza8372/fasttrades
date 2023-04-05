import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Chatlist.scss";
import { useSelector } from "react-redux";
import { KeyboardBackspace, Send } from "@mui/icons-material";
import { sendMsg } from "./ChatCustomFun";
import { getDatabase, ref, onValue } from "firebase/database";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatRoom = () => {
	const navigate = useNavigate();
	const [yourMsg, setyourMsg] = useState("");
	const [currentUserMsg, setcurrentUserMsg] = useState([]);
	const { users } = useSelector((state) => state.project);
	const { id } = useParams();
	const roomId = id?.split("_@")[0];
	const reciverId = id?.split("_@")[1];
	const currentUser = users?.filter((dat) => dat.id === reciverId);
	const sendMsgFun = async () => {
		await sendMsg(yourMsg, roomId, reciverId);
		setyourMsg("");
	};
	useEffect(() => {
		onValue(ref(getDatabase(), `/messages/${roomId}`), (snapshot) => {
			const data = snapshot.val();
			setcurrentUserMsg(Object.values(data));
		});
	}, [roomId]);
	return (
		<div className='chatRoomContainer'>
			<div className='chatHeader'>
				<button onClick={() => navigate(-1)}>
					<KeyboardBackspace style={{ fontSize: "30px" }} />
				</button>
				<div>
					<img
						src={currentUser[0]?.data?.image}
						alt={currentUser[0]?.data?.name}
					/>
					<span>{currentUser[0]?.data?.email}</span>
				</div>
			</div>
			<div className='chatbody'>
				<ScrollToBottom
					className='msgContainer'
					followButtonClassName='bottomMoverBtn'>
					{currentUserMsg?.map((dat) => (
						<div className={dat?.from === "adminId" ? "rightdiv" : "leftdiv"}>
							{dat?.msgType === "text" ? (
								<p style={{ fontWeight: "bold" }}>{dat?.message}</p>
							) : dat?.msgType === "Videos" ? (
								<video controls>
									<source src={dat?.message} type='video/mp4' />
								</video>
							) : (
								<img src={dat?.message} alt='msg' />
							)}
						</div>
					))}
				</ScrollToBottom>
			</div>
			<div className='chatFooter'>
				<input
					value={yourMsg}
					onChange={(e) => setyourMsg(e.target.value)}
					type='text'
					placeholder='Your Message here'
				/>
				<button onClick={sendMsgFun}>
					<Send style={{ fontSize: "30px" }} />
				</button>
			</div>
		</div>
	);
};

export default ChatRoom;
