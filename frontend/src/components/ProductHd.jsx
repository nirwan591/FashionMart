import React from "react";
import { TbArrowRight, TbArrowUpSquare } from 'react-icons/tb'

const ProductHd = ({product}) => {
   
    return (
        <div className="flex items-center flex-wrap gap-x-2 medium-16 py-4
        capitalize bg-primary">Home<TbArrowRight /> {product.name}</div>
    );
};

export default ProductHd;