var MODEL = (function(){
    var _getView = function(viewName){
        $.get(`../views/${viewName}.html`, function(home){
            console.log(`${viewName}`);
            $('#content').html(home);
        });
    };
    return {
        getView: _getView
    }
})();