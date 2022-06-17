package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.SportsFacility;
import beans.User;
import enums.FacilityType;


public class SportsFacilityDAO {
	private Map<String, SportsFacility> facilities = new HashMap<>();
	
	public SportsFacilityDAO() {
		
	}
	
	public SportsFacilityDAO(String contextPath) {
		loadFacilities(contextPath);
	}
	
	public SportsFacility find(String name) {
		if (!facilities.containsKey(name)) {
			return null;
		}
		
		return facilities.get(name);
	}
	
	public Collection<SportsFacility> findAll() {
		return facilities.values();
	}
	
	public SportsFacility save(SportsFacility facility) {
		facilities.put(facility.getName(), facility);
		return facility;
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
					String location = st.nextToken().trim();
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
					facilities.put(name, new SportsFacility(name, location, offer, facilityType, facilityStatus, Double.parseDouble(rating), workingHours));
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
