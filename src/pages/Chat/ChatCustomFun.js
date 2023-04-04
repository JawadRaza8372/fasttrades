import {
	getDatabase,
	ref,
	set,
	onValue,
	update,
	push,
} from "firebase/database";
const db = getDatabase();

const createChatRoom = (roomId, secId, secName, secImage, secEmail) => {
	let myData = {
		roomId,
		id: "adminId",
		name: "Admin",
		img: "https://firebasestorage.googleapis.com/v0/b/freetrade-fc705.appspot.com/o/png-clipart-computer-icons-icon-design-business-administration-admin-icon-hand-monochrome.png?alt=media&token=bcfd46f7-69e1-4c0a-abff-3de6ea8824eb",
		emailId: "admin@admin.com",
		about: "Admin on your service.",
		lastMsg: "",
		Token: "",
	};
	let SendData = {
		roomId,
		id: secId,
		name: secName,
		img: secImage,
		emailId: secEmail,
		about: "",
		lastMsg: "",
		Token: "",
	};
	onValue(ref(db, `/chatlist/adminId/${secId}`), (snapshot) => {
		const data = snapshot.val();
		if (data === null) {
			update(ref(db, `/chatlist/${secId}/adminId`), { ...myData }).then(() => {
				update(ref(db, `/chatlist/adminId/${secId}`), { ...SendData }).then(
					() => {
						alert("Chat Room Created");
					}
				);
			});
		} else {
			console.log(data);
		}
	});
};
const getChatData = () => {
	// React.useEffect(() => {
	// 	onValue(ref(db, `/messages/${roomid}`), (snapshot) => {
	// 		const data = snapshot.val();
	// 		updateStarCount(postElement, data);
	// 	});
	// }, [roomId]);
};
const sendMsg = (msg, roomid, toId) => {
	let msgData = {
		roomId: roomid,
		message: msg,
		from: "adminId",
		to: toId,
		sendTime: "123",
		msgType: "text",
	};
	let chatListupdate = {
		lastMsg: msg,
		sendTime: msgData.sendTime,
	};
	if (msg?.lenght <= 0) {
		return null;
	} else {
		let newReference = push(ref(db, `/messages/${roomid}`));
		msgData.id = newReference.key;
		set(newReference, msgData).then(() => {
			update(ref(db, `/chatlist/${toId}/adminId`), chatListupdate);
			update(ref(db, `/chatlist/adminId/${toId}`), chatListupdate);
		});
	}
};
export { createChatRoom, getChatData, sendMsg };
