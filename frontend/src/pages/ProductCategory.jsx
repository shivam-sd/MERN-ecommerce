import React from 'react'
import { useParams } from 'react-router-dom'

const ProductCategory = () => {
    const {category} = useParams();
  return (
    <div>
      <h1>Category : <span>{category}</span></h1>
    </div>
  )
}

export default ProductCategory
