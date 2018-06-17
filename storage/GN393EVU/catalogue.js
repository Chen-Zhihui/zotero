$(document).ready(function() {
  $('body').tooltip({
    selector: '[data-toggle=iso-tooltip]'
  });

  var languagePath = $(".product-box .language-path").html();

  $(".product-box tr td").not(".orderLanguage").bind('click', function() {
    var type = $(this).parent("tr").find(".type").html();
    var counter = $(this).parent("tr").find(".counter").html();
    var alreadySelected = false;
    var method = $(this).parents(".product-box").find(".method").html();

    // Check if already selected
    if ($(this).parent("tr").hasClass("active")) {
      alreadySelected = true;
    }

    // Handle active/inactive lines
    $(this).parents(".product-box").find("tbody > tr").removeClass("active");
    $(this).parent("tr").addClass("active");
    $(this).parents(".product-box").find("tbody > tr select").attr("disabled", "disabled");
    $(this).parent("tr").find("select").removeAttr("disabled");

    // Add class active to the check icon
    $(this).parents(".product-box").find("tbody > tr .chooseFormat").removeClass("active");
    $(this).parents(".product-box").find("tbody > tr .chooseFormat .glyphicon")/*.not(".hidden")*/.addClass("hidden");
    $(this).parent("tr").find(".chooseFormat").addClass("active");
    $(this).parent("tr").find(".chooseFormat .glyphicon").removeClass("hidden");

    // Update "Add to basket" link
    $(this).parents(".product-box").find("ul.orderBasket button").attr("onclick", "javascript:addToBasket('"+counter+"', '"+languagePath+"', '"+type+"')");

    // Update price with fade in & out..
    if (!alreadySelected) {
      $(this).parents(".product-box").find(".price.order .amount").fadeOut(0);
      $(this).parents(".product-box").find(".price.order .amount").html($(this).parent("tr").find(".price").html());
      $(this).parents(".product-box").find(".price.order .amount").fadeIn(100);
    }
  });

  // Update badge when click on "Add to basket and continue shopping"
  $(document).on('click', '.addToBasketBtn', function() {
    displayBasketCount();
  });
});

function addToBasket(counter, guilang, prodType) {
  var id;
  var bki = document.getElementById("bki_" + counter);
  var ref = document.getElementById("itemReference").innerHTML.trim();
  var format = document.getElementById("bkifmt_" + counter).innerHTML.trim();
  var language = bki.options[bki.selectedIndex].text.trim();
  var prodDescr = "[" + format + " - " + language + "]";

  // needed by IE to accept cookies
  jQuery.support.cors = true;

  // Add to basket
  jQuery.ajax({
    url: "/webstore/minishoppingbasket?memberId=ISO&purchaseId=" + bki.value + "&guilang=" + guilang,
    cache: false,
    crossDomain: true,
    type: "GET"
  }).done(
    function(output, status, xhr) {
      // console.log('Successfully added to basket! ' + xhr.getAllResponseHeaders());
      $(".addToBasketBtn").attr("disabled", false);
      $(".addToBasketBtn").removeClass("loading");
    }
  ).fail(
    function(xhr, status, errorThrown) {
      alert("Error: " + errorThrown + "\nUnable to add item to basket! Please try again.");
    }
  );

  // Get opt-out information
  if (prodType == 'std') {
    id = document.getElementById('csNumber').innerHTML;
  }

  if (prodType == 'pub'){
    id = document.getElementById('pubNumber').innerHTML;
    // analyze 4 first characters of publication to know if prodType is a pub, grs or col
    var pubType4 = id.slice(0,4);

    if (pubType4 == "PUB5") {
      prodType = "col";
    } else if (pubType4 == "PUB4") {
      prodType = "grs";
    } else {
      prodType = "pub";
    }
  }

  // Opt out
  jQuery.ajax({
    url: "https://www.iso.org/bootiful-services/opt-out/ip/check?type=" + prodType + "&id=" + id + "&ref=" + ref + "&lang=" + bki.options[bki.selectedIndex].lang + "&guilang=" + guilang,
    cache: false,
    crossDomain: true,
    type: "GET"
  })
  .done(
    function(output, status, xhr) {
      var modalOutput = '';
      var continueShopping = encodeURIComponent(window.location.href);
      var checkoutURL = '/webstore/shoppingbasket?memberId=ISO&guilang=' + guilang + '&continue_shopping=' + continueShopping;
      var productPrice = document.getElementById("productPrice").innerHTML;
      if (output.hasOptOut) {
        modalOutput = output.title;
        modalOutput += output.text;
        modalOutput += '<div class="clearfix">';
        modalOutput += '<a href="' + output.redirectionUrl + '" id="redirectionUrl" class="btn btn-default pull-right" target="_blank">' + output.button + '</a>';
        modalOutput += '</div>';
        modalOutput += '<hr/>';
        modalOutput += output.title2;
        modalOutput += output.text2;
        modalOutput += '<div class="text-center">';
        modalOutput += '<button type="button" class="btn btn-default addToBasketBtn loading" data-dismiss="modal" disabled>' + $('#continueShopping').attr('data-label') + '</button>&nbsp;';
        modalOutput += '<a href="' + checkoutURL + '" class="btn btn-primary"><span class="glyphicon glyphicon-shopping-cart"></span>' + $('#proceedToCheckout').attr('data-label') + '</a>';
        modalOutput += '</div>';
        document.getElementById('modalOptOut').innerHTML = modalOutput;
      } else {
        // Product description
        modalOutput = '<h5 class="text-center">' + ref + '</h5>';
        modalOutput += '<p class="text-center">' + prodDescr + '</p>';
        modalOutput += '<div class="text-center">';
        modalOutput += '<button type="button" class="btn btn-default addToBasketBtn loading" data-dismiss="modal" disabled>' + $('#continueShopping').attr('data-label') + '</button>&nbsp;';
        modalOutput += '<a href="' + checkoutURL + '" class="btn btn-primary"><span class="glyphicon glyphicon-shopping-cart"></span>' + $('#proceedToCheckout').attr('data-label') + '</a>';
        modalOutput += '</div>';
        modalOutput += '<br />';
        // ISO Member store link
        if (output.text){
          modalOutput += '<small>' + output.text + '</small>';
        }
        document.getElementById('modalNoOptOut').innerHTML = modalOutput;
      }

      // Add Google Analytics tracker
      $("#redirectionUrl").attr("onclick", "ga('send', 'event', 'webstore-oo', '"+id+"', '"+output.country_iso+"', "+productPrice+")");
    }
  ).fail(
    function(xhr, status, errorThrown) {
      console.log("Error: " + errorThrown + "\nUnable to get opt-out information!");
    }
  );
}
