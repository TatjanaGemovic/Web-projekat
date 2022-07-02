package services;

import java.time.LocalDateTime;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Workout;
import beans.WorkoutHistory;
import dao.UserDAO;
import dao.WorkoutDAO;
import dao.WorkoutHistoryDAO;

@Path("workoutHistory")
public class WorkoutHistoryService {

	@Context
	ServletContext ctx;
	
	public WorkoutHistoryService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("workoutHistoryDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
	    	UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
	    	WorkoutDAO workoutDAO = (WorkoutDAO) ctx.getAttribute("workoutDAO");
			ctx.setAttribute("workoutHistoryDAO", new WorkoutHistoryDAO(contextPath, userDao.getAllUsers(), workoutDAO.getAllWorkouts()));
		}
	}
	
	@GET
	@Path("/allWorkoutsHistory")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<WorkoutHistory> getAll() {
		WorkoutHistoryDAO workoutHistoryDAO = (WorkoutHistoryDAO) ctx.getAttribute("workoutHistoryDAO");
		return workoutHistoryDAO.findAll();
	}
	
	@GET
	@Path("/allWorkoutsHistoryForCustomer/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<WorkoutHistory> getAllWorkoutsHistoryForCustomer(@PathParam("name") String name) {
		WorkoutHistoryDAO workoutHistoryDAO = (WorkoutHistoryDAO) ctx.getAttribute("workoutHistoryDAO");		
		return workoutHistoryDAO.findAllWorkoutsHistoryForCustomer(name);
	}
	
	@POST
	@Path("/addWorkoutHistory/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public WorkoutHistory newWorkoutHistory(WorkoutHistory workout) {
		WorkoutHistoryDAO workoutHistoryDAO = (WorkoutHistoryDAO) ctx.getAttribute("workoutHistoryDAO");
		workout.setId("1");
		workout.setVremePrijave(LocalDateTime.now());
		return workoutHistoryDAO.save(workout);
	}
}
