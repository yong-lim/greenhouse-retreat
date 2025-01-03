$(function() {
  $('.form-control').focus(formFocus);
});

function formFocus() {
  $('#alert-field').hide();
}

function sendGreenhouse(e) {
  e.preventDefault();

  console.log("in sendGreenhouse");
  
  // const POST_URL = 'https://script.google.com/macros/s/AKfycbwQ_wdqOBA_Z-29b9s2BZ7GHB3bGhlVzRL2hNwKdp-KoTQ5vhQ5bxz8uinBuKwvKDzP/exec'
  // const postRequest = {
  //   name: e.target['name-field'].value,
  //   phone: e.target['phone-field'].value,
  //   email: e.target['email-field'].value,
  //   body: e.target['body-field'].value
  // };
  
  const POST_URL = 'https://script.google.com/macros/s/AKfycbxhU72OuURPTT7DWqv9anGk7dCLnKp1EGyYEuvd-MdVdYZ1kN3fFgRrcomm6idgsFXCJg/exec'
  const postRequest = {
    date   : e.target['date'].value,
    nights : e.target['nights'].value,
    name   : e.target['name'].value,
    email  : e.target['email'].value,
    phone  : e.target['phone'].value,
    message: e.target['message'].value,
  };

  if(POST_URL) {
    $.post(POST_URL, JSON.stringify(postRequest))
      .then(res => {
        e.target.reset();
        console.log("res.code: ", res.code);
        console.log("res.msg: ", res.msg);
        $('#alert-field')
          .removeClass()
          .addClass(`alert alert-${res.code}`)
          .text(res.msg);
      });

    $('#alert-field')
      .removeClass()
      .html('<progress></progress>')
      .removeClass('hidden');
  } else {
    alert('You must set the POST_URL variable with your script ID');
  }
}

function changeSubject(e) {
  if(e.target.value === 'Other') {
    $('#subject-select').removeClass('col-xs-12')
      .addClass('col-xs-6');
    $('#hidden-other-subject').removeClass('hidden');
  } else {
    $('#subject-select').removeClass('col-xs-6')
      .addClass('col-xs-12');

    $('#hidden-other-subject').addClass('hidden');
  }
}
