import React, { useState } from "react";
import img from "../../images/port1.jpg";
import { createChatRoom } from "../Chat/ChatCustomFun";
import { ChatBubble } from "@mui/icons-material";
const ReportCard = ({ data, users, createChatRoomFun }) => {
	const findPostOwnerData = users?.filter(
		(dat) => dat.id === data?.ReportPersonId
	);
	const [open, setopen] = useState(false);
	let selectedImage = data?.PostImage?.filter((dat) => dat.length > 0);
	return (
		<>
			<div className='card' style={{ width: "18rem" }}>
				<img
					src={selectedImage.length > 0 ? selectedImage : img}
					className='card-img-top'
					alt='...'
				/>
				<div className='card-body'>
					<h4 className='card-title'>
						Reason: {data?.ReportText ? data?.ReportText : "---"}{" "}
					</h4>
					<div className='butns'>
						<button
							onClick={() => setopen(true)}
							className='details'
							type='button'>
							{" "}
							Details{" "}
						</button>
					</div>
				</div>
			</div>
			<div
				className={open ? "modal fade in" : "modal fade"}
				style={{ display: open ? "flex" : "none" }}>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<button
								type='button'
								onClick={() => setopen(false)}
								className='close'>
								&times;
							</button>
							<h4 className='modal-title'>
								{" "}
								{data?.PostName ? data?.PostName : "---"}{" "}
							</h4>
						</div>
						<div className='modal-body'>
							<img src={selectedImage ? selectedImage : img} alt='' />
							<p style={{ marginTop: "2rem" }}>
								Post Owner Email:
								<span>
									{" "}
									{data?.PostOwnerEmail ? data?.PostOwnerEmail : "---"}{" "}
								</span>
							</p>
							<p style={{ marginTop: "2rem" }}>
								Reported By:
								<span> {data?.UserName ? data?.UserName : "---"} </span>
							</p>
							<p>
								Reason:
								<span> {data?.ReportText ? data?.ReportText : "---"}</span>{" "}
							</p>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								onClick={() => setopen(false)}
								className='btn btn-default'>
								Close
							</button>
							<button
								type='button'
								onClick={() =>
									createChatRoomFun(
										findPostOwnerData[0].id,
										findPostOwnerData[0].data.name,
										findPostOwnerData[0].data.image,
										findPostOwnerData[0].data.email
									)
								}
								className='btn btn-default ok'>
								<ChatBubble />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReportCard;
