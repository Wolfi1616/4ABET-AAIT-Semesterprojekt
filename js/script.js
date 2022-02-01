var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $filter, $http) {
    //DEKLARATIONEN
    $scope.inputData = {
        'datum' : new Date(),
        'name' : '',
        'aufstehzeit' : '',
        'schlafzeit' : '',
        'wachzeit' : '',
    };


    $scope.mehrData = [];
    $scope.suche = '';


    // SELECT-OPTIONEN
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
    $scope.schlafzeitInputDaten = [
        {'value' : '18.00', 'placeholder' : '18:00'},
        {'value' : '18.25', 'placeholder' : '18:15'},
        {'value' : '18.50', 'placeholder' : '18:30'},
        {'value' : '18.75', 'placeholder' : '18:45'},        
        {'value' : '19.00', 'placeholder' : '19:00'},
        {'value' : '19.25', 'placeholder' : '19:15'},
        {'value' : '19.50', 'placeholder' : '19:30'},
        {'value' : '19.75', 'placeholder' : '19:45'},
        {'value' : '20.00', 'placeholder' : '20:00'},
        {'value' : '20.25', 'placeholder' : '20:15'},
        {'value' : '20.50', 'placeholder' : '20:30'},
        {'value' : '20.75', 'placeholder' : '20:45'},
        {'value' : '21.00', 'placeholder' : '21:00'},
        {'value' : '21.25', 'placeholder' : '21:15'},
        {'value' : '21.50', 'placeholder' : '21:30'},
        {'value' : '21.75', 'placeholder' : '21:45'},
        {'value' : '22.00', 'placeholder' : '22:00'},
    ]
  
 
    //CRUD
    //CREATE
    $scope.create = function() {
        $http({
            method: "post",
            url: "db/insert.php",
            data: {
                aufstehzeit : parseFloat($scope.inputData.aufstehzeit),
                schlafzeit : parseFloat($scope.inputData.schlafzeit),
                wachzeit : parseFloat($scope.inputData.wachzeit),
                name : $scope.inputData.name,
                datum : $scope.inputData.datum,
            }, 
        }).then(function(response) {
          console.log(response);
        });
    }


    //READ
    $http.get("db/query.php")
    .then(function(response) {
      $scope.mehrData = response.data;
    });

    //UPDATE

    //DELETE


    //DEBUG-FUNCTIONS
    $scope.debug = function() {
        console.log( $scope.mehrData );
    }
    $scope.testlog = function() {
        console.log($scope.data);
    }



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