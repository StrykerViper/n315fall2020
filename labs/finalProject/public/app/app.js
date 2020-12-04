function initListeners() {
  $("#nav").on("click", "a", function (e) {
    var btnID = this.id;
       console.log(btnID);
    MODEL.getView(btnID);
  });

  // active page underline class function
  $(function () {
    $("#nav").on("click", "a", function (e) {
      $("#nav nav .active").removeClass("active");
      // add class
      $(this).addClass("active");
      // console.log("click");
    });
  });

}
//these buttons pass along the dynamic doc ids from eaach recipe
function viewButton(id) {
  docID = id
  btnID = "details";

  console.log(btnID);
  console.log(docID);
  MODEL.getView(btnID);
  MODEL.displayRecipeDetailPage(docID)
}

function editButton(id) {
  // gottenDocumentID = id
  docID = id
  btnID = "edit";

  console.log(btnID);
  // console.log(gottenDocumentID);
  console.log(docID);
  MODEL.getView(btnID);
  // MODEL.RecipeEditPage(gottenDocumentID);
  MODEL.RecipeEditPage(docID);
}

function deleteButton(id){
  console.log("click delete");
  console.log(id);
  docID = id;
  MODEL.deleteRecipeData(docID);
}

function initSite() {
  $.get("views/nav.html", function (nav) {
    $("#nav").html(nav);
    initListeners();
  });
  $.get("views/home.html", function (data) {
    $("#content").html(data);
  });
  $.get("views/footer.html", function (data) {
    $("#footer").html(data);
  });

  //user signUp
  $("#content").on("click", "#signUpBtn", function (e) {
    e.preventDefault();

    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let eMail = $("#signUpEmail").val();
    let pWord = $("#signUpPass").val();
    // console.log(fName ,lName ,eMail, pWord);
    MODEL.userSignUp(fName, lName, eMail, pWord);
  });

  //user login
  $("#content").on("click", "#submitLoginBtn", function (e) {
    e.preventDefault();
    let eMail = $("#email").val();
    let pWord = $("#pass").val();
    // console.log("click" , eMail, pWord);
    MODEL.signInUser(eMail, pWord);
  });

  //user logout
  $("#nav").on("click", "#logOut", function (e) {
    e.preventDefault();
    console.log("logout btn click");
    MODEL.logOutUser();
  });

  //create Recipe
  $("#content").on("click", "#createRecipeBtn", function (e) {
    console.log("create recipe");

    const createData = $('#createForm')
    .serializeArray()
    .reduce((obj, item) => ({ ...obj, ...{ [item.name]: item.value } }), {});;

    // console.log(createData);
    MODEL.createRecipeData(createData);
  });
  }

  // update recipe click function
  $("#content").on("click", "#editRecipeBtn", function (e){
    console.log("Update Clicked");
    const editedData = $('#editForm')
    .serializeArray()
    .reduce((obj, item) => ({ ...obj, ...{ [item.name]: item.value } }), {});

    // console.log(editedData);
    MODEL.editRecipeData(editedData);
  })

  $("#nav").on("click", ".navicon", function(e){
  console.log("click navicon");
  $("nav").toggleClass("navMobileView");
  
  $(".linkWrap").toggleClass("linkMobileView");
});


$(document).ready(function () {
  initSite();
  MODEL.initFireBase();
  console.log("init");
});
