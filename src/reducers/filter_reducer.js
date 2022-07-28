import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {

  //Loading products and calc maxprice
  if (action.type === LOAD_PRODUCTS) {
    // we use spread operator to allocate diff memory so all products will always contain complete list of products
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }

  //Setting gridview
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  //Setting listview
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  //Changing sort value based on controlled input from drop down menu
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  //Filtering products 
  if (action.type === FILTER_PRODUCTS) {
    const {all_products} = state;
    const {text,category,company,color,price,shipping} = state.filters;
    let tempProducts = [...all_products];

    //filtering

    //search
    if(text) {
      tempProducts = tempProducts.filter((product)=>{
        return product.name.toLowerCase().startsWith(text);
      })
    }

    //category
    if(category!=='all')
    {
      tempProducts = tempProducts.filter((product)=> product.category.toLowerCase()===category)
    }


    //company
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company.toLowerCase() === company
      );
    }

    //color
    if(color!=='all')
    {
      tempProducts = tempProducts.filter((product)=>{
        return product.colors.find((c)=>c===color)
      })
    }

    //Price
    tempProducts = tempProducts.filter((product)=>product.price<=price);

    //Shipping
    if(shipping)
      tempProducts = tempProducts.filter((product)=>product.shipping === true)

    return { ...state,filtered_products:tempProducts };
  }

  //Sorting products with controlled inputs
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  // Updating filters with controlled inputs 
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }


  // Clearing Filters
  if(action.type===CLEAR_FILTERS){
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
