import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the form data
type LoanFormData = {
	loanType: string; // e.g., "personal", "home"
	amount: string; // Loan amount as a string
	name: string; // User's name
	dob: string; // Date of birth as ISO string
	income: string; // Monthly income as a string
};

// Define the type for the state
type LoanFormState = {
	step: number; // Current step in the wizard
	formData: LoanFormData; // Data collected from the form
};

// Initial state with type annotations
const initialState: LoanFormState = {
	step: 1,
	formData: {
		loanType: '',
		amount: '',
		name: '',
		dob: '',
		income: '',
	},
};

// Create the slice with type-safe state and actions
const loanFormSlice = createSlice({
	name: 'loanForm',
	initialState,
	reducers: {
		// Update form data action
		updateFormData: (state, action: PayloadAction<Partial<LoanFormData>>) => {
			state.formData = { ...state.formData, ...action.payload };
		},
		// Move to the next step
		nextStep: (state) => {
			state.step += 1;
		},
		// Move to the previous step
		previousStep: (state) => {
			state.step -= 1;
		},
	},
});

export const { updateFormData, nextStep, previousStep } = loanFormSlice.actions;
export default loanFormSlice.reducer;
