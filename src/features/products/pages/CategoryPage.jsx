import React, { useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

import { toggleFavorite } from "../../favorites/favoritesSlice";
import products from "../components/data";
import CategoryHeader from "../components/categoryPage/CategoryHeader";
import ProductFilters from "../components/categoryPage/ProductFilters";
import ProductList from "../components/categoryPage/ProductList";
import ProductPagination from "../components/categoryPage/ProductPagination";
import EmptyState from "../components/categoryPage/EmptyState";
import SubCategoryList from "../components/categoryPage/SubCategoryList";
import CategoryStats from "../components/categoryPage/CategoryStats";
import { useCart } from "../../../common/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CategoryPage = ({ category, mainCategory, subCategory, isSubCategory }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const productsRef = useRef(null);
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { handleAddToCart, handleRemoveFromCart, isInCart } = useCart();

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
const navigate=useNavigate();
  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
  };
   const handlePreview = (product) => {
    navigate(`/product/${product.id}`);
  };

  // تحديد العنوان والوصف بناءً على نوع الفئة
   const getCategoryInfo = () => {
    if (isSubCategory) {
      const mainCatTitle = t(`subCategories.${mainCategory}`, mainCategory);
      const subCatTitle = t(`subCategories.${subCategory}`, subCategory);

      return {
        title: `${subCatTitle} - ${mainCatTitle}`,
        description: t(`main.${mainCategory}.description`, ""),
        breadcrumb: [
          { label: t("products.breadcrumb.home"), path: "/" },
          { label: mainCatTitle, path: `/products/${mainCategory}` },
          { label: subCatTitle, path: `/category/${mainCategory}/${subCategory}` }
        ]
      };
    } else {
      return {
        title: t(`main.${category}.title`, t("products.categoryPage.main.allProducts.title")),
        description: t(`products.categoryPage.main.${category}.description`, t("products.categoryPage.main.allProducts.description")),
        breadcrumb: [
          { label: t("products.categoryPage.breadcrumb.home"), path: "/" },
          { label: t(`products.categoryPage.subCategories.${category}`, category), path: `/products/${category}` }
        ]
      };
    }
  };


  const categoryInfo = getCategoryInfo();

  const productsPerPage = 12;

  const filteredAndSortedProducts = useMemo(() => {
    let filtered;
    
    if (isSubCategory) {
      // تصفية حسب الفئة الرئيسية والفرعية
      filtered = products.filter(p => 
        p.mainCategory === mainCategory && p.category === subCategory
      );
    } else {
      // تصفية حسب الفئة الرئيسية فقط
      filtered = category === "allProducts" ? products : products.filter(p => p.mainCategory === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBy !== "all") {
      switch (filterBy) {
        case "under50": filtered = filtered.filter(p => p.price < 50); break;
        case "50to100": filtered = filtered.filter(p => p.price >= 50 && p.price <= 100); break;
        case "over100": filtered = filtered.filter(p => p.price > 100); break;
        case "highRated": filtered = filtered.filter(p => p.rating >= 4.5); break;
        case "inStock": filtered = filtered.filter(p => p.inStock); break;
        case "onSale": filtered = filtered.filter(p => p.discount); break;
        default: break;
      }
    }

    switch (sortBy) {
      case "name": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "priceLow": filtered.sort((a, b) => a.price - b.price); break;
      case "priceHigh": filtered.sort((a, b) => b.price - a.price); break;
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return filtered;
  }, [searchTerm, sortBy, filterBy, category, mainCategory, subCategory, isSubCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);


  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: 4 }}>
      <CategoryHeader
        title={categoryInfo.title}
        description={categoryInfo.description}
        productCount={filteredAndSortedProducts.length}
        isSmallScreen={isSmallScreen}
        breadcrumb={categoryInfo.breadcrumb}
      />

      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />

      {/* Show SubCategoryList only for main categories, not for subcategories */}
      {!isSubCategory && (
        <SubCategoryList mainCategory={category} />
      )}

      {/* Show CategoryStats for both main and sub categories */}
      <CategoryStats products={filteredAndSortedProducts} />

      {currentProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ProductList
            products={currentProducts}
            favorites={favorites}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onToggleFavorite={handleToggleFavorite}
            productsRef={productsRef}
            isInCart={isInCart}
            handlePreview={handlePreview}
          />

          <ProductPagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            indexOfFirstProduct={indexOfFirstProduct}
            indexOfLastProduct={indexOfLastProduct}
            totalProducts={filteredAndSortedProducts.length}
            productsRef={productsRef}
            isSmallScreen={isSmallScreen}
          />
        </>
      )}
    </Container>
  );
};

export default CategoryPage;
