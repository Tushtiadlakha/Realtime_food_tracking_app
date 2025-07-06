import axios from "axios";
import Noty from "noty";

let cartCounter = document.querySelector("#cartCounter");

function updateCart(food) {
  axios.post("/update-cart", food).then((res) => {
    cartCounter.innerText = res.data.totalQty;
    new Noty({
        type: "success",
        timeout: 1000,
        text: "Item added to cart",
        progressBar: false
    }).show()
    // console.log(res);
  }).catch((error) => {
    new Noty({
        type: "error",
        timeout: 1000,
        text: "error in adding to cart",
        progressBar: false
    }).show()
  })
};

let addToCart = document.querySelectorAll(".addToCart");

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let food = JSON.parse(btn.value);
    updateCart(food);
  });
});
