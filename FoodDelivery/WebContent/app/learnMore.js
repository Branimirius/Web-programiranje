function filterArticles(articles, id) {
	
	return articles.filter(el => el.restaurant == id);
}

function findRestaurant(restaurants, id){
	return restaurants.find(el => el.id == id);
}
Vue.component("learn-more", {
	props:['id'],
	data: function () {
		    return {
		      articles: null,
		      restaurant: { },
		      restaurantId: this.$route.params.id
		    }
	},
		
	template: ` 

<tbody class = "articles">
	<div class="container emp-profile" v-if="restaurant">
		<div class="row">
		    <div class="col-md-4">
		        <div class="profile-img">
		            <img v-bind:src="restaurant.logoPath" alt=""/>
		        </div>
		    </div>
		    <div class="col-md-6">
		        <div class="profile-head">
		                    <h5>
		                        {{ restaurant.name }}
		                    </h5>
		                    <h6>
		                        {{ restaurant.title }}
		                    </h6>
		                    <p class="proile-rating">TYPE : <span> {{ restaurant.type }} </span></p>
		        </div>
		    </div>
		</div>
	</div>
	<div class = "orange-title">Articles in restaurant: </div>
	<ul class = "articles" v-for="a in articles">
	   <li class = "articles">
	      <img class = "articles" v-bind:src="a.picturePath" style="width: 5rem; height: 5rem; opacity: 1; float: right;" />
	      <h3> {{ a.name }} </h3>
	      <p> {{ a.description }} </p>
	      {{ a.price }}din
	      <button v-on:click="addToCart(a)" style="float: right;" >Add to cart</button>
	    
	    </li>
	</ul>
</tbody>	  
`
	, 
	methods : {
		addToCart : function(article) {
			alert("You have to log in first.");
			window.location.href = "http://localhost:3665/FoodDelivery/login.html";
		}
	},
	mounted () {
        axios
          .get('rest/articles/getArticles')
          .then(response => (this.articles = filterArticles(response.data, this.restaurantId)));
        axios
        .get('rest/restaurants/getRestaurants')
        .then(response => (this.restaurant = findRestaurant(response.data, this.restaurantId)));
  
	}
});