angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$location) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    window.location="#/app/store";


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.service("ContactsService", ['$q', function($q) {

        var formatContact = function(contact) {

            return {
                "displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
                "emails"        : contact.emails || [],
                "phones"        : contact.phoneNumbers || [],
                "photos"        : contact.photos || []
            };

        };

        var pickContact = function() {

            var deferred = $q.defer();

            if(navigator && navigator.contacts) {

                navigator.contacts.pickContact(function(contact){

                    deferred.resolve( formatContact(contact) );
                    console.log(contact);
                });

            } else {
                deferred.reject("Bummer.  No contacts in desktop browser");
            }

            return deferred.promise;
        };

        return {
            pickContact : pickContact
        };
    }])


.controller('RegisterCtrl', function($scope) {

})

.controller('EmailCtrl', function($scope, $stateParams,$location) {
  $scope.gotoCreditcard=function(){
  window.location="#/app/creditCard";
  }
})
.controller('creditCardCtrl', function($scope, $stateParams,$location) {

})
.controller('shippingInfoCtrl', function($scope, $stateParams,$location) {
 
})
.controller("shippingAddressCtrl", ['$scope', 'ContactsService','$rootScope', function($scope, ContactsService,$rootScope,$location) {

    //   $scope.saveShippingAddress=function(user){
    //   $scope.master=angular.copy(user);
    //   localStorage.setItem("shippingAddresses",JSON.stringify($scope.master));
    //   $scope.details=localStorage.getItem("shippingAddresses");
    //   $scope.details=JSON.parse(localStorage.getItem("shippingAddresses"));
    //   console.log($scope.details);
    //  }     
    }])
.controller('creditDetailsCtrl', function($scope, $stateParams,$location) { 
})
.controller('storeCtrl', function($scope, $stateParams,$location,$cordovaBarcodeScanner,$http) {
  $scope.gotoRegister=function(){
 window.location="#/app/register";
  }

$scope.scanBarcode = function() {
   $http.jsonp('http://scanik.com/apis/product?id=036000291452').then(function(result) {
    $scope.Mydata = result.data;
     alert($scope.Mydata.name);
    });    
      //   $cordovaBarcodeScanner.scan().then(function(imageData) {
      //     //$scope.barCodenumber=imageData.text;
      //       console.log("Barcode Format -> " + imageData.format);
      //       console.log("Cancelled -> " + imageData.cancelled);
                 
      //       if(imageData.cancelled==0){
      //       window.location="#/app/myCart";
      //       } 
      //   }, function(error) {
      //       console.log("An error happened -> " + error);
      //   },
      //   { 
      //     preferFrontCamera : true, // iOS and Android
      //     showFlipCameraButton : true, // iOS and Android
      //     showTorchButton : true, // iOS and Android
      //     torchOn: true, // Android, launch with the torch switched on (if available)
      //     prompt : "Scanik.com", // Android
      //     resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      //     formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      //     orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      //     disableAnimations : true, // iOS
      //     disableSuccessBeep: false // iOS
      // }
      
      //   );
     };
  
})
.controller('shippingMethodCtrl', function($scope, $stateParams,$location) {
   $scope.gotoPaymentMethod=function(){
 window.location="#/app/paymentMethod";
  }
  
})
.controller('paymentMethodCtrl', function($scope, $stateParams,$location) {
  $scope.orderSuccess=function(){
    window.location="#/app/reciept";
  }
})
.controller('orderSummaryCtrl', function($scope, $stateParams,$cordovaBarcodeScanner,$location) {
   $scope.gotoPaymentMethod=function(){
    window.location="#/app/paymentMethod";
  }
})
.controller('myordersCtrl', function($scope, $stateParams) {
  
})
.controller('faqCtrl', function($scope, $stateParams) {
  
})
.controller('shippingInfo2Ctrl', function($scope, $stateParams,$location) {
  
})
.controller('paymentCardsCtrl', function($scope, $stateParams) {
  
})
.controller('shippingContactCtrl', function($scope, $stateParams,$location) {
  $scope.gotoOrderSummary=function(){
    window.location="#/app/orderSummary";
  }
  
})
.controller('myCartCtrl', function($scope, $stateParams,$location,$cordovaBarcodeScanner) {
  //Take this code out later by calling this in storeCtrl
 $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
            if(imageData.cancelled==0){
            window.location="#/app/myCart";
            } 
        }, function(error) {
            console.log("An error happened -> " + error);
        },
        { 
          preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          prompt : "Scanik.com", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS
      }
      
        );
    };
   $scope.gotoShippingInfo=function(){
window.location="#/app/shippingInfo2";
  }
  $scope.DeleteProduct=function(){
    $scope.removeItems=true;
    alert("Are you sure want to remove this item?");
  }
})
.controller('recieptCtrl', function($scope, $stateParams) {
  
});

