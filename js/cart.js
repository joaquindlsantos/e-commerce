const USER_ID = 25801;
const DOLLAR_SYMBOL = "USD ";
let shippingComission = 0.05;
let cart_articles = [];
let methodPaymentForm = document.getElementById("methodPaymentForm");
const forms = document.querySelectorAll('.needs-validation');



document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL + USER_ID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cart_articles = (resultObj.data).articles;
      show_cart();
      updateProductSubTotal();
      updateTotalCosts();
    }
    document.getElementById("articleCount").addEventListener("change", function () {
      updateProductSubTotal();
      updateTotalCosts();
    });
    document.getElementById("premiumradio").addEventListener("change", function () {
      shippingComission = 0.15;
      updateTotalCosts();
    });

    document.getElementById("expressradio").addEventListener("change", function () {
      shippingComission = 0.07;
      updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function () {
      shippingComission = 0.05;
      updateTotalCosts();
    });
    methodPaymentForm.addEventListener('change', function (e) {
      let paymentmethod1 = document.getElementById("paymentmethod-creditcard");
      let paymentmethod2 = document.getElementById("paymentmethod-banktransfer");
      if ((paymentmethod1.checked) == true) {
        document.getElementById("banknumber").disabled = true;
        document.getElementById("cardnumber").disabled = false;
        document.getElementById("cvvnumber").disabled = false;
        document.getElementById("cardexpiration").disabled = false;
      }
      else if ((paymentmethod2.checked) == true) {
        document.getElementById("banknumber").disabled = false;
        document.getElementById("cardnumber").disabled = true;
        document.getElementById("cvvnumber").disabled = true;
        document.getElementById("cardexpiration").disabled = true;
      }
      paymentMethodValidation();
    });
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        (event) => {
          paymentMethodValidation();
          buyValidatadion();

          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  });
})


function show_cart() {

  let HtmlContentToAppend = "";

  for (articles of cart_articles) {
    const { id, name, count, unitCost, currency, image } = articles;
    HtmlContentToAppend += `
      <tr>
        <td>
          <img height="36px" width="60px" src="${image}" alt="Article Img"> 
        </td>
        <td>${name}</td>
        <td>${currency} ${unitCost}</td>
        <td >
          <input style="width: 60px" id="articleCount" type="number" name='articleCountInput' value="1" class="form-control"/>
        </td>
        <td id="subTotal" style="font-weight: bold">${currency} <span id="subTotalCost"> </span></td>
      </tr>

    `;
    document.getElementById("cart-articles-container").innerHTML = HtmlContentToAppend;
  }
}

function updateProductSubTotal() {
  let unitCost = cart_articles[0].unitCost;
  let inputValue = document.getElementById("articleCount").value;
  if (inputValue >= 1) {
    let newSubTotal = inputValue * (unitCost);
    document.getElementById("subTotalCost").innerText = newSubTotal;
  }
  else {
    document.getElementById("subTotalCost").innerText = 0;
  }
}

function updateTotalCosts() {
  let unitCost = cart_articles[0].unitCost;
  let articleCount = document.getElementById("articleCount").value
  let subTotalCost = articleCount * unitCost;
  let subTotalCostHTML = document.getElementById("subTotalCostText");
  let shippingCostHTML = document.getElementById("shippingCostText");
  let totalCostHTML = document.getElementById("totalCostText");

  let subTotalCostToShow = subTotalCost;
  let shippingCostToShow = (Math.round(subTotalCost * shippingComission));
  let totalCostToShow = (Math.round(shippingCostToShow) + parseInt(subTotalCost));

  subTotalCostHTML.innerHTML = DOLLAR_SYMBOL + subTotalCostToShow;
  shippingCostHTML.innerHTML = DOLLAR_SYMBOL + shippingCostToShow;
  totalCostHTML.innerHTML = DOLLAR_SYMBOL + totalCostToShow;
}

// VALIDACIONES

function paymentMethodValidation() {
  let paymentmethod1 = document.getElementById("paymentmethod-creditcard");
  let paymentmethod2 = document.getElementById("paymentmethod-banktransfer");
  let paymentMethodWarning = document.getElementById("paymentMethodWarning");
  let modalSelectedOption = document.getElementById("modalSelectedOption");

  if (!paymentmethod1.checked && !paymentmethod2.checked) {
    paymentMethodWarning.innerText = "Debe seleccionar una forma de pago.";
    methodPaymentForm.classList.add("is-invalid");
    console.log(methodPaymentForm.checkValidity());
  }
  else if (paymentmethod1.checked) {
    modalSelectedOption.innerText = "Tarjeta de credito";
    paymentMethodWarning.innerText = "";
    methodPaymentForm.classList.remove("is-invalid");
    methodPaymentForm.classList.add("was-validated");
  } else {
    modalSelectedOption.innerText = "Transferencia bancaria";
    paymentMethodWarning.innerText = "";
    methodPaymentForm.classList.remove("is-invalid");
    methodPaymentForm.classList.add("was-validated");
  }

}

function buyValidatadion() {
  let articleCount = document.getElementById("articleCount").value;
  let msgToShowHTML = document.getElementById("resultSpan");
  let shippingForm = document.getElementById("shippingForm");

  let msgToShow = "";

  if (methodPaymentForm.checkValidity() && shippingForm.checkValidity() && articleCount > 0) {
    msgToShow = "Has comprado con exito!"
    document.getElementById("alertResult").classList.add('alert-primary');

    msgToShowHTML.innerText = msgToShow;
    document.getElementById("alertResult").classList.add("show");

  }
}