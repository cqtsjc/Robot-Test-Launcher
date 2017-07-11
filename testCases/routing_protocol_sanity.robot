*** Settings ***
Documentation	A test suite with test-cases to preform various tests(Conformance, Interoperability, Network Features, Scalabilty) of different routing protocols 
Metadata 		Version          	       1.0
...	         	More Info         	       For more information about Robot Framework see http://robotframework.org
...               	Author            	 
...               	Date             	   
...	                Executed At  	       ${HOST}
...		        Test Framework           Robot Framework Python
*** Test Cases ***
BGP Conformance Tests
    Log    Performing Conformance Tests
BGP Interoperability Tests    
    Log    Performing Interoperability Tests
BGP Network feature Tests
    Log    Performing Network feature Tests
BGP Scalibility Tests     
    Log    Performing Scalabilty Tests
    Sleep    10

OSPF Conformance Tests
    Log    Performing Conformance Tests
OSPF Interoperability Tests    
    Log    Performing Interoperability Tests
OSPF Network feature Tests
    Log    Performing Network feature Tests
OSPF Scalibility Tests     
    Log    Performing Scalabilty Tests
    Sleep    10

EIGRP Conformance Tests
    Log    Performing Conformance Tests
EIGRP Interoperability Tests    
    Log    Performing Interoperability Tests
EIGRP Network feature Tests
    Log    Performing Network feature Tests
EIGRP Scalibility Tests     
    Log    Performing Scalabilty Tests
    Sleep    10
