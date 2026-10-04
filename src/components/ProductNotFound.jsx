import React from 'react'
import LayoutCss from "../css/newLayoutCopy.module.css";

export default function ProductNotFound({message}) {
  return (
    <div className={LayoutCss.errorContainer}> 
      <h1>Oops</h1> 
        <div className='message'>
          {message || "Product not found"}
        </div>
    </div>
  )
}
