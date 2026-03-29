import React from 'react'
import { useSelector } from 'react-redux'
import AccountSidebar from '../components/AccountSidebar'
export default function Wishlist() {
  const items = useSelector(state=>state.wishlist.items);
  
  return (
    <div className='bgf-account-layout-wrapper'>
        <AccountSidebar />
        
        { items.length === 0 ? `No items in wishlist ` : 
          items.map(item => (
            <div key={item.id}><p>{item.name}</p></div>)
          )
        }
    </div>
  )
}
