import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";
import statsSlice from "./slices/statsSlice";
import postsSlice from "./slices/postsSlice";

const rootReducer = {
    [authSlice.name]: authSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [statsSlice.name]: statsSlice.reducer,
    [postsSlice.name]: postsSlice.reducer,
};

export default rootReducer;