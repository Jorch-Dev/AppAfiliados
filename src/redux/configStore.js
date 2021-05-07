import { configureStore } from "@reduxjs/toolkit"
import userProducer from "./userSlice";

export default configureStore({
    reducer: {
        user: userProducer,
    },
});
