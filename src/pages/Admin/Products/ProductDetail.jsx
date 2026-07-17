import React from 'react'

export default function ProductDetail({ formData, setFormData }) {
  return (
    <div className='product-details'>
        <h3>Product details</h3>
        <div className='input-group'>
            <label>MRP</label>
            <input type="text" value={formData.mrp} onChange={(e)=>setFormData({...formData,mrp:e.target.value})}/> 
        </div>
        <div className='input-group'>
            <label>Marketed By</label>
            <input type="text" value={formData.marketedBy}  onChange={(e)=>setFormData({...formData,marketedBy:e.target.value})}/> 
        </div>
        <div className='input-group'>
            <label>Sold By</label>
            <input type="text" value={formData.soldBy} onChange={(e)=>setFormData({...formData,soldBy:e.target.value})} /> 
        </div>
        
        <div className='input-group'>
            <label>Net Quantity</label>
            <input type="text" value={formData.netQty} onChange={(e)=>setFormData({...formData,netQty:e.target.value})}/> 
        </div>
        
        <div className='input-group'>
            <label>Manufactured By</label>
            <input type="text" value={formData.manufacturedBy} onChange={(e)=>setFormData({...formData,manufacturedBy:e.target.value})}/> 
        </div>
        
        <div className='input-group'>
            <label>Country Of Origin</label>
            <input type="text" value={formData.countryOfOrigin} onChange={(e)=>setFormData({...formData,countryOfOrigin:e.target.value})}/> 
        </div>
        <div className='input-group'>
            <label>CustomerCareAddress</label>
            <input type="text" value={formData.customerCareAddress} onChange={(e)=>setFormData({...formData,customerCareAddress:e.target.value})}/> 
        </div>
        <div className='input-group'>
            <label>Commodity</label>
            <input type="text" value={formData.commodity} onChange={(e)=>setFormData({...formData,commodity:e.target.value})}/> 
        </div>
    </div>
  )
}
