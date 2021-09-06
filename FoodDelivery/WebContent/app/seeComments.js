function findRestaurant(restaurants, id) {
	return restaurants.find(el => el.id == id);
}

function filterComments(comments, id) {
	return comments.filter(el => el.restaurant == id);
}

Vue.component("see-comments", {
	props:['id'],
	data: function () {
		    return {
		      restaurant: { },
		      comments: [],
		      restaurantId: this.$route.params.id
		    }
	},
	template: ` 
	
	
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

	<label v-bind:hidden="comments.length != 0"> There is no comments right now. </label>
	<label v-bind:hidden="comments.length == 0"> Comments about this restaurant: </label>
	
	<div class="row">
        <div class="col-md-8">
            <div class="tab-content profile-tab" id="myTabContent">
                <div class="tab-pane fade show active" id="comments" role="tabpanel" aria-labelledby="profile-tab">
                    <ul v-for="o in comments" class="list-group">
					  <li v-show="o.approved == true" class="list-group-item">
					  		<label> {{ o.customer }}</label>
					  		<p>{{ o.text }}</p>
					  		<div v-show="o.grade == 0">
					  			<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="o.grade == 1">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="o.grade == 2">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="o.grade == 3">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="o.grade == 4">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
					  		</div>
					  		<div v-show="o.grade == 5">
						  		<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
					  		</div>
					  </li>
					</ul>
                </div>
            </div>
         </div>
	 </div>
  </div>	  
`
	, 
	methods : {
		processOrder : function(comment){
			
			axios
	        .post('rest/restaurants/processOrder',{"id": comment.id})
			.then(response => (alert("Order for " + comment.restaurant + " confirmed by manager.")));
		    location.reload();
		},
		prepareOrder : function(comment){
			
			axios
	        .post('rest/restaurants/prepareOrder',{"id": comment.id})
			.then(response => (alert("Order for " + comment.restaurant + " prepared.")));
		    location.reload();
		}
	},
		    
	mounted () {		
		axios
        .get('rest/restaurants/getRestaurants')
        .then(response => (this.restaurant = findRestaurant(response.data, this.restaurantId)));
	    
        axios
        .get('rest/restaurants/getComments')
        .then(response => (this.comments = filterComments(response.data, this.restaurantId)));
        
    }
});