package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.SportsFacility;
import beans.User;
import dao.SportsFacilityDAO;
import dao.UserDAO;


@Path("facilities")
public class SportsFacilityService {
	@Context
	ServletContext ctx;
	
	public SportsFacilityService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("sportsFacilityDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("sportsFacilityDAO", new SportsFacilityDAO(contextPath));
		}
	}
	
	/*@POST
	@Path("/login/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User loggedUser = userDao.find(user.getUsername(), user.getPassword());
		if (loggedUser == null) {
			return Response.status(400).entity("Invalid username and/or password").build();
			//return null;
		}
		request.getSession().setAttribute("user", loggedUser);
		return Response.status(200).build();
		//return loggedUser;
	}
	
	
	@POST
	@Path("/logout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
	@GET
	@Path("/currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login(@Context HttpServletRequest request) {
		return (User) request.getSession().getAttribute("user");
	}*/
	
	@GET
	@Path("/allFacilities")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<SportsFacility> getAll() {
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("sportsFacilityDAO");
		return sportsFacilityDAO.findAll();
	}
	
	@GET
	@Path("/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public SportsFacility getByName(@PathParam("name") String name) {
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("sportsFacilityDAO");
		name = name.replaceAll("_", " ");
		return sportsFacilityDAO.findByName(name);
	}
	
	@POST
	@Path("/add/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public SportsFacility newFacility(SportsFacility facility) {
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("sportsFacilityDAO");
		return sportsFacilityDAO.save(facility);
	}
	
	@DELETE
	@Path("/deleteFaciltiy/{name}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public SportsFacility deleteFacility(@PathParam("name") String name) {
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("sportsFacilityDAO");
		return sportsFacilityDAO.delete(name);
	}
}
