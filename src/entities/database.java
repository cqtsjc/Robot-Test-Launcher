package entities;

import java.io.File;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.gson.*;

public class database {
	static String TBMapPath = "/path/to/TestbedMap.json";
	 public static Response getTBMap(){
		 JsonObject jsonObject = new JsonObject();
			try {
				File file = new File(TBMapPath);
				if (!file.exists()) {
					return Response.status(Status.NOT_FOUND).build();  
				}
				else {
					 JsonParser parser = new JsonParser();
			         JsonElement jsonElement = parser.parse(new FileReader(TBMapPath));
			         jsonObject = jsonElement.getAsJsonObject();
				}
			} catch (IOException e) { 
		         e.printStackTrace(); 
		      }
					
			return Response.status(201).entity(jsonObject.toString()).build(); 
	 }

	 public static Response updateTBStatus(TBMapBody chosenTB){
		 JsonObject jsonData = new JsonObject();
		 JsonObject jsonTB = new JsonObject();
		 JsonObject jsonchosenTB = new JsonObject();
		 try {
			 JsonParser parser = new JsonParser();
	         JsonElement jsonElement = parser.parse(new FileReader(TBMapPath));
	         jsonData = jsonElement.getAsJsonObject();
	         jsonTB = jsonData.getAsJsonObject("TestBed");
	         jsonchosenTB = jsonTB.getAsJsonObject(chosenTB.TestBed);
	         /*if (((jsonchosenTB.get("Status")).getAsString()).equals("Reserved") && ((chosenTB.state).toString()).equals("Reserved"))
	        	 {
	        	 return Response.status(Status.FORBIDDEN).build();
	        	 }*/
	         jsonchosenTB.addProperty("Status", chosenTB.state);
	         jsonchosenTB.addProperty("User",chosenTB.TBUsername);
	         jsonchosenTB.addProperty("StartTime",chosenTB.TStart);
	         jsonchosenTB.addProperty("EndTime",chosenTB.TEnd);
	         jsonchosenTB.addProperty("Comments",chosenTB.Comments);
	         /*jsonTB.add(chosenTB.TestBed, jsonchosenTB);
	         jsonData.add("TestBed",jsonTB);*/
	        } 
		 catch (FileNotFoundException e) {
				return Response.status(Status.NOT_FOUND).build();
	        }
	     try  {
	    	 FileWriter JSONfile = new FileWriter(TBMapPath);
	    	 
             JSONfile.write(jsonData.toString());
             JSONfile.close();
		     return Response.ok("Successful")
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Headers", "Content-Type")
					.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD" )
					.allow("OPTIONS")
					.build(); 
                }
	     catch (FileNotFoundException e){
	    	System.out.println(e);
	    	return Response.status(Status.NOT_FOUND).build(); 
            	               }
	     catch (IOException e){
	    	System.out.println(e);
		    return Response.status(Status.NOT_FOUND).build(); 
	    	                 }
	 }
}