package beans;

import enums.WorkoutType;

public class Workout {

	private String naziv;
	private WorkoutType workoutType;
	private SportsFacility facility;
	private String facilityId;
	private String trajanje;
	private User trener;
	private String userId;
	private String opis;
	private String imageURI;
	private int cena;
	
	
	public Workout() {
		super();
	}
	

	public Workout(String naziv, WorkoutType workoutType, SportsFacility facility, String trajanje, User trener,
			String opis, String imageURI, int cena) {
		super();
		this.naziv = naziv;
		this.workoutType = workoutType;
		this.facility = facility;
		this.trajanje = trajanje;
		this.trener = trener;
		this.opis = opis;
		this.imageURI = imageURI;
		this.cena = cena;
	}

	public int getCena() {
		return cena;
	}

	public void setCena(int cena) {
		this.cena = cena;
	}

	public String getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(String facilityId) {
		this.facilityId = facilityId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public WorkoutType getWorkoutType() {
		return workoutType;
	}
	public void setWorkoutType(WorkoutType workoutType) {
		this.workoutType = workoutType;
	}
	public SportsFacility getFacility() {
		return facility;
	}
	public void setFacility(SportsFacility facility) {
		this.facility = facility;
	}
	public String getTrajanje() {
		return trajanje;
	}
	public void setTrajanje(String trajanje) {
		this.trajanje = trajanje;
	}
	public User getTrener() {
		return trener;
	}
	public void setTrener(User trener) {
		this.trener = trener;
	}
	public String getOpis() {
		return opis;
	}
	public void setOpis(String opis) {
		this.opis = opis;
	}
	public String getImageURI() {
		return imageURI;
	}
	public void setImageURI(String imageURI) {
		this.imageURI = imageURI;
	}
	
	
}
