
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import userApi from "../api/userApi";
import { useAuth } from "../context/AuthContext";
import { setWishlist } from "../redux/wishlistSlice";
import { mergeWishlist } from "../api/wishlist";
import { mergeGuestCartServer } from "../redux/cartSlice";

export default function useCompleteAuthentication() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { setUser } = useAuth();

    const from = location.state?.from?.pathname || "/";

    const completeAuthentication = useCallback(async (data) => {
        if (!data.user || !data.userAccessToken) {
            throw new Error(
                "Authentication response is incomplete."
            );
        }

        userApi.defaults.headers.common["Authorization"] =
            `Bearer ${data.userAccessToken}`;

        localStorage.setItem(
            "userAccessToken",
            data.userAccessToken
        );

        setUser(data.user);

        // Merge guest cart with the logged-in user's cart.
        const localCart = JSON.parse(
            localStorage.getItem("guest_cart") || "[]"
        );

        if (localCart.length > 0) {
            await dispatch(
                mergeGuestCartServer({
                    userId: data.user._id,
                    guestItems: localCart,
                })
            ).unwrap();

            localStorage.removeItem("guest_cart");
        }

        // Merge and synchronize wishlist.
        const localWishlist = JSON.parse(
            localStorage.getItem("wishlist") || "[]"
        );

        await mergeWishlist(localWishlist);

        const wishlistResult = await userApi.get("/wishlist");
        const products = wishlistResult?.data?.products || [];

        dispatch(
            setWishlist(products.map((product) => product._id))
        );

        navigate(from, { replace: true });
    }, [dispatch, from, navigate, setUser]);

    return completeAuthentication;
}
