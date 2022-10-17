const USER_ID = 25801;
let cart_articles = [];




document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL + USER_ID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cart_articles = (resultObj.data).articles;
      show_cart();
      updateSubTotal();
    }
  });
})


function show_cart(){
  
  let HtmlContentToAppend = "";

  for(articles of cart_articles){
    const {id, name, count, unitCost, currency, image} = articles;
    HtmlContentToAppend += `
      <tr>
        <td>
          <img height="36px" width="60px" src="${image}" alt="Article Img"> 
        </td>
        <td>${name}</td>
        <td>${currency} ${unitCost}</td>
        <td >
          <input id="articleCount" onchange="updateSubTotal()" type="number" name='articleCountInput' value="1" class="form-control-sm"/>
        </td>
        <td id="subTotal" style="font-weight: bold">${currency} <span id="subTotalSpan"> </span></td>
      </tr>

    `;
    document.getElementById("cart-articles-container").innerHTML = HtmlContentToAppend;
  }
}

function updateSubTotal(){
  let inputValue = document.getElementById("articleCount").value;
  if(inputValue >= 1){
    let newSubTotal = inputValue * (cart_articles[0].unitCost);
    document.getElementById("subTotalSpan").innerText = newSubTotal; 
  }
  else{
    document.getElementById("subTotalSpan").innerText = 0;
  }
}


  