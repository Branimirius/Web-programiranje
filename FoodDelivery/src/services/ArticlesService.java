package services;

import java.io.File;
import java.util.ArrayList;
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

import dao.ArticlesDAO;
import dao.OrdersDAO;
import dao.UsersDAO;
import dto.ArticleDTO;
import dto.ArticleEditDTO;
import dto.UserToRegister;
import model.Article;
import model.CustomerType;
import model.User;

@Path("/articles")
public class ArticlesService {

	@Context
	ServletContext context;
	@Context
	HttpServletRequest request;

	public ArticlesService() {
		// TODO Auto-generated constructor stub
	}

	
	@GET
	@Path("/getArticles")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Article> getArticles() {
		System.out.println("a tuj si (articles)");
		return getArticlesDAO().getArticlesCollection();
	}
	
	@GET
	@Path("/getArticlesByRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Article> getArticlesByRestaurant() {
		return getArticlesDAO().getArticlesByRestaurant(getUsersDAO().getLoggedUser().getRestaurant());
	}
	
	@GET
	@Path("/getCustomersByRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getCustomersByRestaurant() {
		UsersDAO users = getUsersDAO();
		ArrayList<String> usernames = getOrdersDAO().getCustomersByRestaurant(users.getLoggedUser().getRestaurant());		
		return users.getCustomersByUsernames(usernames);
	}

	@POST
	@Path("/addArticle")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addArticle(ArticleDTO articleToAdd) {
		System.out.println("Backend for adding article is established.");
		if (articleToAdd.name == null || articleToAdd.description == null
				|| articleToAdd.name.equals("")
				|| articleToAdd.description.equals("")) {
			System.out.println("Prazna polja" + articleToAdd.name + articleToAdd.price);
			return Response.status(400).entity("Name i description su obavezna polja.").build();
		}
		
		ArticlesDAO articlesDao = getArticlesDAO();

		if (articlesDao.searchArticle(articleToAdd.name) != null) {
			System.out.println("vec je dodat artikal");
			return Response.status(400).entity("Name koji ste uneli vec je zauzet.").build();
		} else {
			System.out.println("dodaje artikal....");
			articlesDao.addArticle(new Article(articleToAdd.name, articleToAdd.price, articleToAdd.type, getUsersDAO().getLoggedUser().getRestaurant(), articleToAdd.amount,
					articleToAdd.description, articleToAdd.imagePath, articlesDao.generateId()));
			System.out.println("dodao artikal uspesno");
			return Response.status(200).build();
		}
	}
	@POST
	@Path("/editArticle")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response editArticle(ArticleEditDTO articleToAdd) {
		System.out.println("Backend for adding article is established.");
		if (articleToAdd.name == null || articleToAdd.description == null
				|| articleToAdd.name.equals("")
				|| articleToAdd.description.equals("")) {
			System.out.println("Prazna polja" + articleToAdd.name + articleToAdd.price);
			return Response.status(400).entity("Name i description su obavezna polja.").build();
		}
		
		ArticlesDAO articlesDao = getArticlesDAO();

		if (articlesDao.searchArticleById(articleToAdd.id) == null) {
			System.out.println("ne postoji artikal");
			return Response.status(400).entity("Name koji menjate ne postoji.").build();
		} else {
			System.out.println("dodaje artikal....");
			articlesDao.editArticle(new Article(articleToAdd.name, articleToAdd.price, articleToAdd.type, getUsersDAO().getLoggedUser().getRestaurant(), articleToAdd.amount,
					articleToAdd.description, articleToAdd.imagePath, articleToAdd.id));
			System.out.println("izmenio artikal uspesno");
			return Response.status(200).build();
		}
	}
	/*
	@PostConstruct
	public void init() {
		if (context.getAttribute("articles") == null) {
			String contextPath = context.getRealPath("");
			ArticlesDAO articlesDao = new ArticlesDAO(contextPath);
			context.setAttribute("articles", articlesDao);
		}
	}
	*/
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
			users = (UsersDAO) context.getAttribute("users");
			
			context.setAttribute("users", users);
		} 
		return users;
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
}
