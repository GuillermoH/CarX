// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','backand', 'starter.controllers' , 'starter.services'])

.run(function($ionicPlatform , $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

     $rootScope.authStatus = false;
	 //stateChange event
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		  $rootScope.authStatus = toState.authStatus;
		  if($rootScope.authStatus){


		  }
    });

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

		if(toState.url=='/dashboard'){

			$timeout(function(){
				angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
			},1000);
		}
	});

  $ionicPlatform.registerBackButtonAction(function (event) {
    if ($ionicHistory.currentStateName() === 'someStateName'){
      event.preventDefault();
    } else {
      $ionicHistory.goBack();
    }
  }, 100);

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

//--------------------------------------

 .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signin.html'
      }
    },
	authStatus: false
  })
 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signup.html',
      }
   },
	authStatus: false
  })
//--------------------------------------


  .state('app.dashboard', {
    cache: false,
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
		controller: 'DashCtrl'
      }
     },
	 authStatus: true
  })

  .state('app.ClientProfile', {
    url: '/ClientProfile',
    views: {
      'menuContent': {
        templateUrl: 'templates/ClientProfile.html'
      }
    },
    authStatus: true
  })
  .state('app.ViewRepairs', {
    url: '/ViewRepairs',
    views: {
      'menuContent': {
        templateUrl: 'templates/ViewRepairs.html'
      }
    },
    authStatus: true
  })
  .state('app.EditRepairs', {
    cache: false,
    url: '/EditRepairs',
    views: {
      'menuContent': {
        templateUrl: 'templates/EditRepairs.html'
      }
    },
    authStatus: true
  })

    .state('app.profiles', {
      url: '/profiles',
      views: {
        'menuContent': {
          templateUrl: 'templates/profiles.html',
          controller: 'ProfilesCtrl'
        }
      }
    })

    .state('app.carsview', {    //Agregue ITEM a la lista del menu linkeado a la clase menu.html y controller.js
      cache: false,
      url: '/carsview',
      views: {
        'menuContent': {
          templateUrl: 'templates/CarsView.html',
          controller: 'DashCtrl'
        }
      },
      authStatus: true
    })

    // ---------AGREGADO POR BERNI------------
    .state('app.clientview', {
      cache: false,
      url: '/clientview',
      views: {
        'menuContent': {
          templateUrl: 'templates/ClientView.html',
          controller: 'ClientesCtrl'
        }
      },
      authStatus: true
    })

    .state('app.addClientView',{
      cache: false,
      url: '/addClientView',
      views:{
        'menuContent':{
          templateUrl: 'templates/CreateClient.html',
          controller: 'ClientesCtrl'
        }
      },
      authStatus: true
    })

    .state('app.addRepair',{
      cache: false,
      url:'/addRepair',
      views:{
        'menuContent':{
          templateUrl: 'templates/CreateRepairs.html',
          controller: 'ClientesCtrl'
        }
      },
      authStatus: true
    })

  .state('app.profile', {
    url: '/profile/:profileId',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-detail.html',
        controller: 'ProfileCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})

.config(function (BackandProvider) {
  BackandProvider.setAppName('carx');
  BackandProvider.setAnonymousToken('fb21662b-dabe-4605-b2a1-0a16dbe97294');
});
