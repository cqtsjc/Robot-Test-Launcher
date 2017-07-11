*** Settings ***
Documentation	A test suite with test-cases to preform various tests(Conformance, Interoperability, Network Features, Scalabilty) of different routing protocols 
Metadata 		Version          	       1.0
...	         	More Info         	       For more information about Robot Framework see http://robotframework.org
...               	Author            	 
...               	Date             	   
...	                Executed At  	       ${HOST}
...		        Test Framework           Robot Framework Python
*** Test Cases ***

BGP Tests
    Log    Performing Conformance Tests
    Log    Performing Interoperability Tests
    Log    Performing Network feature Tests
    Log    Performing Scalabilty Tests

OSPF Tests
    Log    Performing Conformance Tests
    Log    Performing Interoperability Tests
    Log    Performing Network feature Tests
    Log    Performing Scalabilty Tests

EIGRP Tests
    Log    Performing Conformance Tests
    Log    Performing Interoperability Tests
    Log    Performing Network feature Tests
    Log    Performing Scalabilty Tests
    Sleep     10
