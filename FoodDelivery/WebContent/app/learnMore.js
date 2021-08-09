function filterArticles(articles, id) {
	
	return articles.filter(el => el.restaurant == id);
}
Vue.component("learn-more", {
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
<div>
		Raspolozivi artikli {{ restaurantId }}:
		<table border="1">
		<tr bgcolor="lightgrey">
			<th>Naziv</th><th>Opis</th><th>Cena</th><th>&nbsp;</th>
			<tr bgcolor="lightgrey" v-for="a in articles" >
				<td> {{a.name}}</td>
				<td> {{a.description}}</td>
				<td> {{a.price}} </td>
				<td>
					
					<button v-on:click="addToCart(p)">Dodaj</button>
				</td>			
			</tr>
		</table>
		<br /> 
		
	
	
</div>		  
`
	, 
	methods : {
//		addToCart : function (product) {
//			axios
//			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
//			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
//		}
	},
	mounted () {
        axios
          .get('rest/articles/getArticles')
          .then(response => (this.articles = filterArticles(response.data, this.restaurantId)));
        console.log(this.id);
        //this.filteredArticles = response.data.filter(el => el.restaurant == this.id)
    }
});