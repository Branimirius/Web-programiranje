package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import model.Order;

public class OrdersDAO {
	private HashMap<Integer, Order> orders;
	private String ordersPath = "";

	public OrdersDAO() {
		
	}
	
	public OrdersDAO(String ordersPath) {

		this.setOrders(new HashMap<Integer, Order>());
		this.setOrdersPath(ordersPath);
		
		loadOrders(ordersPath);
	}

	public HashMap<Integer, Order> getOrders() {
		if(!orders.isEmpty()) {
			return orders;
		}
		else {
			return null;
		}
	}

	public String getOrdersPath() {
		return ordersPath;
	}

	public void setOrdersPath(String ordersPath) {
		this.ordersPath = ordersPath;
	}

	public void setOrders(HashMap<Integer, Order> orders) {
		this.orders = orders;
	}
	
	// Ucitavanje korisnika iza fajla korisnici.txt
	@SuppressWarnings("unchecked")
	private void loadOrders(String contextPath) {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File(contextPath + "/data/orders.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
						VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, String.class, Order.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			orders = ((HashMap<Integer, Order>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String stringOrders = objectMapper.writeValueAsString(orders);
				fileWriter.write(stringOrders);

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
	private void saveOrders() {
		File f = new File(ordersPath + "/data/orders.txt");
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringOrders = objectMapper.writeValueAsString(orders);
			fileWriter.write(stringOrders);
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
	}
	private void loadTestData() {
		//Order(Integer id, List<Integer> articles, String restaurant, String dateTime, double price, String customer,
		//String status) {
			Order admin = new Order(1, new ArrayList<Integer>(), "zorinakrcma1", "3/7/2021 12:00",
					1000.0, "Jesse", "processing");

			Order customer = new Order(2, new ArrayList<Integer>(), "savoca1", "3/7/2021 12:00",
					1000.0, "Jesse", "preparing");
			
			Order delieveryGuy = new Order(3, new ArrayList<Integer>(), "girosmaster1", "3/7/2021 12:00",
					1000.0, "Jesse", "waiting");
			
			Order manager = new Order(4, new ArrayList<Integer>(), "crepes", "3/7/2021 12:00",
					1000.0, "Jesse", "transporting");

			orders.put(admin.getId(), admin);
			orders.put(customer.getId(), customer);
			orders.put(delieveryGuy.getId(), delieveryGuy);
			orders.put(manager.getId(), manager);
		}

}
