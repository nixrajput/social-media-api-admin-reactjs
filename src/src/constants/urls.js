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
ApiUrls.getUserDetailsEndpoint = '/admin/users/:id';
ApiUrls.createNewUserEndpoint = '/admin/users/create';
ApiUrls.updateUserEndpoint = '/admin/users/:id/update';
ApiUrls.deleteUserEndpoint = '/admin/users/:id/delete';

ApiUrls.getProgressEndpoint = '/admin/get-progress';
ApiUrls.getStatsEndpoint = '/admin/get-stats';
ApiUrls.getMonthlyStatsEndpoint = '/admin/get-monthly-stats';

ApiUrls.getPostsEndpoint = '/admin/get-posts';
ApiUrls.getRecentPostsEndpoint = '/admin/get-recent-posts';
ApiUrls.getPostDetailsEndpoint = '/admin/posts/:id';
ApiUrls.createNewPostEndpoint = '/admin/posts/create';
ApiUrls.updatePostEndpoint = '/admin/posts/:id/update';
ApiUrls.deletePostEndpoint = '/admin/posts/:id/delete';


export default ApiUrls;