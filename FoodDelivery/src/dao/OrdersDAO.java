package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import dto.OrderToSend;
import model.ArticleInCart;
import model.Cart;
import model.Order;

public class OrdersDAO {
	private HashMap<Integer, Order> orders;
private String ordersPath = "C:\\Users\\brani\\OneDrive\\Documents\\GitHub\\Web-programiranje\\FoodDelivery\\src";
	

	
	
	public OrdersDAO() {

		this.setOrders(new HashMap<Integer, Order>());
		//this.setCartsPath(this.cartsPath);	
		//loadTestData();
		//this.saveOrders();
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
	public Collection<Order> getOrdersCollection() {
		if (!orders.isEmpty()) {
			return orders.values();
		}
		return null;
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
			URL url = getClass().getResource("/data/orders.txt");
			file = new File(url.getPath());
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
		URL url = getClass().getResource("/data/orders.txt");		
		File f = new File(url.getPath());
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
			Order admin = new Order(1, new ArrayList<ArticleInCart>(), "zorinakrcma1", "3/7/2021 12:00",
					1000.0, "Jesse", "processing");

			Order customer = new Order(2, new ArrayList<ArticleInCart>(), "savoca1", "3/7/2021 12:00",
					1000.0, "Jesse", "preparing");
			
			Order delieveryGuy = new Order(3, new ArrayList<ArticleInCart>(), "girosmaster1", "3/7/2021 12:00",
					1000.0, "Jesse", "waiting");
			
			Order manager = new Order(4, new ArrayList<ArticleInCart>(), "crepes", "3/7/2021 12:00",
					1000.0, "Jesse", "transporting");

			orders.put(admin.getId(), admin);
			orders.put(customer.getId(), customer);
			orders.put(delieveryGuy.getId(), delieveryGuy);
			orders.put(manager.getId(), manager);
	}
	
	public void processCartOrder(Cart cart) {
		ArrayList<String> requiredRestaurants = new ArrayList<String>();
		for(ArticleInCart a : cart.getArticles()) {
			if(!requiredRestaurants.contains(a.article.getRestaurant())) {
				requiredRestaurants.add(a.article.getRestaurant());
			}
		}
		placeOrdersFromCart(cart, requiredRestaurants);
	}
	
	public void placeOrdersFromCart(Cart cart, ArrayList<String> restaurants) {
		for(String r : restaurants) {
			ArrayList<ArticleInCart> orderArticles = new ArrayList<ArticleInCart>();
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
			String currentDate = formatter.format(new Date());
			double orderPrice = 0.0;
			for(ArticleInCart a : cart.getArticles()) {
				if(a.article.getRestaurant() == r) {
					orderArticles.add(a);
					orderPrice += (a.count * a.article.getPrice());
				}
			}
			Order newOrder = new Order(generateId(), orderArticles, r, currentDate,
					orderPrice, cart.getUser(), "processing");
			this.orders.put(newOrder.getId(), newOrder);
			this.saveOrders();
		}
	}
	
	public Collection<Order> getOrdersByUser(String user){
		ArrayList<Order> retVal = new ArrayList<Order>();
		for(Order o : this.orders.values()) {
			if(o.getCustomer().equals(user)) {
				retVal.add(o);				
			}
		}
		return retVal;
	}
	
	public Collection<Order> getOrdersByDeliverer(List<Integer> demandList){
		ArrayList<Order> retVal = new ArrayList<Order>();
		for(Integer i : demandList) {
			for(Order o : this.orders.values()) {
				if(o.getId().equals(i)) {
					retVal.add(o);
					System.out.println("Delivery item: " + o.getId());
				}
			}
		}
		return retVal;
	}
	
	public Collection<Order> getWaitingOrders(){
		ArrayList<Order> retVal = new ArrayList<Order>();
		for(Order o : this.orders.values()) {
			if(o.getStatus().equals("waiting")) {
				retVal.add(o);				
			}
		}
		return retVal;
	}
	
	public Collection<Order> getOrdersByRestaurant(String restaurant){
		ArrayList<Order> retVal = new ArrayList<Order>();
		for(Order o : this.orders.values()) {
			if(o.getRestaurant().equals(restaurant)) {
				retVal.add(o);				
			}
		}
		return retVal;
	}
	
	public Order getOrderById(Integer id) {
		for(Order o : this.orders.values()) {
			if(o.getId() == id) {
				return o;
			}
		}
		return null;
	}
	
	public void cancelOrder(OrderToSend order) {
		System.out.println("usao u cancel");
		for(Order o : this.orders.values()) {
			if(o.getId() == order.id) {
				o.setStatus("cancelled");
				System.out.println("cancelled order");
			}
		}
		saveOrders();
	}
	public void deliverOrder(OrderToSend order) {
		System.out.println("usao u deliver");
		for(Order o : this.orders.values()) {
			if(o.getId() == order.id) {
				o.setStatus("delivered");
				System.out.println("delivered order");
			}
		}
		saveOrders();
	}
	
	public void processOrder(OrderToSend order) {
		System.out.println("usao u process");
		for(Order o : this.orders.values()) {
			if(o.getId() == order.id) {
				o.setStatus("preparing");
				System.out.println("processed order");
			}
		}
		saveOrders();
	}
	
	public void prepareOrder(OrderToSend order) {
		System.out.println("usao u process");
		for(Order o : this.orders.values()) {
			if(o.getId() == order.id) {
				o.setStatus("waiting");
				System.out.println("prepared order");
			}
		}
		saveOrders();
	}
	
	public void takeOrder(Integer order) {
		System.out.println("usao u takeOrder");
		for(Order o : this.orders.values()) {
			if(o.getId() == order) {
				o.setStatus("transporting");
				System.out.println("transporting order");
			}
		}
		saveOrders();
	}
	
	public ArrayList<String> getCustomersByRestaurant(String restaurant){
		ArrayList<String> retVal = new ArrayList<String>();
		for(Order o : this.orders.values()) {
			if(o.getRestaurant().equals(restaurant)) {
				retVal.add(o.getCustomer());
			}
		}
		
		return retVal;
	}
	
	public Integer generateId() {
		return this.orders.size() + 1;
	}

}
