import React, { useState } from "react";

const ServiceCard = ({ img, title, desc, price, id, delPostFunction }) => {
	const [showModel, setshowModel] = useState(false);

	return (
		<>
			<div className='card' style={{ width: "18rem" }}>
				<img src={img} className='card-img-top' alt='...' />
				<div className='card-body'>
					<h2 className='card-title'>{title}</h2>
					<p className='card-text'>{desc}</p>
					<div className='butns'>
						<div className='de'>
							{" "}
							<button
								type='button'
								data-toggle='modal'
								data-target='#myModal'
								onClick={() => setshowModel(true)}>
								{" "}
								Details{" "}
							</button>{" "}
						</div>
						<div className='re'>
							{" "}
							<button onClick={() => delPostFunction(id)}> Remove </button>{" "}
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Modal --> */}
			{showModel && (
				<div
					className={showModel ? "modal fade in" : "modal fade"}
					style={{ display: showModel ? "flex" : "none" }}>
					<div className='modal-dialog'>
						{/* <!-- Modal content--> */}
						<div className='modal-content'>
							<div className='modal-header'>
								{/* <p> {modalData.id} </p> */}
								<button type='button' className='close' data-dismiss='modal'>
									&times;
								</button>
								<h4 className='modal-title'> {title} </h4>
							</div>
							<div className='modal-body'>
								<div className='main'>
									<div className='left'>
										<img src={img} alt='' />
									</div>
									<div className='right'>
										<img src={img} alt='' />
										<img src={img} alt='' />
									</div>
								</div>
								<p>{desc ? desc : "---"}</p>
								<p> ${price ? price : "---"} </p>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-default'
									onClick={() => setshowModel(false)}>
									{" "}
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ServiceCard;
