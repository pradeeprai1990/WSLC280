import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  let [count,setCount]=useState(1)

  let [count1,setCount1]=useState(1)

  let [products,setProducts]=useState([])
  let getData=()=>{
      axios.get(`https://dummyjson.com/products`)
      .then((res)=>{
        return res.data
      })
      .then((finalRes)=>{
        setProducts(finalRes.products)
      })
  }

 

useEffect(()=>{
  getData()
  
},[])

  return (
    <>
      
        <h1 className='text-[40px] font-bold'>Our Product</h1>

        <div className='max-w-[1320px] mx-auto'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {products.map((product,index) => (
                <ProductCard key={index} product={product} />
              ))}
        </div>
        </div>       
    </>
  )
}

export default App

function ProductCard({product}){
  let {thumbnail,price,title}=product
  return(
    <div>
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      <img
        alt={title}
        src={thumbnail}
        className="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
    <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
  </div>
  )
}