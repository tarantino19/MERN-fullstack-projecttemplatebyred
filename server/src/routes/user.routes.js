import router from 'express';
const userRouter = router();
import passport from 'passport';
import {
	getUsers,
	loginUser,
	checkAuthStatus,
	logout,
	createUser,
	getSingleUser,
	getCurrentUserProfile,
	updateCurrentUserProfile,
	deleteUser,
	searchUsers,
	generateReport,
	verifyUserOTP,
	changePassword,
	forgotPasswordRequest,
} from '../controllers/userController.js';
import '../strategies/local.strategy.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

//check index.js - userRouter for initial route - all routes starts with /userApi in this case
//note: the order of routes also affects how and if it will work - dynamic :routes should be at the bottom to avoid conflict

// Apply `isAuthenticated` to all routes except the ones that don't need it
userRouter.use(
	['/users', '/users/search', '/users/generate-report', '/user/profile', '/user/profile/edit'],
	isAuthenticated
);

//***GENERATE REPORT***
userRouter.get('/users/generate-report', generateReport);

//***OTP-EMAIL USER VERIFICATION***
userRouter.post('/verify-otp', verifyUserOTP);

//***CHANGE PASSWORD***
userRouter.post('/forgot-password', forgotPasswordRequest);
userRouter.post('/change-password', changePassword);

//auth routes
userRouter.post('/signup', createUser);
userRouter.post('/login', passport.authenticate('local'), loginUser);
userRouter.get('/auth/status', checkAuthStatus);
userRouter.post('/logout', logout);

//***USER SEARCH ROUTES***
userRouter.get('/users/search', searchUsers);

//user REST API routes
userRouter.get('/users', isAdmin, getUsers);
userRouter.get('/users/:id', getSingleUser);
userRouter.delete('/users/:id', isAdmin, deleteUser);
userRouter.get('/user/profile', getCurrentUserProfile);
userRouter.patch('/user/profile/edit', updateCurrentUserProfile);

export default userRouter;
