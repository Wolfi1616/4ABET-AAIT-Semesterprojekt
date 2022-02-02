//NAV-MENU (& TOGGLE SECTIONS)
$('section').css('display', 'none');
$('section').first().css('display', 'block');

var text = $('ul').html();
$('section').each(function () {
    text += '<li ng-click="routerNavigation(\'' + $(this).attr('menuName') + '\')">' + $(this).attr('menuName') + '</li>';
});
$('ul').html(text);


var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $filter, $http) {

    //DEBUG
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

    //DIVERS
    $scope.data = [];
    $scope.suche = '';
    $scope.formTitle = 'Daten hinzufügen';
    $scope.updateCondition = false;



    // NAV-MENU TOGGLES
    $scope.routerNavigation = function(activeMenu) {
  //  function routerNavigation(activeMenu) {
       $('section').css('display', 'none');
       $('section').each(function() {
           if (activeMenu == $(this).attr('menuName') ) {
               $(this).css('display', 'block');
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



    function updateInputValues(type, id) {
        if (type == 'create') {
            $scope.aufstehzeit = $('#aufstehzeit').val();
            $scope.schlafzeit = $('#schlafzeit').val();
            $scope.datum = $('#datum').val();
            $scope.kind = $('#name').val();
            $scope.wachzeit = zeitdifferenzBerechnen($scope.aufstehzeit, $scope.schlafzeit);
        } else if (type == 'update') {

            console.log('Update ID: ' + id);
            $http.post(
                "db/getDataById.php", {
                    id : id,
                })
            .then(function(response) {
              console.log(response.data);
              $scope.formTitle = 'Daten aktualisieren';
              $('#aufstehzeit').val(response.data.aufstehzeit);
              $('#schlafzeit').val(response.data.schlafzeit);
              $('#datum').val(response.data.datum);
              $('#name').val(response.data.kind);
              //tmpAufstehzeit = response.data.aufstehzeit;
              //$('#schlafzeit').val() = data.schlafzeit;

            });            

        } else if (type = 'clear') {
            $('#aufstehzeit').val('');
            $('#schlafzeit').val('');
            $('#datum').val('');
            $('#name').val('');
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
        $scope.data = response.data;
        });
    }

    //EDIT (VORSTUFE ZU UPDATE ODER DELETE - BEFÜLLT DIE DATEN):
    $scope.edit = function(id) {
        $scope.updateCondition = true;
        $scope.routerNavigation('Dateneingabe');
        updateInputValues('update', id);
    }   

    //UPDATE
    $scope.update = function() {

        //UPDATE FUNKTION FEHLT NOCH!
        $scope.redirectAndClear();
    }
    //DELETE
    $scope.delete = function() {

        // DELETE FUNKTION FEHLT NOCH!
        $scope.redirectAndClear();
    }

    $scope.redirectAndClear = function() {
        $scope.formTitle = 'Daten hinzufügen';
        $scope.updateCondition = false;
        $scope.routerNavigation('Statistik');
        updateInputValues('clear');
    }


});