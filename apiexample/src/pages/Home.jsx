import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../common/Header'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/MainContext'
export default function Home() {
    
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
      <Header/>
        <h1 className='text-[40px] font-bold text-center py-5'>Our Product</h1>

        <div className='max-w-[1320px] mx-auto'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {
            products.length>=1? 

            products.map((product,index) => (
                <ProductCard key={index} product={product} />
              ))
              
              :

              'Laoding..'
              }
        </div>
        </div>       
    </>
  )
}



function ProductCard({product}){
  
    let {cart,setCart}=useContext(CartContext)


   
    //cart Array  || setCart 

    let {thumbnail,price,title,id}=product


    let checkProduct=cart.filter((cartItems)=>cartItems.id==id)

    // console.log(id,checkProduct)
    
    let removeCart=()=>{
       let filterProduct= cart.filter((items)=>items.id!=id)
       setCart(filterProduct)
    }

    let addToCart=()=>{
       let cartObject={
        title,
        thumbnail,
        price,
        id,
        qty:1,
       }

       setCart([...cart,cartObject])
       
    }
    return(
      <div>
      <Link to={`/product-details/${id}`}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          alt={title}
          src={thumbnail}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
      </Link>   
      {checkProduct.length==1 ?
           <button className='bg-red-600' onClick={removeCart}>Remove Cart</button>

        :

        <button className='bg-green-500' onClick={addToCart}>Add to Cart</button>
      }
     
     
   
    </div>
    )
  }