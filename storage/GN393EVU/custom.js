$(document).ready(function() {
  // Append current URL to shopping cart link URL
  var shoppingCartLink = $(".shopping-cart-link");
  shoppingCartLink.attr("href", shoppingCartLink.attr("href") + "&continue_shopping=" + encodeURIComponent(window.location.href));
  // Call shopping basket API to display how many items are sitting in the cart
  displayBasketCount();
});

function displayBasketCount() {
  $.ajax({
    url: "/webstore/shoppingbasket/summary",
    cache: false,
    crossDomain: true,
    type: "GET"
  }).done(
    function(data, status, xhr) {
      if (data.itemCount != undefined && data.itemCount > 0) {
        $(".shopping-cart-badge").children("span.badge").remove();
        $badge = $("<span class='badge badge-danger'>"+data.itemCount+"</span>").css("opacity", "0");
        $(".shopping-cart-badge span").last().after($badge);
        $badge.animate({opacity: 1}, 500);
      }
    }
  ).fail(
    function(xhr, status, errorThrown) {
      console.log("ERROR shopping basket: " + errorThrown);
    }
  );
}