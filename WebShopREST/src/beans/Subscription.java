package beans;

import java.io.Serializable;
import java.util.Date;

import enums.StatusClanarine;
import enums.TipClanarine;

public class Subscription implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	String id;
	int paket;
	TipClanarine tip;
	Date datumPlacanja;
	Date datumVazenja;
	int cena;
	User kupac;
	String username;
	StatusClanarine status;
	int brojTermina;
	
	public Subscription() {
		
	}
	public Subscription(String id, int paket, TipClanarine tip, Date datumPlacanja, Date datumVazenja, int cena, User kupac,
			StatusClanarine status, int brojTermina) {
		super();
		this.id = id;
		this.paket = paket;
		this.tip = tip;
		this.datumPlacanja = datumPlacanja;
		this.datumVazenja = datumVazenja;
		this.cena = cena;
		this.kupac = kupac;
		this.status = status;
		this.brojTermina = brojTermina;
	}
	
	public int getPaket() {
		return paket;
	}
	public void setPaket(int paket) {
		this.paket = paket;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public TipClanarine getTip() {
		return tip;
	}
	public void setTip(TipClanarine tip) {
		this.tip = tip;
	}
	public Date getDatumPlacanja() {
		return datumPlacanja;
	}
	public void setDatumPlacanja(Date datumPlacanja) {
		this.datumPlacanja = datumPlacanja;
	}
	public Date getDatumVazenja() {
		return datumVazenja;
	}
	public void setDatumVazenja(Date datumVazenja) {
		this.datumVazenja = datumVazenja;
	}
	public int getCena() {
		return cena;
	}
	public void setCena(int cena) {
		this.cena = cena;
	}
	public User getKupac() {
		return kupac;
	}
	public void setKupac(User kupac) {
		this.kupac = kupac;
	}
	public StatusClanarine getStatus() {
		return status;
	}
	public void setStatus(StatusClanarine status) {
		this.status = status;
	}
	public int getBrojTermina() {
		return brojTermina;
	}
	public void setBrojTermina(int brojTermina) {
		this.brojTermina = brojTermina;
	}
	
	
}
