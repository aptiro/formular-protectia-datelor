(function() {
'use strict';

$('#download-pdf').click(function(evt) {
  evt.preventDefault();

  var doc = new jsPDF();

  doc.fromHTML($('#document').get(0), 15, 15, {
    'width': 170,
    'elementHandlers': {
      '#editor': function(element, renderer) {
        return true;
      }
    }
  });
  doc.save('document.pdf');
});

})();
