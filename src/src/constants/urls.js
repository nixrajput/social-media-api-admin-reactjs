const ApiUrls = {};

ApiUrls.baseUrl = 'https://api.nixlab.co.in/api/v1';
ApiUrls.devBaseUrl = 'http://localhost:4000/api/v1';

ApiUrls.loginEndpoint = '/admin/login';
ApiUrls.logoutEndpoint = '/admin/logout';
ApiUrls.forgotPasswordEndpoint = '/admin/forgot-password';
ApiUrls.resetPasswordEndpoint = '/admin/reset-password';
ApiUrls.changePasswordEndpoint = '/admin/change-password';

ApiUrls.getProfileEndpoint = '/me';

ApiUrls.getUsersEndpoint = '/admin/get-users';
ApiUrls.getRecentUsersEndpoint = '/admin/get-recent-users';
ApiUrls.getVerifiedUsersStatsEndpoint = '/admin/get-verified-users-stats';
ApiUrls.getUserDetailsEndpoint = '/admin/get-user-details';
ApiUrls.updateUserEndpoint = '/admin/update-user';
ApiUrls.deleteUserEndpoint = '/admin/delete-user';

ApiUrls.getProgressEndpoint = '/admin/get-progress';
ApiUrls.getStatsEndpoint = '/admin/get-stats';
ApiUrls.getMonthlyStatsEndpoint = '/admin/get-monthly-stats';

ApiUrls.getPostsEndpoint = '/admin/get-posts';
ApiUrls.getRecentPostsEndpoint = '/admin/get-recent-posts';
ApiUrls.getPostDetailsEndpoint = '/admin/get-post-details';
ApiUrls.updatePostEndpoint = '/admin/update-post';
ApiUrls.deletePostEndpoint = '/admin/delete-post';


export default ApiUrls;