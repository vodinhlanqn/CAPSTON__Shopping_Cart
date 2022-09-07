var getEle = function (id) {
    return document.getElementById(id);
};

var service = new Service();

function fetchData() {
    service
      .getListProduct()
      .then(function (result) {
        renderHTML(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  fetchData();


  function renderHTML(data) {
    var content = ``;
  
    data.forEach(function (product, index) {
      content += `
          <tr>
              <td>${index + 1}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>
                  <img width="50px" src="./../assets/img/${product.screen}" />
              </td>
              <td>${product.backCamera}</td>
              <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct(${
                  product.id
                })">Edit</button>
  
                <button class="btn btn-danger" onclick="deleteProduct(${
                  product.id
                })">Delete</button>
              </td>
          </tr>
      `;
    });
  
    getEle("tblDanhSachSP").innerHTML = content;
  }
  

  /**
 * Delete
 */
function deleteProduct(id) {
    service
      .deleteProductApi(id)
      .then(function () {
        //render list data
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  getEle("btnThemSP").addEventListener("click", function () {
    //Sửa Title
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm SP";
  
    //Tạo nút "Add"
    var btnAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
  });
  

  /**
 * Add Product
 */
function addProduct() {
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var screen = getEle("HinhSP").value;
  var backCamera = getEle("MoTa").value;

  var product = new ProductList("", name, price, screen, backCamera);

  service
    .addProductApi(product)
    .then(function () {
      fetchData();

      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
/**
 * Edit Product
 */
 function editProduct(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Update SP";
  
    var btnUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})">Update</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;
  
    service
      .getProductById(id)
      .then(function (result) {
        //show thông ra các thẻ input
        getEle("TenSP").value = result.data.name;
        getEle("GiaSP").value = result.data.price;
        getEle("HinhSP").value = result.data.screen;
        getEle("MoTa").value = result.data.backCamera;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
 * Update Product
 */
function updateProduct(id) {
    var name = getEle("TenSP").value;
    var price = getEle("GiaSP").value;
    var screen = getEle("HinhSP").value;
    var backCamera = getEle("MoTa").value;
  
    var product = new ProductList(id, name, price, screen, backCamera);
  
    service
      .updateProductApi(product)
      .then(function () {
        fetchData();
        //close modal
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  