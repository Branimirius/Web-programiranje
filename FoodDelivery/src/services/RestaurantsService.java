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

import dao.RestaurantsDAO;
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
}