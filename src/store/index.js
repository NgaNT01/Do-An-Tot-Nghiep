import { configureStore } from "@reduxjs/toolkit";

import siteReducers from "./site";
import authReducer from "./user";
import categoryReducers from "./category";

export default configureStore({
  reducer: {
    site: siteReducers,
    user: authReducer,
    category: categoryReducers,
  },
});
