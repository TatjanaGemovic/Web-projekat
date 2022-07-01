package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.User;
import beans.Workout;
import dao.UserDAO;
import dao.WorkoutDAO;
import enums.Uloga;

@Path("workout")
public class WorkoutService {

	@Context
	ServletContext ctx;
	
	public WorkoutService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("workoutDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("workoutDAO", new WorkoutDAO(contextPath));
		}
	}
	
	@GET
	@Path("/allWorkouts")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Workout> getAll() {
		WorkoutDAO workoutDAO = (WorkoutDAO) ctx.getAttribute("workoutDAO");
		return workoutDAO.findAll();
	}
	
	@POST
	@Path("/addWorkout/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Workout newWorkout(Workout workout) {
		WorkoutDAO workoutDAO = (WorkoutDAO) ctx.getAttribute("workoutDAO");
		return workoutDAO.save(workout);
	}
}
