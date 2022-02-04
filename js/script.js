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
        console.log(updateInputValues('validate') );
    }



    /* ------------------------------------------------------------------------
    ---------------------------------------------------------------------------
    ------------------------VARIABLENDEKLARATIONEN-----------------------------
    ---------------------------------------------------------------------------
    -------------------------------------------------------------------------*/  
    $scope.aufstehzeit = '';
    $scope.schlafzeit = '';
    $scope.wachzeit = '';
    $scope.relativeWachzeit = '';
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


    function zeitBerechnen(startzeit, endzeit, format) {
        stunden = endzeit.split(':')[0] - startzeit.split(':')[0];
        minuten = endzeit.split(':')[1] - startzeit.split(':')[1];

        minuten = minuten.toString().length < 2 ? 0 + minuten : minuten;
        stunden = stunden.toString().length < 2 ? 0 + stunden : stunden;

        if(minuten < 0){ 
            stunden--;
            minuten = 60 + minuten;
        }
        if (format == 'zeit') {
            return stunden + ':' + minuten;

        } else if (format == 'relativ') {
            minuten = minuten/60;
            //console.log(minuten);
            //console.log(typeof(parseFloat(stunden + minuten)));

            return parseFloat(100*(stunden+minuten)/24).toFixed(2) + '%';
        }
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
        } else if (type == 'clear') {
            $('#aufstehzeit').val('');
            $('#schlafzeit').val('');
            $('#datum').val('');
            $('#name').val('');
            $('#id').val('');
            updateDataVariable();
        } else if (type == 'validate') {
            console.log($scope.kind);

            if (
                $scope.aufstehzeit == '' ||
                $scope.schlafzeit == '' ||
                $scope.datum == '' ||
                $scope.kind == null
            ) {
                alert('Bitte fülle zuerst alle Felder aus!');
                return false;
            } else {
                return true;
            }
            
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
        $scope.wachzeit = zeitBerechnen($scope.aufstehzeit, $scope.schlafzeit, 'zeit');
        $scope.relativeWachzeit = zeitBerechnen($scope.aufstehzeit, $scope.schlafzeit, 'relativ');
    }



    /* ------------------------------------------------------------------------
    ---------------------------------------------------------------------------
    --------------------------CRUD-OPERATIONEN---------------------------------
    ---------------------------------------------------------------------------
    -------------------------------------------------------------------------*/
    //CREATE
    $scope.create = function() {
        updateInputValues('create');
        if (!updateInputValues('validate')) return;
        $http.post(
            "db/create.php", {
                aufstehzeit : $scope.aufstehzeit,
                schlafzeit : $scope.schlafzeit,
                wachzeit : $scope.wachzeit,
                relativeWachzeit : $scope.relativeWachzeit,
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
        if (!updateInputValues('validate')) return;
        $http.post(
            "db/update.php", {
                id : $scope.id,
                aufstehzeit : $scope.aufstehzeit,
                schlafzeit : $scope.schlafzeit,
                wachzeit : $scope.wachzeit,
                relativeWachzeit : $scope.relativeWachzeit,
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
        if (!confirm('Willst du den Datensatz sicher löschen?') ) return;
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