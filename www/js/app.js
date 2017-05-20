// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform,$rootScope,$location) {
    $rootScope.gotoMycart=function(){
window.location="#/app/myCart";
  }
  

$rootScope.orderSuccess=function(){
    window.location="#/app/reciept";
  }
   $rootScope.gotoOrderSummary=function(){
    window.location="#/app/orderSummary";
  }
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
     // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
//function which take shipping address id
 $rootScope.gotoShippingAddress=function(id){
    $rootScope.index=id;
    $rootScope.firstName=null;
        $rootScope.lastName=null;
        $rootScope.number=null;
        $rootScope.nickName=null;
        $rootScope.address1=null;
        $rootScope.address2=null;
        $rootScope.address3=null;
        $rootScope.address4=null;

    window.location="#/app/shippingAddress";
  }
  $rootScope.gotoShippingContact=function(id){
    $rootScope.index=id;
    $rootScope.firstName=null;
        $rootScope.lastName=null;
        $rootScope.number=null;
        $rootScope.nickName=null;
        $rootScope.address1=null;
        $rootScope.address2=null;
        $rootScope.address3=null;
        $rootScope.address4=null;

    window.location="#/app/shippingContact";
  }
  //function for saving credit cards
  $rootScope.gotoCreditDetails=function(id1){
        $rootScope.cardIndex=id1;
  window.location="#/app/creditDetails";
}
$rootScope.gotoCreditDetails2=function(id2){
        $rootScope.cardIndex=id2;
  window.location="#/app/creditDetails2";
}
$rootScope.accNumber=null;
$rootScope.expDate=null;
$rootScope.cvv=null;
$rootScope.zipCode=null;
$rootScope.accName=null;
$rootScope.card={};
$rootScope.saveCreditCard=function(card,cardId){
$rootScope.master1=angular.copy(card);
       localStorage.setItem("payCards"+$rootScope.cardIndex,JSON.stringify($rootScope.master1));
        if($rootScope.cardIndex==1)
       {
               $rootScope.card1=JSON.parse(localStorage.getItem("payCards"+$rootScope.cardIndex));
       }
       if($rootScope.cardIndex==2)
       {
               $rootScope.card2=JSON.parse(localStorage.getItem("payCards"+$rootScope.cardIndex));
       }
       if($rootScope.cardIndex==3)
       {
               $rootScope.card3=JSON.parse(localStorage.getItem("payCards"+$rootScope.cardIndex));
       }
        if($rootScope.cardIndex==4)
       {
               $rootScope.card4=JSON.parse(localStorage.getItem("payCards"+$rootScope.cardIndex));
       }
       if($rootScope.cardIndex==5)
       {
               $rootScope.card5=JSON.parse(localStorage.getItem("payCards"+$rootScope.cardIndex));
       }
       if(cardId==1)
       {
    window.location="#/app/creditCard";
       }
       if(cardId==2)
       {
    window.location="#/app/paymentMethod";
       }
}


  //function for saveShippingAddress
   $rootScope.saveShippingAddress=function(fn,ln,nn,mb,a1,a2,a3,a4,a5,a6,addressId){
      var user={
         firstName:fn,
         lastName:ln,
         number:mb,
         nickName:nn,
         address1:a1,
         address2:a2,
         address3:a3,
         address4:a4,
         address5:a5,
       };
       $rootScope.master=angular.copy(user);

       localStorage.setItem("shippingAddresses"+$rootScope.index,JSON.stringify($rootScope.master));
      //  $scope.details=localStorage.getItem("shippingAddresses");
       if($rootScope.index==1)
       {
               $rootScope.details1=JSON.parse(localStorage.getItem("shippingAddresses"+$rootScope.index));
        console.log($rootScope.details1.firstName);
       }
       if($rootScope.index==2)
       {
               $rootScope.details2=JSON.parse(localStorage.getItem("shippingAddresses"+$rootScope.index));
               console.log($rootScope.details2.firstName);
       }
       if($rootScope.index==3)
       {
               $rootScope.details3=JSON.parse(localStorage.getItem("shippingAddresses"+$rootScope.index));
               console.log($rootScope.details3.firstName);
       }
        if($rootScope.index==4)
       {
               $rootScope.details4=JSON.parse(localStorage.getItem("shippingAddresses"+$rootScope.index));
               console.log($rootScope.details4.firstName);
       }
        if($rootScope.index==5)
       {
               $rootScope.details5=JSON.parse(localStorage.getItem("shippingAddresses"+$rootScope.index));
               console.log($rootScope.details5.firstName);
       }
       if($rootScope.index==6)
       {
               $rootScope.details6=JSON.parse(localStorage.getItem("shippingAddresses"+$rootScope.index));
               console.log($rootScope.details6.firstName);
               
       }
   if(addressId==1){
   window.location="#/app/shippingInfo";
   }
   if(addressId==2){
   window.location="#/app/shippingInfo2";
   }
      
     }
//start of pick contact function
   $rootScope.data=null;
        $rootScope.firstName=null;
        $rootScope.lastName=null;
        $rootScope.number=null;
        $rootScope.nickName=null;
        $rootScope.address1=null;
        $rootScope.address2=null;
        $rootScope.address3=null;
        $rootScope.address4=null;
        //$rootScope.address5=null;
        $rootScope.getContact = function() {

            navigator.contacts.pickContact(function(contact){
        console.log('The following contact has been selected:' + JSON.stringify(contact));
        $rootScope.$digest()
        $rootScope.$apply(function(){
        $rootScope.data=contact;
        $rootScope.firstName=contact.name.givenName;
        $rootScope.lastName=contact.name.familyName;
        $rootScope.number=contact.phoneNumbers[0].value;
        $rootScope.address1=contact.addresses[0].streetAddress;
         $rootScope.address2=contact.addresses[0].locality;
         $rootScope.address3=contact.addresses[0].region;
         $rootScope.address4=contact.addresses[0].postalCode;
       // $rootScope.address5=contact.addresses[0].country;
         });
        //console.log($scope.data);
    },function(err){
        console.log('Error: ' + err);
    });
        }
  //End of pick contact function
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.storeLocator', {
    url: '/storeLocator',
    views: {
      'menuContent': {
        templateUrl: 'templates/storeLocator.html'
      }
    }
  })

  .state('app.contactUs', {
      url: '/contactUs',
      views: {
        'menuContent': {
          templateUrl: 'templates/contactUs.html'
        }
      }
    })
    .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })

.state('app.creditCard', {
      url: '/creditCard',
      views: {
        'menuContent': {
          templateUrl: 'templates/creditCard.html',
          controller: 'creditCardCtrl'
        }
      }
    })
    .state('app.shippingInfo', {
      cache: false,      
      url: '/shippingInfo',
      views: {
        'menuContent': {
          templateUrl: 'templates/shippingInfo.html',
          controller: 'shippingInfoCtrl'
        }
      }
    })
    .state('app.shippingAddress', {
      cache: false,
      url: '/shippingAddress',
      views: {
        'menuContent': {
          templateUrl: 'templates/shippingAddress.html',
          controller: 'shippingAddressCtrl'
        }
      }
    })
      .state('app.creditDetails', {
        
      url: '/creditDetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/creditDetails.html',
          controller: 'creditDetailsCtrl'
        }
      }
    })
    .state('app.creditDetails2', {
        
      url: '/creditDetails2',
      views: {
        'menuContent': {
          templateUrl: 'templates/creditDetails2.html',
          controller: 'creditDetails2Ctrl'
        }
      }
    })
    .state('app.store', {
      url: '/store',
      views: {
        'menuContent': {
          templateUrl: 'templates/store.html',
          controller: 'storeCtrl'
        }
      }
    })
       .state('app.shippingMethod', {
      url: '/shippingMethod',
      views: {
        'menuContent': {
          templateUrl: 'templates/shippingMethod.html',
          controller: 'shippingMethodCtrl'
        }
      }
    })
      .state('app.paymentMethod', {
      url: '/paymentMethod',
      views: {
        'menuContent': {
          templateUrl: 'templates/paymentMethod.html',
          controller: 'paymentMethodCtrl'
        }
      }
    })
    .state('app.orderSummary', {
      url: '/orderSummary',
      views: {
        'menuContent': {
          templateUrl: 'templates/orderSummary.html',
          controller: 'orderSummaryCtrl'
        }
      }
    })
    .state('app.faq', {
      url: '/faq',
      views: {
        'menuContent': {
          templateUrl: 'templates/faq.html',
          controller: 'faqCtrl'
        }
      }
    })
     .state('app.myorders', {
      url: '/myorders',
      views: {
        'menuContent': {
          templateUrl: 'templates/myorders.html',
          controller: 'myordersCtrl'
        }
      }
    })
  .state('app.email', {
    url: '/email',
    views: {
      'menuContent': {
        templateUrl: 'templates/email.html',
        controller: 'EmailCtrl'
      }
    }
  })
  .state('app.shippingInfo2', {
    url: '/shippingInfo2',
    views: {
      'menuContent': {
        templateUrl: 'templates/shippingInfo2.html',
        controller: 'shippingInfo2Ctrl'
      }
    }
  })
  .state('app.paymentCards', {
    url: '/paymentCards',
    views: {
      'menuContent': {
        templateUrl: 'templates/paymentCards.html',
        controller: 'paymentCardsCtrl'
      }
    }
  })
    .state('app.myCart', {
    url: '/myCart',
    views: {
      'menuContent': {
        templateUrl: 'templates/myCart.html',
        controller: 'myCartCtrl'
      }
    }
  })
     .state('app.reciept', {
    url: '/reciept',
    views: {
      'menuContent': {
        templateUrl: 'templates/reciept.html',
        controller: 'recieptCtrl'
      }
    }
  })
  .state('app.shippingContact', {
    url: '/shippingContact',
    views: {
      'menuContent': {
        templateUrl: 'templates/shippingContact.html',
        controller: 'shippingContactCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/store');
});
