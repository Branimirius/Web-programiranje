package model;

public class Location {
	private double geoLength;
	private double geoWidth;
	private String adress;
	private String zipCode;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
		
	public Location(double geoLength, double geoWidth, String adress, String zipCode) {
		super();
		this.geoLength = geoLength;
		this.geoWidth = geoWidth;
		this.adress = adress;
		this.zipCode = zipCode;
	}
	
	public Location() {
		
	}

	public double getGeoLength() {
		return geoLength;
	}

	public void setGeoLength(double geoLength) {
		this.geoLength = geoLength;
	}

	public double getGeoWidth() {
		return geoWidth;
	}

	public void setGeoWidth(double geoWidth) {
		this.geoWidth = geoWidth;
	}

	public String getAdress() {
		return adress;
	}

	public void setAdress(String adress) {
		this.adress = adress;
	}

	public String getZipCode() {
		return zipCode;
	}

	
	
	
}
