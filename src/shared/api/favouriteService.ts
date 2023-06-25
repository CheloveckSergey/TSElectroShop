import api from "./http";

interface Product {
  id: number,
  name: string,
  price: number,
  rating: number,
  createdAt: any,
  img: string,
  brandID: number,
  categoryID: number,
  brand: string,
  category: string,
}

class FavouriteService {
  async getAll() {
    const result = await api.get<Product[]>('/favourite/getAllFavourites');
    return result;
  }

  async addFavourite(productId: number) {
    const result = await api.post(
      '/favourite/addFavourite',
      {
        productId
      }
    );
    return result;
  }

  async deleteFavourite(productId: number) {
    const result = await api.delete(
      '/favourite/deleteFavourite',
      {
        data: {
          productId
        }
      }
    );
    return result;
  }
}

export default new FavouriteService();