package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.PromoCode;
import beans.User;
import dao.PromoCodeDAO;
import dao.UserDAO;
import enums.Uloga;

@Path("promo")
public class PromoCodeService {
	
	@Context
	ServletContext ctx;
	
	public PromoCodeService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("promoDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("promoDAO", new PromoCodeDAO(contextPath));
		}
	}
	
	
	@POST
	@Path("/addPromoCode/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PromoCode newCode(PromoCode code) {
		PromoCodeDAO promoDAO = (PromoCodeDAO) ctx.getAttribute("promoDAO");
		return promoDAO.save(code);
	}
}
