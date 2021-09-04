package services;

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

import dao.CommentsDAO;
import dao.OrdersDAO;
import dao.RestaurantsDAO;
import dao.UsersDAO;
import model.Comment;
import model.Order;
import model.OrderToSend;
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
		return getRestaurantsDAO().getRestaurantsCollection();
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
			users = new UsersDAO();
			
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
