import React from "react";
import "./sidebar.scss";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatBubble from "@mui/icons-material/ChatBubble";

// import PaymentIcon from "@mui/icons-material/Payment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { Link } from "react-router-dom";
import { GoReport } from "react-icons/go";
import { toast } from "react-toastify";
import { setAuth } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { ManageAccounts } from "@mui/icons-material";
const Sidebar = ({ open, setOpen, handle }) => {
	const dispatch = useDispatch();
	const logout = () => {
		window.localStorage.removeItem("fasttrade@dminPanel");
		dispatch(setAuth({ isAuth: null }));
		toast.success(`Logged Out Successfully`, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	};

	return (
		<>
			<div className={`sidebar ${open ? "openSidebar" : ""}`}>
				<div className='sidebarTop'>
					<h2> ADMIN PANEL </h2>
				</div>
				<div className='sidebarBottom'>
					<ul>
						<Link className='link' to='/home' onClick={handle}>
							<li>
								{" "}
								<PeopleAltIcon style={{ fontSize: "17px" }} />{" "}
								<span> Users </span>{" "}
							</li>
						</Link>
						{/* <Link className='link' to='/subscription' onClick={handle}>
							<li>
								{" "}
								<PaymentIcon style={{ fontSize: "17px" }} />{" "}
								<span> Subscription </span>{" "}
							</li>
						</Link> */}
						<Link className='link' to='/category' onClick={handle}>
							<li>
								{" "}
								<LocalAtmIcon style={{ fontSize: "17px" }} />{" "}
								<span> Category </span>{" "}
							</li>
						</Link>
						<Link className='link' to='/sub-category' onClick={handle}>
							<li>
								{" "}
								<LightbulbIcon style={{ fontSize: "17px" }} />{" "}
								<span> Sub Category </span>{" "}
							</li>
						</Link>
						<Link className='link' to='/approve' onClick={handle}>
							<li>
								{" "}
								<LiveHelpIcon style={{ fontSize: "17px" }} />{" "}
								<span> Approve Ads </span>{" "}
							</li>
						</Link>
						<Link className='link' to='/all-posts' onClick={handle}>
							<li>
								{" "}
								<DesignServicesIcon style={{ fontSize: "17px" }} />{" "}
								<span> All Posts </span>{" "}
							</li>
						</Link>
						<Link className='link' to='/services' onClick={handle}>
							<li>
								{" "}
								<ManageAccounts style={{ fontSize: "17px" }} />{" "}
								<span> Services </span>{" "}
							</li>
						</Link>
						<Link className='link' to='/reports' onClick={handle}>
							<li>
								{" "}
								<GoReport style={{ fontSize: "17px" }} /> <span> Reports </span>{" "}
							</li>
						</Link>
						<Link className='link' to='/chat' onClick={handle}>
							<li>
								{" "}
								<ChatBubble style={{ fontSize: "17px" }} /> <span> Chat </span>{" "}
							</li>
						</Link>
					</ul>
				</div>
				<div className='logout'>
					<div onClick={logout}>
						<LogoutIcon style={{ fontSize: "17px" }} />
						<span> Logout </span>
					</div>
				</div>
				{/* <div className='sideBarCard'>
                <BsQuestionCircle className='icon' />
                <div className='cardContent'>
                    <div className='circle1'></div>
                    <div className='circle2'></div>

                    <h3> Help Center </h3>
                    <p> Having Trouble in Planti, please contact us from for more questions. </p>
                    <button className='btn'> Go to help center </button>
                </div>
            </div> */}
			</div>
		</>
	);
};

export default Sidebar;
