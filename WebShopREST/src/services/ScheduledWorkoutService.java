package services;

import java.time.LocalDateTime;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.ScheduledWorkout;
import dao.ScheduledWorkoutDAO;
import dao.UserDAO;
import dao.WorkoutDAO;

@Path("scheduledWorkout")
public class ScheduledWorkoutService {

	@Context
	ServletContext ctx;
	
	public ScheduledWorkoutService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("scWorkoutDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
	    	UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
	    	WorkoutDAO workoutDAO = (WorkoutDAO) ctx.getAttribute("workoutDAO");			
	    	ctx.setAttribute("scWorkoutDAO", new ScheduledWorkoutDAO(contextPath, userDao.getAllUsers(), workoutDAO.getAllWorkouts()));
		}
	}
	
	@GET
	@Path("/allScheduledWorkouts")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<ScheduledWorkout> getAll() {
		ScheduledWorkoutDAO scheduledWorkoutDAO = (ScheduledWorkoutDAO) ctx.getAttribute("scWorkoutDAO");
		return scheduledWorkoutDAO.findAll();
	}
	
	@GET
	@Path("/allScheduledWorkoutsForUser/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<ScheduledWorkout> getAllWorkoutsForFacility(@PathParam("name") String name) {
		ScheduledWorkoutDAO scheduledWorkoutDAO = (ScheduledWorkoutDAO) ctx.getAttribute("scWorkoutDAO");
		return scheduledWorkoutDAO.findAllWorkoutsForUser(name);
	}
	
	@POST
	@Path("/addScheduledWorkout/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ScheduledWorkout newWorkout(ScheduledWorkout workout) {
		ScheduledWorkoutDAO scheduledWorkoutDAO = (ScheduledWorkoutDAO) ctx.getAttribute("scWorkoutDAO");
		workout.setDanPrijave(LocalDateTime.now().toString());
		workout.setId(1);
		return scheduledWorkoutDAO.save(workout);
	}
	
	@PUT
	@Path("/cancelScheduledWorkout/{naziv}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ScheduledWorkout cancelWorkout(@PathParam("naziv") Integer naziv) {
		ScheduledWorkoutDAO scheduledWorkoutDAO = (ScheduledWorkoutDAO) ctx.getAttribute("scWorkoutDAO");
		return scheduledWorkoutDAO.cancel(naziv);
	}
	
}
