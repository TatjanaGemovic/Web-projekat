package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;

import beans.Subscription;
import beans.User;
import enums.StatusClanarine;
import enums.TipClanarine;

public class SubscriptionDAO {
	public Map<String, Subscription> subscriptions = new HashMap<>();
	private String path; //tatjana path
	public Collection<User> users1;
	
	public SubscriptionDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 * @param map 
	 * @param userDao 
	 */
	public SubscriptionDAO(String contextPath, Map<String, User> map) {
		users1 = map.values();
		loadSubscriptions(contextPath);
		//path = "/Users/tatjanagemovic/Desktop/Web-projekat/WebShopREST/WebContent/subscriptions.txt";
		path = "C:/Users/User/Desktop/Web Projekat/Web-projekat/WebShopREST/WebContent/subscriptions.txt";

	}
	
	public Collection<Subscription> findAll() {
		return subscriptions.values();
	}
	
	public Subscription save(Subscription subs) {
		//dodati deo za bodove
		subscriptions.put(subs.getId(), subs);
		saveSubscriptions();
		return subs;
	}
	
	private void saveSubscriptions()  {
		PrintWriter out = null;
		try {
			FileWriter w = new FileWriter(path);
			for(Subscription s: subscriptions.values()) {
				String st = s.getId()+";"+s.getPaket()+";"+s.getTip()+";"+s.getDatumPlacanja()+";"+s.getDatumVazenja()+";"+s.getCena()
				+";"+s.getKupac().getUsername()+";"+s.getStatus()+";"+s.getBrojTermina();
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
	 * U�itava korisnike iz WebContent/subscriptions.txt fajla i dodaje ih u mapu {@link #users}.
	 * Klju� je korisni�ko ime korisnika.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadSubscriptions(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/subscriptions.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String id = st.nextToken().trim();
					int paket = Integer.parseInt(st.nextToken().trim());
					String tip1 = st.nextToken().trim();
					TipClanarine tip = TipClanarine.godisnja;
					switch(tip1) {
					case "mesecna": tip = TipClanarine.mesecna;
						break;
					case "dnevna": tip = TipClanarine.dnevna;
						break;
					case "godisnja": tip = TipClanarine.godisnja;
						break;
					}
					SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
					LocalDate datumPlacanja = LocalDate.parse(st.nextToken().trim());
					LocalDate datumVazenja = LocalDate.parse(st.nextToken().trim());
					//String datumPlacanja = st.nextToken().trim();
					//String datumVazenja = st.nextToken().trim();
					int cena = Integer.parseInt(st.nextToken().trim());
					String userUsername = st.nextToken().trim();
					User user = findByUsername(userUsername);
					String sta = st.nextToken().trim();
					StatusClanarine status = StatusClanarine.aktivna;
					switch(sta) {
					case "neaktivna": status = StatusClanarine.neaktivna;
						break;
					case "aktivna": status = StatusClanarine.aktivna;
						break;
					}
					
					int brt = Integer.parseInt(st.nextToken().trim());

					subscriptions.put(id, new Subscription(id, paket, tip, datumPlacanja, datumVazenja, cena, user, status, brt));
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
				break;
			}
		}
		return user;
	}

	public Subscription findBySubId(String subsId) {
		if (!subscriptions.containsKey(subsId)) {
			return null;
		}
		Subscription sub = subscriptions.get(subsId);
		return sub;
	}

	public Subscription getActiveSubscriptionForCustomer(String name) {
		Subscription sub = null;
		for(Subscription s : subscriptions.values()) {
			if(s.getKupac().getUsername().equals(name)) {
				if(s.getStatus().equals(StatusClanarine.aktivna)) {
					if(s.getDatumVazenja().isAfter(LocalDate.now())) {
						if(s.getBrojTermina() != 0) {
							sub = s;
							sub.setBrojTermina(sub.getBrojTermina()-1);
							saveSubscriptions();
							break;
						}
					}
					else {
						s.setStatus(StatusClanarine.neaktivna);
						saveSubscriptions();
						
					}
				}
			}
		}
		return sub;
	}
	
	public Subscription activeSubscriptionForCustomer(String name) {
		Subscription sub = null;
		for(Subscription s : subscriptions.values()) {
			if(s.getKupac().getUsername().equals(name)) {
				if(s.getStatus().equals(StatusClanarine.aktivna)) {
					if(s.getDatumVazenja().isAfter(LocalDate.now())) {
						if(s.getBrojTermina() != 0) {
							sub = s;
							break;
						}else {
							s.setStatus(StatusClanarine.neaktivna);
							saveSubscriptions();
							sub = s;
							break;
						}
					}
					else {
						s.setStatus(StatusClanarine.neaktivna);
						saveSubscriptions();
						sub = s;
						break;
					}
				}
			}
		}
		return sub;
	}
}
