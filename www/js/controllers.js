angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  //--------------------------------------------
   $scope.login = function(user) {

		if(typeof(user)=='undefined'){
			$scope.showAlert('Por favor completar todos los campos.');
			return false;
		}

		if(user.username=='demo' && user.password=='demo'){
			$location.path('/app/dashboard');
		}else{
			$scope.showAlert('Usuario o clave inválida.');
		}

	};
  //--------------------------------------------
  $scope.logout = function() {   $location.path('/app/login');   };
  //--------------------------------------------
   // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Mensaje de advertencia',
		 template: msg
	   });
	 };
  //--------------------------------------------
})

.controller('ProfilesCtrl', function($scope , Profiles) {
    $scope.profiles = Profiles.all();
})

.controller('ProfileCtrl', function($scope, $stateParams , Profiles) {
	$scope.profile = Profiles.get($stateParams.profileId);
})

.controller('DashCtrl', function($scope, $stateParams , Profiles) {
	$scope.profiles = Profiles.all();
})

.controller('ClientesCtrl', function($scope, $window, ClientesService, idService, statusService){
    $scope.carros = [];
    $scope.profileById = [];
    $scope.phone = [];
    $scope.emails = [];
    $scope.input = {};
    $scope.status;
    $scope.numeros = [];



    $scope.getCarros = function (status){
        console.log('entro en getCarros'+status);
        if (status == 1){
            ClientesService.getAllCarros().then(function(result){
                console.log(result.data);
                $scope.carros = result.data;
            });
        }else if (status == 2){
            ClientesService.getSomeCarros("p").then(function(result){
                $scope.carros = result.data;
            });
        }else if (status == 3){
            ClientesService.getSomeCarros("e").then(function(result){
                $scope.carros = result.data;
            });
        }else if (status == 4){
            ClientesService.getSomeCarros("l").then(function(result){
                $scope.carros = result.data;
            });
        }

    };

    $scope.setStatus = function(status){
        console.log(status);
        statusService.updateStatus(status);

    };

    $scope.getStatus = function(){
        //if(statusService.getStatus().toString() == "p"){
        var stat = statusService.getStatus();
      return stat;
        $scope.getCarros(stat);
    };

    $scope.setId = function(carId){
        idService.updateId(carId);
    };

    $scope.getId = function(){
        return idService.getId();
    };

    $scope.getPhone = function(id){
        ClientesService.getPhone(id).then(function(result){
            $scope.phone = result.data;
        });
    };
    $scope.getEmails = function(id){
        ClientesService.getEmails(id).then(function(result){
            $scope.emails = result.data;
        });
    };

    $scope.getNum = function(){
        ClientesService.getNum().then (function(result){
           $scope.numeros = result.data;
        });
    };


    $scope.getProfile = function (id) {
        console.log("este es el id "+id);
        ClientesService.getProfile(id).then(function(result){
            console.log('entro');
            console.log(result.data);
            $scope.profileById = result.data;
        });
    }

    $scope.deleteCarro = function (id) {
        ClientesService.deleteCarro(id).then(function(result){
            getCarros();
        });
    }
    //
    //getCarros();
})

//---------- Agregado Berni 21/3------------------------ Pop Up CEDULA -----------------------------------

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout, CreateService){
    $scope.data = {};
    $scope.user = {};
    $scope.userStatus;

    $scope.showPopup = function() {
        var cedulaPopup = $ionicPopup.show({

          template:'<input  type = "text" ng-model="user.cedula">',
          title: 'Introduzca su cedula',
          scope:$scope,
          buttons: [{
            text: '<b>Introducir</b>',
            type: 'button-positive',
              onTap:function(){
                  console.log("la ced es:" + $scope.user.cedula);
                    $scope.verifyCed($scope.user.cedula);
              }
          }]
        });
    };

    $scope.verifyCed = function(ced){
        CreateService.verifyCed(ced).then(function(result){
            console.log(result.data);
            if(result.data.length > 0){
                $scope.userStatus = true;
                $scope.user.nombre = result.data[0].pNombre;
                $scope.user.apellido = result.data[0].apellido;
                $scope.user.id = result.data[0].id;
            }else{
                $scope.userStatus = false;
                $scope.user.nombre = null;
                $scope.user.apellido = null;
                $scope.user.id = null;
            }
        });
    };

    $scope.insertClient = function(user){
        console.log(user.nombre+"este el el nombre");
        CreateService.insertClient(user.nombre, user.apellido, user.cedula, user.email, user.telefono, user.modelo, user.placa, user.ano).then(function(result){
            $scope.user.id = result.data[0].id;
        });
    };

    //$scope.getProfileCed = function (ced) {
    //    ClientesService.getProfile(ced).then(function(result){
    //        $scope.profileById = result.data;
    //    });
    //}

})

  //------------------------------ Agregado LeBeeeeeeerns 22/3 --------------------------------------------------------
  .controller('ReparacionesCtrl', function($scope, CreateService, DeleteService){


    /*--------------------------- Agregado por LeBerns 24/3 ---------------------------------------------*/
    $scope.insertRepair = function(rep){
      console.log("La reparacion a insertar es -> "+ rep);
      CreateService.insertRepair(rep, 3); /*--- Parametro id_carro Hardcoded ----*/
    };


    $scope.deleteReparacion = function (rep) {
      DeleteService.removeRepair(rep,1).then(function(result){

      })
      };
    });


