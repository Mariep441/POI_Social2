'use strict';

const axios = require('axios');

class PointService {
  constructor(baseUrl) {this.baseUrl = baseUrl;}

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(this.baseUrl + '/api/categories');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getCategory(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/categories/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createCategory(newCategory) {
    try {
      const response = await axios.post(this.baseUrl + '/api/categories', newCategory);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllCategories() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/categories');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneCategory(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/categories/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }


  async createPoint(id, newPoint) {
    try {
      const response = await axios.post(this.baseUrl + '/api/categories/' + id + '/points', newPoint);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPoints(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/categories/' + id + '/points');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPoints() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/points');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOnePoint(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/points/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users/authenticate', user);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user) {
    axios.defaults.headers.common['Authorization'] = '';
  }

  async getReviews() {
    try {
      const response = await axios.get(this.baseUrl + '/api/reviews');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getReview(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/reviews/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createReview(id, review) {
    try {
      const response = await axios.post(this.baseUrl + '/api/points/' + id + '/reviews', review);
      return response.data;
    } catch (e) {
      return null;
    }
  }


  async deleteAllReviews() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/reviews');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneReview(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/reviews/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }


}

module.exports = PointService;
