package model;

import java.util.ArrayList;
import java.util.List;

public class Order {
	private Integer id;
	private ArrayList<ArticleInCart> articles;
	private String restaurant;
	private String dateTime;
	private double price;
	private String customer;
	private String status;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
	public Order() {}
	public Order(Integer id, ArrayList<ArticleInCart> articles, String restaurant, String dateTime, double price, String customer,
			String status) {
		super();
		this.id = id;
		this.articles = articles;
		this.restaurant = restaurant;
		this.dateTime = dateTime;
		this.price = price;
		this.customer = customer;
		this.status = status;
	}

	public ArrayList<ArticleInCart> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<ArticleInCart> articles) {
		this.articles = articles;
	}

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getId() {
		return id;
	}
	
}
