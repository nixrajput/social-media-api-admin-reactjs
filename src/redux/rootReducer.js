import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";
import statsSlice from "./slices/statsSlice";
import postsSlice from "./slices/postsSlice";
import postDetailsSlice from "./slices/postDetailsSlice";
import userDetailsSlice from "./slices/userDetailsSlice";
import profileDetailsSlice from "./slices/profileDetailsSlice";
import blueTickRequestsSlice from "./slices/blueTickRequestsSlice";

const rootReducer = {
    [authSlice.name]: authSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [statsSlice.name]: statsSlice.reducer,
    [postsSlice.name]: postsSlice.reducer,
    [postDetailsSlice.name]: postDetailsSlice.reducer,
    [userDetailsSlice.name]: userDetailsSlice.reducer,
    [profileDetailsSlice.name]: profileDetailsSlice.reducer,
    [blueTickRequestsSlice.name]: blueTickRequestsSlice.reducer,
};

export default rootReducer;