/* ------------------------------------------------------------------------
---------------------------------------------------------------------------
--------------------------MENÜ-INITIALISIERUNG-----------------------------
---------------------------------------------------------------------------
-------------------------------------------------------------------------*/  
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
        console.log($scope.id);
    }



    /* ------------------------------------------------------------------------
    ---------------------------------------------------------------------------
    ------------------------VARIABLENDEKLARATIONEN-----------------------------
    ---------------------------------------------------------------------------
    -------------------------------------------------------------------------*/  
    //INPUT-FELDER --> temporäre variablen für CRUD-Operationen;
    $scope.aufstehzeit = '';
    $scope.schlafzeit = '';
    $scope.wachzeit = '';
    $scope.datum = '';
    $scope.kind = '';
    $scope.id = '';

    //DIVERS --> sonstige Variablen:
    $scope.data = [];
    $scope.suche = '';
    $scope.formTitle = 'Daten hinzufügen';
    $scope.updateCondition = false;



    /* ------------------------------------------------------------------------
    ---------------------------------------------------------------------------
    -------------------------FUNKTIONEN (DIVERS)-------------------------------
    ---------------------------------------------------------------------------
    -------------------------------------------------------------------------*/  
    $scope.routerNavigation = function(activeMenu) {
        //TODO: REMOVE-CLASS FÜR AKTIVES MENÜ-ELEMENT
       $('section').css('display', 'none');
       $('section').each(function() {
           if (activeMenu == $(this).attr('menuName') ) {
               //TODO: ADD-CLASS FÜR AKTIVES MENÜ-ELEMENT
               $(this).css('display', 'block');
           }
       });
    };


    $scope.redirectAndClear = function() {
        $scope.formTitle = 'Daten hinzufügen';
        $scope.updateCondition = false;
        $scope.routerNavigation('Statistik');
        updateInputValues('clear');
    }

    function zeitdifferenzBerechnen(startzeit, endzeit) {
        stunden = endzeit.split(':')[0] - startzeit.split(':')[0];
        minuten = endzeit.split(':')[1] - startzeit.split(':')[1];

        minuten = minuten.toString().length < 2 ? '0' + minuten : minuten;
        stunden = stunden.toString().length < 2 ? '0' + stunden : stunden;

        if(minuten<0){ 
            stunden--;
            minuten = 60 + minuten;
        }

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
            updateDataVariable();
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



    /* ------------------------------------------------------------------------
    ---------------------------------------------------------------------------
    --------------------------CRUD-OPERATIONEN---------------------------------
    ---------------------------------------------------------------------------
    -------------------------------------------------------------------------*/
    //CREATE
    $scope.create = function() {
        //TODO: INPUT-VALIDIERUNG
        updateInputValues('create');
        $http.post(
            "db/create.php", {
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
        $http.get("db/read.php")
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
    $scope.delete = function(id) {
        updateDataVariable();
        if ($scope.id == '' && id) {
            $scope.id = id;
        }
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
});