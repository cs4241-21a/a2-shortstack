// Add some Javascript code here, to run on the front end.

const submit = function( event ) {
    // prevent default form action from being carried out
    event.preventDefault()

    const itemName = document.querySelector( '#groceryItem' ),
          itemBrand = document.querySelector( '#groceryBrand' ),
          itemQuantity = document.querySelector( '#groceryQuantity' ),
          itemUnitPrice = document.querySelector( '#groceryUnitPrice' ),
          json = { groceryItem: itemName.value,  groceryBrand: itemBrand.value, groceryQuantity: itemQuantity.value, groceryUnitPrice: itemUnitPrice.value},
          body = JSON.stringify( json )

    fetch( '/submit', {
      method:'POST',
      body 
    })

    .then( function( response ) {
      // do something with the reponse 
      return response.json()
    })

    .then(function(json){
      console.log(json)
      addFlexRow(json)
      
    })

    return false
  }

  window.onload = function() {

    let body = {}
    body = JSON.stringify(body)

    fetch( '/getdata', {
          method:'POST',
          body
    })

    .then(  function( response ) {
      // do something with the reponse 

       response.text().then(function(items){
          appdata= JSON.parse(items)
          for(let i = 0; i < appdata.length; i++){
            addFlexRow(appdata[i])
          }
       })

      

    })

    const button = document.querySelector( '#submitBtn' )
    button.onclick = submit
  
  }

  const addFlexRow = function(object){
      const name = document.createElement('li'),
            brand = document.createElement('li'),
            quantity = document.createElement('li'),
            unitPrice = document.createElement('li'),
            totalPrice = document.createElement('li'),
            btnBox = document.createElement('li')

            
      name.innerText = object.groceryItem
      name.classList = "flex-item"

      brand.innerText = object.groceryBrand
      brand.classList = "flex-item"

      quantity.innerText = object.groceryQuantity + ' unit(s)'
      quantity.classList = "flex-item"

      unitPrice.innerText = '$' + object.groceryUnitPrice + ' / unit'
      unitPrice.classList = "flex-item" 

      totalPrice.innerText = '$' + object.groceryTotalPrice + ' total'
      totalPrice.classList = "flex-item"

      let flexbox= document.getElementById("flexbox")
      flexbox.appendChild(name)
      flexbox.appendChild(brand)
      flexbox.appendChild(quantity)
      flexbox.appendChild(unitPrice)
      flexbox.appendChild(totalPrice)

  }