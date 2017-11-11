app = angular.module('starter.controllers', ['starter.services'])
var listado = [];
app.controller('ContactoCtrl', function($scope, $http, $state, Contactos) {
  $scope.contactos = [];
  $scope.seleccionado = {};
  var api = Contactos.getApi();
 
  $http({method: 'GET', url: 'https://app.alegra.com/api/v1/contacts/?start=0&limit=10&order_field=name', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: api
    }
  })
    .then(function(response) {
      listado = response.data; 
      $scope.contactos = listado;
    });

  

  $scope.data = { shouldShowDelete:false, shouldShowReorder:false, listCanSwipe:true };
  $scope.contacto = {
                      name:'',
                      identification:'',
                      phonePrimary:'',
                      phoneSecondary:'',
                      fax:'',
                      mobile:'',
                      observations:'',
                      email:'',
                      ignoreRepeated:'false',
                      address:{
                        address:'',
                        city: '' 
                      },
                      cfdiUse:'',
                    };

  $scope.remove = function(contact) {
    
    $http({method: 'DELETE', url: 'https://app.alegra.com/api/v1/contacts/'+contact.id, 
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic am9yZ2Vjb2xtZW5hcmV6ODlAZ21haWwuY29tOmVkMDczNDBkNjRkYTA5Y2FiNzQz'
      }
    })
      .then(function(response) {
         $scope.recargarDatos();
      });

  };

  $scope.guardarContacto = function(){
    
    var req = {
      method: 'POST',
      url: 'https://app.alegra.com/api/v1/contacts/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: api
      },
      data: JSON.stringify($scope.contacto)
     }
     
     $http(req)
      .then(function (response) {
        $scope.contacto = {
          name:'',
          identification:'',
          phonePrimary:'',
          phoneSecondary:'',
          fax:'',
          mobile:'',
          observations:'',
          email:'',
          ignoreRepeated:'false',
          address:{
            address:'',
            city: '' 
          },
          cfdiUse:'',
        };
        $scope.recargarDatos();
        $state.go('tab.contacto');
      })
      .error(function (error) {
        console.log(error)
      });
  }

  $scope.recargarDatos = function(){
    $http({method: 'GET', url: 'https://app.alegra.com/api/v1/contacts/?start=0&limit=10&order_field=name', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: api
      }
    })
    .then(function(response) {
      $scope.contactos = response.data;
    });
  }

  $scope.doRefresh = function(){
    $http({method: 'GET', url: 'https://app.alegra.com/api/v1/contacts/?start=0&limit=10&order_field=name', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: api
    }
  })
    .then(function(response) {
      $scope.contactos = response.data;
      $scope.$broadcast('scroll.refreshComplete'); 
    });
    
  }

  $scope.loadMore = function(){
    var limit;
    limit =  ($scope.contactos.length + 10);
    $http({method: 'GET', url: 'https://app.alegra.com/api/v1/contacts/?order_field=name&start=0&limit='+limit, 
      headers: {
        'Content-Type': 'application/json',
        Authorization: api
      }
    })
    .then(function(response) {
      $scope.contactos = response.data;
      $scope.$broadcast('scroll.infiniteScrollComplete'); 
    });
  }

  /* $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  }) */
})

app.controller('ContactoDetalleCtrl', function($scope, $http, Contactos, $stateParams) {
  var id = parseInt($stateParams.contactoId);
  var api = Contactos.getApi();
  $http({method: 'GET', url: 'https://app.alegra.com/api/v1/contacts/'+id, 
    headers: {
      'Content-Type': 'application/json',
      Authorization: api
    }
  })
  .then(function(response) {
    $scope.contact = response.data;
  });
})

