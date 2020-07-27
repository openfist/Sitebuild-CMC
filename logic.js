$(document).ready(function(){

  // split the urls to make it manageable
  let BASE_URL = "https://api.coingecko.com/api/v3/";
  let ENDPOINT = "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h";
  let GLOBAL = "global";

  //concatenate the urls
  let url = BASE_URL + ENDPOINT;

  // format function for big numbers in currency
  const formatter1 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
  })
  // format functon for small numbers in currency
  const formatter2 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  })
  // format functon for big numbers
  const formatter3 = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
  })
  // format functon for percentage
  const formatter4 = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2
  })

  //get the data from api
  let api = 0;
  fetch(url).then(response => {

    response.json().then(data => {
      api = data;
      console.log(api);

      //loads the initial contents of the array
      function redrawList(){
        //create var for the fruitlist
        let table = $("#outputTable");
        //clears the page just in case there is a previous load
        table.html("");
        // loops the list in the array into the table listed
        $.each(api,function(index,value){

          $("<td/>").html( value.market_cap_rank).appendTo(table);
          $("<td/>").html( value.name + " | (" +  (value.symbol.toUpperCase()) +")" ).appendTo(table);
          $("<td/>").html( formatter1.format(value.market_cap)).appendTo(table);
          $("<td/>").html( formatter2.format(value.current_price)).appendTo(table);
          $("<td/>").html( formatter1.format(value.total_volume)).appendTo(table);
          $("<td/>").html( formatter3.format(value.circulating_supply) + " " + (value.symbol.toUpperCase())).appendTo(table);
          $("<td/>").html( formatter4.format(value.price_change_percentage_24h) + "%").appendTo(table);
          $("<tr/>").html( value.sparkline_in_7d).appendTo(table);
          console.log(table);
        });
      };
      redrawList();
    })
  })


})
