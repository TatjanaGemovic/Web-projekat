package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;

import beans.SportsFacility;
import beans.Subscription;
import beans.User;
import enums.FacilityType;
import enums.TipKupca;
import enums.Uloga;

/***
 * <p>Klasa namenjena da u�ita korisnike iz fajla i pru�a operacije nad njima (poput pretrage).
 * Korisnici se nalaze u fajlu WebContent/users.txt u obliku: <br>
 * firstName;lastName;email;username;password</p>
 * <p><b>NAPOMENA:</b> Lozinke se u praksi <b>nikada</b> ne snimaju u �istu tekstualnom obliku.</p>
 * @author Lazar
 *
 */
public class UserDAO {
	public Map<String, User> users = new HashMap<>();
	private String path; //tatjana path
	public Collection<SportsFacility> facilities1;
	//public Map<String, Subscription> subs1 = SubscriptionDAO.subscriptions;
	
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public UserDAO(String contextPath, Map<String, SportsFacility> map) {
		facilities1 = map.values();
		loadUsers(contextPath);
		path = "/Users/tatjanagemovic/Desktop/Web-projekat/WebShopREST/WebContent/users.txt"; 
		//path = "C:/Users/User/Desktop/Web Projekat/Web-projekat/WebShopREST/WebContent/users.txt";
	}
	
	/**
	 * Vra�a korisnika za prosle�eno korisni�ko ime i �ifru. Vra�a null ako korisnik ne postoji
	 * @param username
	 * @param password
	 * @return
	 */
	public User find(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		if(user.getDeleted() == true) {
			return null;
		}
		return user;
	}
	
	public User findByUsername(String username) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if(user.getDeleted() == true) {
			return null;
		}
		return user;
	}
	
	public Collection<User> findAll() {
		Collection<User> users1 = new ArrayList<User>();
		for(User current : users.values()) {
			if(current.getDeleted() == false) {
				users1.add(current);
			}	
		}
		return users1;
	}
	
	public Collection<User> getAvailableManagers(){
		Collection<User> availableManagers = new ArrayList<User>();
		for(User current : users.values()) {
			if(current.getUloga()==Uloga.Menadzer && current.getFacilityId().equals("nema")) {
				if(current.getDeleted() == false) {
					availableManagers.add(current);
				}	
			}			
		}
		return availableManagers;
	}


	public Map<String, User> getAllUsers(){
		return users;
	}
	
	public User save(User user) {
		users.put(user.getUsername(), user);
		saveUsers();
		return user;
	}
	
	public void saveUsers()  {
		PrintWriter out = null;
		try {
			FileWriter w = new FileWriter(path);
			for(User u : users.values()) {
				String st = u.getFirstName()+";"+u.getLastName()+";"+u.getGender()+";"+u.getBirthDate()+";"+u.getUsername()
				+";"+u.getPassword()+";"+u.getUloga()+";"+u.getIstorijaTreninga()
				+";"+u.getPoseceniObjekti()+";"+u.getSakupljeniBodovi()+";"+u.getTipKupca();
				if(u.getClanarina() != null) {
					st += ";"+u.getClanarina().getId();
				}else {
					st += ";null";	
				}
				st += ";"+u.getFacilityId();
				st += ";"+u.getDeleted();
				/*
				if(u.getSportskiObjekat() != null) {
					st += ";"+u.getSportskiObjekat().getName();
				}else {
					st += ";null";
				}*/
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
	private void loadUsers(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/users.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String firstName = st.nextToken().trim();
					String lastName = st.nextToken().trim();
					String gender = st.nextToken().trim();
					String birthDate = st.nextToken().trim();
					String username = st.nextToken().trim();
					String password = st.nextToken().trim();
					String uloga = st.nextToken().trim();
					Uloga u;
					u = Uloga.Kupac;
					switch(uloga) {
					case "Trener": u = Uloga.Trener;
						break;
					case "Menadzer": u = Uloga.Menadzer;
						break;
					case "Administrator": u = Uloga.Administrator;
						break;
					case "Kupac": u = Uloga.Kupac;
						break;
					}
					String istTreninga = st.nextToken().trim();
					String poseceniObjekti = st.nextToken().trim();
					int bodovi = Integer.parseInt(st.nextToken().trim());
					String tip = st.nextToken().trim();
					TipKupca t = TipKupca.Regularni;
					switch(tip) {
					case "Zlatni" : t = TipKupca.Zlatni;
						break;
					case "Srebrni" : t = TipKupca.Srebrni;
						break;
					case "Regularni" : t = TipKupca.Regularni;
						break;
					case "Bronzani" : t = TipKupca.Bronzani;
						break;
					}
					String subsId = st.nextToken().trim();
					Subscription clanarina = null;
					String sportskiObjekatId = st.nextToken().trim();
					SportsFacility facility = findByName(sportskiObjekatId);
					
					Boolean deleted = Boolean.parseBoolean(st.nextToken().trim());
					
					users.put(username, new User(firstName, lastName, gender, birthDate, username, password, u, istTreninga, clanarina, facility, poseceniObjekti, bodovi, t, sportskiObjekatId, deleted));
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

	public User change(User user) {
		if(user.getSakupljeniBodovi() < 500) {
			user.setTipKupca(TipKupca.Regularni);
		}else if(user.getSakupljeniBodovi() < 1000 && user.getSakupljeniBodovi() >= 500) {
			user.setTipKupca(TipKupca.Bronzani);
		}else if(user.getSakupljeniBodovi() < 2000 && user.getSakupljeniBodovi() >= 1000) {
			user.setTipKupca(TipKupca.Srebrni);
		}else {
			user.setTipKupca(TipKupca.Zlatni);
		}
		users.put(user.getUsername(), user);
		saveUsers();
		return user;
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

	public Collection<User> getTrainers() {
		Collection<User> trainers = new ArrayList<User>();
		for(User current : users.values()) {
			if(current.getUloga()==Uloga.Trener)
				if(current.getDeleted() == false) {
					trainers.add(current);
				}
				
		}
		return trainers;
	}

	public User delete(User user) {
		user.setDeleted(true);
		users.put(user.getUsername(), user);
		saveUsers();
		return user;
	}
	
}
