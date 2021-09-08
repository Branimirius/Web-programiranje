package dto;

public class UserRegistrationByAdminDTO {
	private String name;
	private String surname;
	private String username;
	private String password;
	private String date;
	private String gender;
	private String role;
	private Boolean free;
	
	public Boolean getFree() {
		return free;
	}

	public void setFree(Boolean free) {
		this.free = free;
	}

	public UserRegistrationByAdminDTO() {}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
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
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}

    public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
