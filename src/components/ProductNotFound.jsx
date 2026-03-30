import React from 'react'

export default function ProductNotFound({message}) {
  return (
    <div>{message || "Product not found"}</div>
  )
}
