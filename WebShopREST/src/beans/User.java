package beans;

import java.io.Serializable;

import enums.TipKupca;
import enums.Uloga;

public class User implements Serializable {
	
	private String firstName;
	private String lastName;
	private String gender;
	private String birthDate;
	private String username;
	private String password;
	private Uloga uloga;
	private String istorijaTreninga;
	private int clanarina;
	private String sportskiObjekat;
	private String poseceniObjekti;
	private int sakupljeniBodovi;
	private TipKupca tipKupca;

	public User() {
	}

	public User(String firstName, String lastName, String gender, String birthDate, String username, String password,
			Uloga uloga, String istorijaTreninga, int clanarina, String sportskiObjekat, String poseceniObjekti,
			int sakupljeniBodovi, TipKupca tipKupca) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.username = username;
		this.password = password;
		this.uloga = uloga;
		this.istorijaTreninga = istorijaTreninga;
		this.clanarina = clanarina;
		this.sportskiObjekat = sportskiObjekat;
		this.poseceniObjekti = poseceniObjekti;
		this.sakupljeniBodovi = sakupljeniBodovi;
		this.tipKupca = tipKupca;
	}


	public Uloga getUloga() {
		return uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

	public String getIstorijaTreninga() {
		return istorijaTreninga;
	}

	public void setIstorijaTreninga(String istorijaTreninga) {
		this.istorijaTreninga = istorijaTreninga;
	}

	public int getClanarina() {
		return clanarina;
	}

	public void setClanarina(int clanarina) {
		this.clanarina = clanarina;
	}

	public String getSportskiObjekat() {
		return sportskiObjekat;
	}

	public void setSportskiObjekat(String sportskiObjekat) {
		this.sportskiObjekat = sportskiObjekat;
	}

	public String getPoseceniObjekti() {
		return poseceniObjekti;
	}

	public void setPoseceniObjekti(String poseceniObjekti) {
		this.poseceniObjekti = poseceniObjekti;
	}

	public int getSakupljeniBodovi() {
		return sakupljeniBodovi;
	}

	public void setSakupljeniBodovi(int sakupljeniBodovi) {
		this.sakupljeniBodovi = sakupljeniBodovi;
	}

	public TipKupca getTipKupca() {
		return tipKupca;
	}

	public void setTipKupca(TipKupca tipKupca) {
		this.tipKupca = tipKupca;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	//@Override
	/*public int hashCode() {
		final int prime = 31;
		int result = 1;
		//result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", username=" + username
				+ ", password=" + password + "]";
	}*/

	private static final long serialVersionUID = 6640936480584723344L;

}
