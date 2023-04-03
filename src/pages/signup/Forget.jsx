import React from 'react'
import { Link } from 'react-router-dom'

const Forget = () => {
  return (
    <>
            <div className='wrapper__form'>
            </div>

            <form className='form__login'>
                <h1> Recover Account </h1>
                <div>
                    <label> Enter Email or Phone </label>
                    <input type="text" placeholder='Enter email or phone'/>
                </div>

                <div className='btn__login'><button> Send OPT code </button></div>
                <p> Already have an account? <Link to="/">Login</Link>  </p>
            </form>
    </>
  )
}

export default Forget