'use strict';

var contactService = angular.module('contactService', []);

contactService.service('dataService', ['$http', function ($http) {

        var urlBase = 'http://vast-dusk-6274.herokuapp.com//contact';

        this.getContacts= function () {
            return $http.get(urlBase+ '/list');
        };

        this.getContact = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.insertContact = function (cont) {
            return $http.post(urlBase+ '/create', cont);
        };

        this.updateContact = function (cont) {
            return $http.post(urlBase + '/update', cont)
        };

        this.deleteContact = function (id) {
            return $http.delete(urlBase + '/delete/' + id);
        };

        this.queryContacts = function (query) {
            return $http.post(urlBase+ '/query', query);
        };
    }]);

contactService.service('sharedContactProperties', function() {
    var contactId;
 
	
	 var  setContactId = function(value) {
       contactId = value;
  	}

 	 var getContactId = function(){
      return contactId;
  }
    
    return {
        getContactId: getContactId,
        setContactId : setContactId 
    }
});