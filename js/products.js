const CAT_ID = localStorage.getItem("catID");
const ORDER_ASC_BY_PRICE = "AP";
const ORDER_DESC_BY_PRICE = "DP";
const ORDER_BY_PROD_SOLDCOUNT = "Cant.";
let prodArray = [];
let prodArrayAux = [];
let catName;
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if ( aSoldCount > bSoldCount ){ return -1; }
            if ( aSoldCount < bSoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function filterAndShowProductsByPrice(){
    prodArray = prodArray.filter((value) => value.cost >= minPrice && value.cost <= maxPrice);
    showProductsList();
}

function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

function showProductsList(){
    document.getElementById("productsName").innerText = catName;
    let htmlContentToAppend = "";
    for(let i = 0; i < prodArray.length; i++){ 
        let product = prodArray[i];
        
        htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend; 
        
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        prodArray = productsArray;
    }

    prodArray = sortProducts(currentSortCriteria, prodArray);

    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL + CAT_ID + EXT_TYPE ).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prodArray = resultObj.data.products;
            catName = resultObj.data.catName;
            prodArrayAux = prodArray;
            showProductsList();
        }
    });

    document.getElementById("sortByAscPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortByDescPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByProdCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;
        prodArray = prodArrayAux;
        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;
        filterAndShowProductsByPrice();
    });

});


