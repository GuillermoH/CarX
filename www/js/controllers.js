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

.controller('ClientesCtrl', function($scope, $location){/* ESTO ES LO QUE AGREGUE EN LA CLASE! */

  $scope.model ={

    clientes:[
      {
        'nombre': 'Bernardo',
        'apellido':'Bello',
        'vehiculo':'EcoSport',
        'año':'2005',
        'placa':'MDX34A'
      },
      {
        'nombre': 'Guillermo',
        'apellido':'Hellmund',
        'vehiculo':'Meru',
        'año':'2005',
        'placa':'VIRGEN'
      },
      {
        'nombre': 'Nelson',
        'apellido':'Candia',
        'vehiculo':'Corola',
        'año':'2008',
        'placa':'WEABO'
      }

    ]
  };

  $scope.debug = function(){
    console.log("El boton ha sido pulsado");
    $location.path('/www/templates/ClientView.html');
    console.log("Ingreso VISTA DE CLIENTES")
  }
});

