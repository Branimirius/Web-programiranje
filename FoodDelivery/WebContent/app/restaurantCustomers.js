Vue.component("restaurant-customers", {
	data: function () {
		    return {
		      customers: null,
		      user: this.$root.$data.user
		    }
	},
	template: ` 
		
		<tbody class = "articles">
			  <div class = "orange-title">Customers of your restaurant: </div>
			  <a class = "articles" style="background: #d3d3d3d3; opacity: 0.9; height: 50px;" href="#/restaurant-comments">Comments</a>
			  <ul class = "articles" v-for="a in customers">
			    <li class = "articles">
			      <img class = "articles" v-bind:src="a.imagePath" style="width: 5rem; height: 5rem; opacity: 1; float: right;" />
			      <h3> {{ a.name }} {{a.surname}} </h3>
			      <a class = "articles" style="background: #d3d3d3d3; opacity: 0.9; height: 50px;" href="#/restaurant-orders">See orders</a>
			      
			    </li>
			  </ul>
		</tbody>
	
`
	, 
	
	mounted () {
    	//this.restaurants = ["5", "6"]   	
        axios
        .get('rest/articles/getCustomersByRestaurant')
        .then(response => (this.customers = response.data))
        
//        axios
//        .get('rest/user/loggedUser')
//        .then(response => (this.user = response.data))
        
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