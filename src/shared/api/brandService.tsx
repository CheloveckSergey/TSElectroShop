import api from "./http";

interface Brand {
  id: number,
  name: string,
}

class BrandService {
  async getAllBrands() {
    const response = await api.get<Brand[]>('/brand/getAllBrands');
    return response;
  }

  async addBrand(formData: FormData) {
    const response = await api.post('/brand/addBrand', formData);
    return response;
  }

  async deleteBrand(name: string) {
    const response = await api.delete(
      '/brand/deleteBrand',
      {
        data: {
          name
        }
      }
    );
  }
}

export default new BrandService();