package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Restoran;
import dao.RestaurantsDAO;
import data.RestoraniDAO;
import model.Restaurant;

@Path("/restaurant")
public class RestaurantsService {

	@Context
	ServletContext context;

	@Context
	HttpServletRequest request;

	public RestaurantsService() {
		// TODO Auto-generated constructor stub
	}

	
	@GET
	@Path("/restaurants")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> getRestaurants() {
		RestaurantsDAO restoraniDao = (RestaurantsDAO) context.getAttribute("restaurants");
		return restoraniDao.getRestoraniKolekcija();
	}

	@PostConstruct
	public void init() {
		if (context.getAttribute("restaurants") == null) {
			String contextPath = context.getRealPath("");
			RestaurantsDAO restoraniDao = new RestaurantsDAO(contextPath);
			context.setAttribute("restaurants", restoraniDao);
		}
	}
}
