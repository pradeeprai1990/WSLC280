import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function ProductDetails() {
  let [mainimg,setmianImg]=useState('')
  let [pDetails,setpDetails]=useState(null);
  let params=useParams();

  let productId=params.pid;
  
  useEffect(()=>{
        axios.get(`https://dummyjson.com/products/${productId}`)
        .then((res)=>res.data)
        .then((finalRes)=>{
            setpDetails(finalRes)
            setmianImg(finalRes.thumbnail)
        })
  },[productId])
  return (
    <div>
        <Header/>

{pDetails!==null 

?
<>
<section className='py-[50px] bg-slate-200 text-center'>
    <h2 className='text-[40px] font-bold'>
        {pDetails.title}
    </h2>
</section>
<div className='max-w-[1320px] mx-auto grid grid-cols-[40%_auto] gap-6 py-5'>
    <div>
        <div className='border'>
            <img src={mainimg} className='w-[100%]'/>
        </div>
       
       
        <div className='flex gap-4 py-4'>
            {pDetails.images.map((img,index)=>{
                return(
                    <div onClick={()=>setmianImg(img)} className='border w-[20%]'>
                <img src={img}/>
            </div>
                ) 
            })}
            
            
        </div>  
       
    </div>
    <div>
        <h2>Iphone</h2>
        <p>The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.</p>
        <h2>Rs 5500</h2>

        <div>
            <input type="number" /> <button>Add to Cart</button> <button>WishList</button>
        </div>
    </div>
</div>
</>
:
'Loading.....'


}





    </div>
  )
}
