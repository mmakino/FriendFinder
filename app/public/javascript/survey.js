
//
// Process the survey form inputs
//
function procSurvey() {
  console.log("submitting...");

  // collect questions and answers into this variable
  let questions = {};

  // If all required fields are filled
  if (validateForm(questions)) {
    // Create an object for the user"s data
    let userData = {
      name: $("#name").val(),
      photo: $("#photo").val(),
      scores: Object.values(questions) 
    };

    // AJAX post the data to the friends API.
    $.post("/api/friends", userData, function (data) {
      // Grab the result from the AJAX post so that the best match's name and photo are displayed.
      $("#match-name").text(data.name);
      $("#match-img").attr("src", data.photo);

      // Show the modal with the best match
      $("#results-modal").modal("toggle");
    });
  }
  else {
    let missing = Object.entries(questions).filter(v => v === false);
    alert("Please fill out all fields before submitting!");
  }
}

//
// Form validation
//
// PARAMS:
// * questions = an object to be modified in OUT mode as { name: value }
//               by taking the radio button inputs in. All missing inputs
//               will have the value set to "false".
//
// RETURN:
// * true, if all the input have been validated
// * false, otherwise
//
function validateForm(questions) {
  $("form input:radio").each(function () {
    // console.log($(this).attr("name"), $(this).val(), $(this).prop('checked'));
    if (!($(this).attr("name") in questions)) {
      questions[$(this).attr("name")] = false;
    }
    if ($(this).prop("checked")) {
      questions[$(this).attr("name")] = parseInt($(this).val());
    }
  });
  console.log(questions);

  let isValid = Object.values(questions).every(v => v !== false);
  if ($('#name').val() === "") isValid = false;
  if ($('#photo').val() === "") isValid = false;

  return isValid;
}
