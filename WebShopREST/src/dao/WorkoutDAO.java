package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.SportsFacility;
import beans.Subscription;
import beans.User;
import beans.Workout;
import enums.TipKupca;
import enums.Uloga;
import enums.WorkoutType;

public class WorkoutDAO {

	public Map<String, Workout> workouts = new HashMap<>();
	private String path; //tatjana path
	public Collection<User> users1;
	public Collection<SportsFacility> facilities1;
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public WorkoutDAO(String contextPath, Map<String, User> map, Map<String, SportsFacility> map2) {
		users1 = map.values();
		facilities1 = map2.values();
		loadWorkouts(contextPath);
		path = "/Users/tatjanagemovic/Desktop/Web-projekat/WebShopREST/WebContent/workouts.txt";
	}
	
	public Collection<Workout> findAll() {
		return workouts.values();
	}
	
	public Map<String, Workout> getAllWorkouts(){
		return workouts;
	}
	
	public Workout save(Workout workout) {
		workouts.put(workout.getNaziv(), workout);
		saveWorkouts();
		return workout;
	}
	
	public void saveWorkouts()  {
		PrintWriter out = null;
		try {
			FileWriter w = new FileWriter(path);
			for(Workout u : workouts.values()) {
				String st = u.getNaziv()+";"+u.getWorkoutType()+";"+u.getTrajanje()
				+";"+u.getOpis()+";"+u.getImageURI()+";"+u.getFacility().getName();
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
	private void loadWorkouts(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/workouts.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String naziv = st.nextToken().trim();
					String tip = st.nextToken().trim();
					WorkoutType t;
					t = WorkoutType.Cardio;
					switch(tip) {
					case "Cardio": t = WorkoutType.Cardio;
						break;
					case "Strength": t = WorkoutType.Strength;
						break;
					case "Yoga": t = WorkoutType.Yoga;
						break;
					case "Endurance": t = WorkoutType.Endurance;
						break;
					case "Personal": t = WorkoutType.Personal;
						break;
					}

					String trajanje = st.nextToken().trim();
					String opis = st.nextToken().trim();
					String slika = st.nextToken().trim();
					String sportFacility = st.nextToken().trim();
					SportsFacility facility = findByName(sportFacility);
					String trener = st.nextToken().trim();
					User coach = findByUsername(trener);
					
					workouts.put(naziv, new Workout(naziv, t, facility, trajanje, coach, opis, slika));
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
	
	public SportsFacility findByName(String name) {
		SportsFacility facility =null;
		for(SportsFacility s : facilities1) {
			if(s.getName().equals(name)) {
				facility = s;
				return facility;
			}
		}
		return null;
	}
}
