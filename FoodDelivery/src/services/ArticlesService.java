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

import dao.ArticlesDAO;
import model.Article;

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
}
