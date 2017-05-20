angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$location,$rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
$rootScope.Pname=null;
$rootScope.Pcost=0;
$rootScope.Pcost1=0;
$rootScope.Pname1=null;
$rootScope.Total=0;
$rootScope.originalPrice1=0;
$rootScope.originalPrice=0;
$rootScope.quatity1=1;
$rootScope.quatity2=1;
//  $rootScope.selectedvalue = { id: '1' };
//    $rootScope.selectedvalue1 = { id: '1' };
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
  $scope.gotoShippingInfo=function(){
    window.location="#/app/shippingInfo";
  }

    $rootScope.gotoRegister=function(){
      window.location="#/app/register";
       $timeout(function() {
      $scope.closeLogin();
    }, 1000);
    }
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

.controller('EmailCtrl', function($scope, $stateParams,$location,$http) {
  $scope.gotoRegister=function(user){
 $scope.Registerdata=angular.copy(user);
 console.log($scope.Registerdata);
 var data = [{"first_name":$scope.Registerdata.First_Name,
              "last_name":$scope.Registerdata.Last_Name,
              "email":$scope.Registerdata.email,
              "password":$scope.Registerdata.password,
              "phone":$scope.Registerdata.pNo }];
              console.log("data,",data);
    $http({    
    "url" : "http://scanik/apis/register1",
    "method":"post",
    "data":data
  })
  .then(function(result) {

          console.log(result);
            $rootScope.response = result.data;          
            
        },function(error){
          console.log(error);
        });


  window.location="#/app/register";
  }
})
.controller('creditCardCtrl', function($scope, $stateParams,$location) {
  $scope.goToShippingInfo=function(){
  window.location="#/app/shippingInfo";
  }
})
.controller('shippingInfoCtrl', function($scope, $stateParams,$location) {
  $scope.gotoStore=function(){
    window.location="#/app/store";
  }
 
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
.controller('creditDetails2Ctrl', function($scope, $stateParams,$location) { 
})
.controller('storeCtrl', function($scope, $stateParams,$location,$cordovaBarcodeScanner,$http,$rootScope,productservice) {
$rootScope.scanBarcodeTest = function() {  

 $http({
    "method":"get",
    "url" : "http://scanik.com/apis/product?id=610762569327",
    "data":{"id":   610762569327}
  }).then(function(result) {

          console.log(result);
            $rootScope.response = result.data;
             if($rootScope.response[0].pid==1){
              //$rootScope.selectedvalue1.id = '1';    
            $rootScope.Pname=$rootScope.response[0].name;
            $rootScope.Pcost=$rootScope.response[0].original_price;
            $rootScope.originalPrice1=$rootScope.Pcost;
            if(productservice.getProduct().quantity_1)
            {
               if(productservice.getProduct().quantity_1 != undefined)
            {
              $rootScope.quantity1 = 1;
            }
            }
            else{
             if($rootScope.quantity1)
              {
                if($rootScope.quantity1  < 3 ){
                $rootScope.quantity1= $rootScope.quantity1+1;}
              }
              else {
                $rootScope.quantity1 = 1;
            }
          }
          }
          if($rootScope.response[0].pid==2){
            // $rootScope.selectedvalue.id = '1';
            $rootScope.Pname1=$rootScope.response[0].name;
            $rootScope.Pcost1=$rootScope.response[0].original_price;
            $rootScope.originalPrice= $rootScope.Pcost1;
            }
            if(productservice.getProduct())
            {
              if(productservice.getProduct().quantity_2 != undefined)
            {
              $rootScope.quantity2 = 1;
            }
            }
            else{
             if($rootScope.quantity2)
              {
                if($rootScope.quantity2  < 3 )
                  $rootScope.quantity2=$rootScope.quantity2+1;
              }
              else {
                $rootScope.quantity2 = 1;
            }
          }
              //$rootScope.$apply();
            //console.log($rootScope.Pname);
            //console.log($rootScope.Pcost);
            $rootScope.Total= (parseFloat($rootScope.originalPrice1)+parseFloat($rootScope.originalPrice));
             console.log( $rootScope.Total);
            
        },function(error){
          console.log(error);
        });
            window.location="#/app/myCart";
                     
}


        $rootScope.scanBarcode = function() {  
        $cordovaBarcodeScanner.scan().then(function(imageData) {
          $scope.barCodenumber=imageData.text;
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
 
              $http({
    "method":"get",
    "url" : "http://scanik.com/apis/product?id="+ $scope.barCodenumber,
    "data":{"id":   $scope.barCodenumber}
  }).then(function(result) {

          console.log(result);
            $rootScope.response = result.data;
             if($rootScope.response[0].pid==1){
              //$rootScope.selectedvalue1.id = '1';    
            $rootScope.Pname=$rootScope.response[0].name;
            $rootScope.Pcost=$rootScope.response[0].original_price;
            $rootScope.originalPrice1=$rootScope.Pcost;
              if(productservice.getProduct().quantity_1)
            {
              $rootScope.quantity1 = 1;
            }
            else{
             if($rootScope.quantity1)
              {
                if($rootScope.quantity1  < 3 ){
                $rootScope.quantity1= $rootScope.quantity1+1;}
              }
              else {
                $rootScope.quantity1 = 1;
            }
          }
          }
          if($rootScope.response[0].pid==2){
            // $rootScope.selectedvalue.id = '1';
            $rootScope.Pname1=$rootScope.response[0].name;
            $rootScope.Pcost1=$rootScope.response[0].original_price;
            //$rootScope.originalPrice= $rootScope.Pcost1;
             if($rootScope.quantity2)
              {
                 if($rootScope.quantity2  < 3 ){
                $rootScope.quantity2= $rootScope.quantity2+1;}
              }
              else {
                $rootScope.quantity2 = 1;
              }
                     $rootScope.originalPrice=$rootScope.Pcost1*$rootScope.quantity2;
              productservice.setProduct({"quantity_2":$rootScope.quantity2});
            }
            //console.log($rootScope.Pname);
            //console.log($rootScope.Pcost);
            $rootScope.Total= (parseFloat($rootScope.originalPrice1)+parseFloat($rootScope.originalPrice));
             console.log( $rootScope.Total);
            
        },function(error){
          console.log(error);
        });
         
        if(imageData.cancelled==0){

            window.location="#/app/myCart";
            }           
         
        

        }
        , function(error) {
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
      $rootScope.$watch("quantity2",function(n,o){
               $rootScope.originalPrice=$rootScope.Pcost1*n;
                     $rootScope.Total= (parseFloat($rootScope.originalPrice1)+parseFloat($rootScope.originalPrice));

      })
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
.controller('orderSummaryCtrl', function($scope, $stateParams,$cordovaBarcodeScanner,$location,$rootScope,productservice) {
   $scope.gotoPaymentMethod=function(){
    window.location="#/app/paymentMethod";
  }
  //debugger;
console.log("ps",productservice);
try{
$rootScope.quantity1= productservice.getProduct().quantity_1;
  $rootScope.quantity2= productservice.getProduct().quantity_2;
}
catch(e){

}
 //console.log ("qiuant",productservice.getProduct());
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
.service("productservice",function(){
  var product;
  return {
    "setProduct" : function(obj){
      product = obj;
    },
    "getProduct" : function(){
      return product;
    },
  }
})
.controller('myCartCtrl', function($scope, $stateParams,$location,$cordovaBarcodeScanner,$http,$rootScope,productservice) {
  //Take this code out later by calling this in storeCtrl

$rootScope.update1=function(value){

    $rootScope.quatity1=value;
    $rootScope.originalPrice1=$rootScope.Pcost;
     $rootScope.originalPrice1=$rootScope.Pcost*$rootScope.quatity1;
     $rootScope.Total= (parseFloat($rootScope.originalPrice1)+parseFloat($rootScope.originalPrice));
      productservice.setProduct({"quantity_1":$rootScope.quatity1});
     console.log("in set",productservice.getProduct());
    
  }
  $rootScope.update=function(value){
    //console.log(value);
    //debugger;
   // $rootScope.quantity2=value;
    $rootScope.originalPrice=$rootScope.Pcost1;
      $rootScope.originalPrice=$rootScope.Pcost1*value;
      $rootScope.Total= (parseFloat($rootScope.originalPrice1)+parseFloat($rootScope.originalPrice));
       console.log($rootScope.originalPrice);
    console.log($rootScope.Pcost1);
     productservice.setProduct({"quantity_2":$rootScope.quatity2});
     console.log("in set",productservice.getProduct());
  }


 $rootScope.DeleteProduct1=function(){ 
  var r= confirm("Are you sure want to remove this item?");
  if(r==true){
    $rootScope.Pname=null;
    $rootScope.Total=$rootScope.Total-parseFloat($rootScope.originalPrice1);
    $rootScope.originalPrice1=0;
     //$rootScope.selectedvalue1.id = '1';
  }
 }
 $rootScope.DeleteProduct2=function(){
   var k=confirm("Are you sure want to remove this item?");
   if(k==true){
   $rootScope.Pname1=null;
   $rootScope.Total=$rootScope.Total-parseFloat($rootScope.originalPrice);
   $rootScope.originalPrice=0;
  // $rootScope.selectedvalue.id = '1';
 }
 }
   $scope.gotoShippingInfo=function(){
window.location="#/app/shippingInfo2";
  }
})
.controller('recieptCtrl', function($scope, $stateParams) {
  
});

