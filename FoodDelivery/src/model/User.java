package model;

import java.util.ArrayList;
import java.util.List;

public class User {
	
	private String username;
	private String password;
	private String name;
	private String surname;
	private String gender;
	private String dateOfBirth;
	private String role;
	private String imagePath;
	// polja za kupca
	private ArrayList<Integer> orderList;
	private Integer cart;
	private Integer bonusPoints;
	private CustomerType type;
	// polja za dostavljaca	
	private ArrayList<Integer> demandList;	
	// polje za menadzera
	private String restaurant;
	private Boolean free;
	
	public Boolean getFree() {
		return free;
	}

	public void setFree(Boolean free) {
		this.free = free;
	}

	//konstruktor
	public User() {
		
	}
	
	public User(String username, String password, String name, String surname, String gender, String dateOfBirth,
			String role,Integer cart, Integer bonusPoints, CustomerType type,
			String restaurant, Boolean free) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.free = free;
		if(role == "customer") {
			this.orderList = new ArrayList<Integer>();
			this.demandList = null;
			this.restaurant = null;
			this.cart = cart;
			this.bonusPoints = bonusPoints;
			this.type = type;
		}
		else if(role == "delieveryGuy") {
			this.demandList = new ArrayList<Integer>();
			this.orderList = null;
			this.restaurant = null;
			this.cart = null;
			this.bonusPoints = 0;
			this.type = null;
		}
		else if(role == "manager"){
			this.demandList = null;
			this.orderList = null;
			this.restaurant = restaurant;
			this.cart = null;
			this.bonusPoints = 0;
			this.type = null;
		}
		else {
			this.demandList = null;
			this.orderList = null;
			this.restaurant = null;
			this.cart = null;
			this.bonusPoints = 0;
			this.type = null;
		}
		
		
		
	}
	
	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	//get set
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
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public ArrayList<Integer> getOrderList() {
		return orderList;
	}
	public void addOrder(Integer order) {
		this.orderList.add(order);
	}
	public Integer getCart() {
		return cart;
	}
	public void setCart(Integer cart) {
		this.cart = cart;
	}
	public CustomerType getType() {
		return type;
	}
	public void setType(CustomerType type) {
		this.type = type;
	}
	public List<Integer> getDemandList() {
		return demandList;
	}
	public void addDemand(Integer demand) {
		this.demandList.add(demand);
	}
	public void removeDemand(Integer demand) {
		this.demandList.remove(demand);
	}
	public String getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}
	
	
	

}
