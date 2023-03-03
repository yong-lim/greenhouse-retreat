$(document).ready(function () {
  // Init Side Nav
  $('.button-collapse').sideNav();
  
  // Init Slider
  $('.slider').slider({
    indicators: false,
    height: 500,
    transition: 500,
    interval: 6000
  });
  
  // Autocomplete
  $('.autocomplete').autocomplete({
    data:{
      "Aruba": null,
      "Busra": null,
      "Cancun Mexico": null,
      "Hawaii": null,
      "Florida": null,
      "California": null,
      "Jamaica": null,
      "Europe": null,
      "The Bahamas": null
    }
  });

  // Init Datepicker
  $('.datepicker').datepicker();

  // Init Scrollspy
  $('.scrollspy').scrollSpy();
});
