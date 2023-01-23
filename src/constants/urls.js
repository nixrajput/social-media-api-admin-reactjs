const ApiUrls = {};

ApiUrls.baseUrl = 'https://api.nixlab.co.in/api/v1';
ApiUrls.devBaseUrl = 'http://localhost:4000/api/v1';

ApiUrls.loginEndpoint = '/admin/login';
ApiUrls.logoutEndpoint = '/admin/logout';
ApiUrls.forgotPasswordEndpoint = '/admin/forgot-password';
ApiUrls.resetPasswordEndpoint = '/admin/reset-password';
ApiUrls.changePasswordEndpoint = '/admin/change-password';

ApiUrls.getProfileEndpoint = '/me';

ApiUrls.getUsersEndpoint = '/admin/users';
ApiUrls.getRecentUsersEndpoint = '/admin/get-recent-users';
ApiUrls.getVerifiedUsersStatsEndpoint = '/admin/get-verified-users-stats';
ApiUrls.getUserDetailsEndpoint = '/admin/get-user-details';
ApiUrls.updateUserEndpoint = '/admin/update-user';
ApiUrls.deleteUserEndpoint = '/admin/delete-user';
ApiUrls.searchUsersEndpoint = '/admin/search-users';

ApiUrls.getProgressEndpoint = '/admin/get-progress';
ApiUrls.getStatsEndpoint = '/admin/get-stats';
ApiUrls.getMonthlyStatsEndpoint = '/admin/get-monthly-stats';

ApiUrls.getPostsEndpoint = '/admin/posts';
ApiUrls.getRecentPostsEndpoint = '/admin/get-recent-posts';
ApiUrls.getPostDetailsEndpoint = '/admin/get-post-details';
ApiUrls.updatePostEndpoint = '/admin/update-post';
ApiUrls.deletePostEndpoint = '/admin/delete-post';
ApiUrls.searchPostsEndpoint = '/admin/search-posts';

ApiUrls.getVerificationRequestsEndpoint = '/admin/verification-requests';
ApiUrls.getVerificationRequestDetailsEndpoint = '/admin/verification-request-details';
ApiUrls.approveVerificationRequestEndpoint = '/admin/approve-verification-request';
ApiUrls.rejectVerificationRequestEndpoint = '/admin/reject-verification-request';
ApiUrls.removeVerificationStatusEndpoint = '/admin/remove-verification-status';

ApiUrls.getProjectsEndpoint = '/admin/projects';
ApiUrls.getProjectDetailsEndpoint = '/admin/get-project-details';
ApiUrls.searchProjectsEndpoint = '/admin/search-projects';
ApiUrls.updateProjectEndpoint = '/admin/update-project';
ApiUrls.updateProjectScreenshotsEndpoint = '/admin/update-project-screenshots';

export default ApiUrls;