import { AxiosResponse } from "axios";
import { Product } from "../../entities/product/model";
import api from "./http";

interface NewProduct {
  name: string,
  price: number,
  category: string,
  brand: string
}

interface CurProducts {
  products: Product[],
  pageQty: number,
}

class ProductService {
  async addProduct({ name, price, category, brand }: NewProduct) {
    const response = await api.post('/admin/addProduct', {
      name, price, category, brand
    });
    return response;
  }

  async getAllProducts() {
    const response = await api.get('/product/getAllProducts');
    return response;
  }

  async getAllProductsWithFilter(
    categoryFilters: string[] = [], 
    brandFilters: string[] = [], 
    curPage: number
  ): Promise<AxiosResponse<CurProducts>> {
    const response = await api.post(
      '/product/getAllProductsWithFilter',
      {
        categoryFilters, brandFilters, curPage
      }
    );
    // console.log(response);
    return response
  }

  async getProductByName(name: string) {
    const response = await api.post<Product>(
      '/product/getProduct',
      {name}
    );
    return response;
  }

  async addProductProbe(formData: FormData) {
    console.log(formData);
    const response = await api.post(
      '/product/addProduct',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }

  async updateProduct(formData: FormData, id: number) {
    const newId = String(id);
    formData.append('id', newId);
    console.log(formData);
    const response = await api.put(
      '/product/updateProduct',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return response;
  }

  async deleteProduct(name: string) {
    const response = await api.delete(
      '/product/deleteProduct',
      {
        data: {
          name
        }
      }
    );
  }
}

export default new ProductService();