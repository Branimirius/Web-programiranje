package services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
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
import model.Cart;
import model.Comment;
import model.CustomerType;
import model.Order;
import model.User;
import dto.ArticleDTO;
import dto.ArticleToAdd;
import dto.FeedbackDTO;
import dto.OrderToSend;
import dto.UserRegistrationByAdminDTO;
import dto.UserToLog;
import dto.UserToRegister;
import sun.security.action.GetLongAction;
import dao.ArticlesDAO;
import dao.CartsDAO;
import dao.CommentsDAO;
import dao.OrdersDAO;
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
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (context.getAttribute("users") == null) {
	    	context.setAttribute("users", new UsersDAO());
		}
	}
	
	@GET
	@Path("/users")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsers() {
		UsersDAO usersDao = getUsersDAO();
		return usersDao.getUsersCollection();
	}

	@GET
	@Path("/getManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getManagers() {
		UsersDAO usersDao = getUsersDAO();
		return usersDao.getManagersCollection();
	}

	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response register(UserToRegister userToRegister) {
		System.out.println("Backend for registration is established.");
		if (userToRegister.getUsername() == null || userToRegister.getPassword() == null
				|| userToRegister.getUsername().equals("")
				|| userToRegister.getPassword().equals("")) {
			System.out.println("Prazna polja" + userToRegister.getUsername() + userToRegister.getPassword());
			return Response.status(400).entity("Username, password i email su obavezna polja.").build();
		}
		
		UsersDAO usersDao = getUsersDAO();

		if (usersDao.searchUser(userToRegister.getUsername()) != null) {
			System.out.println("vec je registrovan lik");
			return Response.status(400).entity("Username koji ste uneli vec je zauzet.").build();
		} else {
			System.out.println("dodaje lika....");
			usersDao.addUser(new User(userToRegister.username, userToRegister.password, userToRegister.name, userToRegister.surname, userToRegister.gender,
					userToRegister.date, "customer", getCartsDAO().generateId(), 0, new CustomerType("bronze"), null, null));
			System.out.println("dodao lika uspesno");
			return Response.status(200).build();
		}
	}
		
	@POST
	@Path("/createUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createUser(UserRegistrationByAdminDTO userToRegister) {
		System.out.println("Backend for registration is established."+ userToRegister.getUsername() + "  " + userToRegister.getRole());
		
		UsersDAO usersDao = getUsersDAO();

		if (usersDao.searchUser(userToRegister.getUsername()) != null) {
			System.out.println("vec je registrovan lik");
			return Response.status(400).entity("Username koji ste uneli vec je zauzet.").build();
		} else {
			System.out.println("dodaje lika...." + userToRegister.getUsername());
			usersDao.addUser(new User(userToRegister.getUsername(), userToRegister.getPassword(), userToRegister.getName(), userToRegister.getSurname(), userToRegister.getGender(),
					userToRegister.getDate(), userToRegister.getRole(), null, 0, null, null, userToRegister.getFree()));
			System.out.println("dodao lika uspesno");
			return Response.status(200)
							.entity(usersDao.getManagersCollection())
							.build();
		}
	}

	@POST
	@Path("/deleteUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteUser(String username) {
		System.out.println("Obrisan " + username);
		
		UsersDAO usersDao = getUsersDAO();

		if (usersDao.searchUser(username) == null) {
			System.out.println("Korisnik " + username + "ne postoji");
			return Response.status(400).entity("Username koji ste uneli ne postoji.").build();
		} else {
			System.out.println("brise " + username);
			usersDao.deleteUser(username);

			return Response.status(200)
							.entity(usersDao.getUsersCollection())
							.build();
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
			System.out.println("ODJAVA");
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
		if(u == null) {
			System.out.println("Niko nije ulogovan. ");
			return null;
		}
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
		getActiveCart().calculatePrice();
		
		return "OK";
	}
	
	@POST
	@Path("/addToCart")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String add(ArticleToAdd a) {
		if(getActiveCart() == null) {
			System.out.println("Korisnik nije ulogovan ili nije ulogovan na nalog kupca.");
			
		}
		else {
			CartsDAO carts = getCartsDAO();
			Cart temp = getActiveCart();
			temp.addArticle(getArticlesDAO().getArticle(a.id), a.count);
			temp.calculateDiscountedPrice(getUsersDAO().getLoggedUser().getType().getDiscount());
			carts.getCarts().put(temp.getId(), temp);
			carts.saveCarts();
			System.out.println("Product " + getArticlesDAO().getArticle(a.id)
					+ " added with count: " + a.count);
		}
		return "OK";
	}
	@POST
	@Path("/placeOrder")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String placeOrder() {
		OrdersDAO orda = getOrdersDAO();
		UsersDAO users = getUsersDAO();
		orda.processCartOrder(getActiveCart());		
		users.getLoggedUser().calculateBonus(getActiveCart().getPrice());
		users.saveUsers();
		return "OK";
	}
	
	@GET
	@Path("/activeOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> activeOrders() {
		return getOrdersDAO().getOrdersByUser(getUsersDAO().getLoggedUser().getUsername());	
	}

	@GET
	@Path("/activeDemands")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> activeDemands() {
		return getOrdersDAO().getOrdersByDeliverer(getUsersDAO().getLoggedUser().getDemandList());
		
	}
	
	@GET
	@Path("/waitingOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> waitingOrders() {
		return getOrdersDAO().getWaitingOrders();
		
	}
	
	@POST
	@Path("/cancelOrder")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String cancelOrder(OrderToSend order) {
		OrdersDAO orda = getOrdersDAO();
		UsersDAO users = getUsersDAO();
		System.out.println("stigao na backend za cancel");
		orda.cancelOrder(order); 
		users.getLoggedUser().calculatePunishment(orda.getOrderById(order.id).getPrice());
		users.saveUsers();
		return "OK";
	}
	
	@POST
	@Path("/deliverOrder")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String deliverOrder(OrderToSend order) {
		OrdersDAO orda = getOrdersDAO();
		System.out.println("stigao na backend za deliver");
		orda.deliverOrder(order); 
		return "OK";
	}
	
	@POST
	@Path("/deleteOrder")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String deleteOrder(OrderToSend order) {
		UsersDAO usersDao = getUsersDAO();
		System.out.println("stigao na backend za delete");
		usersDao.getLoggedUser().removeDemand(order.id);
		usersDao.saveUsers();
		return "OK";
	}
	
	
	@POST
	@Path("/takeOrder")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String takeOrder(OrderToSend order) {		
		System.out.println("stigao na backend za dostavu");
		UsersDAO users = getUsersDAO();
		getOrdersDAO().takeOrder(order.id);
		users.getLoggedUser().addDemand(order.id);
		users.saveUsers();
		return "OK";
	}
	
	@POST
	@Path("/addFeedback")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addFeedback(FeedbackDTO feedbackToAdd) {
		System.out.println("Backend for adding feedback is established.");
		if (feedbackToAdd.text == null || feedbackToAdd.grade == null
				|| feedbackToAdd.text.equals("")) {
			System.out.println("Prazna polja" + feedbackToAdd.text + feedbackToAdd.grade);
			return Response.status(400).entity("Empty").build();
		}
		
		CommentsDAO commentsDao = getCommentsDAO();
		
		System.out.println("dodaje komentar...." + feedbackToAdd.restaurant + " " + feedbackToAdd.text);
		commentsDao.addComment(new Comment(getUsersDAO().getLoggedUser().getUsername(), feedbackToAdd.restaurant, feedbackToAdd.text, feedbackToAdd.grade, commentsDao.generateId()));
		System.out.println("dodao komentar uspesno");
		return Response.status(200).build();
		
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
	private OrdersDAO getOrdersDAO() {
		System.out.println("making orders dao");
		OrdersDAO orders = (OrdersDAO) context.getAttribute("orders");
		if (orders == null) {
			orders = new OrdersDAO();
			
			context.setAttribute("orders", orders);
		} 
		return orders;
	}
	
	public Cart getActiveCart() {

		UsersDAO usersDao = getUsersDAO();
		CartsDAO cartsDao = getCartsDAO();
		User u = usersDao.getLoggedUser();
		if(u == null) {
			return null;
		}
		Cart cart = cartsDao.getCartByUser(u.getCart());
		if(cart == null) {
			cart = new Cart(new ArrayList<ArticleInCart>(), u.getUsername(), 0.0, u.getCart());
			cartsDao.addCart(cart);
		}
		cart.calculateDiscountedPrice(u.getType().getDiscount());
		return cart;
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