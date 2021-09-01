Vue.component("delivery-orders", {
	data: function () {
		    return {
		      user: null,
		      orders: []
		    }
	},
	template: ` 
	
	
<div class="container emp-profile" v-if="user">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img v-bind:src="user.imagePath" alt=""/>
                            <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" accept=".jpg, .jpeg, .png" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                            <h5>
                                {{ user.name }}
                            </h5>
                            <h6>
                                {{ user.role }}
                            </h6>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#/delivery-profile" role="tab" aria-controls="profile" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#/delivery-orders" role="tab" aria-controls="delivery-orders" aria-selected="false">Deliveries</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="profile-tab">
                                <ul v-for="o in orders" class="list-group">
								  <li class="list-group-item">
								  		<label> {{ o.restaurant }}</label>
								  		<p>{{ o.customer }}</p>
								  		<p>{{ o.status }}</p>
								  		<p>{{ o.price }}din</p>
								  		<p>{{ o.date }}</p>
								  </li>
								</ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>	  
`
	, 
	methods : {
		cancelOrder : function(order){
			
			axios
	        .post('rest/user/cancelOrder',{"id": order.id})
			.then(response => (alert("Order from " + order.restaurant + " sucessfully cancelled")));
		    
		}
	},
		    
	mounted () {		
		axios
        .get('rest/user/loggedUser')
        .then(response => (this.user = response.data));
	    
    	axios
        .get('rest/user/activeDemands')
        .then(response => (this.orders = response.data));
    }
});