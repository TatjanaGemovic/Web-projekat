package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import dao.SportsFacilityDAO;
import dao.UserDAO;
import enums.TipKupca;
import enums.Uloga;

@Path("")
public class LoginService {
	
	@Context
	ServletContext ctx;
	
	public LoginService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("userDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
	    	SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("sportsFacilityDAO");
			ctx.setAttribute("userDAO", new UserDAO(contextPath, sportsFacilityDAO.getAllFacilities()));
		}
	}
	
	@POST
	//@Path("/login{username},{password}")
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
	}
	
	@GET
	@Path("/allUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAll() {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		return userDao.findAll();
	}
	
	@GET
	@Path("/availableManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAvailableManagers() {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		return userDao.getAvailableManagers();
	}
	
	@GET
	@Path("/trainers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getTrainers() {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		return userDao.getTrainers();
	}
	
	@POST
	@Path("/registerKupac/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User newUser(User user) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		user.setUloga(Uloga.Kupac);
		user.setTipKupca(TipKupca.Regularni);
		return userDao.save(user);
	}
	
	@POST
	@Path("/registerMenadzer/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User newMenadzer(User user) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		user.setUloga(Uloga.Menadzer);
		user.setTipKupca(TipKupca.Regularni);
		return userDao.save(user);
	}
	
	@POST
	@Path("/registerTrener/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User newTrener(User user) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		user.setUloga(Uloga.Trener);
		user.setTipKupca(TipKupca.Regularni);
		return userDao.save(user);
	}
	
	@PUT
	@Path("/changeUser/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User changeOne(User user, @PathParam("username") String username) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		return userDao.change(user);
	}
	
	@PUT
	@Path("/deleteUser/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User deleteOne(User user, @PathParam("username") String username) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		return userDao.delete(user);
	}
}
