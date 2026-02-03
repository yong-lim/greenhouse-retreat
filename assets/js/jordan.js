function formReset() {
  $('#alert-field').show()
    .html("<span><p>Thank you. We'll get back to you ASAP.</p></span><br>");
  setTimeout(() => {
    document.getElementById("formID").reset();
    $('#sendButton').show();
    $('#alert-field').hide();
    console.log('This alert appeared after 3 second!');
  }, 3000);
}

function pleaseWaite() {
  $('#sendButton').hide();
  $('#alert-field').removeClass();
  $('#alert-field').show()
    .html("<span><p>Please wait while we're sending your message . . .</p>  <progress></progress></span>");
}

//selector from your HTML form
function postGreenhouse(e) {
  //prevent the form from submiting so we can post to the google form
  console.log("in postGreenhouse");
  e.preventDefault();
  // console.log("inpostEatery");
  pleaseWaite();

  // form is in sor.phouen@4lims.com
  const formID  = "1FAIpQLSduR6NYkzWsDHM8w65wz3x_mpe23aUvvEwd0eundWrgQwALDA";
  const formURL = `https://docs.google.com/forms/d/e/${formID}/formResponse`;
  //AJAX request
  $.ajax({
    //The public Google Form url, but replace /view with /formResponse
    url: formURL,
    data: $('#formID').serialize(), //Nifty jquery function that gets all the input data
    type: 'POST', //tells ajax to post the data to the url
    dataType: "json", //the standard data type for most ajax requests
    mode: 'no-cors',
    header: { 'Content-Type': 'application/json' },
    statusCode: { //the status code from the POST request
      0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
        //success
        formReset();
       },
       200: function(data) {//200 is a success code. it went through!
        //success
        // $('#form-success').text('hooray! 200');
        formReset();
       },
       403: function(data) {//403 is when something went wrong and the submission didn't go through
        //error
        $('#alert-field').show()
          .html("<span><p><b>Oh no! something went wrong. Please let us know of your problem.</b></p></span>");
        alert('Oh no! something went wrong. Please let us know of your problem.');
      }
    },
    statusText: { //the status code from the POST request
      "error": function(data) {
        //error
        $('#alert-field').show()
          .html("<span><p><b>Oh no! something went wrong. Please let us know of your problem.</b></p></span>");
        alert('Oh no! something went wrong. Please let us know of your problem.');
      }
    }
  });
}

// CloudFlare turnstile response
function onTurnstileSuccess(token) {
  console.log("Turnstile success:", token);
  // document.getElementById("submit-btn").disabled = false;
  $('#sendButton').removeClass('hidden');
  $('#cf-turnstile').addClass('hidden');
}
function onTurnstileError(errorCode) {
  console.error("Turnstile error:", errorCode);
  // document.getElementById("submit-btn").disabled = true;
  $('#sendButton').addClass('hidden');
  $('#cf-turnstile').removeClass('hidden');
}
function onTurnstileExpired() {
  console.warn("Turnstile token expired");
  // document.getElementById("submit-btn").disabled = true;
  $('#sendButton').addClass('hidden');
  $('#cf-turnstile').removeClass('hidden');
}
