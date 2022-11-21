import AuthReducer from "./AuthReducer";
import MainReducer from "./MainReducer";
import SellerOrderReducer from "./SellerOrderItems";
import BuyShoeReducer from "./BuyShoeReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "root", "buyShoe"],
};

const rootReducer = combineReducers({
  root: MainReducer,
  auth: AuthReducer,
  sellerOrder: SellerOrderReducer,
  buyShoe: BuyShoeReducer,
});

export default persistReducer(persistConfig, rootReducer);
