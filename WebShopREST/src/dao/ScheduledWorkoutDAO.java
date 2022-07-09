package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.ScheduledWorkout;
import beans.User;
import beans.Workout;
import enums.WorkoutType;

public class ScheduledWorkoutDAO {

	public Map<Integer, ScheduledWorkout> scWorkouts = new HashMap<>();
	private String path; //tatjana path
	public Collection<User> users1;
	public Collection<Workout> workouts1;
	
	public ScheduledWorkoutDAO(String contextPath, Map<String, User> map, Map<String, Workout> map2) {
		users1 = map.values();
		workouts1 = map2.values();
		loadScWorkouts(contextPath);
		//path = "/Users/tatjanagemovic/Desktop/Web-projekat/WebShopREST/WebContent/scheduledWorkouts.txt";
		path = "C:/Users/User/Desktop/Web Projekat/Web-projekat/WebShopREST/WebContent/scheduledWorkouts.txt";
		calculateIfCanBeCancelled();
	}
	
	private void calculateIfCanBeCancelled() {
		 LocalDate currentDate = LocalDate.now();
		 Period period; 
		 for(ScheduledWorkout w : scWorkouts.values()) {
			 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			 String date = w.getDanOdrzavanja();
			 LocalDate datumOdrzavanja =  LocalDate.parse(date, formatter);
			 period = Period.between(currentDate, datumOdrzavanja);
			 if(period.getDays()>=2 && w.getWorkout().getWorkoutType()==WorkoutType.T_Personal) 
				 w.setCanBeCancelled(true);			 
			 else
				 w.setCanBeCancelled(false);
		 }	
	 }
	
	public Collection<ScheduledWorkout> findAll() {
		return scWorkouts.values();
	}
	
	public Map<Integer, ScheduledWorkout> getAllWorkouts(){
		return scWorkouts;
	}
	
	public ScheduledWorkout save(ScheduledWorkout workout) {
		int Id = 0;
		for(ScheduledWorkout w : scWorkouts.values()) {
			if(w.getId() == Id) {
				Id++;
			}else {
				break;
			}
		}
		workout.setId(Id);
		scWorkouts.put(workout.getId(), workout);
		saveScWorkouts();
		return workout;
	}
	
	public void saveScWorkouts()  {
		PrintWriter out = null;
		try {
			FileWriter w = new FileWriter(path);
			for(ScheduledWorkout u : scWorkouts.values()) {
				String st = u.getId()+";"+u.getUser().getUsername()+";"+u.getWorkout().getNaziv()
				+";"+u.getDanPrijave()+";"+u.getDanOdrzavanja()+";"+u.getStatus();
				w.append(st);
				w.append(System.lineSeparator());
			}
			w.flush();
			w.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (out != null) {
				try {
					out.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #users}.
	 * Klju� je korisni�ko ime korisnika.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadScWorkouts(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/scheduledWorkouts.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					int id = Integer.parseInt(st.nextToken().trim());
					String userId = st.nextToken().trim();
					User user = findByUsername(userId);
					String wrk = st.nextToken().trim();
					Workout work = findByName(wrk);
					
					String danPr = st.nextToken().trim();
					String danOdr = st.nextToken().trim();
					String status = st.nextToken().trim();
					
					scWorkouts.put(id, new ScheduledWorkout(id, user, work, danPr, danOdr, status));
				}
				
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	public User findByUsername(String username) {
		User user=null;
		for(User u : users1) {
			if(u.getUsername().equals(username)) {
				user = u;
				return user;
			}
		}
		return null;
	}
	
	public Workout findByName(String name) {
		Workout w =null;
		for(Workout s : workouts1) {
			if(s.getNaziv().equals(name)) {
				w = s;
				return w;
			}
		}
		return null;
	}
	
	public ScheduledWorkout cancel(Integer naziv) {
		ScheduledWorkout ww = new ScheduledWorkout();
		for(ScheduledWorkout w : scWorkouts.values()) {
			 if(naziv.equals(w.getId())) {
				 ww = w;
				 ww.setStatus("cancelled");
			 }
		}	
		saveScWorkouts();
		return ww;
	}
	
	public Collection<ScheduledWorkout> findAllWorkoutsForUser(String name) {
		Collection<ScheduledWorkout> wrks = new ArrayList<ScheduledWorkout>();
		name = name.replaceAll("_", " ");
		for(ScheduledWorkout w : scWorkouts.values()) {
			if(w.getUser().getUsername().equals(name)) {
				wrks.add(w);
			}
		}
		return wrks;
	}
	
}
