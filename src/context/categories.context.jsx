import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

import SHOP_DATA from "../shop-data.js";

/**
 * React.createContext
 * const MyContext = React.createContext(defaultValue);
 * // The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.
 */

export const CategoriesContext = createContext({ categoriesMap: {} });

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await  getCategoriesAndDocuments('categories');
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()

  }, [])

  const value = { categoriesMap };
  /**
   *  <MyContext.Provider value={ some value }>
   * Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.
   * use the Context Provider to wrap the tree of components that need the state Context.
   */
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
