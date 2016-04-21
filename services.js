myApp.service('textService', function(){

  this.text = "";

});


myApp.service('etymologyService', function(){
  self = this;
  this.findEtymology = function() {
    for (i = 0; i < entry.length; i++) {
      if (entry[i].et) {
        return entry[i].et;
      }
    };
  };
});
