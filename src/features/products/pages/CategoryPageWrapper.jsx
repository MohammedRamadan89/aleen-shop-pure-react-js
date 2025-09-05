import React from "react";
import { useParams } from "react-router-dom";
import CategoryPage from "./CategoryPage";

const CategoryPageWrapper = ({ mainCategory, subCategory }) => {
  const params = useParams();
  
  if (mainCategory && subCategory) {
    // للفئات الفرعية: /category/electronics/audio
    return <CategoryPage 
      mainCategory={params.mainCategory} 
      subCategory={params.subCategory} 
      isSubCategory={true}
    />;
  }
  
  // للفئات الرئيسية: /products/electronics
  return <CategoryPage category={params.category} />;
};

export default CategoryPageWrapper;
