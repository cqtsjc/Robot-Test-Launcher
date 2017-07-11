*** Settings ***
Documentation	A test suite with test-cases to perform various tests on OSPF
Metadata 		Version          	       1.0
...	         	More Info         	       For more information about Robot Framework see http://robotframework.org
...               	Author            	 
...               	Date             	   
...	                Executed At  	       ${HOST}
...		        Test Framework           Robot Framework Python
*** Test Cases ***

OSPF Conformance Test 
    Log    OSPF Conformance Test

OSPF Route Capacity Test
    Log    OSPF Route Capacity Test

OSPF Route Convergence Test
    Log    OSPF Route Convergence Test

OSPF Topology Scalability Test 
    Log    OSPF Topology Scalability Test

OSPF Equal Cost Path Verification Test
    Log    OSPF Equal Cost Path Verification Test
    Sleep     10
