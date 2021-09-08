package dao;

import java.awt.Image;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import javax.swing.ImageIcon;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import model.Restaurant;
import model.User;
import model.Comment;
import model.CustomerType;
import model.Location;
import model.Restaurant;

public class RestaurantsDAO {
	private HashMap<String, Restaurant> restaurants;
	private String restaurantsPath = "C:\\Users\\brani\\OneDrive\\Documents\\GitHub\\Web-programiranje\\FoodDelivery\\src";
	
	
	
	public RestaurantsDAO() {
		
		this.setRestaurants(new HashMap<String, Restaurant>());
		//this.setRestaurantsPath(restaurantsPath);
		//this.loadTestData();
		//this.saveRestaurants();
		loadRestaurants(restaurantsPath);
	}

	public HashMap<String, Restaurant> getRestaurants() {
		if(!restaurants.isEmpty()) {
			return restaurants;
		}
		else {
			return null;
		}
	}
	public Collection<Restaurant> getRestaurantsCollection() {
		if (!restaurants.isEmpty()) {
			return restaurants.values();
		}
		return null;
	}

	public String getRestaurantsPath() {
		return restaurantsPath;
	}

	public void setRestaurantsPath(String restaurantsPath) {
		this.restaurantsPath = restaurantsPath;
	}

	public void setRestaurants(HashMap<String, Restaurant> restaurants) {
		this.restaurants = restaurants;
	}
	
	public Restaurant searchRestaurant(String id) {
		System.out.println(id + "+++++++++++++");
		if (restaurants != null) {
			for (Restaurant k : restaurants.values()) {
				System.out.println(k.getId() + "=====");
				if (k.getId().equals(id)) {
					return k;
				}
			}
		}
		return null;
	}
	
	public void addRestaurant(Restaurant k) {
		getRestaurants().put(k.getId(), k);
		saveRestaurants();
	}
	 
	@SuppressWarnings("unchecked")
	private void loadRestaurants(String contextPath) {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			URL url = getClass().getResource("/data/restaurants.txt");
			file = new File(url.getPath());
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
						VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, String.class, Restaurant.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			restaurants = ((HashMap<String, Restaurant>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String stringRestaurants = objectMapper.writeValueAsString(restaurants);
				fileWriter.write(stringRestaurants);

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
	private void saveRestaurants() {
		URL url = getClass().getResource("/data/restaurants.txt");		
		File f = new File(url.getPath());
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringRestaurants = objectMapper.writeValueAsString(restaurants);
			fileWriter.write(stringRestaurants);
			fileWriter.flush();
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
		System.out.println("saved test data (restaurants)");
		
	}
	public void loadTestData() {
		//(String name, String type, String status, Location location, Image logo,
		//String id) {
			Restaurant admin = new Restaurant("Zlatiborska Komplet Lepinja", "Serbian", true, new Location(43.617484924583316, 19.725842881883942,"Zlatibor,Dobroselica", "31315"), "pictures/zorinaKrcma.png",
					"zorinakrcma1", "Komplet Lepinja & kiselo mleko", "");

			Restaurant customer = new Restaurant("Savoca", "Italian", true, new Location(45.26032761319397, 19.832726727973252,"Novi Sad,Bulevar Oslobodjenja 41", "21000"), "pictures/savocaLogo.png",
					"savoca1", "Pizza", "");
			
			Restaurant delieveryGuy = new Restaurant("Gyros master", "Greek", false, new Location(45.24796398924438, 19.84224932612519,"Novi Sad,Dimitrija Tucovica 3", "21000"), "pictures/gyrosMaster.png",
					"girosmaster1", "Giros", "");
			
			Restaurant manager = new Restaurant("Crepes", "French", true, new Location(45.245685371364765, 19.84398271263121,"Novi Sad,Promenada", "21000"), "pictures/crepesLogo.png",
					"crepes1", "Francuske palacinke", "");

			restaurants.put(admin.getId(), admin);
			restaurants.put(customer.getId(), customer);
			restaurants.put(delieveryGuy.getId(), delieveryGuy);
			restaurants.put(manager.getId(), manager);
			
			System.out.println("loaded test data");
		}
	
	public Restaurant getActiveRestaurant(String restaurant) {
		for(Restaurant r : this.restaurants.values()) {
			System.out.println("TEST pairs: " + r.getId() + " " + restaurant);
			if(r.getId().equals(restaurant)) {
				System.out.println("returned: " + r.getId());
				return r;
			}
		}
		return null;
	}
	
	public ArrayList<Integer> getRestaurantGrades(Collection<Comment> comments, String restaurant){
		ArrayList<Integer> retVal = new ArrayList<Integer>();
		for(Comment c : comments) {
			if(c.getRestaurant().equals(restaurant)) {
				retVal.add(c.getGrade());
			}
		}
		return retVal;
	}
	
	public void calculateGrades(Collection<Comment> comments) {
		for(Restaurant r : this.restaurants.values()) {
			r.setGrade(5);
			r.calculateGrade(this.getRestaurantGrades(comments, r.getId()));
			System.out.println("Restoran " + r.getId() + " ocena: " + r.getGrade());
		}
		this.saveRestaurants();
	}
	
	public void toggleWorking(String restaurant) {
		for(Restaurant r : this.restaurants.values()) {
			if(r.getId().equals(restaurant)) {
				r.toggleWorking();
			}
		}
		this.saveRestaurants();
	}
	
}
