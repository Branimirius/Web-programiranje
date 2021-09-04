Vue.component("restaurant-articles", {
	data: function () {
		    return {
		      articles: null,
		      user: {}
		    }
	},
	template: ` 
		
		<tbody class = "articles">
			  <div class = "orange-title">Articles in your restaurant: </div>
			  <a class = "articles" style="background: #d3d3d3d3; opacity: 0.9; height: 50px;" href="#/add-article">Add Article</a>
			  <ul class = "articles" v-for="a in articles">
			    <li class = "articles">
			      <img class = "articles" v-bind:src="a.picturePath" style="width: 5rem; height: 5rem; opacity: 1; float: right;" />
			      <h3> {{ a.name }} </h3>
			      <p> {{ a.description }} </p>
			      {{ a.price }}din
			    </li>
			  </ul>
		</tbody>
	
`
	, 
	
	mounted () {
    	//this.restaurants = ["5", "6"]   	
        axios
        .get('rest/articles/getArticlesByRestaurant')
        .then(response => (this.articles = response.data))
        
        axios
        .get('rest/user/loggedUser')
        .then(response => (this.user = response.data))
        
    },
	methods: {
    	selectRestaurant : function(restaurant) {
    		if (this.mode == 'BROWSE') {
    			this.selectedRestaurant = restaurant;
    		}    
    	},
    	getFlagIcon : function(index){
    		return 'pictures/' + this.restaurants[index].type + '.png';
    	},
    	addToCart : function(article) {
    		axios
			.post('rest/user/addToCart', {"id": article.id, "count": 1})
			.then(response => (toast('Article ' + article.name + " added to the Shopping Cart")))
		}
    	
    		
    
    }
});