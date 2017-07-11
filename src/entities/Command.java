package entities;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.gson.JsonObject;

public class Command {
	public static Response Run(Payload payload) 
    { 
		System.out.println("In Command: Run()");
		JsonObject jsonObject = new JsonObject();
		String basePath = "path/to/github/cloned/repository/";
		String test = "FAIL";
        try 
        { 
        	String cmd = "sh "+basePath+"run/test.sh "+basePath+"testbed/"+payload.Testbed+".json"+" "+basePath+"testCases/"+payload.Protocol+".robot";
        	System.out.println(cmd);
            Process p=Runtime.getRuntime().exec(cmd); 
            p.waitFor(); 
            BufferedReader reader=new BufferedReader(
                new InputStreamReader(p.getInputStream())
            ); 
            String line; 
            while((line = reader.readLine()) != null) 
            { 
                System.out.println(line);
            }
            
            test = "PASS";
            return Response.ok(test)
    				.header("Access-Control-Allow-Origin", "*")
    				.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
    				.header("Access-Control-Allow-Headers", "Content-Type")
    				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD" )
    				.allow("OPTIONS")
    				.build(); 

        }
        catch(IOException e1) { test = "FAIL due to IO exception";
        return Response.status(Status.NOT_FOUND)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
				.header("Access-Control-Allow-Headers", "Content-Type")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD" )
				.allow("OPTIONS")
				.build();} 
        catch(InterruptedException e2) { test = "FAIL due to Keyboard interupt";
        return Response.status(Status.NOT_FOUND)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
				.header("Access-Control-Allow-Headers", "Content-Type")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD" )
				.allow("OPTIONS")
				.build();} 

    }

}