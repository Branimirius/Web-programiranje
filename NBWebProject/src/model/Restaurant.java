package model;

import java.awt.Image;
import java.util.ArrayList;
import java.util.List;

public class Restaurant {
	private String name;
	private String type;
	private ArrayList<Integer> articles;
	private String status;
	private Location location;
	private Image logo;
	private String id;
	
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
	
	public Restaurant(String name, String type, String status, Location location, Image logo,
			String id) {
		super();
		this.name = name;
		this.type = type;
		this.articles = new ArrayList<Integer>();
		this.status = status;
		this.location = location;
		this.logo = logo;
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public ArrayList<Integer> getArticles() {
		return articles;
	}

	public void addArticle(Integer article) {
		this.articles.add(article);
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Image getLogo() {
		return logo;
	}

	public void setLogo(Image logo) {
		this.logo = logo;
	}

	public String getId() {
		return id;
	}

	
	
	
}