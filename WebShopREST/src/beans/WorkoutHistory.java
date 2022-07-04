package beans;


public class WorkoutHistory {

	private String id;
	private String vremePrijave;
	private Workout workout;
	private String workoutId;
	private User kupac;
	private String kupacId;
	private User trener;
	private String trenerId;
	
	public WorkoutHistory() {
		super();
	}


	public WorkoutHistory(String id,String vremePrijave, Workout workout, User kupac, User trener) {
		super();
		this.id = id;
		this.vremePrijave = vremePrijave;
		this.workout = workout;
		this.kupac = kupac;
		this.trener = trener;
	}
	
	
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}

	public String getVremePrijave() {
		return vremePrijave;
	}
	public void setVremePrijave(String vremePrijave) {
		this.vremePrijave = vremePrijave;
	}
	public Workout getWorkout() {
		return workout;
	}
	public void setWorkout(Workout workout) {
		this.workout = workout;
	}
	public String getWorkoutId() {
		return workoutId;
	}
	public void setWorkoutId(String workoutId) {
		this.workoutId = workoutId;
	}
	public User getKupac() {
		return kupac;
	}
	public void setKupac(User kupac) {
		this.kupac = kupac;
	}
	public String getKupacId() {
		return kupacId;
	}
	public void setKupacId(String kupacId) {
		this.kupacId = kupacId;
	}
	public User getTrener() {
		return trener;
	}
	public void setTrener(User trener) {
		this.trener = trener;
	}
	public String getTrenerId() {
		return trenerId;
	}
	public void setTrenerId(String trenerId) {
		this.trenerId = trenerId;
	}
	
}
