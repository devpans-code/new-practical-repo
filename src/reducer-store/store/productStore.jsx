export const LIST_OF_PRODUCT = "LIST_OF_PRODUCT";
export const LIST_OF_PRODUCT_ERROR = "LIST_OF_PRODUCT_ERROR";

const initialState = { data: [] };

const productStore = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_OF_PRODUCT: {
      return {
        ...state,
        data: payload,
      };
    }
    case LIST_OF_PRODUCT_ERROR: {
      return {
        ...state,
        data: [],
      };
    }
    default:
      return state;
  }
};

export default productStore;