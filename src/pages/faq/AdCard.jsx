import React, { useState } from "react";

const AdCard = ({ img, title, mediaType, price, onDeltFunction, id }) => {
	const [showModal, setshowModal] = useState(false);

	return (
		<>
			<div className='card'>
				{/* <img src={img} className="card-img-top" alt="..." /> */}
				<div className='card-body'>
					{mediaType === "Videos" ? (
						<>
							<video controls>
								<source src={img} type='video/mp4' />
							</video>
						</>
					) : (
						<img src={img} className='card-img-top' alt='...' />
					)}
					<h2 className='card-title'>{title}</h2>
					{/* <p className="card-text">{desc}</p> */}
					{/* <div className='butns'>
                        <div className='de'> <button> Details </button> </div>
                        <div className='re'> <button> Remove </button> </div>
                    </div> */}
					<button
						className='details'
						type='button'
						onClick={() => setshowModal(true)}>
						{" "}
						Details{" "}
					</button>

					{/* <!-- Modal --> */}
				</div>
			</div>
			<div
				className={showModal ? "modal fade in" : "modal fade"}
				style={{ display: showModal ? "flex" : "none" }}>
				<div className='modal-dialog'>
					{/* <!-- Modal content--> */}
					<div className='modal-content'>
						<div className='modal-body'>
							{mediaType === "Videos" ? (
								<>
									<video controls>
										<source src={img} type='video/mp4' />
									</video>
								</>
							) : (
								<img src={img} className='card-img-top' alt='...' />
							)}
							<h3> {title ? title : "---"} </h3>
							{/* <p>{desc}</p> */}
							<p> ${price ? price : "---"} </p>
							<div className='btns'>
								<button className='btn-default ok'> Approve </button>
								<button
									onClick={() => {
										setshowModal(false);
										onDeltFunction(id);
									}}
									className='btn-default'>
									{" "}
									Remove{" "}
								</button>
								<button
									onClick={() => setshowModal(false)}
									className='btn-default'>
									{" "}
									Close{" "}
								</button>
							</div>
						</div>
						{/* <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default AdCard;
