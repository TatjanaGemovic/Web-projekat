package beans;

public class ScheduledWorkout {
	
	private int id;
	private User user;
	private String userId;
	private Workout workout;
	private String workoutId;
	private String danPrijave;
	private String danOdrzavanja;
	private String status;
	private boolean canBeCancelled;
	
	public ScheduledWorkout() {
		super();
	}
	
	public ScheduledWorkout(int id, User user, Workout workout, String danPrijave, String danOdrzavanja,
			String status) {
		super();
		this.id = id;
		this.user = user;
		this.workout = workout;
		this.danPrijave = danPrijave;
		this.danOdrzavanja = danOdrzavanja;
		this.status = status;
	}
	
	
	
	public boolean getCanBeCancelled() {
		return canBeCancelled;
	}

	public void setCanBeCancelled(boolean canBeCancelled) {
		this.canBeCancelled = canBeCancelled;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
	public String getDanPrijave() {
		return danPrijave;
	}
	public void setDanPrijave(String danPrijave) {
		this.danPrijave = danPrijave;
	}
	public String getDanOdrzavanja() {
		return danOdrzavanja;
	}
	public void setDanOdrzavanja(String danOdrzavanja) {
		this.danOdrzavanja = danOdrzavanja;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
