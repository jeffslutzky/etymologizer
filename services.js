myApp.service('textService', function(){

  this.text = "";

});


myApp.service('etymologyService', function(){

  this.findEtymology = function() {
    for (i = 0; i < entry.length; i++) {
      if (entry[i].et) {
        return entry[i].et;
      }
    };
  };

});
