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

import beans.Subscription;
import beans.User;
import beans.Workout;
import enums.TipKupca;
import enums.Uloga;
import enums.WorkoutType;

public class WorkoutDAO {

	public Map<String, Workout> workouts = new HashMap<>();
	private String path; //tatjana path
	
	public WorkoutDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public WorkoutDAO(String contextPath) {
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
				String st = u.getNaziv()+";"+u.getWorkoutType()+";"+"null"+";"+u.getTrajanje()+";"+"null"
				+";"+u.getOpis()+";"+u.getImageURI();
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
					
					String sportFacility = st.nextToken().trim();
					String trajanje = st.nextToken().trim();
					String trener = st.nextToken().trim();
					String opis = st.nextToken().trim();
					String slika = st.nextToken().trim();

					workouts.put(naziv, new Workout(naziv, t, null, trajanje, null, opis, slika));
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
}
