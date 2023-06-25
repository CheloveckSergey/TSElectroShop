class LSService {
  setProductsIntoLS(products) {
    localStorage.setItem('products', JSON.stringify(products));  
  }

  getProductsFromLS() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }
}

export default new LSService();