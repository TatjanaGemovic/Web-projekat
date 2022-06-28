package beans;

import java.util.Date;

public class PromoCode{
	
	String oznaka;
	Date period;
	int brojIskoriscenih;
	double popust;
	
	public PromoCode() {
		super();
	}
	public PromoCode(String oznaka, Date period, int brojIskoriscenih, double popust) {
		super();
		this.oznaka = oznaka;
		this.period = period;
		this.brojIskoriscenih = brojIskoriscenih;
		this.popust = popust;
	}
	public String getOznaka() {
		return oznaka;
	}
	public void setOznaka(String oznaka) {
		this.oznaka = oznaka;
	}
	public Date getPeriod() {
		return period;
	}
	public void setPeriod(Date period) {
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
