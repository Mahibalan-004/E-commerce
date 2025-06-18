export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case 'WISHLIST_ADD_ITEM':
      const item = action.payload
      const existItem = state.wishlistItems.find((x) => x._id === item._id)

      if (existItem) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        }
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        }
      }
    default:
      return state
  }
}
