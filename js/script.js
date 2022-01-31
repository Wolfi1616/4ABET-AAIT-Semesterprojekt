//$(document).ready(function() {
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $filter) {
    //DEKLARATIONEN
    $scope.inputData = {
        'datum' : new Date(),
        'kind' : '',
        //'aufstehzeit' : '',
        'schlafzeit' : '20:00',
        'wachzeit' : '',
    };
    $scope.suche = '';
    $scope.data = [
        {'datum' : '19.01.2022', 'aufstehzeit' : '08', 'schlafzeit' : '20', 'kind' : 'Lena'},
        {'datum' : '19.01.2022', 'aufstehzeit' : '08', 'schlafzeit' : '20', 'kind' : 'Isabella'},    
    ]
    $scope.aufstehzeitInputDaten = [
        {'value' : '07.00', 'placeholder' : '07:00'},
        {'value' : '07.25', 'placeholder' : '07:15'},
        {'value' : '07.50', 'placeholder' : '07:30'},
        {'value' : '07.75', 'placeholder' : '07:45'},
        {'value' : '08.00', 'placeholder' : '08:00'},
        {'value' : '08.25', 'placeholder' : '08:15'},
        {'value' : '08.50', 'placeholder' : '08:30'},
        {'value' : '08.75', 'placeholder' : '08:45'},
        {'value' : '09.00', 'placeholder' : '09:00'},
    ]
  
    console.log($scope.inputData);
    //DEBUG-FUNCTION
    $scope.debug = function() {
        console.log($filter('date')($scope.inputData.datum, 'yyyy-MM-dd') );
    }
    $scope.testlog = function() {
        console.log($scope.data);
    }

    //AJAX
    $(document).ready(function() {
        $.ajax({
            url: 'db/query.php',
            type: 'POST',
            success: function(response) {
                console.log("Success");
                console.log(response);
                $("#responsecontainer").html(response);
            },
            error: function(response) {
                console.log("Error");
                console.log(response);
            }
        });
    })




        $scope.insert = function() {
            // HIER PRÜFEN OB TEXT EINGEGEBEN WURDE
            // Wachzeit errechnen
            $scope.inputData.wachzeit = parseFloat($scope.inputData.schlafzeit) - parseFloat($scope.inputData.aufstehzeit);
            // Datum umrechnen
            $scope.inputData.datum = $filter('date')($scope.inputData.datum, 'yyyy-MM-dd'),
            $.ajax({
                url: 'db/insert.php',
                type: 'POST',
                data: {
                    aufstehzeit : parseFloat($scope.inputData.aufstehzeit),
                    schlafzeit : parseFloat($scope.inputData.schlafzeit),
                    wachzeit : parseFloat($scope.inputData.wachzeit),
                    kind : $scope.inputData.kind,
                    datum : $scope.inputData.datum,
                }, 
                success: function(response) {
                    console.log("Success");
                    console.log(response);
                    //Temporäre Inputdaten zurücksetzen!
                    $scope.inputData = {
                        'datum' : new Date(),
                        'kind' : '',
                        'aufstehzeit' : '07:00',
                        'schlafzeit' : '20:00',
                        'wachzeit' : '',
                    };
                    console.log($scope.inputData);
                },
                error: function(response) {
                    console.log("Error");
                    console.log(response);
                }
            });
        };


    // FUNCTIONS:
    $scope.saveData = function() {
        console.log($scope.inputData);
        $scope.data.push($scope.inputData);
        $scope.inputData = {};
        console.log($scope.inputData);
     };



    //NAV-MENU (& TOGGLE SECTIONS)
    $('section').css('display', 'none');
    $('section').first().css('display', 'block');

    var text = $('ul').html();
    $('section > h2').each(function () {
        text += '<li>' + $(this).text() + '</li>';
    });
    $('ul').html(text);


    $('nav li').on('click', function() {
        var text = $(this).text();
        var section;
        $('h2').each(function() {
            section = $(this).parent();
            if( $(this).text() == text) {
                section.css('display', 'block' );
            } else {
                section.css('display', 'none');
            }
        })
    });
});