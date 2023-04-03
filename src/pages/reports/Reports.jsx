import "./reports.scss"
import React, { useState } from 'react'
import Topbar from '../../layout/topbar/Topbar'
import Sidebar from '../../layout/sidebar/Sidebar'
import img from "../../images/port1.jpg"

const Reports = () => {

    const [open, setOpen] = useState(false)

    const handle = () => {
        setOpen(!open)
    }

    return (
        <>
            <Sidebar open={open} setOpen={setOpen} handle={handle} />
            <div className="layout-2">
                <Topbar open={open} setOpen={setOpen} handle={handle} />
                <div className='reports' style={{ color: "#fff", padding: "40px" }}>
                    <h2> Reports </h2>
                    <div className="reports__content">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src={img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title"> Umer Aftab </h4>
                                <div className='butns'>
                                <button className='details' type="button" data-toggle="modal" data-target="#myModal"> Details </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog">

                            <div className="modal-content">
                                <div className="modal-header">

                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title"> Umer Aftab </h4>
                                </div>
                                <div className="modal-body">
                                    <img src={img} alt=""/>
                                    <p style={{ marginTop: "2rem" }}>Email:<span> UmerAftab@gmail.com </span></p>
                                    <p>Reason:<span> Umer Aftab is a Senior Web Application developer. </span> </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reports