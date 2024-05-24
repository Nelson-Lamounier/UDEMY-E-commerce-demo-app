import { createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

/**
 * React.createContext
 * const MyContext = React.createContext(defaultValue);
 * // The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.
 */

export const ProductsContext = createContext({ products: [] });

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  /**
   *  <MyContext.Provider value={ some value }>
   * Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.
   * use the Context Provider to wrap the tree of components that need the state Context.
   */
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
