import ThemeReducer from "./ThemeReducer"
import CodeReducer from "./CodeReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers(
    {
        ThemeReducer,
        CodeReducer
    }
)

export default rootReducer