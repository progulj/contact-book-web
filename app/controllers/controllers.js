'use strict';

var contactsController = angular.module('contactsController', []);
/* LIST*/
contactsController.controller('ContactsListCtrl', ['$scope', 'dataService', 'sharedContactProperties','$location',
        function ($scope, dataService, sharedContactProperties,  $location) {

            
    $scope.status;
    $scope.contacts;
   
            $scope.go = function () {
                $location.path('/contact');
            }

    dataService.getContacts()
            .success(function (conts) {
                $scope.contacts = conts;
            })
            .error(function (error) {
                $scope.status = 'Unable to load contacts data: ' + error.message;
            });
    


    $scope.deleteContact= function (id) {
        dataService.deleteContact(id)
        .success(function () {
            $scope.status = 'Deleted Contact! Refreshing contact list.';
            for (var i = 0; i < $scope.contacts.length; i++) {
                var cont = $scope.contacts[i];
                if (cont.id === id) {
                    $scope.contacts.splice(i, 1);
                    break;
                }
            }
            
        })
        .error(function (error) {
            $scope.status = 'Unable to delete contact: ' + error.message;
        });
    };

    $scope.queryContacts= function (search) {
        
        var query = {
                        "query" : search
                    }
        dataService.queryContacts(query)
        .success(function (contacts) {
            $scope.status = 'Retrieved contacts!';
            $scope.contacts = contacts;
        })
        .error(function (error) {
            $scope.status = 'Error retrieving contacts! ' + error.message;
        });
    };
            
            
      $scope.updateContact= function(id){
		
		
		sharedContactProperties.setContactId(id);
		$location.path('/contactupdate');
	};
}]);
/* UPDATE*/
contactsController.controller('ContactsUpdateCtrl', ['$scope', 'dataService','$location','sharedContactProperties',
        function ($scope, dataService, $location,sharedContactProperties) {

    $scope.status;
    $scope.contact;

     var id = sharedContactProperties.getContactId();
            
    dataService.getContact(id)
            .success(function (cont) {
                $scope.contact = cont;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
       
            
            
    $scope.updateContact = function (contact) {

        dataService.updateContact($scope.contact)
          .success(function () {
              $scope.status = 'Updated Contact! Refreshing contact list.';
              $location.path('#contacts');
          })
          .error(function (error) {
              $scope.status = 'Unable to update contact: ' + error.message;
          });
    };

}]);
/* ADD*/
contactsController.controller('ContactsAddCtrl', ['$scope', 'dataService','$location',
        function ($scope, dataService, $location) {

    $scope.status;
    $scope.contact;
            

    $scope.addContact = function (contact) {
        

        dataService.insertContact(contact)
            .success(function () {
                $scope.status = 'Inserted contact! Refreshing contact list.';
                $location.path('#contacts');
            }).
            error(function(error) {
                $scope.status = 'Unable to insert contact: ' + error.message;
            });
        }

}]);