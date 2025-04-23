import { createContext , useReducer } from 'react'

export const ProductContext = createContext()

export const productReducer = (state,action) => {
    switch(action.type){
        case 'SET_PRODUCTS' :
            return {
                products : action.payload
            }

        case 'DELETE_PRODUCT':
            return {
                products : state.products.filter((item) => 
                    item._id !== action.payload._id
                )
            }
        
        case 'CREATE_PRODUCT' :
            return{
                products : [action.payload , ...state.products]
            }
        case 'UPDATE_PRODUCT':
            return{
                products : state.products.map((item) => 
                    item._id === action.payload._id ? action.payload : item
                )
            }
        default:
            return state
    }
}   

export const ProductContextProvider = ({ children }) => {

    const [state,dispatch] = useReducer(productReducer , {
        products : null
    })

    return (
        <ProductContext.Provider value={{...state,dispatch}}>
            {children}
        </ProductContext.Provider>
    )
}