import { useContext, useState, useEffect } from "react";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../context/categories.context";

import './category.styles.scss'
import { useParams } from "react-router-dom";

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <div className="category-container">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
    )
}

export default Category