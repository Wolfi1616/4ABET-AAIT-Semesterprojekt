//NAV-MENU (& TOGGLE SECTIONS)
$('section').css('display', 'none');
$('section').first().css('display', 'block');

var text = $('ul').html();
$('section > h2').each(function () {
    text += '<li ng-click="menu(\'' + $(this).text() + '\')">' + $(this).text() + '</li>';
});
$('ul').html(text);



var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $filter, $http) {

    //DEBUG-FUNCTIONS
    $scope.debug = function() {
        zeitdifferenzBerechnen($('#aufstehzeit').val(), $('#schlafzeit').val());
    }



    //DEKLARATIONEN

    //INPUT-FELDER;
    $scope.aufstehzeit = '';
    $scope.schlafzeit = '';
    $scope.wachzeit = '';
    $scope.datum = '';
    $scope.kind = '';


    //CRUD-OPERATOREN:
    $scope.update = false;


    $scope.mehrData = [];
    $scope.suche = '';

    // NAV-MENU TOGGLES
    $scope.menu = function(activeMenu) {
       $('section').css('display', 'none');
       $('section > h2').each(function() {
           if (activeMenu == $(this).text() ) {
               $(this).parent().css('display', 'block');
           }
       });
    };


    function zeitdifferenzBerechnen(startzeit, endzeit) {
        stunden = endzeit.split(':')[0] - startzeit.split(':')[0];
        minuten = endzeit.split(':')[1] - startzeit.split(':')[1];

        minuten = minuten.toString().length < 2 ? '0' + minuten : minuten;
        if(minuten<0){ 
            stunden--;
            minuten = 60 + minuten;
        }
        stunden = stunden.toString().length < 2 ? '0' + stunden : stunden;

        console.log('Differenz beträgt ' + stunden + ':' + minuten);
        return stunden + ':' + minuten;
    }

    function updateInputValues(type) {
        if (type == 'create') {
            $scope.aufstehzeit = $('#aufstehzeit').val();
            $scope.schlafzeit = $('#schlafzeit').val();
            $scope.datum = $('#datum').val();
            $scope.kind = $('#name').val();
            $scope.wachzeit = zeitdifferenzBerechnen($scope.aufstehzeit, $scope.schlafzeit);
        } else if (type == 'update') {
            console.log('Update');
        }

    }




    //CRUD

    //CREATE
    $scope.create = function() {
        updateInputValues('create');
        $http.post(
            "db/insert.php", {
                aufstehzeit : $scope.aufstehzeit,
                schlafzeit : $scope.schlafzeit,
                wachzeit : $scope.wachzeit,
                datum : $scope.datum,
                kind : $scope.kind,
            })
        .then(function(response) {
          console.log(response);
        });
    };


    //READ
    $scope.read = function() {
        $http.get("db/query.php")
        .then(function(response) {
        $scope.mehrData = response.data;
        });
    }


    //UPDATE
    $scope.update = function() {
        updateInputValues('update');
    }
    //DELETE




/*
    // ALLE OBJEKTE BEIM SEITENAUFRUF LADEN:
    $(document).ready(function() {
        $scope.query();
        //console.log($scope.mehrData);
       // setTimeout($scope.query, 3500);
    });



    //AJAX
    //DATENBANKABFRAGE:
    $scope.query = function() {
        $.ajax({
            url: 'db/query.php',
            type: 'POST',
            success: function(response) {
               // console.log("Success");
               // console.log(response);
               $scope.mehrData = JSON.parse(response);
               console.log($scope.mehrData);
              // return JSON.parse(response);

            },
            error: function(response) {
                console.log("Error");
                console.log(response);
            }
        });    
    }
*/


/*
    $scope.insert = function() {

        // INPUT-VALIDIERUNG: Überprüft ob die [required] inputs ausgefüllt wurden!
        var valid = true;

        $('[required]').each(function() {
            if( $(this).is(':invalid') ) valid = false;
        });
        if (!valid) {
            alert('Bitte fülle alle Formularfelder aus!');
            return;
        };


        // Wachzeit errechnen
        $scope.inputData.wachzeit = parseFloat($scope.inputData.schlafzeit) - parseFloat($scope.inputData.aufstehzeit);
        // Datum umrechnen bzw. ins richtige Format für die DB kriegen!
        $scope.inputData.datum = $filter('date')($scope.inputData.datum, 'yyyy-MM-dd'),

        $.ajax({
            url: 'db/insert.php',
            type: 'POST',
            data: {
                aufstehzeit : parseFloat($scope.inputData.aufstehzeit),
                schlafzeit : parseFloat($scope.inputData.schlafzeit),
                wachzeit : parseFloat($scope.inputData.wachzeit),
                name : $scope.inputData.name,
                datum : $scope.inputData.datum,
            }, 
            success: function(response) {
                console.log("Success");
                //console.log(response);
                //console.log($scope.mehrData);
                //Temporäre Inputdaten zurücksetzen!
                $scope.inputData = {
                    'datum' : new Date(),
                    'name' : '',
                    'aufstehzeit' : '',
                    'schlafzeit' : '',
                    'wachzeit' : '',
                };
                console.log($scope.inputData);

                $scope.query();

            },
            error: function(response) {
                console.log("Error");
                console.log(response);
            }
        });
    };

    */
});