import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define types for Loan Options response
export type LoanOption = {
	id: number;
	value: string;
	label: string;
};

// Define types for Loan Progress data
export type LoanProgressData = {
	loanType: string;
	amount: string;
	name: string;
	dob: string;
	income: string;
};

// Define the API slice with type safety
export const loanApiSlice = createApi({
	reducerPath: 'loanApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	tagTypes: ['LoanOptions', 'LoanProgress'], // Optional: For cache invalidation
	endpoints: (builder) => ({
		// Get Loan Options query
		getLoanOptions: builder.query<LoanOption[], void>({
			query: () => '/loan-options', // Endpoint URL
			providesTags: ['LoanOptions'], // Optional: Caching support
		}),

		// Save Loan Progress mutation
		saveLoanProgress: builder.mutation<void, LoanProgressData>({
			query: (progressData) => ({
				url: '/loan-progress',
				method: 'POST',
				body: progressData, // The body must match the LoanProgressData type
			}),
			invalidatesTags: ['LoanProgress'], // Optional: Cache invalidation
		}),
	}),
});

// Export hooks for use in components
export const { useGetLoanOptionsQuery, useSaveLoanProgressMutation } = loanApiSlice;
