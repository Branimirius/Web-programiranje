package model;

public class ArticleInCart {
	public Article article;
	public Integer count;
	
	public ArticleInCart(Article article, Integer count) {
		this.article = article;
		this.count = count;
	}
	public ArticleInCart() {}
}
