*** Settings ***
Documentation	A test suite with test-cases to perform various tests on BGP 
Metadata 		Version          	       1.0
...	         	More Info         	       For more information about Robot Framework see http://robotframework.org
...               	Author            	 
...               	Date             	   
...	                Executed At  	       ${HOST}
...		        Test Framework           Robot Framework Python
*** Test Cases ***
BGP Featute Tests
     Log    BGP GLOBAL CONFIGURATION 
     Log    EBGP MULTIHOP /  TTL‐SECURITY 
     Log     MAXIMUM -­‐ PREFIX
     Log     UPDATE -­‐ SOURCE
     Log     ROUTE REFLECTOR CLIENT 	
     Log     ROUTE  FILTERING 	
     Log     ROUTE MAPS 	
     Log     BGP COMMUNITIES 	
     Log     MISCELLANEOUS FEATURES
     Sleep   5 

BGP Performance Tests	
     Log     SIMPLE PEERING CONVERGENCE SPEED 
     Log     CONVERGENCE  SPEED	BGP TO FIB
     Log     CONVERGENCE PEER GROUPS 	
     Log     Sleep 5
  	
BGP Scale Tests

      Log    MAX NUMBER OF EBGP PEERS WITH / WITHOUT PASSWORD 
      Log    MAX NUMBER OF IBGP PEERS WITH / WITHOUTPASSWORD
      Log    MAX NUMBER OF BGP ROUTES RECEIVED
      Log    MAX NUMBER OF EBGP ROUTES  RECEIVED AND FORWARDED
      Log    PEER GROUP SCALE
      Sleep    5 	
  
