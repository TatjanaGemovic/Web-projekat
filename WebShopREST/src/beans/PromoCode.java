package beans;

import java.time.LocalDate;
import java.util.Date;

public class PromoCode{
	
	String oznaka;
	LocalDate period;
	int brojIskoriscenih;
	double popust;
	int trajanje;
	
	public PromoCode() {
		super();
	}
	public PromoCode(String oznaka, LocalDate period, int brojIskoriscenih, double popust, int trajanje) {
		super();
		this.oznaka = oznaka;
		this.period = period;
		this.brojIskoriscenih = brojIskoriscenih;
		this.popust = popust;
		this.trajanje = trajanje;
	}
	
	
	public int getTrajanje() {
		return trajanje;
	}
	public void setTrajanje(int trajanje) {
		this.trajanje = trajanje;
	}
	public String getOznaka() {
		return oznaka;
	}
	public void setOznaka(String oznaka) {
		this.oznaka = oznaka;
	}
	public LocalDate getPeriod() {
		return period;
	}
	public void setPeriod(LocalDate period) {
		this.period = period;
	}
	public int getBrojIskoriscenih() {
		return brojIskoriscenih;
	}
	public void setBrojIskoriscenih(int brojIskoriscenih) {
		this.brojIskoriscenih = brojIskoriscenih;
	}
	public double getPopust() {
		return popust;
	}
	public void setPopust(double popust) {
		this.popust = popust;
	}
	
	
}
