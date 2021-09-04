package dao;

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
import model.Comment;

public class CommentsDAO {
	private HashMap<Integer, Comment> comments;
private String commentsPath = "C:\\Users\\brani\\OneDrive\\Documents\\GitHub\\Web-programiranje\\FoodDelivery\\src";
	

	
	
	public CommentsDAO() {

		this.setComments(new HashMap<Integer, Comment>());
		//this.setCartsPath(this.cartsPath);	
		//loadTestData();
		//this.saveComments();
		loadComments(commentsPath);
		
	}

	public HashMap<Integer, Comment> getComments() {
		if(!comments.isEmpty()) {
			return comments;
		}
		else {
			return null;
		}
	}
	public Collection<Comment> getCommentsCollection() {
		if (!comments.isEmpty()) {
			return comments.values();
		}
		return null;
	}
	public String getCommentsPath() {
		return commentsPath;
	}

	public void setCommentsPath(String commentsPath) {
		this.commentsPath = commentsPath;
	}

	public void setComments(HashMap<Integer, Comment> comments) {
		this.comments = comments;
	}
	
	public void addComment(Comment k) {
		getComments().put(k.getId(), k);
		saveComments();
	}
	
	// Ucitavanje korisnika iza fajla korisnici.txt
	@SuppressWarnings("unchecked")
	private void loadComments(String contextPath) {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			URL url = getClass().getResource("/data/comments.txt");
			file = new File(url.getPath());
			//file = new File(contextPath + "/data/comments.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
						VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, String.class, Comment.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			comments = ((HashMap<Integer, Comment>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String stringComments = objectMapper.writeValueAsString(comments);
				fileWriter.write(stringComments);

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
	private void saveComments() {
		URL url = getClass().getResource("/data/comments.txt");		
		File f = new File(url.getPath());
		//File f = new File(this.commentsPath + "/data/comments.txt");
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringComments = objectMapper.writeValueAsString(comments);
			fileWriter.write(stringComments);
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
		//Comment(Integer id, List<Integer> articles, String restaurant, String dateTime, double price, String customer,
		//String status) {
			Comment admin = new Comment("Jesse", "zorinakrcma1", "Your food is delicious!",
					5, 1);

			Comment customer = new Comment("Skinny", "savoca1", "Your pizza is very good, but add a little more ham.",
					4, 2);
			
			Comment delieveryGuy = new Comment("Jesse", "savoca1", "I didn't like the spices of margarita.",
					2, 3);
			
			Comment manager = new Comment("Skinny", "crepes1", "I like those pancakes but them kinda small!",
					3, 4);

			comments.put(admin.getId(), admin);
			comments.put(customer.getId(), customer);
			comments.put(delieveryGuy.getId(), delieveryGuy);
			comments.put(manager.getId(), manager);
	}
	
	public Collection<Comment> getCommentsByRestaurant(String restaurant){
		ArrayList<Comment> retVal = new ArrayList<Comment>();
		for(Comment c : this.comments.values()) {
			if(c.getRestaurant().equals(restaurant)) {
				retVal.add(c);				
			}
		}
		return retVal;
	}
	
	public Integer generateId() {
		return this.comments.size() + 1;
	}

}
