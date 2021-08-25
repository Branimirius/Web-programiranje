package dao;

import java.awt.Image;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
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
import model.Cart;
import model.CustomerType;
import model.Restaurant;
import model.User;


public class CartsDAO {

	private HashMap<Integer, Cart> carts;
	private String cartsPath = "C:\\Users\\brani\\OneDrive\\Documents\\GitHub\\Web-programiranje\\FoodDelivery\\src";
	

	
	
	public CartsDAO() {

		this.setCarts(new HashMap<Integer, Cart>());
		//this.setCartsPath(this.cartsPath);
		this.loadTestData();
		this.saveCarts();
		//loadCarts(cartsPath);
	}

	public HashMap<Integer, Cart> getCarts() {
		if(!carts.isEmpty()) {
			return carts;
		}
		else {
			return null;
		}
	}
	public Collection<Cart> getCartsCollection() {
		if (!carts.isEmpty()) {
			return carts.values();
		}
		return null;
	}

	public String getCartsPath() {
		return cartsPath;
	}

	public void setCartsPath(String cartsPath) {
		this.cartsPath = cartsPath;
	}

	public void setCarts(HashMap<Integer, Cart> carts) {
		this.carts = carts;
	}
	
	// Ucitavanje korisnika iza fajla korisnici.txt
	@SuppressWarnings("unchecked")
	private void loadCarts(String contextPath) {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File(contextPath + "/data/carts.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
						VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, String.class, Cart.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			carts = ((HashMap<Integer, Cart>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String stringCarts = objectMapper.writeValueAsString(carts);
				fileWriter.write(stringCarts);

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
	private void saveCarts() {
		File f = new File(cartsPath + "/data/carts.txt");
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringCarts = objectMapper.writeValueAsString(carts);
			fileWriter.write(stringCarts);
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
		System.out.println("saved test data (carts)");
	}
	private void loadTestData() {
		
			HashMap<Integer, Article> articles1 = new HashMap<Integer, Article>();
			Article a1 = new Article("test", 250.0, "test", "test1", 200.0,
					"tttesstt", "pictures/giros.jpg", 3);
			articles1.put(2, a1);
			Cart c1 = new Cart(articles1, "Jesse", 0.0, 1);
	
			
	
			carts.put(c1.getId(), c1);
			
	}


}
