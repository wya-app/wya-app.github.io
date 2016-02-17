'use-strict'

angular.module("WYA-App")
    .controller("cookMapCtrl", function($stateParams, $state, $firebaseArray, BASE_URL, $http, Auth) {
       var self = this;         
 
       this.confirmation = "Is this correct?"
       this.zipCode = $stateParams.zipCode;
       this.address = $stateParams.curAddress;
       
       //map marking 
       var lat = $stateParams.currentLocation.lat;
       var lon = $stateParams.currentLocation.lon;
       
       this.currentLocation = $stateParams.currentLocation;
       
       if(!$stateParams.currentLocation.lat || this.zipCode === "") {
           $state.go('cook-set-time');
       }        
        
       console.log($stateParams);
       
       
       this.ref = new Firebase(BASE_URL +"food/"+ this.zipCode);
       this.locations = $firebaseArray(this.ref);
       
       var current = Auth.getCurrentUser(); 
        
               
       this.saveLocation = function() {
           self.locations.$add({
               lat: lat,
               lng: lon,
               focus: false,
               endDate: current.endDate,
               message: "<h4>"+ current.title + "</h4>\n<b>" + current.description + "<b>"                               
           })
           .then(function(ref){
               console.log(ref.key());
           });
           self.confirmation = "You are now set"
           
        console.log(self.locations.length);
        console.log($firebaseArray(self.ref));
       };
       
       //for the map
        this.center = {
            lat: lat,
            lng: lon,
            zoom: 16
        };
        this.markers = {
            marker1: {
                lat: lat,
                lng: lon,
                focus: false,
                message:"<h4>"+ current.title + "</h4>\n<b>" + current.description + "<b>"
            }             
        };
          
       
        
    })
    
    //try to get hash
    
    
var list = $firebaseArray(ref); 
list.$add({ foo: "bar" }).then(function(ref) { 
    var id = ref.key(); 
    console.log("added record with id " + id); 
    list.$indexFor(id);
 });