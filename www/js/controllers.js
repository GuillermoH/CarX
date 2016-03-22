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

		if(user.username=='demo@carx.com' && user.password=='demo'){
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

.controller('ClientesCtrl', function($scope, ClientesService){/* ESTO ES LO QUE AGREGUE EN LA CLASE! */
    $scope.carros = [];
    $scope.carro = [];
    $scope.input = {};


    function getAllCarros(){
        ClientesService.getCarros().then(function(result){
            $scope.carros = result.data;
        });
    }

    $scope.getProfile = function (id) {

        ClientesService.getCarro(id).then(function(result){
            $scope.carro = result.data;
        });
    }

    $scope.deleteCarro = function (id) {
        ClientesService.deleteCarro(id).then(function(result){
            getAllCarros();
        });
    }

    getAllCarros();
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

