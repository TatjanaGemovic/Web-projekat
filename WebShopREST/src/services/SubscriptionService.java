package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Subscription;
import beans.User;
import dao.SubscriptionDAO;
import dao.UserDAO;
import enums.Uloga;

@Path("subscription")
public class SubscriptionService {

	@Context
	ServletContext ctx;
	
	public SubscriptionService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("subsDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("subsDAO", new SubscriptionDAO(contextPath));
		}
	}
	
	@POST
	@Path("/addSubscription/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Subscription newSubscription(Subscription subs) {
		SubscriptionDAO subsDAO = (SubscriptionDAO) ctx.getAttribute("subsDAO");
		return subsDAO.save(subs);
	}
}
