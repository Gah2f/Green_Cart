import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from '../assets/greencart_assets/assets'
export const AppContext = createContext();
import toast from 'react-hot-toast'

export const AppContextProvider = ({children})=>{
    const currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProduct] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    const getCartCount = ()=> {
        let totalCount = 0;

        for (const item in cartItems) {
            totalCount += cartItems[item];

        }
        return totalCount;
    }

    const getCartAmount = ()=> {
        let totalAmount = 0;
        
        for (const items in cartItems) {
            let itemInfo = products.find((singleProduct)=> singleProduct._id === items);

            if(cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }

        }

        return Math.floor(totalAmount * 100) / 100;

    }

    const fetchProduct = async ()=>{
        setProduct(dummyProducts);
    }

    const addToCart = (itemId)=> {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }

    const updateCartItem = (itemId, quantity)=> {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Card Updated");

    }

    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from cart");
        setCartItems(cartData);
    }

    useEffect(()=>{
        fetchProduct();
    },[])

    const value= {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartCount, getCartAmount};
    return  <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return(useContext(AppContext));
}

 