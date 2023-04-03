import React, { useState } from "react";
import Topbar from "../../layout/topbar/Topbar";
import Sidebar from "../../layout/sidebar/Sidebar";
import { BsFillTrashFill } from "react-icons/bs";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import "./sub.scss";
import { toast } from "react-toastify";
import { setCategories } from "../../store/projectSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";

const SubCategorys = () => {
	const [subCategory, setSubCategory] = useState("");
	const [open, setOpen] = useState(false);
	const { categories } = useSelector((state) => state.project);
	const dispatch = useDispatch();
	const handle = () => {
		setOpen(!open);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (subCategory === "") {
			return;
		} else {
			addSubCategory();
		}
	};

	const [selectedCategory, setselectedCategory] = useState({});
	const [categoryId, setcategoryId] = useState("");
	// useEffect(() => {
	// 	console.log(posts);
	// }, []);

	function deletePost(indx) {
		const newRest = selectedCategory?.data.subCategory.filter(
			(dat, index) => index !== indx
		);
		setselectedCategory({
			id: selectedCategory.id,
			data: { ...selectedCategory?.data, subCategory: newRest },
		});
		onUpdateCat(newRest);
		toast.success(`Document Deleted Successfully`, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	}
	const onCategorySelect = (e) => {
		setcategoryId(e.target.value);
		const rest = categories?.filter((dat) => dat.id === e.target.value);
		setselectedCategory(rest.length > 0 ? rest[0] : {});
	};
	const onUpdateCat = (value) => {
		const docRef = doc(db, "Category", categoryId);
		updateDoc(docRef, { subCategory: value })
			.then((dt) => {
				dispatch(
					setCategories({
						categories: categories?.map((dat) => {
							if (dat.id === categoryId) {
								return {
									id: categoryId,
									data: { ...dat.data, subCategory: value },
								};
							} else {
								return dat;
							}
						}),
					})
				);
				setSubCategory("");
			})
			.catch((e) => {
				console.log(e.message);
			});
	};
	const addSubCategory = () => {
		const newRest = [
			...selectedCategory?.data?.subCategory,
			{ title: subCategory, value: subCategory.toLowerCase() },
		];

		setselectedCategory({
			id: selectedCategory.id,
			data: { ...selectedCategory?.data, subCategory: newRest },
		});
		onUpdateCat(newRest);
		toast.success(`Sub Category Added Successfully`, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	};
	console.log(selectedCategory);
	return (
		<>
			<Sidebar open={open} setOpen={setOpen} handle={handle} />
			<div className='layout-2'>
				<Topbar open={open} setOpen={setOpen} handle={handle} />
				<div className='category' style={{ color: "#fff", padding: "40px" }}>
					<h2> Sub-Category </h2>
					<div className='input__field'>
						<select onChange={onCategorySelect} name='category' id='category'>
							<option defaultChecked value=''>
								Select Sub-Category
							</option>
							{categories?.map((dat) => (
								<option key={dat.id} value={`${dat.id}`}>
									{dat.data.title}
								</option>
							))}
						</select>
						{selectedCategory !== {} && selectedCategory?.data?.title && (
							<>
								<input
									type='text'
									placeholder='Enter Sub-category here...'
									name='subCategory'
									value={subCategory}
									onChange={(e) => setSubCategory(e.target.value)}
								/>
								<button className='sub__btn' onClick={handleSubmit}>
									{" "}
									Create{" "}
								</button>
							</>
						)}
					</div>

					<div className='box__sub-category'>
						{selectedCategory?.data?.subCategory?.map((item, index) => (
							<>
								<div key={index} className='one__box'>
									<h2> {item.title} </h2>
									<button onClick={() => deletePost(index)}>
										{" "}
										<BsFillTrashFill /> Delete{" "}
									</button>
								</div>
							</>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default SubCategorys;
