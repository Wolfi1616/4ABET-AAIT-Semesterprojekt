//NAV-MENU (& TOGGLE SECTIONS)
$('section').css('display', 'none');
$('section').first().css('display', 'block');

var text = $('ul').html();
$('section').each(function () {
    text += '<li ng-click="routerNavigation(\'' + $(this).attr('menuName') + '\')">' + $(this).attr('menuName') + '</li>';
});
$('ul').html(text);


var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    read();


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
    $scope.id = '';

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
            updateDataVariable();
        } else if (type == 'update') {
            $http.post(
                "db/getDataById.php", {
                    id : id,
                })
            .then(function(response) {
              $scope.formTitle = 'Daten aktualisieren';
              $('#aufstehzeit').val(response.data.aufstehzeit);
              $('#schlafzeit').val(response.data.schlafzeit);
              $('#datum').val(response.data.datum);
              $('#name').val(response.data.kind);
              $('#id').val(response.data.id);
            });            
        } else if (type = 'clear') {
            $('#aufstehzeit').val('');
            $('#schlafzeit').val('');
            $('#datum').val('');
            $('#name').val('');
            $('#id').val('');
        }

    }

    function updateDataVariable() {
        if($scope.updateCondition) {
            $scope.id = $('#id').val();
        } else {
            $scope.id = '';
        }
        $scope.aufstehzeit = $('#aufstehzeit').val();
        $scope.schlafzeit = $('#schlafzeit').val();
        $scope.datum = $('#datum').val();
        $scope.kind = $('#name').val();
        $scope.wachzeit = zeitdifferenzBerechnen($scope.aufstehzeit, $scope.schlafzeit);
    }


    //CRUD-OPERATIONEN:
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
        .then(function() {
            updateInputValues('clear');
            /*Bei größeren Anwendungen könnte man hier bestimmt auch einfach die bereits bestehenden Daten 
            aus der read-funktion um die eingegebenen Daten erweitern 
            (dann muss keine extra DB-Query angewendet werden)!*/
            read();
        });
    };
    //READ
    function read() {
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
        updateDataVariable();
        $http.post(
            "db/update.php", {
                id : $scope.id,
                aufstehzeit : $scope.aufstehzeit,
                schlafzeit : $scope.schlafzeit,
                wachzeit : $scope.wachzeit,
                datum : $scope.datum,
                kind : $scope.kind,
            })
        .then(function() {
            updateInputValues('clear');
            read();
        });
        $scope.redirectAndClear();
    }
    //DELETE
    $scope.delete = function() {
        updateDataVariable();
        $http.post(
            "db/delete.php", {
                id : $scope.id,
            })
        .then(function() {
            updateInputValues('clear');
            read();
        });
        $scope.redirectAndClear();        
    }


    $scope.redirectAndClear = function() {
        $scope.formTitle = 'Daten hinzufügen';
        $scope.updateCondition = false;
        $scope.routerNavigation('Statistik');
        updateInputValues('clear');
    }


});