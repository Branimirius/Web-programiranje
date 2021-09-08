package model;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

public class Restaurant {
	private String name;
	private String type;
	private ArrayList<Integer> articles;
	private Boolean working;
	private Location location;
	//private Image logo;
	private String logoPath;
	private String id;
	private String title;
	private Integer grade;
	private String manager;
	
	public String getManager() {
		return manager;
	}
	public void setManager(String manager) {
		this.manager = manager;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Boolean getWorking() {
		return working;
	}
	public void setWorking(Boolean working) {
		this.working = working;
	}
	public void toggleWorking() {
		if(this.working) {
			setWorking(false);
		}
		else {
			setWorking(true);
		}
	}
	public double getGrade() {
		return grade;
	}
	public void setGrade(Integer grade) {
		this.grade = grade;
	}
	//TODO: kada se uradi serijalizacija treba namestiti generateId() funkciju
	public Restaurant() {}
	public Restaurant(String name, String type, Boolean status, Location location, String logoPath,
			String id, String title, String manager) {
		super();
		this.name = name;
		this.type = type;
		this.articles = new ArrayList<Integer>();
		this.working = status;
		this.location = location;
		//this.logo = logo;
		this.logoPath = logoPath;
		this.id = id;
		this.title = title;
		this.manager = manager;
		this.grade = 1;
		/*constructing Logo:
		InputStream imgStream = getClass().getResourceAsStream(logoPath);
		try {
			BufferedImage img = ImageIO.read(imgStream);
			this.logo = img;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		*/
	}

	public void calculateGrade(ArrayList<Integer> grades) {
		double sum = 0.0;
		if(grades.size() != 0) {
			for(Integer g : grades) {
				sum += g;
			}
			this.grade = (int) Math.round(sum / (grades.size()));
		}
		else {
			this.grade = 5;
		}
		
		
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

	public Boolean getStatus() {
		return working;
	}

	public void setStatus(Boolean status) {
		this.working = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public String getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	
	
	
}
