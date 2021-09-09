Vue.component("articles-show", {
	data: function () {
		    return {
		      articles: null,
		      count: 1
		    }
	},
	template: ` 
		
		<tbody class = "articles">
		  <ul class = "articles" v-for="a in articles">
		    <li class = "articles">
		      <img class = "articles" v-bind:src="a.picturePath" style="width: 5rem; height: 5rem; opacity: 1; float: right;" />
		      <h3> {{ a.name }} </h3>
		      <p> {{ a.description }} </p>
		      {{ a.price }}din
		      <button class="btn btn-secondary" v-on:click="addToCart" style="float: right;" >Dodaj u korpu</button>
		      <input type="number" class="form-control" style="float: right; height: 10%; width: 15%;" v-model = "count">
		    </li>
		      
		    
		  </ul>
		</tbody>
	
`
	, 
	
	mounted () {
    	//this.restaurants = ["5", "6"]   	
        axios
        .get('rest/articles/getArticles')
        .then(response => (this.articles = response.data))
        
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
			.post('rest/user/addToCart', {"id": article.id, "count": this.count})
			.then(response => (toast('Article ' + article.name + " added to the Shopping Cart")))
		}
    		
    
    }
});