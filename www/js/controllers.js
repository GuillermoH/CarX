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

		if(user.username=='' && user.password==''){
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

.controller('ClientesCtrl', function($scope, $window, ClientesService, idService){
    $scope.carros = [];
    $scope.profileById = [];
    $scope.phone = [];
    $scope.emails = [];
    $scope.input = {};


    $scope.getCarros = function (){
        ClientesService.getCarros().then(function(result){
            console.log(result.data);
            $scope.carros = result.data;
        });
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


    $scope.getProfile = function (id) {
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

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout){

  $scope.showPopup = function() {
    $scope.data = {}


    var cedulaPopup = $ionicPopup.show({

      template:'<input type = "text">',
      title: 'Introduzca su cedula',
      scope:$scope,
      buttons: [{
        text: '<b>Introducir</b>',
        type: 'button-positive'
      }]
    });
  }

})

  //------------------------------ Agregado LeBeeeeeeerns 22/3 --------------------------------------------------------
  .controller('ReparacionesCtrl', function($scope, listaReparacionesService){


    $scope.rep = [];

    $scope.getReparacion= function(rep) {
      console.log("Entro en get Rep");
      console.log(rep.reparacion)
      if(rep.reparacion){
        console.log("Entro en el if");
        listaReparacionesService.updateReparacion(rep);
      }
      else{
        alert("Campo vacio");
      }

      };

      $scope.setReparacion = function(rep){/*------------- Jurungar Codigo--------------------------------------*/
        if(!this.rep[0]){
          this.rep[0] = rep;
          console.log("Posicion 0->"+this.rep[0]);
        }
        else{
          this.rep[this.rep.length+1] = rep;
          console.log("Posicion "+this.rep.length+1+"->"+this.rep[this.rep.length+1]);
        }
      }

  })

