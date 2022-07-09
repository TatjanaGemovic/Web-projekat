package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.ScheduledWorkout;
import beans.User;
import beans.Workout;
import beans.WorkoutHistory;

public class WorkoutHistoryDAO {

	public Map<Integer, WorkoutHistory> workouts = new HashMap<>();
	private String path; //tatjana path
	public Collection<User> users1;
	public Collection<Workout> workoutsList;
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public WorkoutHistoryDAO(String contextPath, Map<String, User> map, Map<String, Workout> map2) {
		users1 = map.values();
		workoutsList = map2.values();
		loadWorkoutsHistory(contextPath);
		path = "/Users/tatjanagemovic/Desktop/Web-projekat/WebShopREST/WebContent/workoutsHistory.txt";
		//path = "C:/Users/User/Desktop/Web Projekat/Web-projekat/WebShopREST/WebContent/workoutsHistory.txt";
	}
	
	public Collection<WorkoutHistory> findAll() {
		return workouts.values();
	}
	
	public Map<Integer, WorkoutHistory> getAllWorkoutsHistory(){
		return workouts;
	}
	
	public WorkoutHistory save(WorkoutHistory workout) {
		int Id = 0;
		for(WorkoutHistory w : workouts.values()) {
			if(w.getId() == Id) {
				Id++;
			}else {
				break;
			}
		}
		workout.setId(Id);
		workouts.put(workout.getId(), workout);
		saveWorkoutsHistory();
		return workout;
	}
	
	public void saveWorkoutsHistory()  {
		PrintWriter out = null;
		try {
			FileWriter w = new FileWriter(path);
			for(WorkoutHistory u : workouts.values()) {
				String st = u.getId()+";"+u.getVremePrijave()+";"+u.getKupac().getUsername()
				+";"+u.getWorkout().getNaziv();
				if(u.getTrener() != null) {
					st += ";"+u.getTrener().getUsername();
				}else {
					st += ";null";
				}
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
	private void loadWorkoutsHistory(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/workoutsHistory.txt");
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
					String period = st.nextToken().trim();
					String kupac = st.nextToken().trim();
					User customer = findByUsername(kupac);
					
					String wrk = st.nextToken().trim();
					Workout work = findByName(wrk);

					String trener = st.nextToken().trim();
					User coach = findByUsername(trener);

					workouts.put(id, new WorkoutHistory(id, period, work, customer, coach));
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
		for(Workout s : workoutsList) {
			if(s.getNaziv().equals(name)) {
				w = s;
				return w;
			}
		}
		return null;
	}

	public Collection<WorkoutHistory> findAllWorkoutsHistoryForCustomer(String name) {
		Collection<WorkoutHistory> wrks = new ArrayList<WorkoutHistory>();		
		for(WorkoutHistory w : workouts.values()) {
			if(w.getKupac().getUsername().equals(name)) {
				wrks.add(w);
			}
		}
		return wrks;
	}
}
