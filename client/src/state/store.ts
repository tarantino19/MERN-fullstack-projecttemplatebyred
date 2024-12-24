import { configureStore } from '@reduxjs/toolkit';
import { loanApiSlice } from './loanApiSlice'; // Handles loan-related queries
import loanFormReducer from './loanFormSlice'; // Manages loan form state

export const store = configureStore({
	reducer: {
		// Add reducers
		[loanApiSlice.reducerPath]: loanApiSlice.reducer, // RTK Query API slice for loan data
		loanForm: loanFormReducer, // Regular Redux slice for loan form state
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loanApiSlice.middleware), // Add middleware for loanApiSlice
	devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>; // Infer the state structure
export type AppDispatch = typeof store.dispatch; // Infer the dispatch type
