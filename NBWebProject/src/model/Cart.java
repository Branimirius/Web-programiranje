package model;

import java.util.HashMap;
import java.util.List;

public class Cart {
	private HashMap<Integer, Integer> articles; //artikal i njegova kolicina
	private String user;
	private double price;
	private String id;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
	
	public Cart(HashMap<Integer, Integer> articles, String user, double price, String id) {
		super();
		this.articles = articles;
		this.user = user;
		this.price = price;
		this.id = id;
	}

	public HashMap<Integer, Integer> getArticles() {
		return articles;
	}

	public void addArticles(Integer article, Integer amount) {
		this.articles.put(article, amount);
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	public String getId() {
		return id;
	}
	 
	
}
