Vue.component("restaurant-comments", {
	data: function () {
		    return {
		      restaurant: { },
		      comments: []
		    }
	},
	template: ` 
	
	
<div class="container emp-profile" v-if="restaurant">

	
    <div class="row">
        <div class="col-md-4">
            <div class="profile-img">
                <img v-bind:src="restaurant.logoPath" alt=""/>
                <div class="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" accept=".jpg, .jpeg, .png" name="file"/>
                </div>
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
        <div class="col-md-2">
            <button class="profile-edit-btn" name="btnAddMore" value="Edit"/>
        </div>
    </div>

	<label v-bind:hidden="comments.length != 0"> There is no comments right now. </label>
	<label v-bind:hidden="comments.length == 0"> Comments about your restaurant: </label>
	
	<div class="row">
        <div class="col-md-8">
            <div class="tab-content profile-tab" id="myTabContent">
                <div class="tab-pane fade show active" id="comments" role="tabpanel" aria-labelledby="profile-tab">
                    <ul v-for="o in comments" class="list-group">
					  <li class="list-group-item">
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
					  		<button v-show="o.approved == false" v-on:click="approveComment(o)" style="float: right;" type="button" class="btn btn-primary btn-sm">Approve</button>
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
		approveComment : function(comment){
			
			axios
	        .post('rest/restaurants/approveComment',{"id": comment.id})
			.then(response => (alert("Comment will be approved by manager.")));
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
        .get('rest/restaurants/activeRestaurant')
        .then(response => (this.restaurant = response.data));
	    
        axios
        .get('rest/restaurants/restaurantComments')
        .then(response => (this.comments = response.data));
        
        
        
        
    }
});