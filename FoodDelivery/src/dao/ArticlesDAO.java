package dao;

import java.awt.Image;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import model.Article;
import model.CustomerType;
import model.Restaurant;
import model.User;


public class ArticlesDAO {

	private HashMap<Integer, Article> articles;
	private String articlesPath = "C:\\Users\\brani\\OneDrive\\Documents\\GitHub\\Web-programiranje\\FoodDelivery\\src";
	

	
	
	public ArticlesDAO() {

		this.setArticles(new HashMap<Integer, Article>());
		//this.setArticlesPath(this.articlesPath);
		//this.loadTestData();
		//this.saveArticles();
		loadArticles(articlesPath);
	}

	public HashMap<Integer, Article> getArticles() {
		if(!articles.isEmpty()) {
			return articles;
		}
		else {
			return null;
		}
	}
	public Collection<Article> getArticlesCollection() {
		if (!articles.isEmpty()) {
			return articles.values();
		}
		return null;
	}

	public String getArticlesPath() {
		return articlesPath;
	}

	public void setArticlesPath(String articlesPath) {
		this.articlesPath = articlesPath;
	}

	public void setArticles(HashMap<Integer, Article> articles) {
		this.articles = articles;
	}
	
	public Article getArticle(Integer id) {
		for(Article a : articles.values()) {
			if(a.getId() == id) {
				return a;
			}
		}
		return null;
	}
	
	public Article searchArticle(String article) {
		if (getArticles() != null) {
			for (Article k : getArticles().values()) {
				if (k.getName().equals(article)) {
					return k;
				}
			}
		}
		return null;
	}
	
	public Article searchArticleById(Integer article) {
		if (getArticles() != null) {
			for (Article k : getArticles().values()) {
				if (k.getId().equals(article)) {
					return k;
				}
			}
		}
		return null;
	}
	
	public void addArticle(Article k) {
		getArticles().put(k.getId(), k);
		saveArticles();
	}
	public void editArticle(Article article) {
		for(Article a : this.articles.values()) {
			if(a.getId().equals(article.getId())) {
				a.setName(article.getName());
				a.setDescription(article.getDescription());
				a.setPrice(article.getPrice());
				a.setAmount(article.getAmount());
				a.setPicture(article.getPicture());
			}
		}
		this.saveArticles();
	}
	
	// Ucitavanje korisnika iza fajla korisnici.txt
	@SuppressWarnings("unchecked")
	public void loadArticles(String contextPath) {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			URL url = getClass().getResource("/data/articles.txt");
			file = new File(url.getPath());
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
						VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, String.class, Article.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			articles = ((HashMap<Integer, Article>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String stringArticles = objectMapper.writeValueAsString(articles);
				fileWriter.write(stringArticles);

			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (fileWriter != null) {
					try {
						fileWriter.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	// Serijalizacija
	public void saveArticles() {
		URL url = getClass().getResource("/data/articles.txt");		
		File f = new File(url.getPath());
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringArticles = objectMapper.writeValueAsString(articles);
			fileWriter.write(stringArticles);
			fileWriter.flush();
			System.out.println("sacuvao artikle");
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileWriter != null) {
				try {
					fileWriter.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		System.out.println("saved test data (articles)");
	}
	private void loadTestData() {
		//(String name, double price, String type, String restaurant, double amount, String description,
				//Image picture, Integer id) {
			Article admin = new Article("Komplet lepinja", 250.0, "hrana", "zorinakrcma1", 400.0,
					"Lepinja sa kajmakom jajima i ovcijim pretopom", "pictures/kompletLepinja.jpg", 1);
	
			Article customer = new Article("Margarita", 1200.0, "hrana", "savoca1", 1500.0,
					"Pica sa sirevima i paradajz sosom", "pictures/margarita.jpg", 2);
			
			Article delieveryGuy = new Article("Giros mali", 250.0, "hrana", "girosmaster1", 200.0,
					"Mali giros mesano meso", "pictures/giros.jpg", 3);
			
			Article manager = new Article("Francuski sendvic", 330, "hrana", "crepes1", 250.0,
					"Sendvic sa jajetom kackavaljem i sunkom", "pictures/francuskiSendvic.jpg", 4);
	
			articles.put(admin.getId(), admin);
			articles.put(customer.getId(), customer);
			articles.put(delieveryGuy.getId(), delieveryGuy);
			articles.put(manager.getId(), manager);
	}
	
	public Collection<Article> getArticlesByRestaurant(String restaurantId){
		ArrayList<Article> articles = new ArrayList<Article>();
		for(Article a : this.articles.values()) {
			if(a.getRestaurant().equals(restaurantId)) {
				articles.add(a);
			}
		}
		return articles;
	}
	
	public Integer generateId() {
		return this.articles.size() + 1;
	}

}
