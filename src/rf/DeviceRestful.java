package rf;

import entities.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@Path("/")

public class DeviceRestful {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getTBMap")
	public Response findAll(){
		return database.getTBMap();
	}
	
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/setTBStatus")
	public Response TBStatus(TBMapBody chosenTB) 
    { 
		return database.updateTBStatus(chosenTB);
    }
	
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/execute")
	public Response execRobotSuite(Payload payload) 
    {
		return Command.Run(payload);
    }
}