package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

import dao.SubscriptionDAO;

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
}
