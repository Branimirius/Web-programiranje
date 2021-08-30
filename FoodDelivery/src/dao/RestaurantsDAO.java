package dao;

import java.awt.Image;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Paths;
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
	 
	@SuppressWarnings("unchecked")
	private void loadRestaurants(String contextPath) {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File(contextPath + "/data/restaurants.txt");
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
		File f = new File(restaurantsPath + "/data/restaurants.txt");
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
			Restaurant admin = new Restaurant("Zlatiborska Komplet Lepinja", "Serbian", true, new Location(), "pictures/zorinaKrcma.png",
					"zorinakrcma1", "Komplet Lepinja & kiselo mleko");

			Restaurant customer = new Restaurant("Savoca", "Italian", true, new Location(), "pictures/savocaLogo.png",
					"savoca1", "Pizza");
			
			Restaurant delieveryGuy = new Restaurant("Gyros master", "Greek", false, new Location(), "pictures/gyrosMaster.png",
					"girosmaster1", "Giros");
			
			Restaurant manager = new Restaurant("Crepes", "French", true, new Location(), "pictures/crepesLogo.png",
					"crepes1", "Francuske palacinke");

			restaurants.put(admin.getId(), admin);
			restaurants.put(customer.getId(), customer);
			restaurants.put(delieveryGuy.getId(), delieveryGuy);
			restaurants.put(manager.getId(), manager);
			
			System.out.println("loaded test data");
		}

}
