'use strict';

/* App Module */

var contactApp = angular.module('contactApp', [
  'ngRoute',
  'contactsController',
  'contactService'
]);

contactApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/contacts', {
        templateUrl: 'partials/contact-list.html',
        controller: 'ContactsListCtrl'
      }).
      when('/contact', {
        templateUrl: 'partials/contact-add.html',
        controller: 'ContactsAddCtrl'
      }).
      when('/contactupdate', {
        templateUrl: 'partials/contact-update.html',
        controller: 'ContactsUpdateCtrl'
      }).
      otherwise({
        redirectTo: '/contacts'
      });
                         
  }]);


contactApp.config(function($httpProvider) {
  /**
   * make delete type json
   */
  $httpProvider.defaults.headers["delete"] = {
    'Content-Type': 'application/json;charset=utf-8'
  };
})

         
