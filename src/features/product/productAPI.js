// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: Do not hard code api link
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProductsByFilters(filter, sort) {
  // filter = {"category": "electronics"}
  // TODO: support multiple filters later
  let queryString = "";

  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length) {
      const lastCategoryValue = categoryValue[categoryValue.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    const sortValue = sort[key];
    queryString += `${key}=${sortValue}&`;
  }

  return new Promise(async (resolve) => {
    console.log(queryString);
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const data = await response.json();
    resolve({ data });
  });
}
