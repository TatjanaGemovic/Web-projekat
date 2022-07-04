package beans;

public class Comment {
	private String user;
	private String sportsFacility;
	private String comment;
	private int mark;
	private String status;
	
	public Comment() {}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getSportsFacility() {
		return sportsFacility;
	}
	public void setSportsFacility(String sportsFacility) {
		this.sportsFacility = sportsFacility;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getMark() {
		return mark;
	}
	public void setMark(int mark) {
		this.mark = mark;
	}
	public Comment(String user, String sportsFacility, String comment, int mark, String status) {
		super();
		this.user = user;
		this.sportsFacility = sportsFacility;
		this.comment = comment;
		this.mark = mark;
		this.status = status;
	}
}
