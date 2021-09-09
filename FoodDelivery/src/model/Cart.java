package model;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

public class Cart {
	private Collection<ArticleInCart> articles; //artikal i njegova kolicina
	private String user;
	private double price;
	private Integer id;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
	
	public Cart(Collection<ArticleInCart> articles, String user, double price, Integer id) {
		super();
		this.articles = articles;
		this.user = user;
		this.price = price;
		this.id = id;
	}
	
	public Cart() {}
	
	public Collection<ArticleInCart> getArticles() {
		return articles;
	}

	public void addArticle(Article article, Integer count) {
		
		this.articles.add(new ArticleInCart(article, count));
		calculatePrice();
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
	public void calculatePrice() {
		double value = 0.0;
		for(ArticleInCart a : this.articles) {
			value += (a.count * a.article.getPrice());
		}
		setPrice(value);
	}
	public void calculateDiscountedPrice(double discount) {
		double value = 0.0;
		for(ArticleInCart a : this.articles) {
			value += (a.count * a.article.getPrice());
		}
		setPrice(value - (value * (discount / 100)));
	}
	private Integer generateId() {
		return this.articles.size() + 1;
	}
	
}
