package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import beans.PromoCode;
import beans.User;

public class PromoCodeDAO {
	
	public static Map<String, PromoCode> codes = new HashMap<>();
	private String path; //tatjana path
	
public PromoCodeDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public PromoCodeDAO(String contextPath) {
		loadCodes(contextPath);
		path = "/Users/tatjanagemovic/Desktop/Web-projekat/WebShopREST/WebContent/codes.txt";
	}
	
	public PromoCode save(PromoCode code) {
		codes.put(code.getOznaka(), code);
		saveUsers();
		return code;
	}
	
	public void saveUsers()  {
		PrintWriter out = null;
		try {
			FileWriter w = new FileWriter(path);
			for(PromoCode p : codes.values()) {
				String st = p.getOznaka()+";"+p.getPeriod()+";"+p.getBrojIskoriscenih()+";"+p.getPopust()+";"+p.getTrajanje();
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
	private void loadCodes(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/codes.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String oznaka = st.nextToken().trim();
					LocalDate period = LocalDate.parse(st.nextToken().trim());
					int brojIskoriscenih = Integer.parseInt(st.nextToken().trim());
					double popust = Double.parseDouble(st.nextToken().trim());
					int trajanje = Integer.parseInt(st.nextToken().trim());

					codes.put(oznaka, new PromoCode(oznaka, period, brojIskoriscenih, popust, trajanje));
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

	public List<PromoCode> findAllPromoCodes() {
		LocalDate now = LocalDate.now();
		List<PromoCode> cds = new ArrayList<PromoCode>();
		for(PromoCode c : codes.values()) {
			if(now.isBefore(c.getPeriod())) {
				cds.add(c);
			}
		}
		return cds;
	}
}
