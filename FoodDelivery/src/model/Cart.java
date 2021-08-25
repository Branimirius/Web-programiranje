package model;

import java.util.HashMap;
import java.util.List;

public class Cart {
	private HashMap<Integer, Article> articles; //artikal i njegova kolicina
	private String user;
	private double price;
	private Integer id;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
	
	public Cart(HashMap<Integer, Article> articles, String user, double price, Integer id) {
		super();
		this.articles = articles;
		this.user = user;
		this.price = price;
		this.id = id;
	}
	
	public Cart() {}
	
	public HashMap<Integer, Article> getArticles() {
		return articles;
	}

	public void addArticles(Article article, Integer amount) {
		this.articles.put(amount, article);
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
	public Integer getId() {
		return id;
	}
	 
	
}
