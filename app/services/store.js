import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "./cryptoApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});