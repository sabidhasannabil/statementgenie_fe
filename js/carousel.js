$(".slider").each(function () {
  var slick = $(this),
    item = $(this).data("item");

  slick.slick({
    slidesToShow: item,
    prevArrow: '<div class="slick-prev slick-arrow"><i class="bi bi-chevron-left"></i></div>',
    nextArrow: '<div class="slick-next slick-arrow"><i class="bi bi-chevron-right"></i></div>',
  });
});

// $(".slider").each(function() {
//     $(this).slick($(this).data());
// });


