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
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.TipKupca;
import beans.Uloga;
import beans.User;
import enums.FacilityType;

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
	
	public UserDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public UserDAO(String contextPath) {
		loadUsers(contextPath);
		path = "/Users/tatjanagemovic/Desktop/Web-projekat/WebShopREST/WebContent/users.txt";
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
		return user;
	}
	
	public Collection<User> findAll() {
		return users.values();
	}
	
	public User save(User user) {
		users.put(user.getUsername(), user);
		saveUsers();
		return user;
	}
	
	private void saveUsers()  {
		PrintWriter out = null;
		try {
			FileWriter w = new FileWriter(path);
			for(User u : users.values()) {
				String st = u.getFirstName()+";"+u.getLastName()+";"+u.getGender()+";"+u.getBirthDate()+";"+u.getUsername()
				+";"+u.getPassword()+";"+u.getUloga()+";"+u.getIstorijaTreninga()+";"+u.getClanarina()+";"+u.getSportskiObjekat()
				+";"+u.getPoseceniObjekti()+";"+u.getSakupljeniBodovi()+";"+u.getTipKupca();
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
					int clanarina = Integer.parseInt(st.nextToken().trim());
					String sportskiObjekat = st.nextToken().trim();
					String poseceniObjekti = st.nextToken().trim();
					int bodovi = Integer.parseInt(st.nextToken().trim());
					String tip = st.nextToken().trim();
					TipKupca t;
					if(tip == "Zlatni")
						t = TipKupca.Zlatni;
					else if(tip == "Srebrni")
						t = TipKupca.Srebrni;
					else
						t = TipKupca.Bronzani;
					users.put(username, new User(firstName, lastName, gender, birthDate, username, password, u, istTreninga, clanarina, sportskiObjekat, poseceniObjekti, bodovi, t));
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
		users.put(user.getUsername(), user);
		return user;
	}
	
}
