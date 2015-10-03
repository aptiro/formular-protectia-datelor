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

        $scope.selectFormtype = function(name) {
            $scope.formType = name;
        };

        $scope.selectFormOperator = function(name) {
            $scope.formOperator = name;
        }

        $scope.goForward = function(evt) {
            evt.preventDefault();
            var href = $(evt.target).attr('href');
            $('[href="' + href + '"][role=tab]').click();
        };

        $scope.downloadPdf = function(evt) {
            setTimeout(function() { $('button[type=submit]').click() }, 0);
        };

        $scope.onSubmit = function() {
            var doc = new jsPDF();

            if(typeof $scope.formOperator !== 'undefined') {
                var html = $('.documentOperator').html();
            } else {
                var html = $('.documentForm').html();
            }
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
        };

    });

})();
