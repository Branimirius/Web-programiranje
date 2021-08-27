package model;

import java.awt.Image;

public class Article {
	private String name;
	private double price;
	private String type;
	private String restaurant;
	private double amount;
	private String description;
	private String picturePath;
	private Integer id;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
	public Article() {
		
	}
	
	public Article(String name, double price, String type, String restaurant, double amount, String description,
			String picture, Integer id) {
		super();
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurant = restaurant;
		this.amount = amount;
		this.description = description;
		this.picturePath = picture;
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPicture() {
		return picturePath;
	}

	public void setPicture(String picture) {
		this.picturePath = picture;
	}

	public Integer getId() {
		return id;
	}

	
	
	
}
