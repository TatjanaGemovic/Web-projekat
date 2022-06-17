package beans;

import enums.FacilityType;

public class SportsFacility {
	private String name;
	private String location;
	private String offer;
	private FacilityType type;
	private boolean status;
	private double rating;
	private String workingHours;
	public SportsFacility(String name, String location, String offer, FacilityType type, boolean status, double rating,
			String workingHours) {
		super();
		this.name = name;
		this.location = location;
		this.offer = offer;
		this.type = type;
		this.status = status;
		this.rating = rating;
		this.workingHours = workingHours;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getOffer() {
		return offer;
	}
	public void setOffer(String offer) {
		this.offer = offer;
	}
	public FacilityType getType() {
		return type;
	}
	public void setType(FacilityType type) {
		this.type = type;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	public String getWorkingHours() {
		return workingHours;
	}
	public void setWorkingHours(String workingHours) {
		this.workingHours = workingHours;
	}
}
