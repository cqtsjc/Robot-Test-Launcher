var NOS = angular.module('NOS', []);

NOS.controller('NOSController', function($scope,$http)
	{
    $scope.testbedshow=false;
    $scope.availableshow = false;
    $scope.imageshow= false;
    $scope.TBstatus = "";
    $scope.TBList = [];
    $scope.valChangedPT = false;
    $scope.dataPT = {selectedPT: ""};
    $scope.valChangedTB = false;
    $scope.dataTB = {selectedTB: ""};
    $scope.imageloc = "";
    $scope.resdata = "";
    $scope.requestStatus = "";
    $scope.dataPT.selectedPT="None";
    $scope.CurrentDate = "";
    $scope.comments = "";
    $scope.Comnts = "";
    $scope.TBuser = "";
    $scope.TestStart = "";
    $scope.TestEnd = "";
    $scope.baseURL = "http://localhost:8080/SR_Server5/rest/";
    
// HTTP GET request to get the list of available protocol suites
    $http.get($scope.baseURL + "getTBMap")
      .then(function successCallback(response)
	   {
         $scope.protocols = Object.keys(response.data.TestBedMap);
	   },
	    function errorCallback(response)
		{
		    $scope.dataPT.selectedPT="GET Request Failed";
            $scope.requestStatus = "Error occured during http GET" ;
		    $scope.resdata	= Response.data;
		    $scope.statusval = Response.status;
		    $scope.statustext = Response.statusText;
		    $scope.headers = Response.headers();
		});
    
// Functions for selecting Protocol
    $scope.PTtoggle = function() {
        if (!$scope.valChangedPT) {
        	$scope.testbedshow= false;
            $scope.imageshow= false;
        	$scope.availableshow = false;
            $scope.TBstatus = "";
        	$scope.dataPT.selectedPT="None";
        	$scope.dataTB.selectedTB="None";
	        $scope.statusval = "";
	    	$scope.statustext = "";
	    	$scope.headers = "";
	    	$scope.requestStatus = "";
         }
        $scope.valChangedPT = false;
      };
    $scope.PTchangefn = function(){
  	$scope.requestStatus = "";
    $scope.statusval = "";
	$scope.statustext = "";
	$scope.headers = "";
    $scope.valChangedPT = true;
    $scope.dataTB.selectedTB="None";
    $scope.availableshow = false;
    $scope.testbedshow= true;
    $http.get($scope.baseURL + "getTBMap").then(function successCallback(response)
		   {
			$scope.TBList= response.data.TestBedMap[$scope.dataPT.selectedPT];
			$scope.TestExecutionTime = response.data.SuiteExecutionTime[$scope.dataPT.selectedPT]
			$scope.errorPoint = "" ;
	        $scope.resdata	= "";
	        $scope.statusval = Response.status;
	        $scope.statustext = "";
	        $scope.headers = Response.headers();
		   },
		   function errorCallback(response)
		   {
		        $scope.dataPT.selectedPT="GET Request Failed";
		        $scope.requestStatus = "Failure";
		    	$scope.errorPoint = "[In Protocol Selection Function]Error occured during http GET" ;
		    	$scope.resdata	= Response.data;
		    	$scope.statusval = Response.status;
		    	$scope.statustext = Response.statusText;
		    	$scope.headers = Response.headers();
           });
      };
     
// Functions for selecting Testbed
      $scope.TBtoggle = function(){
      if (!$scope.valChangedTB) {
              $scope.imageshow= false;
          	  $scope.availableshow = false;
              $scope.TBstatus = "";
          	  $scope.dataTB.selectedTB="None";
	    	  $scope.requestStatus = "";
	          $scope.statusval = "";
	    	  $scope.statustext = "";
	    	  $scope.headers = "";
           }
          $scope.valChangedTB = false;
        };
      $scope.TBchangefn = function(){
      $scope.valChangedTB = true;
      $scope.imageshow= true;
      $scope.availableshow = true;
	  $scope.responsetext = "";
  	  $scope.requestStatus = "";
      $scope.statusval = "";
	  $scope.statustext = "";
	  $scope.headers = "";
	  $http.get($scope.baseURL + "getTBMap").then(function successCallback(response)
	     {
         $scope.TBstatus = response.data.TestBed[$scope.dataTB.selectedTB]["Status"];
         if ($scope.TBstatus === "Reserved")
          	 {
           	 $scope.TBuser = response.data.TestBed[$scope.dataTB.selectedTB]["User"]
             $scope.TestStart = response.data.TestBed[$scope.dataTB.selectedTB]["StartTime"]
           	 $scope.TestEnd = response.data.TestBed[$scope.dataTB.selectedTB]["EndTime"]
             $scope.Comnts = response.data.TestBed[$scope.dataTB.selectedTB]["Comments"]
          	 $scope.errorPoint = "" ;
        	 $scope.resdata	= "";
        	 $scope.statusval = Response.status;
        	 $scope.statustext = "";
         	 $scope.headers = Response.headers();
           	 }
         else
           	 {
           	 $scope.TBuser = "";
           	 $scope.TestStart = "";
           	 $scope.TestEnd = "";
           	 $scope.Comnts = "";
           	}
         },
         function errorCallback(response)
		     {
		   	 $scope.requestStatus="Failure";
			  });
        };
                
// Function to reserve testbed
        $scope.reserveTB = function(){
        var chosenTB = {
        			TestBed: $scope.dataTB.selectedTB,
	    			state  : "Reserved",
	   				TBUsername : $scope.myName,
	   				TStart : "",
	   				TEnd : "",
	   				Comments : $scope.comments
	   				};
        if ($scope.TBstatus === "Reserved"){
		   	$scope.requestStatus = "Failure";
		   	$scope.errorPoint = "While reserving";
		   	$scope.resdata	= "Action Forbidden";
		   	$scope.statusval = "";
		   	$scope.statustext = "";
   		   	$scope.responsetext = "You cannot reserve a testbed which is already Reserved";
		   	$scope.headers = "";
        }
        else{
        	$http.post($scope.baseURL + 'setTBStatus', chosenTB, 
    				{headers: {'Content-Type': 'application/json',
    		    	'Access-Control-Allow-Origin': '*',
    		    	'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
    		    	'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE'}})
    	    .then( function successCallback(Response)
    	    {
    	  	if (Response.data){
    	    		$scope.requestStatus = Response.data;
    		    	};
    	   	$http.get($scope.baseURL + "getTBMap").then(function successCallback(response)
    		   {
    	               $scope.TBstatus = response.data.TestBed[$scope.dataTB.selectedTB]["Status"];
    	  	           $scope.TestStart = response.data.TestBed[$scope.dataTB.selectedTB]["StartTime"];
    	               $scope.TestEnd = response.data.TestBed[$scope.dataTB.selectedTB]["EndTime"];
    	               $scope.Comnts = response.data.TestBed[$scope.dataTB.selectedTB]["Comments"];
    	               $scope.TBuser = response.data.TestBed[$scope.dataTB.selectedTB]["User"];
    	               $scope.errorPoint = "" ;
  		    	       $scope.resdata	= "";
  		    	       $scope.statusval = Response.status;
  		    	       $scope.statustext = "";
  		    	       $scope.headers = Response.headers();
    	  	 		   },
    	  	 		   function errorCallback(response)
    	  	 			{
    	  			    	 $scope.requestStatus="Failure";
    	  	 			});
    		    },
    		    function errorCallback(Response)
    		    {
    		    	$scope.requestStatus = "Failure";
    		    	$scope.errorPoint = "[In reserve function]Error occured during http post:";
    		    	$scope.resdata	= Response.data;
    		    	$scope.statusval = Response.status;
    		    	$scope.statustext = Response.statusText;
    		    	$scope.headers = Response.headers();
    		    });
        	}
        };
        
// Function to release testbed
        $scope.releaseTB = function(){
        	var chosenTB = {
        			TestBed: $scope.dataTB.selectedTB,
	    			state  : "Available",
	   				TBUsername : $scope.myName,
	   				TStart : "",
	   				TEnd : "",
	   				Comments : $scope.comments
	    	};
        	$http.post($scope.baseURL + 'setTBStatus', chosenTB, 
	    			{headers: {'Content-Type': 'application/json',
		    	'Access-Control-Allow-Origin': '*',
		    	'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
		    	'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE'}})
		    .then( function successCallback(Response)
		    {
		         if (Response.data){
		    		$scope.requestStatus = Response.data;
		    	};
	        	$http.get($scope.baseURL + "getTBMap").then(function successCallback(response)
	 		   {
	                $scope.TBstatus = response.data.TestBed[$scope.dataTB.selectedTB]["Status"];
 	                $scope.TestStart = response.data.TestBed[$scope.dataTB.selectedTB]["StartTime"];
                	$scope.TestEnd = response.data.TestBed[$scope.dataTB.selectedTB]["EndTime"];
                 	$scope.Comnts = response.data.TestBed[$scope.dataTB.selectedTB]["Comments"];
            	    $scope.TBuser = response.data.TestBed[$scope.dataTB.selectedTB]["User"];
        	        $scope.errorPoint = "" ;
      		    	$scope.resdata	= "";
      		    	$scope.statusval = Response.status;
      		    	$scope.statustext = "";
      		    	$scope.headers = Response.headers();
        	        
	 		   },function errorCallback(response)
	 			{
			    	 $scope.requestStatus="Failure";
	 			});
		    },
		    function errorCallback(Response)
		    {
		    	$scope.requestStatus = "Failure";
		    	$scope.errorPoint = "[In release function ]Error occured during http post:"; 
		        $scope.resdata	= Response.data;
		    	$scope.statusval = Response.status;
		    	$scope.statustext = Response.statusText;
		    	$scope.headers = Response.headers();
		    });
        };

// HTTP request to execute the command
     	$scope.launch = function()
     	    {
     		if ($scope.TBstatus === "Available"){

		    	$scope.requestStatus = "Failure";
		    	$scope.errorPoint = "While Launching";
		    	$scope.resdata	= "Action Forbidden";
		    	$scope.statusval = "";
		    	$scope.statustext = "";
   		    	$scope.responsetext = "Please reserve the testbed before launching the script";
		    	$scope.headers = "";
     		}
     	   else{
		   var dt1  = new Date();
		   $scope.CurrentTime  = dt1.getHours() + ":" + dt1.getMinutes() + ":" + dt1.getSeconds();
		   var dt2 = new Date();
		   dt2.setSeconds(dt1.getSeconds() + $scope.TestExecutionTime);
		   $scope.Expected_Test_Exec_Completion = dt2.getHours() + ":" + dt2.getMinutes() + ":" + dt2.getSeconds();
      		  var chosenTB = {
            			TestBed: $scope.dataTB.selectedTB,
    	    			state  : $scope.TBstatus,
    	   				TBUsername : $scope.myName,
    	   				TStart : $scope.CurrentTime,
    	   				TEnd : $scope.Expected_Test_Exec_Completion,
    	   				Comments : $scope.comments
    	   				};     		   
      		   $http.post($scope.baseURL + 'setTBStatus', chosenTB, 
      	    			{headers: {'Content-Type': 'application/json',
      		    	'Access-Control-Allow-Origin': '*',
      		    	'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      		    	'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE'}})
      		    .then( function successCallback(Response)
      		    {
      		    	if (Response.data)
      		    		$scope.requestStatus = Response.data;
      		    	$http.get($scope.baseURL + "getTBMap").then(function successCallback(response)
      	 	 		   {
      	 	                $scope.TBstatus = response.data.TestBed[$scope.dataTB.selectedTB]["Status"];
      	 	                $scope.TestStart = response.data.TestBed[$scope.dataTB.selectedTB]["StartTime"];
      	                	$scope.TestEnd = response.data.TestBed[$scope.dataTB.selectedTB]["EndTime"];
      	 	 		   },function errorCallback(response)
      	 	 			{
      	 			    	 $scope.requestStatus="Failure";
      	 	 			});
      		    	
      		    },
      		    function errorCallback(Response)
      		    {
      		    	$scope.requestStatus = "Failure";
      		    	$scope.errorPoint = "[In launch Function : TestBedUpdate]Error occured during http post:" ;
      		    	$scope.resdata	= Response.statusDescription;
      		    	$scope.statusval = Response.status;
      		    	$scope.statustext = Response.statusText;
      		    	$scope.headers = Response.headers();
      		    })
      	    	var payload = {
      	    			Protocol: $scope.dataPT.selectedPT,
      	    			Testbed: $scope.dataTB.selectedTB,
      	    			Path : $scope.imageloc
      	    	            };
      	    	$http.post($scope.baseURL + 'execute', payload, 
      	    			{headers: {'Content-Type': 'application/json',
      		    	'Access-Control-Allow-Origin': '*',
      		    	'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      		    	'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE'}})
      		    .then( function successCallback(Response)
      		    {
      		    	if (Response.data){
      		    		$scope.requestStatus = Response.data;
      		    	};
      		    },
      		    function errorCallback(Response)
      		    {
      		    	$scope.requestStatus = "Failure";
      		    	$scope.errorPoint = "[In launch Function : execute]Error occured during http post:" ;
      		    	$scope.resdata	= Response.statusDescription;
      		    	$scope.statusval = Response.status;
      		    	$scope.statustext = Response.statusText;
      		    	$scope.headers = Response.headers();
      		    })
      		    }
     	    };
// Function to set color based on availability of testbed
             $scope.getTrColor = function(TBStatus){
                 switch(TBStatus){
                     case "Reserved": return 'red';
                     case "Available": return 'green';
                     default: return 'yellow';
        }
             }
// Function for sleep
        $scope.sleep = function sleep(milliseconds) {
        	  var start = new Date().getTime();
        	  for (var i = 0; i < 1e7; i++) {
        	    if ((new Date().getTime() - start) > milliseconds){
        	      break;
        	    }
        	  }
        	}
	  });
