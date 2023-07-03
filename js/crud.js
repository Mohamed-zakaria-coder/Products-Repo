// Get Inputs

let product = document.getElementById("prod");
let price = document.getElementById("price");
let discount = document.getElementById("discount");
let ads = document.getElementById("ads");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.getElementById("create");
let searchInput = document.getElementById("search");
let catrgorySearch = document.getElementById("catrgory-search");
let productSearch = document.getElementById("product-search");
let deleteAll = document.getElementById("delete-all");
let productsTable = document.querySelector(".products-table .tbody");
let mainTitle = document.querySelector(".products-table .main-title");
let allPriceInputs = document.querySelectorAll(".prod-info input");

// General Vars
let searchMood = "product";
let mood = "create";
let temp;



// Product CRUD

function Product() {
  allPriceInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
      Total();
    });
  });
  Create();
}

Product();

// Total Price
function Total() {
  if (price.value !== "") {
    total.innerHTML = `Total: ${
      Number(price.value) + Number(ads.value) - Number(discount.value)
    }`;
    total.style.backgroundColor = "green";
    total.style.color = "white";
  } else {
    total.textContent = "Total: ";
    total.style.backgroundColor = "red";
    total.style.color = "white";
  }
}

// Create A Product
let myProducts;
if (localStorage.getItem("products") !== null) {
  myProducts = JSON.parse(localStorage.getItem("products"));
} else {
  myProducts = [];
}
function Create() {
  createBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let prod = {
      product: product.value,
      price: price.value,
      discount: discount.value,
      ads: ads.value,
      total: total.innerHTML,
      category: category.value,
      count: count.value,
    };
    if (product.value !== "" && price.value !== "" && count.value < 100) {
      if (mood === "create") {
        if (prod.count > 1) {
          for (let i = 0; i < count.value; i++) {
            myProducts.push(prod);
          }
        } else {
          myProducts.push(prod);
        }
      } else {
        myProducts[temp] = prod;
        mood = "create";
        createBtn.innerHTML = "Create";
        count.style.display = "block";
      }
      Clear();
    }
    localStorage.setItem("products", JSON.stringify(myProducts));
    Read();
    if (myProducts.length > 0) {
      mainTitle.innerHTML = `<td>ID</td>
      <td>Product</td>
      <td>Price</td>
      <td>Ads</td>
      <td>Discount</td>
      <td>Total</td>
      <td>Catrgory</td>
      <td>Update</td>
      <td>Delete</td>`;
      deleteAll.style.display = "block";
    }
  });
}

// Clear Data
function Clear() {
  product.value = "";
  price.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  total.innerHTML = "Total:";
  total.style.backgroundColor = "red";
  total.style.color = "white";
}

// Read Data

function Read() {
  productsTable.innerHTML = "";
  for (let i = 0; i < myProducts.length; i++) {
    productsTable.innerHTML += `<tr>
    <td>${i + 1}</td>
    <td>${myProducts[i].product}</td>
    <td>${myProducts[i].price}</td>
    <td>${myProducts[i].ads}</td>
    <td>${myProducts[i].discount}</td>
    <td>${myProducts[i].total.slice(6)}</td>
    <td>${myProducts[i].category}</td>
    <td onclick = 'UpdateData(${i})' class="update">Update</td>
    <td onclick = 'DeleteData(${i})' class="delete">Delete</td>
</tr>`;
  }
}

Read();

// Delete Data

function DeleteData(id) {
  myProducts.splice(id, 1);
  if (myProducts.length < 1) {
    mainTitle.innerHTML = "";
    deleteAll.style.display = "none";
  }
  Read();
  localStorage.setItem("products", JSON.stringify(myProducts));
}

// Delete All

deleteAll.addEventListener("click", () => {
  myProducts = [];
  localStorage.removeItem("products");
  Read();
  deleteAll.style.display = "none";
  mainTitle.innerHTML = "";
});

// Update Data

function UpdateData(i) {
  product.value = myProducts[i].product;
  price.value = myProducts[i].price;
  ads.value = myProducts[i].ads;
  category.value = myProducts[i].category;
  discount.value = myProducts[i].discount;
  count.style.display = "none";
  total.innerHTML = myProducts[i].total;
  createBtn.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  Total();
}

// Search By Product Or Category

catrgorySearch.addEventListener("click", () => {
  myProducts = JSON.parse(localStorage.getItem("products"));
  Read();
  searchInput.value = "";
  searchMood = "category";
  searchInput.focus();
});

productSearch.addEventListener("click", () => {
  myProducts = JSON.parse(localStorage.getItem("products"));
  Read();
  searchInput.value = "";
  searchMood = "product";
  searchInput.focus();
});

function handleSearch() {
  if (searchInput.value !== "") {
    myProducts =
      myProducts &&
      myProducts.filter((prod) =>
        prod[searchMood].toLowerCase().includes(searchInput.value.toLowerCase())
      );
  } else if (searchInput.value === "") {
    myProducts = JSON.parse(localStorage.getItem("products"));
  }
  Read();
  myProducts = JSON.parse(localStorage.getItem("products"));
}

searchInput.addEventListener("input", handleSearch);

if (myProducts.length > 0) {
  deleteAll.style.display = "block";
  mainTitle.innerHTML = `<td>ID</td>
      <td>Product</td>
      <td>Price</td>
      <td>Ads</td>
      <td>Discount</td>
      <td>Total</td>
      <td>Catrgory</td>
      <td>Update</td>
      <td>Delete</td>`;
      deleteAll.style.display = "block";
} else {
  deleteAll.style.display = "none";
  mainTitle.innerHTML = ""
}
