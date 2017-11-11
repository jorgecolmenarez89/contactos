
  var app = angular.module('starter.services', [])
    var apiKey = '';
  app.factory('Contactos', function($http) {
  
    return{
      getApi: function(){
        return apiKey;
      }
    };
    
  });

