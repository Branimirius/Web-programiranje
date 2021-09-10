Vue.component("deliveries", {
	data: function () {
		    return {
		      user: this.$root.$data.user,
		      orders: []
		    }
	},
	template: ` 
	
	
<div class="container emp-profile" v-if="user">
	<label v-bind:hidden="orders.length != 0"> There is no orders to deliver right now. </label>
	<label v-bind:hidden="orders.length == 0"> Orders ready for delivery: </label>
	
	<div class="row">
        <div class="col-md-8">
            <div class="tab-content profile-tab" id="myTabContent">
                <div class="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="profile-tab">
                    <ul v-for="o in orders" class="list-group">
					  <li class="list-group-item">
					  		<label> {{ o.restaurant }}</label>
					  		<p>{{ o.status }}</p>
					  		<p>{{ o.price }}din</p>
					  		<p>{{ o.date }}</p>
					  		<button v-on:click="takeOrder(o)" style="float: right;" >Take delivery</button>
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
		takeOrder : function(order){
			
			axios
	        .post('rest/user/takeOrder',{"id": order.id})
			.then(response => (alert("Order for " + order.restaurant + " awaiting confirmation from manager.")));
		    location.reload();
		}
	},
		    
	mounted () {		
//		axios
//        .get('rest/user/loggedUser')
//        .then(response => (this.user = response.data));
//	    
        axios
        .get('rest/user/waitingOrders')
        .then(response => (this.orders = response.data));
        
        
        
        
    }
});