import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "./WishlistActionTypes";

export const initialState = {
  wishlist: [],
};

const WishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item._id !== action.payload._id
        ),
      };
  }
};

export default WishlistReducer;
