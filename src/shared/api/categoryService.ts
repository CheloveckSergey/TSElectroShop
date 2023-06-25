import api from "./http";

interface Category {
  id: number,
  name: string,
}

class CategoryService {
  async getAllCategories() {
    const response = await api.get<Category[]>('/category/getAllCategories');
    return response;
  }

  async addCategory(formData: FormData) {
    const response = await api.post('/category/addCategory', formData);
    return response;
  }

  async deleteCategory(name: string) {
    const response = await api.delete(
      '/category/deleteCategory',
      {
        data: {
          name
        }
      }
    );
  }
}

export default new CategoryService();