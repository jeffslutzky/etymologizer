myApp.service('textService', function(){

  this.text = "";

});


myApp.service('etymologyService', function(){

  this.findEtymology = function(word) {

    if (word.entry_list.entry) { // if word is a real word
      entry = word.entry_list.entry;
      if (entry.length) {
        return this.findCorrectSubEntry();
      } else {
        return entry.et;
      };
    };
  };

  this.findCorrectSubEntry = function() {
    for (i = 0; i < entry.length; i++) {
      if (entry[i].et) {
        return entry[i].et;
      };
    };
  };

});
