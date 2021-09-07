Vue.component("restaurant", {
	data: function () {
		    return {
		      restaurant: { },
		      orders: []
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

	<label v-bind:hidden="orders.length != 0"> There is no orders right now. </label>
	<label v-bind:hidden="orders.length == 0"> Orders in your restaurant: </label>
	
	<div class="row">
        <div class="col-md-8">
            <div class="tab-content profile-tab" id="myTabContent">
                <div class="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="profile-tab">
                    <ul v-for="o in orders" class="list-group">
					  <li class="list-group-item">
					  		<label> {{ o.customer }}</label>
					  		<p>{{ o.status }}</p>
					  		<p>{{ o.price }}din</p>
					  		<p>{{ o.date }}</p>
					  		<button v-on:click="processOrder(o)" v-bind:hidden="o.status != 'processing'" style="float: right;" >Process order</button>
					  		<button v-on:click="prepareOrder(o)" v-bind:hidden="o.status != 'preparing'" style="float: right;" >Prepare order</button>
					  
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
		processOrder : function(order){
			
			axios
	        .post('rest/restaurants/processOrder',{"id": order.id})
			.then(response => (alert("Order for " + order.restaurant + " confirmed by manager.")));
		    location.reload();
		},
		prepareOrder : function(order){
			
			axios
	        .post('rest/restaurants/prepareOrder',{"id": order.id})
			.then(response => (alert("Order for " + order.restaurant + " prepared.")));
		    location.reload();
		}
	},
		    
	mounted () {		
		axios
        .get('rest/restaurants/activeRestaurant')
        .then(response => (this.restaurant = response.data));
	    
        axios
        .get('rest/restaurants/restaurantOrders')
        .then(response => (this.orders = response.data));
        
        
        
        
    }
});