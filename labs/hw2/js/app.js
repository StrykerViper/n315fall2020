
function initListeners(){
    $("nav a").click(function () {
        var btnId = this.id;
        console.log(btnId);
        $("#content").load(`${btnId}.html`)
        // MODEL.getPage(btnId)
    })
}


$(document).ready(function () {
    initListeners();
})