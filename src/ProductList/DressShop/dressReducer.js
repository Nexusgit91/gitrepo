//Reducer file: dressReducer.js
import { dressProducts } from "../Datajson/dressProducts";

export const dressInitialState = {
  products: dressProducts,
  selectedSize: null,
  selectedProduct: null,
  cartItems: [],
  searchQuery: "",
  orderFormData: {
    name: "",
    email: "",
    address: "",
  },
};

export const dressReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_SIZE":
      return { ...state, selectedSize: action.payload };
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };
    case "ADD_TO_CART":
      const MAX_QUANTITY = 2; // Set the maximum quantity limit
      // Check if item is already in cart
      const index = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === state.selectedSize
      );
      if (index > -1) {
        // Item already exists, update quantity if it is less than the maximum quantity limit
        const newCartItems = [...state.cartItems];
        if (newCartItems[index].quantity < MAX_QUANTITY) {
          newCartItems[index].quantity += 1;
          return { ...state, cartItems: newCartItems };
        } else {
          alert(
            `Sorry, you can only order up to ${MAX_QUANTITY} units of this product.`
          );
          return state;
        }
      } else {
        // Item does not exist, add to cart with quantity 1
        if (!state.selectedSize) {
          alert("Please select a size before adding to cart.");
          return state;
        }
        const newCartItem = {
          ...action.payload,
          quantity: 1,
          size: state.selectedSize,
        };
        return { ...state, cartItems: [...state.cartItems, newCartItem] };
      }
    case "REMOVE_FROM_CART":
      // Check if item is in cart
      const removeIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (removeIndex > -1) {
        // Item exists, remove from cart
        const newCartItems = [...state.cartItems];
        if (newCartItems[removeIndex].quantity > 1) {
          // Item quantity > 1, decrement quantity
          newCartItems[removeIndex].quantity -= 1;
        } else {
          // Item quantity == 1, remove from cart
          newCartItems.splice(removeIndex, 1);
        }
        return { ...state, cartItems: newCartItems };
      } else {
        return state;
      }
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_ORDER_FORM_DATA":
      return { ...state, orderFormData: action.payload };
    default:
      return state;
  }
};
