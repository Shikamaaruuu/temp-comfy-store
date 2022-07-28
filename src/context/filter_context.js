import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  //Importing products from products_context
  const { products } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  //UseEffects

  // initially products would be empty by adding it as a dependency we ensure to run useEffect when product values get fetched
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]); 
  useEffect(() => {
    dispatch({type:FILTER_PRODUCTS})
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort,state.filters]);

  // Functions
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const updateSort = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // Buttons target value dont work
    if(name==='category'){
      value=e.target.textContent;
    }
    // using dataset instead of textcontent
    if(name==='color')
    {
      value = e.target.dataset.color
    }

    // price will be returned in string so formatting
    if(name==='price')
    {
      value = Number(value);
    }

    // For checkbox
    if(name ==='shipping')
    {
        value = e.target.checked
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilters = () => {
    dispatch({type:CLEAR_FILTERS})
  };
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
