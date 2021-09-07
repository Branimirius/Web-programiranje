function sortByWorking(restaurants){
	return restaurants.sort((a, b) => (!a.working) ? 1 : -1);
}

Vue.component("articles-show-home", {
	data: function () {
		    return {
		      articles: null,
		      restaurants: [],
		      user: {}
		    }
	},
	template: ` 
		
		<tbody class = "articles">
			<div v-if="user.role == 'customer'">
			  <div class = "orange-title">Izdvajamo iz ponude:</div>
			  <ul class = "articles" v-for="a in articles">
			    <li class = "articles">
			      <img class = "articles" v-bind:src="a.picturePath" style="width: 5rem; height: 5rem; opacity: 1; float: right;" />
			      <h3> {{ a.name }} </h3>
			      <p> {{ a.description }} </p>
			      {{ a.price }}din
			      <button v-on:click="addToCart(a)" style="float: right;" >Dodaj u korpu</button>
			    </li>
			  </ul>
			</div>
			
			<div v-if="user.role == 'deliveryGuy'">
			  <div class = "orange-title">Welcome, {{ user.name }} (deliverer profile)</div>
			  
			</div>
			<div v-if="user.role == 'manager'">
			  <div class = "orange-title">Welcome, {{ user.name }} (manager profile)</div>
			  
			</div>
			<div v-if="user.role == 'admin'">
			  <div class = "orange-title">Welcome, {{ user.name }} (admin profile)</div>
			  
			</div>
			<div v-show="user.role != 'customer'" v-for="s in restaurants">            
	             <div class="card-content" >
	                <img class="card-img-top" v-bind:src="'pictures/' + s.type + '.png'"
	                    alt="Card image cap" style="width: 5rem; z-index: 500;" >
	                <img class="card-img-top" v-bind:src="s.logoPath"
	                    alt="Card image cap" style="width: 20rem; height: 10rem; opacity: 1; float: right;" >
		                                        
	                <div >
		                  <div class="card-body" >
		                    <a v-bind:href="'#/restaurant-details/'+ s.id" >
		                        <h5 class="card-title">{{ s.name }}</h5>
		                    </a>
		                    <p class="card-text"> {{ s.title }} </p>
		                    <p class="proile-rating">STATUS : 
	            				<span v-if="s.working"> Open </span>
	            				<span v-else> Closed </span>
	            			</p>
	            			<p class="proile-rating" style="float : right;"><span> {{s.location.adress}} </span></p>
		                    <div v-show="s.grade == 0">
					  			<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="s.grade == 1">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="s.grade == 2">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="s.grade == 3">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="s.grade == 4">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="s.grade == 5">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
					  		</div>
					  		<a v-bind:href="'#/see-comments/'+ s.id">
		                        <b>See comments</b>
		                    </a>
		                  </div>	                  
		            </div>
	             </div>
	                                                
	          </div>   
			</div>
		</tbody>
	
`
	, 
	
	mounted () {
    	//this.restaurants = ["5", "6"]   	
        axios
        .get('rest/articles/getArticles')
        .then(response => (this.articles = response.data))
        
        axios
        .get('rest/user/loggedUser')
        .then(response => (this.user = response.data))
        
        axios
        .get('rest/restaurants/getRestaurants')
        .then(response => (this.restaurants = sortByWorking(response.data)))
        
        
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