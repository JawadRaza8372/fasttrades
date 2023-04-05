import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	users: [],
	categories: [],
	posts: [],
	ads: [],
	subscription: [],
	reports: [],
	rooms: [],
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
		setReports: (state, action) => {
			if (action.payload.reports === null) {
				state.reports = [];
			} else {
				state.reports = action.payload.reports;
			}
		},
		setRooms: (state, action) => {
			if (action.payload.rooms === null) {
				state.rooms = [];
			} else {
				state.rooms = action.payload.rooms;
			}
		},
	},
});

export const {
	setAds,
	setCategories,
	setPosts,
	setUsers,
	setSubscription,
	setReports,
	setRooms,
} = projectSlice.actions;

export default projectSlice.reducer;
