package dto;

public class RestaurantDTO{
	private String geoLength;
	private String geoWidth;
	private String city;
	private String adress;
	private String number;
	private String zipCode;
	private String manager;
	private String name;
	private String id;
	private String logo;
	private String type;
		
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public RestaurantDTO(){}
	
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
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getAdress() {
		return adress;
	}
	public void setAdress(String adress) {
		this.adress = adress;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getManager() {
		return manager;
	}
	public void setManager(String manager) {
		this.manager = manager;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}