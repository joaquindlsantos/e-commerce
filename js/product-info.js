const PRODUCT_ID = localStorage.getItem("ProdID");
let product = {};
let productComments = {};

function userScore(rating) {
  let scoreHtml = "";
  switch (rating) {
    case 1:
      scoreHtml = `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star "></span>
      <span class="fa fa-star "></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      `
      break;
    case 2:
      scoreHtml = `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star "></span>
      `
      break;
    case 3:
      scoreHtml = `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      `
      break;
    case 4:
      scoreHtml = `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      `
      break;
    case 5:
      scoreHtml = `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      `
      break;

    default:
      break;
  }
  return scoreHtml;
}




function showProductInfo() {
  let htmlContentToAppend = "";

  htmlContentToAppend = `
    <div>
      <h1 class="my-4">${product.name}</h1>
      <hr>
      
      <h5 style="font-weight: bold;">Precio</h5>
      <p>${product.currency} ${product.cost}</span>
      
      <h5 style="font-weight: bold;">Descripcion</h5>
      <p>${product.description}</p>
      
      <h5 style="font-weight: bold;">Categoria</h5>
      <p>${product.category}</p>

      <h5 style="font-weight: bold;">Cantidad de vendidos</h5>
      <p>${product.soldCount}</p>

      <h5 style="font-weight: bold;">Imagenes ilustrativas</h5>
    `
  document.getElementById("product-info-container").innerHTML = htmlContentToAppend;
}




function showProductImages() {
  let htmlContentToAppend = "";

  for (let i = 0; i < 4; i++) {
    htmlContentToAppend += ` 
      <div class="card mb-4" style="width: 18rem;">
        <img class="card-img-top" src="${product.images[i]}" alt="Card image cap">
      </div>
    `

  }
  document.getElementById("product-images").innerHTML = htmlContentToAppend;
}

function showProductComments() {
  let htmlContentToAppend = "";
  htmlContentToAppend = `<h4>Comentarios</h5>`
  for (comment of productComments) {
    htmlContentToAppend += `
    <div class="row border">
      <span><span style="font-weight: bold;">${comment.user} </span>- ${comment.dateTime} - ${userScore(comment.score)}</span>
      <p>${comment.description}</p>
    </div>
    `
  }
  document.getElementById("product-comments").innerHTML = htmlContentToAppend;
}

function commentsForm(){
  let htmlContentToAppend = "";
  htmlContentToAppend = `
  <h4 class="mt-4">Comentar</h4>
  <form>
    <div class="form-group">
    <label for="commentBox">Tu opinion:</label>
    <textarea class="form-control w-50" id="commentBox" rows="3"></textarea>
    </div>
    <div class="form-row align-items-center">
    <div class="col-auto my-1">
      <label class="mr-sm-2 my-1" for="">Tu puntuacion:</label>
      <select class="custom-select mr-sm-1" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Enviar</button>
  </form>
  `;
  document.getElementById("comment-form").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL + PRODUCT_ID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;
      showProductInfo();
      showProductImages();
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL + PRODUCT_ID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productComments = resultObj.data;
      showProductComments()
      commentsForm();
    }
  });
})

