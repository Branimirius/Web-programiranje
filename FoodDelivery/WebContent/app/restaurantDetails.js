function filterArticles(articles, id) {
	
	return articles.filter(el => el.restaurant == id);
}
Vue.component("restaurant-details", {
	props:['id'],
	data: function () {
		    return {
		      articles: null,
		      filteredArticles: null,
		      total: 0,
		      restaurantId: this.$route.params.id
		    }
	},
		
	template: ` 
		
		<tbody class = "articles">
		  <div class = "orange-title">Available articles in {{ restaurantId }}:</div>
		  <ul class = "articles" v-for="a in articles">
		    <li class = "articles">
		      <img class = "articles" v-bind:src="a.picturePath" style="width: 5rem; height: 5rem; opacity: 1; float: right;" />
		      <h3> {{ a.name }} </h3>
		      <p> {{ a.description }} </p>
		      {{ a.price }}din
		      <button v-on:click="addToCart(a)" style="float: right;" >Dodaj u korpu</button>
		    </li>
		      
		    
		  </ul>
		</tbody>
		
	
	
`
	, 
	methods : {
		addToCart : function(article) {
    		axios
			.post('rest/user/addToCart', {"id": article.id, "count": 1})
			.then(response => (alert('Article ' + article.name + " added to the Shopping Cart")))
		}
	},
	mounted () {
        axios
          .get('rest/articles/getArticles')
          .then(response => (this.articles = filterArticles(response.data, this.restaurantId)));
        console.log(this.id);
        //this.filteredArticles = response.data.filter(el => el.restaurant == this.id)
    }
});