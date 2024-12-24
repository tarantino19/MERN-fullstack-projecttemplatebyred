import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store'; // Assuming these types are defined in your store
import { useGetLoanOptionsQuery, useSaveLoanProgressMutation } from '../state/loanApiSlice';
import { updateFormData, nextStep, previousStep } from '../state/loanFormSlice';
import { LoanProgressData, LoanOption } from '../state/loanApiSlice';

const LoanApplicationWizard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>(); // Type-safe dispatch
	const { step, formData } = useSelector((state: RootState) => state.loanForm); // Type-safe selector

	const { data: loanOptions, isLoading: optionsLoading } = useGetLoanOptionsQuery();
	const [saveProgress, { isLoading: savingProgress }] = useSaveLoanProgressMutation();

	// Handle next step with API call
	const handleNext = async () => {
		try {
			await saveProgress(formData).unwrap(); // Save progress to the server
			dispatch(nextStep()); // Move to the next step
		} catch (error) {
			console.error('Error saving progress:', error);
		}
	};

	// Handle previous step
	const handlePrevious = () => {
		dispatch(previousStep());
	};

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		dispatch(updateFormData({ [name]: value }));
	};

	if (optionsLoading) return <p>Loading loan options...</p>;

	return (
		<div className='loan-wizard'>
			{/* Step 1 */}
			{step === 1 && (
				<div>
					<h2>Step 1: Loan Details</h2>
					<label>
						Loan Type:
						<select name='loanType' value={formData.loanType} onChange={handleChange}>
							<option value=''>Select</option>
							{loanOptions?.map((type: LoanOption) => (
								<option key={type.id} value={type.value}>
									{type.label}
								</option>
							))}
						</select>
					</label>
					<label>
						Amount:
						<input type='number' name='amount' value={formData.amount} onChange={handleChange} />
					</label>
				</div>
			)}

			{/* Step 2 */}
			{step === 2 && (
				<div>
					<h2>Step 2: Personal Information</h2>
					<label>
						Name:
						<input type='text' name='name' value={formData.name} onChange={handleChange} />
					</label>
					<label>
						Date of Birth:
						<input type='date' name='dob' value={formData.dob} onChange={handleChange} />
					</label>
				</div>
			)}

			{/* Step 3 */}
			{step === 3 && (
				<div>
					<h2>Step 3: Financial Details</h2>
					<label>
						Monthly Income:
						<input type='number' name='income' value={formData.income} onChange={handleChange} />
					</label>
				</div>
			)}

			{/* Navigation Buttons */}
			<div className='wizard-navigation'>
				{step > 1 && <button onClick={handlePrevious}>Previous</button>}
				{step < 3 && (
					<button onClick={handleNext} disabled={savingProgress}>
						{savingProgress ? 'Saving...' : 'Next'}
					</button>
				)}
				{step === 3 && (
					<button
						onClick={async () => {
							try {
								await saveProgress(formData).unwrap();
								alert('Application submitted successfully!');
							} catch (error) {
								console.error('Error submitting application:', error);
							}
						}}
					>
						Submit
					</button>
				)}
			</div>
		</div>
	);
};

export default LoanApplicationWizard;
