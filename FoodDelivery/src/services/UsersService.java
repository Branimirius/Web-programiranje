package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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

import model.Cart;
import model.User;
import dao.UsersDAO;




@Path("/user")
public class UsersService {

	@Context
	ServletContext context;

	@Context
	HttpServletRequest request;

	public UsersService() {
		// TODO Auto-generated constructor stub
	}
	
	@GET
	@Path("/users")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsers() {
		UsersDAO usersDao = (UsersDAO) context.getAttribute("users");
		return usersDao.getUsersCollection();
	}
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response register(User userToRegister) {

		if (userToRegister.getUsername() == null || userToRegister.getPassword() == null
				|| userToRegister.getUsername().equals("")
				|| userToRegister.getPassword().equals("")) {
			return Response.status(400).entity("Username, password i email su obavezna polja.").build();
		}
		
		UsersDAO usersDao = (UsersDAO) context.getAttribute("users");

		if (usersDao.searchUser(userToRegister.getUsername()) != null) {
			return Response.status(400).entity("Username koji ste uneli vec je zauzet.").build();
		} else {
			usersDao.addUser(userToRegister);
			return Response.status(200).build();
		}
	}
		
	@GET
	@Path("/logout")
	@Produces(MediaType.APPLICATION_JSON)
	public Response logout() {
		
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		
		if(user != null) {
			session.invalidate();
			return Response.status(200).build();
		}
		else {
			return Response.status(400).entity("User je vec izlogovan!").build();
		}
	}

	@GET
	@Path("/loginstat")
	@Produces(MediaType.APPLICATION_JSON)
	public User loginStat() {

		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");

		if (user != null) {
			return user;
		} else {
			return null;
		}
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User userToLogIn) {

		HttpSession session = request.getSession();

		if (userToLogIn.getUsername() == null || userToLogIn.getPassword() == null
				|| userToLogIn.getUsername().equals("") || userToLogIn.getPassword().equals("")) {
			return Response.status(400).entity("Prilikom logovanja unesite korisnicko ime i sifru!").build();

		}
		
		UsersDAO usersDao = (UsersDAO) context.getAttribute("users");

		if (usersDao.searchUser(userToLogIn.getUsername()) != null) {

			User user = usersDao.searchUser(userToLogIn.getUsername());

			if (user.getPassword().equals(userToLogIn.getPassword()) == true) {
				session.setAttribute("user", user);
				session.setAttribute("cart", new Cart());
				return Response.status(200).build();
			} else {
				return Response.status(400).entity("Pogresan password!").build();
			}
		}

		if (session.getAttribute("user") != null) {
			return Response.status(400).entity("Vec ste ulogovani!").build();
		} else {
			return Response.status(400).entity("Logovanje nije uspesno!").build();
		}
	}

	
	@PostConstruct
	public void init() {
		
		if (context.getAttribute("users") == null) {
			String contextPath = context.getRealPath("");
			UsersDAO usersDao = new UsersDAO(contextPath);
			context.setAttribute("users", usersDao);
		}
		
		HttpSession session = request.getSession();
		if (session.getAttribute("cart") == null) {
			Cart cart = new Cart();
			session.setAttribute("cart", cart);
		}
		if (session.getAttribute("cartadmin") == null) {
			Cart cart = new Cart();
			session.setAttribute("cartadmin", cart);
		}
	}

}