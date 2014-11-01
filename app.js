(function () {
    'use strict';

    angular.module('dataProtection', [])
        .controller('DataProtectionFormController', ['$scope', function ($scope) {

            // controller logic goe here

        }]);

    $('#download-pdf').click(function (evt) {
        evt.preventDefault();

        var doc = new jsPDF();

        var html = $('#document').html();
        var charmap = [
            ['ș', 's'],
            ['ț', 't'],
            ['ă', 'a'],
            ['â', 'a'],
            ['î', 'i'],
            ['Ș', 'S'],
            ['Ț', 'T'],
            ['Ă', 'A'],
            ['Â', 'A'],
            ['Î', 'I']
        ];
        charmap.forEach(function(pair) {
            html = html.replace(new RegExp(pair[0], 'g'), pair[1]);
        });

        doc.fromHTML(html, 15, 15, {
            'width': 170,
            'elementHandlers': {
                '#editor': function (element, renderer) {
                    return true;
                }
            }
        });
        doc.save('document.pdf');
    });

})();
