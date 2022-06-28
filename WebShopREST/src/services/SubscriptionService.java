package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Subscription;
import beans.User;
import dao.SubscriptionDAO;
import dao.UserDAO;
import enums.StatusClanarine;
import enums.TipClanarine;
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
	@Path("/addSubscription/{name}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Subscription newSubscription(User user, @PathParam("name") String name) {
		SubscriptionDAO subsDAO = (SubscriptionDAO) ctx.getAttribute("subsDAO");
		Subscription subs;
		if(name.equals("1")) {
			subs = new Subscription(user.getUsername(), 15, TipClanarine.mesecna, null, null, 23, user, StatusClanarine.aktivna, 15);
		}else if(name.equals("2")) {
			subs = new Subscription(user.getUsername(), 90, TipClanarine.mesecna, null, null, 30, user, StatusClanarine.aktivna, 90);
		}else {
			subs = new Subscription(user.getUsername(), 9000, TipClanarine.godisnja, null, null, 330, user, StatusClanarine.aktivna, 9000);
		}
		user.setClanarina(subs);
		
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		userDao.change(user);
		userDao.saveUsers();
		return subsDAO.save(subs);
	}
}
