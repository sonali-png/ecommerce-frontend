import userApi from "./userApi";
export const addToWishlist = (productId) => {
    userApi.post("/wishlist", {productId});
}
export const removeFromWishlist = (productId) => { 
    userApi.delete(`/wishlist/${productId}`)
};
export const getWishlist = () => { 
    userApi.get("/wishlist");
}
export const mergeWishlist = (items) => { 
    userApi.post("/wishlist/merge", {items});
}