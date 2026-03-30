import api from "./api";
export const addToWishlist = (productId) => {
    api.post("/wishlist", {productId});
}
export const removeFromWishlist = (productId) => { 
    api.delete(`wishlist/${productId}`)
};
export const getWishlist = () => { 
    api.get("/wishlist");
}
export const mergeWishlist = (items) => { 
    api.post("/wishlist/merge", {items});
}