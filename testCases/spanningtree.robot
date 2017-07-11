*** Settings ***
Documentation	These tests are designed to verify that the DUT properly initializes all Ports and Spanning Tree Algorithm parameters.  It will verify that all Configuration BPDU values (with the exception of Message Age) are properly initialized, that all Ports initialize to Designated Ports, and that Configuration BPDUs are transmitted on all Designated Ports
Metadata 		Version          	       1.0
...	         	More Info         	       For more information about Robot Framework see http://robotframework.org
...               	Author            	 
...               	Date             	   
...	                Executed At  	       ${HOST}
...		        Test Framework           Robot Framework Python
*** Test Cases ***
Initialization
     Log    Test STP.op.1.1 – Root ID Initialized to Bridge ID
     Log    Test STP.op.1.2 – Root Path Cost Initialized to Zero
     Log    Test STP.op.1.3 – Topology Change and Topology Change Acknowledgement Flags 
     Log    Test STP.op.1.4 – All Ports Initialized to Designated Ports
     Log    Test STP.op.1.5 – Static fields within Configuration BPDUs
     Log    Test STP.op.1.6 – Dynamic fields within Configuration BPDUs
     Sleep    2

Configuration BPDU Reception and Frame Format
     Log     Test STP.op.2.1 – Protocol ID Verification
     Log     Test STP.op.2.2 – Protocol Version ID Verification
     Log     Test STP.op.2.3 – BPDU Type Field Verification
     Log     Test STP.op.2.4 – BPDU Flags Field Verification
     Log     Test STP.op.2.5 – Root ID Field Verification
     Log     Test STP.op.2.6 – Root Path Cost Field Verification
     Log     Test STP.op.2.7 – Bridge ID Field Verification
     Log     Test STP.op.2.8 – Port ID Field Verification
     Log     Test STP.op.2.9 – Message Age Field Verification
     Log     Test STP.op.2.10 – Max Age Field Verification
     Log     Test STP.op.2.11 – Hello Time Field Verification
     Log     Test STP.op.2.12 – Forward Delay Field Verification
     Sleep    2

Root Port Selection Process
     Log     Test STP.op.3.1 – Root Bridge Selection: Root ID Values
     Log     Test STP.op.3.2 – Root Bridge Selection: Root Path Cost Values
     Log     Test STP.op.3.3 – Root Bridge Selection: Bridge ID Values
     Log     Test STP.op.3.4 – Root Bridge Selection: Port ID Values
     Sleep    2
    
Port States
     Log    Test STP.op.4.1 – The Disabled Port State
     Log    Test STP.op.4.2 – The Blocking Port State
     Log    Test STP.op.4.3 – The Listening Port State
     Log    Test STP.op.4.4 – The Learning Port State
     Log    Test STP.op.4.5 – The Forwarding Port State
     Sleep    2

