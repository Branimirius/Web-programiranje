package model;

public class Comment {
	private String customer;
	private String restaurant;
	private String text;
	private Integer grade;
	private Integer id;
	private Boolean approved;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
	
	public Comment() {}
	
	public Comment(String customer, String restaurant, String text, Integer grade, Integer id) {
		super();
		this.customer = customer;
		this.restaurant = restaurant;
		this.text = text;
		this.grade = grade;
		this.id = id;
		this.approved = false;
	}

	public Boolean getApproved() {
		return approved;
	}

	public void setApproved(Boolean approved) {
		this.approved = approved;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Integer getGrade() {
		return grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	public Integer getId() {
		return id;
	}

	
	
	
}
