function initListeners(){
    $("#nav nav a").click(function (e) {
        var btnID = this.id;
      
        MODEL.getView(btnID)
    })
}
function initSite(){
    $.get("../HW3_INJECT/views/nav.html", function(nav){
        $("#nav").html(nav);
        initListeners();
    });
    $.get("../HW3_INJECT/views/home.html", function(data){
        $("#content").html(data);
    });
    $.get("../HW3_INJECT/views/footer.html",function(data){
        $("#footer").html(data);
    });
}
$(document).ready(function(){
    initSite();
})