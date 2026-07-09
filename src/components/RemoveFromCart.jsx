import { useDispatch } from 'react-redux';
import { useAuth } from "../context/AuthContext";
import { removeFromGuestCart, removeFromUserCartServer } from './cartSlice';

export function RemoveFromCart({ productId }) {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleRemove = () => {
    if (user) {
      dispatch(removeFromUserCartServer({ userId: user._id, productId }));
    } else {
      dispatch(removeFromGuestCart(productId));
    }
  };

  return <button onClick={handleRemove}>Remove</button>;
}
