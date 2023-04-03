import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	users: [],
	categories: [],
	posts: [],
	ads: [],
	subscription: [],
};

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setUsers: (state, action) => {
			if (action.payload.users === null) {
				state.users = [];
			} else {
				state.users = action.payload.users;
			}
		},
		setPosts: (state, action) => {
			if (action.payload.posts === null) {
				state.posts = [];
			} else {
				state.posts = action.payload.posts;
			}
		},
		setCategories: (state, action) => {
			if (action.payload.categories === null) {
				state.categories = [];
			} else {
				state.categories = action.payload.categories;
			}
		},
		setAds: (state, action) => {
			if (action.payload.ads === null) {
				state.ads = [];
			} else {
				state.ads = action.payload.ads;
			}
		},
		setSubscription: (state, action) => {
			if (action.payload.subscription === null) {
				state.subscription = [];
			} else {
				state.subscription = action.payload.subscription;
			}
		},
	},
});

export const { setAds, setCategories, setPosts, setUsers, setSubscription } =
	projectSlice.actions;

export default projectSlice.reducer;
