const slick = require("slick-carousel");

document.ready(() => {
  $(".show__carousel-slide").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".show__carousel-slide",
  });
  $(".show__carousel-nav-element").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    centerMode: true,
    focusOnSelect: true,
  });
});
