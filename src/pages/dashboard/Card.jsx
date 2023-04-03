import React from "react";

const Card = ({ image, location, name, onClick, ban, userId }) => {
	const onClickFun = () => {
		let newBanValue = ban ? false : true;
		onClick(userId, newBanValue);
	};

	return (
		<>
			<div className='one'>
				<div className='left'>
					<div className='pic'>
						<img src={image} alt='' />
					</div>
					<div>
						<h3> {name} </h3>
						<h6> {location} </h6>
					</div>
				</div>
				<div className='right'>
					{ban ? (
						<div className='unban' onClick={onClickFun}>
							<button> Unban</button>
						</div>
					) : (
						<div className='ban' onClick={onClickFun}>
							<button> Ban</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Card;
