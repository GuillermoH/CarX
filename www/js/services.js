angular.module('starter.services', [])

.factory('Profiles', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var profiles = [{
    id: 0,
    name: 'Anoop Kumar',
    deseg: 'Team Lead',
    face: 'img/150x165/anoop-kumar.png'
  }, {
    id: 1,
    name: 'Vijay Kumar',
    deseg: 'Project Manager',
    face: 'img/150x165/vijay-kumar.png'
  }, {
    id: 2,
	name: 'Durgesh Soni',
	deseg: 'Team Lead',
    face: 'img/150x165/durgesh-soni.png'
  }, {
    id: 3,
	 name: 'Manish Mittal',
    deseg: 'Project Manager',
    face: 'img/150x165/manish-mittal.png'
  }, {
    id: 4,
	name: 'Vinay Kumar',
	deseg: 'UI Designer',
    face: 'img/150x165/vinay-kumar.png'
  }, {
    id: 5,
	name: 'Ankit Gera',
	deseg: 'System Administrator',
    face: 'img/150x165/ankit-gera.png'
  }];

  return {
    all: function() {
      return profiles;
    },
    remove: function(id) {
      profiles.splice(profiles.indexOf(id), 1);
    },
    get: function(profileId) {
      for (var i = 0; i < profiles.length; i++) {
        if (profiles[i].id === parseInt(profileId)) {
          return profiles[i];
        }
      }
      return null;
    }
  };
})

.service('idService', function() {
  return {
    carId: {},
    getId: function() {
      return this.carId;
    },
    updateId: function(carId) {
      this.carId = carId;
    }
  }
})


.service('ClientesService', function($http, Backand){
  var baseUrl = '/1/objects/';
  var baseUrlQuery = '/1/query/data/';
  var objectName = 'Carro/';

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }
  function getUrlQuery() {
    return Backand.getApiUrl() + baseUrlQuery;
  }

  function getUrlForId(id) {
    return getUrl() + id;
  }

  getCarros = function () {
    //return $http.get('https://api.backand.com/1/query/data/getSome?parameters=%7B%22status%22:%22p%22%7D')
    return $http ({
      method: 'GET',
      url: Backand.getApiUrl() + '/1/query/data/getSome',
      params: {
        parameters: {
          status: 'p'
        }
      }
    });

  };

  getPhone = function(id){
    return $http ({
      method: 'GET',
      url: Backand.getApiUrl() + '/1/query/data/getPhones',
      params: {
        parameters: {
          id: id
        }
      }
    });
  };
  getEmails = function(id){
    return $http ({
      method: 'GET',
      url: Backand.getApiUrl() + '/1/query/data/getEmail',
      params: {
        parameters: {
          id: id
        }
      }
    });
  };

  //getCarros = function(){
  //  console.log("entro");
  //  var url = 'https://api.backand.com/1/query/data/getSome?'+
  //      'parameters=%7B%22status%22:%22p%22%7D'
  //  return $http.get(url)
  //      .then(function(response){
  //        console.log('success', response.data);
  //      }, function(error){
  //        console.log(error);
  //      });
  //};

  getProfile = function(id){
    console.log('entro en geetCarro');
    return $http ({
      method: 'GET',
      url: Backand.getApiUrl() + '/1/query/data/getProfile',
      params: {
        parameters: {
          id: id
        }
      }
    });
  };



  deleteCarro = function (id) {
    return $http.delete(getUrlForId(id));
  };

  return {
    getCarros: getCarros,
    getProfile: getProfile,
    getPhone: getPhone,
    getEmails: getEmails,
    deleteCarro: deleteCarro
  }
});
