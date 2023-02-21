import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'counter',
    initialState: {
        cart: []
    },
    reducers: {
        reduxAddToCart: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

            let tempCartList = state.cart;

            let tempItem = action.payload;

            if (tempCartList.length === 0) {
                tempCartList.push({
                    ...tempItem,
                    purchaseQuantity: 1
                });
            } else {
                let doesExist = false;

                for (let index = 0; index < tempCartList.length; index++) {
                    const element = tempCartList[index];

                    if (element._id === tempItem._id) {
                        doesExist = true;
                        tempCartList[index].purchaseQuantity += 1;
                    }
                }

                if (doesExist === false) {
                    tempCartList.push({
                        ...tempItem,
                        purchaseQuantity: 1
                    });
                }
            }

            state.cart = tempCartList;
        },

        reduxRemoveFromCart: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

            let tempCartList = state.cart;

            let tempItem = action.payload;

            if (tempCartList.length === 0) {
                // do nothing
            } else {
                for (let index = 0; index < tempCartList.length; index++) {
                    const element = tempCartList[index];

                    if (element._id === tempItem._id) {
                        tempCartList[index].purchaseQuantity -= 1;

                        if (tempCartList[index].purchaseQuantity <= 1) {
                            tempCartList.splice(index, 1);
                        }
                    }
                }
            }

            state.cart = tempCartList;
        },
    },
})

export const { reduxAddToCart, reduxRemoveFromCart, increment, decrement, incrementByAmount } = cartSlice.actions

export const selectCountCart = (state) => state.cart.cart;

export default cartSlice.reducer
