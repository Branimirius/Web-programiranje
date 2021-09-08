package model;

public class Location {
	private String geoLength;
	private String geoWidth;
	private String adress;
	private String zipCode;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
		
	public Location(String geoLength, String geoWidth, String adress, String zipCode) {
		super();
		this.geoLength = geoLength;
		this.geoWidth = geoWidth;
		this.adress = adress;
		this.zipCode = zipCode;
	}
	
	public Location() {
		
	}

	public String getGeoLength() {
		return geoLength;
	}

	public void setGeoLength(String geoLength) {
		this.geoLength = geoLength;
	}

	public String getGeoWidth() {
		return geoWidth;
	}

	public void setGeoWidth(String geoWidth) {
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
