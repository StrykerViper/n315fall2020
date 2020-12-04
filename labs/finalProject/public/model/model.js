var MODEL = (function () {
  var _db;
    var userfName = "";
    var userlName = "";
    let displayName = "";
    let gottenDocumentID ="";
  //init firebase app and do user functions
  function initFireBase() {
    

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        console.log("user ", displayName, email, uid);
        // $("#nav nav .linkWrap #logBtnChange").html(`<a class="logInBtn"  href="#" id="logOut">Log out</a>`);
        $("#nav nav .linkWrap").html(`<a id="home" href="#">Home</a>
                <a id="browse" href="#">Browse</a>
                <a id="create" href="#">Create Recipe</a>
                <a id="recipe" href="#">Your Recipes</a>
                <div id="logBtnChange" class="logBtnDiv">
                <a class="logInBtn"  href="#" id="logOut">Log Out</a>
                </div>`);
        _db = firebase.firestore();
      } else {
        console.log("No user");
        $("#nav nav .linkWrap").html(`<a id="home" href="#">Home</a>
                <a id="browse" href="#">Browse</a>
                <a id="login" href="#">Create Recipe</a>
                <div id="logBtnChange" class="logBtnDiv">
                <a class="logInBtn"  href="#" id="login">Log In</a>
                </div>`);
      }
    });
  }




  //user sign up with firebase
  function userSignUp(fName, lName, eMail, pWord) {
      let firstName = fName;
      let lastName = lName;
    firebase
      .auth()
      .createUserWithEmailAndPassword(eMail, pWord)
      .then((result) => {
        alert("User Created");
        console.log(result.user.uid);
        if (result.user){
            result.user.updateProfile({
              // displayName: document.getElementById("nameInput").val()
              displayName: firstName+" "+lastName
  
            });
          }
        
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = errror.message;
        console.log(`error code ${errorCode} Error message ${errorMessage}`);
      });
      
  }



  
  //user sign up
  function signInUser(eMail, pWord) {
    firebase
      .auth()
      .signInWithEmailAndPassword(eMail, pWord)
      .then(() => {
        console.log("User Signed In");
        alert("User Signed In");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`error code ${errorCode} Error message ${errorMessage}`);
      });
  }




  // log out user
  function logOutUser() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User Signed Out");
        alert("User Signed Out");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = errror.message;
        console.log(`error code ${errorCode} Error message ${errorMessage}`);
      });
  }




  //create Recipe data in database
  function createRecipeData(createData) {
    _db
      .collection("recipes")
      .add(createData)
      .then(function (doc) {
       alert("added data and here is the ref No.: ", doc.id);
      });
  }




  //get doc id and use it to get all that docs data
  function displayRecipeDetailPage(docID) {
    // this gets one doc using doc id
    
    _db
      .collection("recipes")
      .doc(`${docID}`)
      .get()
      .then(function (querySnapshot) {
        //  console.log(querySnapshot.data());
        let recipedata = querySnapshot.data();
        // console.log(recipedata);
        console.log(querySnapshot.id)
        $("#content #detailDiv").html(`<div class="descDiv">
                <p class="sideTitle">${recipedata.name}</p>
                <img src="${recipedata.img}" alt="">
                <div class="detailDiv">
                    <h2>Description:</h2>
                    <p>${recipedata.desc}</p>
                    <p class="detailSubTitle" >Total Time:</p>
                    <p>${recipedata.time}</p>
                    <p class="detailSubTitle" >Servings:</p>
                    <p>${recipedata.size}</p>
                </div>
            </div>
            <div class="ingDiv">
                <p class="ingTitle">Ingredients:</p>
                <p>${recipedata.ing1}</p>
                <p>${recipedata.ing2}</p>
                <p>${recipedata.ing3}</p>
                <p>${recipedata.ing4}</p>
                <p>${recipedata.ing5}</p>
                <p>${recipedata.ing6}</p>
                <p>${recipedata.ing7}</p>
                <p>${recipedata.ing8}</p>
                <p>${recipedata.ing9}</p>
                <p>${recipedata.ing10}</p>
            </div>
            <div class="instructDiv">
                <p class="instructTitle">Instructions:</p>
                <p>${recipedata.inst1}</p>
                <p>${recipedata.inst2}</p>
                <p>${recipedata.inst3}</p>
                <p>${recipedata.inst4}</p>
                <p>${recipedata.inst5}</p>
                <p>${recipedata.inst6}</p>
                <p>${recipedata.inst7}</p>
                <p>${recipedata.inst8}</p>
                <p>${recipedata.inst9}</p>
                <p>${recipedata.inst10}</p>
                
            </div>
            <div class="editBtnWrap">
                <button id="${querySnapshot.id}" onclick="editButton(id)" >Edit Recipe</button>
            </div>`
            );
      });
  }
  


  //recipe edit display page
  function RecipeEditPage(gottenDocumentID) {
    // this gets one doc using doc id
    _db
      .collection("recipes")
      .doc(`${gottenDocumentID}`)
      .get()
      .then(function (querySnapshot) {
        //  console.log(querySnapshot.data());
        let recipedata = querySnapshot.data();
        // console.log(recipedata);
        $("#content #editHeader").html(`<div class="editHeader" >Hey ${displayName}, edit your recipe!</div>`)
        $("#content #editForm").html(`<input name="img" class="input" type="text" value="${recipedata.img}">
        <input name="name" class="input" type="text" value="${recipedata.name}">
        <input name="desc" class="input" type="text" value="${recipedata.desc}">
        <input name="time"  class="input" type="text" value="${recipedata.time}">
        <input name="size" class="input" type="text" value="${recipedata.size}">
    <!-- </div> -->
    <div class="recipeIngredWrap">
        <p>Enter Ingredients:</p>
        <input name="ing1" id="ingred1" class="input" type="text" value="${recipedata.ing1}">
        <input name="ing2" id="ingred2" class="input" type="text" value="${recipedata.ing2}">
        <input name="ing3" id="ingred3" class="input" type="text" value="${recipedata.ing3}">
        
    </div>
    <div class="inputWrap">
        <input class="addBtn" id="addIngredients" type="button" value="+">
    </div>

    <div class="recipeInstructWrap">
        <p>Enter Instructions:</p>
        <input name="inst1" id="instruct1" class="input" type="text" value="${recipedata.inst1}">
        <input name="inst2" id="instruct2" class="input" type="text" value="${recipedata.inst2}">
        <input name="inst3" id="instruct3" class="inputWBtn" type="text" value="${recipedata.inst3}">
       
    </div>
    <div class="inputWrap">
        <input class="addBtn" id="addInstruction" type="button" value="+">
    </div>
    
    <div class="editBtnWrap">
        <input id="editRecipeBtn" class="editBtn" type="button" value="Submit Changes">
    </div>`);
      });
  }

  function editRecipeData(editedData){
    console.log(docID);
    console.log(editedData);
    _db.collection("recipes")
    .doc(`${docID}`)
    .set(editedData)
    .then(function(doc){
      alert("Recipe Edited", doc);
    }).catch(function(error)  {
      alert("error" , error)
    })
  }

  function deleteRecipeData(docID){
    _db.collection("recipes").doc(`${docID}`).delete().then(function() {
        alert("Deleted Recipe");
        
       }).catch(function(error) {
        console.error("Error Deleting ", error);
      });
  }

  var _getView = function (viewName) {
    $.get(`views/${viewName}.html`, function (home) {
      console.log(`${viewName}`);
      $("#content").html(home);

      
      if (viewName == "create") { // if viewname is create then add listeners that add form inputs
        //dynamically display display name if created
        $("#content #createHeader").html(`<div class="createHeader">Hey ${displayName} , Create your recipe!</div> `);
        let ingredNumber = 4;
        let instructNumber = 4;
        $("#content #addIngredients").click((e) => {
          console.log("add ingred");

          $("#content .recipeIngredWrap")
            .append(`<input name="ing${ingredNumber}" id="ingred${ingredNumber}" 
                    class="input" type="text" 
                    value="Ingredient #${ingredNumber}">`);
          ingredNumber++;
        });

        $("#content #addInstruction").click((e) => {
          console.log("add Instruction");
          $("#content .recipeInstructWrap")
            .append(`<input name="inst${instructNumber}" id="instruct${instructNumber}" 
                    class="input" type="text" 
                    value="Instruction #${instructNumber}">`);
          instructNumber++;
        });
      }
    });



    //if view is your recipe then get and display recipes
    if (viewName == "recipe") {
        
      let itemNum = 0;
      // console.log(displayName);
     
      _db
        .collection("recipes")
        .get()
        .then(function (querySnapshot) {
         
          querySnapshot.forEach(function (doc) {
            itemNum++;
            // gottenDocumentID = doc.id;
            console.log(doc.id);
            
            // console.log(gottenDocumentID);
            // console.log(doc.data(), doc.id);
            // console.log(doc.data().name);
            $("#content #yourRecipeHeader").html(`<div class="yourHeader">Hey ${displayName} , here are your recipes!</div> `);
            $("#content #gridWrap").append(`<div id="recipeId${itemNum}" class="gridItem">
                    <div class="itemTopWrap">
                      <div class="itemImgDiv">
                        <img class="itemImg" src="${doc.data().img}" alt="" />
                        
                        <button id="${
                          doc.id
                        }" onclick="viewButton(id)"  type="submit" class="viewBtn">View</button>
                        
                      </div>
                      <div class="itemDetailsDiv">
                        <div class="detailHeader">${doc.data().name}</div>
                        <div class="detailPara">
                        ${doc.data().desc}
                        </div>
                        <div class="timerWrap">
                          <div class="icon">
                            <img src="../images/time.svg" alt="" />
                          </div>
                          <div class="detail">${doc.data().time}</div>
                        </div>
                        <div class="servingsWrap">
                          <div class="icon">
                            <img src="../images/servings.svg" alt="" />
                          </div>
                          <div class="detail">${doc.data().size}</div>
                        </div>
                      </div>
                    </div>
                    <div class="btnWrap">
                      <button id="${doc.id}" onclick="editButton(id)">Edit Recipe</button>
                      <button id="${doc.id}" onclick="deleteButton(id) ">Delete</button>
                    </div>
                  </div>`);
                  
          });
        });
    }



    //if edit page a load display with variables in value positions and allow addons
    if (viewName == "edit") {
      //dynamically display display name if created
      $("#content #editHeader").html(`<div class="editHeader">Hey ${displayName} , Create your recipe!</div> `);
      let ingredNumber = 4;
      let instructNumber = 4;
      let itemNum = 0;
      $("#content").on("click" , "#addIngredients", function (e){
        console.log("add ingred");
        $("#content .recipeIngredWrap")
          .append(`<input name="ing${ingredNumber}" id="ingred${ingredNumber}" 
                  class="input" type="text" 
                  value="Ingredient #${ingredNumber}">`);
        ingredNumber++;
      })
     
      $("#content").on("click", "#addInstruction", function(e){
        console.log("add instruc");
        $("#content .recipeInstructWrap")
        .append(`<input name="inst${instructNumber}" id="instruct${instructNumber}" 
                class="input" type="text" 
                value="Instruction #${instructNumber}">`);
      instructNumber++;
      })
      
      console.log(docID);
      _db
        .collection("recipes")
        .doc(`${docID}`)
        .get()
        .then(function (querySnapshot) {
          let editdata = querySnapshot.data();
            itemNum++;
            // console.log(editdata);
            // console.log(doc.data(), doc.id);
            // console.log(querySnapshot.data().name);
            $("#content #yourRecipeHeader").html(`<div class="yourHeader">Hey ${displayName} , here are your recipes!</div> `);
            $("#content #gridWrap").append(`<div id="recipeId${itemNum}" class="gridItem"> </div>`);
          
        });
    }

    
  };
  return {
    initFireBase,
    userSignUp,
    signInUser,
    logOutUser,
    createRecipeData,
    displayRecipeDetailPage,
    RecipeEditPage,
    editRecipeData,
    deleteRecipeData,
    getView: _getView,
    db: _db,
  };
})();
