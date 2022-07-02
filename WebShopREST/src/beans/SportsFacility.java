package beans;

import enums.FacilityType;

public class SportsFacility {
	private String name;
	private Location location;
	private String offer;
	private FacilityType type;
	private boolean status;
	private double rating;
	private String workingHours;
	private String imageURI;
	
	public SportsFacility() {}
	
	public SportsFacility(String name, Location location, String offer, FacilityType type, boolean status, double rating,
			String workingHours, String imageURI) {
		super();
		this.name = name;
		this.location = location;
		this.offer = offer;
		this.type = type;
		this.status = status;
		this.rating = rating;
		this.workingHours = workingHours;
		this.imageURI = imageURI;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	
	public String getImageURI() {
		return imageURI;
	}
	public void setImageURI(String imageURI) {
		this.imageURI = imageURI;
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
	public boolean getStatus() {
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
