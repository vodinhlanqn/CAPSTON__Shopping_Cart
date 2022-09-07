function Service() {
    this.getListProduct = function () {
      return axios({
        url: "https://62ff796334344b6431fa3ac2.mockapi.io/api/danhsachsanpham",
        method: "GET",
      });
    };


    this.deleteProductApi = function (id) {
        return axios({
          url: `https://62ff796334344b6431fa3ac2.mockapi.io/api/danhsachsanpham/${id}`,
          method: "DELETE",
        });
      };
      this.addProductApi = function (product) {
        return axios({
          url: "https://62ff796334344b6431fa3ac2.mockapi.io/api/danhsachsanpham",
          method: "POST",
          data: product,
        });
      };
    
      this.getProductById = function (id) {
        return axios({
          url: `https://62ff796334344b6431fa3ac2.mockapi.io/api/danhsachsanpham/${id}`,
          method: "GET",
        });
      };
    
      this.updateProductApi = function (product) {
        return axios({
          url: `https://62ff796334344b6431fa3ac2.mockapi.io/api/danhsachsanpham/${product.id}`,
          method: "PUT",
          data: product,
        });
      };
}