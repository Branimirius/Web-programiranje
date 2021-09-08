package services;

import java.io.File;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import dao.CommentsDAO;
import dao.OrdersDAO;
import dao.RestaurantsDAO;
import dao.UsersDAO;
import dto.CommentDTO;
import dto.OrderToSend;
import dto.RestaurantToSend;
import dto.RestaurantDTO;
import model.Comment;
import model.Location;
import model.Order;
import model.Restaurant;

@Path("/restaurants")
public class RestaurantsService {

	@Context
	ServletContext context;
	@Context
	HttpServletRequest request;

	public RestaurantsService() {
		// TODO Auto-generated constructor stub
	}

	
	@GET
	@Path("/getRestaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> getRestaurants() {
		System.out.println("a tuj si (restaurants)");
		getRestaurantsDAO().calculateGrades(getCommentsDAO().getCommentsCollection());
		return getRestaurantsDAO().getRestaurantsCollection();
	}

	@POST
	@Path("/createRestaurant")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createRestaurant(RestaurantDTO restaurant) {
		System.out.println("Backend for registration is established. | "+ restaurant.getManager() + "  " + restaurant.getName()
		+ " logo->" + restaurant.getLogo());
		
		RestaurantsDAO restaurants = getRestaurantsDAO();

		if (restaurants.searchRestaurant(restaurant.getId()) != null) {
			System.out.println("vec je registrovan restoran");
			return Response.status(400).entity("Id koji ste uneli vec je zauzet.").build();
		} else {
			System.out.println("dodaje lika...." + restaurant.getId());
			restaurants.addRestaurant(new Restaurant(restaurant.getName(), restaurant.getType(), false, 
					new Location(restaurant.getGeoLength(), restaurant.getGeoWidth(), restaurant.getAdress(), restaurant.getZipCode()), 
					"pictures" + File.separator + restaurant.getLogo(), restaurant.getId(), "", restaurant.getManager()));
			System.out.println("dodat restoran uspesno");
			return Response.status(200).build();
		}
	}
	
	@GET
	@Path("/getComments")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getComments() {
		System.out.println("a tuj si (Comments)");
		return getCommentsDAO().getCommentsCollection();
	}
	
	@GET
	@Path("/restaurantOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> waitingOrders() {
		return getOrdersDAO().getOrdersByRestaurant(getUsersDAO().getLoggedUser().getRestaurant());
	}
	
	@GET
	@Path("/restaurantComments")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> restaurantComments() {
		return getCommentsDAO().getCommentsByRestaurant(getUsersDAO().getLoggedUser().getRestaurant());
	}
	
	@GET
	@Path("/activeRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant activeRestaurant() {
		return getRestaurantsDAO().getActiveRestaurant(getUsersDAO().getLoggedUser().getRestaurant());
	}
	
	@POST
	@Path("/toggleRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String toggleWorking(RestaurantToSend restaurant) {
		
		System.out.println("stigao na backend za toggle");
		getRestaurantsDAO().toggleWorking(restaurant.id);
		return "OK";
	}
	
	@POST
	@Path("/processOrder")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String processOrder(OrderToSend order) {
		OrdersDAO orda = getOrdersDAO();
		System.out.println("stigao na backend za process");
		orda.processOrder(order); 
		return "OK";
	}
	
	@POST
	@Path("/prepareOrder")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String prepareOrder(OrderToSend order) {
		OrdersDAO orda = getOrdersDAO();
		System.out.println("stigao na backend za prepare");
		orda.prepareOrder(order); 
		return "OK";
	}
	
	@POST
	@Path("/approveComment")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String approveComment(CommentDTO comment) {
		getCommentsDAO().approveComment(comment.id);
		return "OK";
	}

	/*
	@PostConstruct
	public void init() {
		if (context.getAttribute("restaurants") == null) {
			String contextPath = context.getRealPath("");
			RestaurantsDAO restaurantsDao = new RestaurantsDAO(contextPath);
			context.setAttribute("restaurants", restaurantsDao);
		}
	}
	*/
	private RestaurantsDAO getRestaurantsDAO() {
		System.out.println("making restaurants dao");
		RestaurantsDAO restaurants = (RestaurantsDAO) context.getAttribute("restaurants");
		if (restaurants == null) {
			restaurants = new RestaurantsDAO();
			
			context.setAttribute("restaurants", restaurants);
		} 
		return restaurants;
	}
	
	private OrdersDAO getOrdersDAO() {
		System.out.println("making orders dao");
		OrdersDAO orders = (OrdersDAO) context.getAttribute("orders");
		if (orders == null) {
			orders = new OrdersDAO();
			
			context.setAttribute("orders", orders);
		} 
		return orders;
	}
	
	private UsersDAO getUsersDAO() {
		System.out.println("making users dao");
		UsersDAO users = (UsersDAO) context.getAttribute("users");
		if (users == null) {
			users = (UsersDAO) context.getAttribute("users");
			
			context.setAttribute("users", users);
		} 
		return users;
	}
	
	private CommentsDAO getCommentsDAO() {
		System.out.println("making comments dao");
		CommentsDAO comments = (CommentsDAO) context.getAttribute("comments");
		if (comments == null) {
			comments = new CommentsDAO();
			
			context.setAttribute("comments", comments);
		} 
		return comments;
	}
}
