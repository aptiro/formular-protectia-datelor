(function () {
    'use strict';

    angular.module('dataProtection', [
        'ngStorage',
        'ngQuickDate'
    ]).controller('DataProtectionFormController', function ($scope, $localStorage, $sessionStorage) {

        $scope.$storage = $sessionStorage;

        $localStorage.$default({
            plaintiff: $localStorage.plaintiff || {},
            representative: $localStorage.representative || {},
            operator: $localStorage.operator || {},
            request: $localStorage.request || {},
//            date: $localStorage.date ,
            signature: $localStorage.signature || ''
        });

    });

    $('.forward').click(function (evt) {
        evt.preventDefault();
        var href = $(this).attr('href');
        $('[href="' + href + '"][role=tab]').click();
    });

    $('.download-pdf').click(function (evt) {
        $('form').submit();
    });

    $('form').submit(function (evt) {
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
        charmap.forEach(function (pair) {
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
