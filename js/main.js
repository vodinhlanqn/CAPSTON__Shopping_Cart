var getEle = function (id) {
    return document.getElementById(id);
};

var productList = new ProductList();
var cartProduct = [];

// getLocalStorage();
const fetchList = function () {
    axios({
        url: "https://62ff796334344b6431fa3ac2.mockapi.io/api/danhsachsanpham",
        method: "GET",
    })
        .then(function (res) {
            productList.arrProduct = res.data;
            // renderProd(productList.arrProduct);
            renderProd();
            // getLocalStorage();
        })
        .catch(function (err) {
        });
};
fetchList();

function renderProd(dataProduct = productList.arrProduct) {
    let htmlContent = "";
    dataProduct.forEach(function (itemProduct) {
        htmlContent += ` 
        <div div class="col-lg-4 col-md-6 mb-4" >
            <div class="card">
                <div class="card-body">
                    <div class="text-center">
                        <img src="${itemProduct.img}" class="w-75 mb-3 img-fluid" alt="${itemProduct.name}" />
                    </div>
                    <h4 class="card-title">${itemProduct.name}</h4>
                    <p class="card-text">${itemProduct.desc}</p>
                    <p class="card-text">Giá: ${parseInt(itemProduct.price).toLocaleString()} VND</p>
                    <p class="card-text">Đánh giá: ${itemProduct.rating}</p>
                    <p class="card-text">Số lượng hàng: ${itemProduct.inventory}</p>
                </div>
                <div class="card-footer text-muted">
                    <button class="btn btn-success" onclick="addToCart(${itemProduct.id})">Thêm vào Giỏ Hàng</button>
                </div>
            </div>
        </div>
        `;
    });
    getEle("divbody").innerHTML = htmlContent;
};


// RENDER CART PRODUCT
const renderCart = function (list = cartProduct) {
    var htmlContent = "";
    for (var i = 0; i < list.length; i++) {
        //template string
        htmlContent += `
        <tr>
            <td>
            <img
                style="width: 150px;"
                src="${list[i].product.img}"
            />
            </td>
            <td style="font-size: 25px;">${list[i].product.name}</td>
            <td>${parseInt(list[i].product.price).toLocaleString()}</td>
            <td>
            <span>${list[i].quantity} </span>
            <div class="btn-group">
                <button class="btn btn-info border-right" onclick="descendItem(${list[i].product.id
            })">-</button>
                <button class="btn btn-info border-left" onclick="increaseItem(${list[i].product.id
            })">+</button>
            </div>
            </td>
            <td>${parseInt(
                +list[i].quantity * +list[i].product.price
            ).toLocaleString()} VND </td>
            <td>
            <button class="btn btn-danger" onclick="deleteCartItem(${list[i].product.id
            })">x</button>
            </td>
        </tr>
    `;
    }
    document.getElementById("tblCart").innerHTML = htmlContent;
    document.getElementById("totalPrice").innerHTML =
        sum().toLocaleString() + "VND";
    setLocalStorage();
};

// Hiển thị Tổng sản phẩm được thêm vào Giỏ hàng
const countQuantity = function (list = cartProduct) {
    var count = 0;
    for (var i = 0; i < list.length; i++) {
        count += list[i].quantity;
    }
    getEle('countQuantity').innerText = count;
}

// Thêm sản phẩm vào giỏ hàng
const addToCart = function (id) {
    var indexProduct = findIndexProduct(id);
    var indexCart = findIndexCart(id);
    if (indexCart >= 0) {
        cartProduct[indexCart].quantity++;
    } else {
        var cartItem = {
            product: productList.arrProduct[indexProduct],
            quantity: 1,
        };
        cartProduct.push(cartItem);
    }
    renderCart(cartProduct);
};

// Tìm vị trí ID của Product
const findIndexProduct = function (id) {
    for (var i = 0; i < productList.arrProduct.length; i++) {
        if (parseInt(productList.arrProduct[i].id) === parseInt(id)) {
            return i;
        }
    }
    return -1;
};
const findIndexCart = function (id) {
    for (var i = 0; i < cartProduct.length; i++) {
        if (parseInt(cartProduct[i].product.id) === parseInt(id)) {
            return i;
        }
    }
    return -1;
};

// Tính tổng tiền
const sum = function () {
    var totalSum = 0;
    var quantity;
    var price;
    for (var i = 0; i < cartProduct.length; i++) {
        quantity = +cartProduct[i].quantity;
        price = +cartProduct[i].product.price;
        totalSum += quantity * price;
    }
    return totalSum;
};

//LỌC SẢN PHẨM
const sortProduct = function () {
    var value = document.getElementById("sort").value;
    if (+value === 0) {
        productList.arrProduct.sort(compare);
        renderProd();
    }
    if (+value === 1) {
        productList.arrProduct.sort(compareDecrement);
        renderProd();
    }
};
const compare = function (a, b) {
    // Dùng toUpperCase() để không phân biệt ký tự hoa thường
    const genreA = a.name.toUpperCase();
    const genreB = b.name.toUpperCase();

    let comparison = 0;
    if (genreA < genreB) {
        comparison = -1;
    } else {
        comparison = 1;
    }
    return comparison;
};
const compareDecrement = function (a, b) {
    //nghịch đảo giá trị trả lại bằng cách nhân với -1
    const genreA = a.name.toUpperCase();
    const genreB = b.name.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
        comparison = -1;
    } else {
        comparison = 1;
    }
    return comparison;
};

const searchProduct = function () {
    var search = [];
    var value = document.getElementById("filterProduct").value;
    if (value == 'all') {
        search = renderProd();
    }
    for (var i = 0; i < productList.arrProduct.length; i++) {
        if (value.toUpperCase() === productList.arrProduct[i].type.toUpperCase()) {
            search.push(productList.arrProduct[i]);
        }
    }
    renderProd(search);
};

// Giảm số lượng sản phẩm
const descendItem = function (id) {
    var index = findIndexCart(id);
    if (index !== -1) {
        if (parseInt(cartProduct[index].quantity) > 1) {
            cartProduct[index].quantity--;
        } else {
            deleteCartItem(id);
        }
    }
    renderCart(cartProduct);
};

// Tăng số lượng sản phẩm
const increaseItem = function (id) {
    var index = findIndexCart(id);
    if (index !== -1) {
        cartProduct[index].quantity++;
    }
    renderCart(cartProduct);
};

// Xóa sản phẩm ra khỏi giỏ hàng
const deleteCartItem = function (id) {
    var index = findIndexCart(id);
    if (index !== -1) {
        cartProduct.splice(index, 1);
    }
    renderCart(cartProduct);
};



getLocalStorage();
// Lưu dữ liệu xuống LocalStorge
function setLocalStorage() {
    // convert json ==> string
    var dataString = JSON.stringify(cartProduct);
    localStorage.setItem('ListCartProduct', dataString);
    countQuantity();
}

// Lấy dữ liệu từ LocalStorage
function getLocalStorage() {
    //Kiểm tra dữ liệu từ LocalStorage : null, ""
    if (localStorage.getItem('ListCartProduct')) {
        var dataString = localStorage.getItem('ListCartProduct');
        // convert string ==> JSON
        cartProduct = JSON.parse(dataString);
        // Hiển thị danh sách giỏ hàng ra ngoài giao diện
        renderCart(cartProduct);
        countQuantity();
    }
}

const purchaseCart = function () {
    cartProduct = [];
    var dataString = JSON.parse(localStorage.getItem('ListCartProduct'));
    if (dataString == "") {
        alert("Chưa có sản phẩm trong giỏ hàng");
    } else {
        localStorage.clear("ListCartProduct");
        renderCart(cartProduct);
        alert("Bạn đã thanh toán thành công");
    }
};
