import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header'
import { CartContext } from '../context/MainContext'

export default function Cart() {

    let { cart, setCart } = useContext(CartContext)
    let [total,setTotal]=useState(0)
    let [shipPrice,setShipPrice]=useState(100)



    useEffect(()=>{
        let t=0
        cart.forEach(items=>{

            t+=(items.qty*items.price);
           
        })

        setTotal(t)
    },[cart])
    return (
        <div>
            <Header />
            <div class=" max-w-[1320px] mx-auto flex shadow-md my-10">
                <div class="w-3/4 bg-white px-10 py-10">
                    <div class="flex justify-between border-b pb-8">
                        <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 class="font-semibold text-2xl">3 Items</h2>
                    </div>
                    <div class="flex mt-10 mb-5">
                        <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Quantity</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Price</h3>
                        <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Total</h3>
                    </div>
                    {

                        cart.map((items, index) => <CartRow data={items} key={index} />)

                    }



                    <a class="flex font-semibold text-indigo-600 text-sm mt-10" href="/">
                        <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"></path>
                        </svg>
                        Continue Shopping
                    </a>
                </div>
                <div id="summary" class="w-1/4 px-8 py-10">
                    <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div class="flex justify-between mt-10 mb-5"><span class="font-semibold text-sm uppercase">Items {cart.length} </span><span class="font-semibold text-sm">Rs. {total}</span></div>
                    <div>
                        <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                        <select class="block p-2 text-gray-600 w-full text-sm">
                            <option>Standard shipping - Rs. {shipPrice}</option>
                        </select>
                    </div>
                    <div class="py-10"><label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label><input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full" /></div>
                    <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                    <div class="border-t mt-8">
                        <div class="flex font-semibold justify-between py-6 text-sm uppercase"><span>Total cost</span><span>Rs. {total+shipPrice}</span></div>
                        <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


function CartRow({ data }) {
    let { cart, setCart } = useContext(CartContext)
    let { title,
        thumbnail,
        price,
        id,
        qty } = data
    
    let [finaqty,setQty] =useState(qty)
    let removeCart=()=>{
        let filterProduct= cart.filter((items)=>items.id!=id)
        setCart(filterProduct)
     }


     useEffect(()=>{
        
       
        
        let allDatawithQtyRowChange=cart.filter((items)=>{
            if(items.id==id){
                items['qty']=finaqty
              
            }
            
            return items;
        })
        setCart(allDatawithQtyRowChange)


     },[finaqty])

    return (
        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div class="flex w-2/5">
                <div class="w-20"><img class="h-24" src={thumbnail} alt="" /></div>
                <div class="flex flex-col justify-between ml-4 flex-grow"><span class="font-bold text-sm">{title}</span><span class="text-red-500 text-xs">Essence</span><button class="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={removeCart}>Remove</button></div>
            </div>
            <div class="flex justify-center w-1/5">
                <svg onClick={()=>setQty(finaqty-1)} class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path  d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
                <input class="mx-2 border text-center w-8" type="text" min={1} max={10} value={finaqty} />
                <svg onClick={()=>setQty(finaqty+1)} class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
            </div>
            <span class="text-center w-1/5 font-semibold text-sm">Rs. {price}</span><span class="text-center w-1/5 font-semibold text-sm">Rs. {price*qty}</span>
        </div>

    )
}