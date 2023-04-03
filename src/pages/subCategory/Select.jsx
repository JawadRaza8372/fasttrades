import React from 'react'

const Select = ({ items }) => {
    return (
        <>
            <div className='input__field'>
                <select name="category" id="category">
                    <option value="Select Category">Select Sub-Category</option>
                    <option value={items}> {items} </option>
                    <option value="Shoes">Shoes</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Computers">Computers</option>
                </select>
                <input type="text" placeholder='Enter here...' name='subCategory' />
                <button className="sub__btn"> Create </button>
            </div>
        </>
    )
}

export default Select