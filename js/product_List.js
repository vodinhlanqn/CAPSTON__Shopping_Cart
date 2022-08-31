// Tạo lớp đối tượng Danh sách Sản phẩm

const ProductList = function (
    _id,
    _name,
    _price,
    _screen,
    _backCamera,
    _frontCamera,
    _img,
    _desc,
    _type,
    _inventory,
    _rating,

) {
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.screen = _screen;
    this.backCamera = _backCamera;
    this.frontCamera = _frontCamera;
    this.img = _img;
    this.desc = _desc;
    this.type = _type;
    this.inventory = _inventory;
    this.rating = _rating;
    this.arrProduct = [];
};