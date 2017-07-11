*** Settings ***
Documentation	A test suite with test-cases to perform configuration of various L3 Protocols
Metadata 		Version          	       1.0
...	         	More Info         	       For more information about Robot Framework see http://robotframework.org
...               	Author            	 
...               	Date             	   
...	                Executed At  	       ${HOST}
...		        Test Framework           Robot Framework Python
*** Test Cases ***

IP_address configuration
    Log    Configure IPv4 address
    Sleep    2

Protocol configuration
    Log    Configuring RIP
    Log    Configuring OSPF
    Log    Configuring IBGP
    Log    Configuring EBGP
    Log    Configuring EIGRP
    
Protocol Testing 
    Log    Testing Node reachabilityation
    Sleep    20



