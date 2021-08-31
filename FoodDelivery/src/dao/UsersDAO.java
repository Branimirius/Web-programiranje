package dao;

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

import model.CustomerType;
import model.User;


public class UsersDAO {

	private HashMap<String, User> users;
	private String usersPath = "C:\\Users\\brani\\OneDrive\\Documents\\GitHub\\Web-programiranje\\FoodDelivery\\src";
	private User loggedUser;
	
	
	public UsersDAO() {

		this.setUsers(new HashMap<String, User>());
		//this.loadTestData();
		//this.saveUsers();
		loadUsers(usersPath);
	}

	public HashMap<String, User> getUsers() {
		if(!users.isEmpty()) {
			return users;
		}
		else {
			return null;
		}
	}

	public void setUsers(HashMap<String, User> users) {
		this.users = users;
	}

	public String getUsersPath() {
		return usersPath;
	}

	public void setUsersPath(String usersPath) {
		this.usersPath = usersPath;
	}
	
	public User searchUser(String username) {
		if (getUsers() != null) {
			for (User k : getUsers().values()) {
				if (k.getUsername().equals(username)) {
					return k;
				}
			}
		}
		return null;
	}
	
	public void addUser(User k) {
		getUsers().put(k.getUsername(), k);
		saveUsers();
	}
	
	// Ucitavanje korisnika iza fajla korisnici.txt
	@SuppressWarnings("unchecked")
	private void loadUsers(String contextPath) {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File(contextPath + "/data/users.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
						VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, String.class, User.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			users = ((HashMap<String, User>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String stringUsers = objectMapper.writeValueAsString(users);
				fileWriter.write(stringUsers);

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
	public void saveUsers() {
		File f = new File(usersPath + "/data/users.txt");
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringUsers = objectMapper.writeValueAsString(users);
			fileWriter.write(stringUsers);
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
		System.out.println("Saved users");
	}
	
	// Ucitavanje test podataka korisnika
	private void loadTestData() {
		
		User admin = new User("Mike", "1234", "Mike", "Ehrmantraut", "M",
				"3/3/1946", "admin", 0, 0, null, null);

		User customer = new User("Jesse", "1234", "Jesse", "Pinkman", "M",
				"3/3/1988", "customer", 1, 0, new CustomerType("gold"), null);
		
		User delieveryGuy = new User("Gus", "1234", "Gustavo", "Fring", "M",
				"3/3/1966", "delieveryGuy", 0, 0, null, null);
		
		User manager = new User("Heisenberg", "1234", "Walter", "White", "M",
				"3/3/1955", "manager", 0, 0, null, null);

		users.put(admin.getUsername(), admin);
		users.put(customer.getUsername(), customer);
		users.put(delieveryGuy.getUsername(), delieveryGuy);
		users.put(manager.getUsername(), manager);
		
		System.out.println("loaded user test data");
	}
	public Collection<User> getUsersCollection() {
		if (!users.isEmpty()) {
			return users.values();
		}

		return null;
	}

	public User getLoggedUser() {
		if(loggedUser == null) {
			return null;
		}
		return loggedUser;
	}

	public void setLoggedUser(User loggedUser) {
		this.loggedUser = loggedUser;
	}
	

}
