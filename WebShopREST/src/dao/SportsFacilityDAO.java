package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import beans.Location;
import beans.SportsFacility;
import beans.User;
import enums.FacilityType;


public class SportsFacilityDAO {
	private Map<String, SportsFacility> facilities = new HashMap<>();
	private String path;
	
	public SportsFacilityDAO() {
		
	}
	
	public SportsFacilityDAO(String contextPath) {
		loadFacilities(contextPath);
		//path = "C:/Users/User/Desktop/Web Projekat/Web-projekat/WebShopREST/WebContent/facilities.txt";
		path = "/Users/tatjanagemovic/Desktop/Web-projekat/WebShopREST/WebContent/facilities.txt"; 
		SetStatus();
	}
	
	private void SetStatus() {
		for(SportsFacility facility : facilities.values()) {
			String workingHours[] = facility.getWorkingHours().split("-", -2);
			Date now = new Date();
			String start[] = workingHours[0].split(":", -2);
			String end[] = workingHours[1].split(":", -2);
			if (!(now.getHours() < Integer.parseInt(start[0]) || now.getHours() > Integer.parseInt(end[0]) ||
			        (now.getHours() == Integer.parseInt(start[0]) && now.getMinutes() < Integer.parseInt(start[1])) ||
			        (now.getHours() == Integer.parseInt(end[0]) && now.getMinutes() >=Integer.parseInt(end[1])))) {
			    facility.setStatus(true);
			} 
			else {
				facility.setStatus(false);
			}
		}
	}
	
	public SportsFacility findByName(String name) {
		
		if (!facilities.containsKey(name)) {
			return null;
		}
		
		return facilities.get(name);
	}
	
	public Collection<SportsFacility> findAll() {
		List<SportsFacility> availableFacilities = new ArrayList<SportsFacility>();
		for(SportsFacility s : facilities.values()) {
			if(!s.getDeleted())
				availableFacilities.add(s);
		}
		return availableFacilities;
	}
	
	public Map<String, SportsFacility> getAllFacilities(){
		return facilities;
	}
	
	public SportsFacility save(SportsFacility facility) {
		facilities.put(facility.getName(), facility);
		saveFacilities();
		return facility;
	}
	
	private void saveFacilities()  {
		PrintWriter out = null;
		try {
			FileWriter w = new FileWriter(path);
			for(SportsFacility s: facilities.values()) {
				Location location = s.getLocation();
				String locationStr = location.getLatitude()+","+location.getLongitude()+","+location.getAddress();
				String st = s.getName()+";"+locationStr+";"+s.getOffer()+";"+s.getType()+";"+s.getStatus()+";"+s.getRating()
				+";"+s.getWorkingHours()+";"+s.getImageURI()+";"+s.getDeleted();
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
	
	private void loadFacilities(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/facilities.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String name = st.nextToken().trim();
					String locationString = st.nextToken().trim();
					Location location = ParseLocationString(locationString);
					String offer = st.nextToken().trim();
					String type = st.nextToken().trim();
					FacilityType facilityType = FacilityType.GYM;
					switch(type) {
						case "GYM": facilityType = FacilityType.GYM;
							break;
						case "POOL": facilityType = FacilityType.POOL;
							break;
						case "SPORTS_CENTRE": facilityType = FacilityType.SPORTS_CENTRE;
							break;
						case "DANCE_STUDIO": facilityType = FacilityType.DANCE_STUDIO;
							break;
					}
					String status = st.nextToken().trim();
					boolean facilityStatus = status.equals("true")? true : false;
					String rating = st.nextToken().trim();
					String workingHours = st.nextToken().trim();
					String imageURI = st.nextToken().trim();
					String deleted = st.nextToken().trim();
					boolean isDeleted = false;
					if(deleted.equals("true")) 
						isDeleted = true;
					facilities.put(name, new SportsFacility(name, location, offer, facilityType, facilityStatus, Double.parseDouble(rating), workingHours, imageURI, isDeleted));
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
	private Location ParseLocationString(String locationString) {
		String[] locationStrings = locationString.split(",");
		Location location = new Location();
		
		location.setLatitude(Double.parseDouble(locationStrings[0]));
		location.setLongitude(Double.parseDouble(locationStrings[1]));
		location.setAddress(locationStrings[2]+","+locationStrings[3]+","+locationStrings[4]);
		
		return location;
	}


	public SportsFacility deleteLogically(String name) {
		SportsFacility toDelete = facilities.get(name);
		toDelete.setDeleted(true);
		facilities.put(name,  toDelete);
		saveFacilities();
		return toDelete;
	}
}
