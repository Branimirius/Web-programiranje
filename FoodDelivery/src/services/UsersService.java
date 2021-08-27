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

import model.Article;
import model.ArticleInCart;
import model.ArticleToAdd;
import model.Cart;
import model.User;
import model.UserToLog;
import sun.security.action.GetLongAction;
import dao.ArticlesDAO;
import dao.CartsDAO;
import dao.UsersDAO;
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
		UsersDAO usersDao = getUsersDAO();
		
		if(usersDao.getLoggedUser() != null) {
			session.invalidate();
			usersDao.setLoggedUser(null);
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
			System.out.println("ulogovani lik je: " + user.getName());
			return user;
			
		} else {
			System.out.println("ulogovani lik je: " + user.getName());
			return null;
			
		}
		
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(UserToLog userToLogIn) {
		System.out.println("Backend for log in is established.");
		HttpSession session = request.getSession();

		if (userToLogIn.getUsername() == null || userToLogIn.getPassword() == null
				|| userToLogIn.getUsername().equals("") || userToLogIn.getPassword().equals("")) {
			return Response.status(400).entity("Prilikom logovanja unesite korisnicko ime i sifru!").build();

		}
		
		UsersDAO usersDao = getUsersDAO();

		if (usersDao.searchUser(userToLogIn.getUsername()) != null) {

			User user = usersDao.searchUser(userToLogIn.getUsername());

			if (user.getPassword().equals(userToLogIn.getPassword()) == true) {
				session.setAttribute("user", user);
				session.setAttribute("cart", new Cart());
				usersDao.setLoggedUser(user);
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
	
	@GET
	@Path("/loggedUser")
	@Produces(MediaType.APPLICATION_JSON)
	public User loggedUser() {

		UsersDAO usersDao = getUsersDAO();
		User u = usersDao.getLoggedUser();
		System.out.println("Ulogovani lik je: " + u.getName());
		return u;
		
	}
	@GET
	@Path("/activeCart")
	@Produces(MediaType.APPLICATION_JSON)
	public Cart activeCart() {

		Cart cart = getActiveCart();
		return cart;
		
	}
	@GET
	@Path("/justArticles")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<ArticleInCart> justArticles() {
		if(getActiveCart() != null) {		
			return getActiveCart().getArticles();
		}
		System.out.println("nije napunio");
		return null;
	}	
	@POST
	@Path("/clearSc")
	@Produces(MediaType.APPLICATION_JSON)
	public String clearSc() {
		getActiveCart().getArticles().clear();
		return "OK";
	}
	
	@POST
	@Path("/addToCart")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String add(ArticleToAdd a) {
		getActiveCart().addArticle(getArticlesDAO().getArticle(a.id), a.count);
		getCartsDAO().saveCarts();
		System.out.println("Product " + getArticlesDAO().getArticle(a.id)
				+ " added with count: " + a.count);
		return "OK";
	}
	
	private ArticlesDAO getArticlesDAO() {
		System.out.println("making articles dao");
		ArticlesDAO articles = (ArticlesDAO) context.getAttribute("articles");
		if (articles == null) {
			articles = new ArticlesDAO();
			
			context.setAttribute("articles", articles);
		} 
		return articles;
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
	private CartsDAO getCartsDAO() {
		System.out.println("making carts dao");
		CartsDAO carts = (CartsDAO) context.getAttribute("carts");
		if (carts == null) {
			carts = new CartsDAO();
			
			context.setAttribute("carts", carts);
		} 
		return carts;
	}
	
	public Cart getActiveCart() {

		UsersDAO usersDao = getUsersDAO();
		CartsDAO cartsDao = getCartsDAO();
		User u = usersDao.getLoggedUser();
		Cart cart = cartsDao.getCartByUser(u.getCart());
		System.out.println("KONTROLA 1: sve korpe: " );
		for(Cart c : cartsDao.getCarts().values()) {
			System.out.println("iz prve kontrole: " + c.getUser() + " " + c.getId());
		}
		
		System.out.println("---------------");
		System.out.println("KONTROLA 2: dzesijeva korpa: " + cart.getUser() + " " + cart.getId());
		System.out.println("Ulogovani lik je: " + u.getName());
		return cart;
		
	}

}