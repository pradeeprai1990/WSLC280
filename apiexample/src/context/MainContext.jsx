import React, { createContext, useEffect, useState } from 'react'
export let CartContext=createContext()
export default function MainContext({children}) {
  let [cart,setCart]=useState(JSON.parse(localStorage.getItem('CART')) ?? [])   
  let obj={cart,setCart}

  useEffect(()=>{
       localStorage.setItem("CART",JSON.stringify(cart))
  },[cart])
  return (
    <CartContext.Provider value={obj}>
        {children}
    </CartContext.Provider>
  )
}
