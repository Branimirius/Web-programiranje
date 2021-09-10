Vue.component("deliveries", {
	data: function () {
		    return {
		      user: this.$root.$data.user,
		      orders: [],
		      backupArray: [],
		      searchText: "",
		      searchParam: "",
		      toggleCheck: false,
		      filterType: "",
		      filterStatus: "",
		      filterGrade: "",
		      sortBy: ""
		    }
	},
	template: ` 
	
	
<div class="container emp-profile" v-if="user">
	<div class="input-group">
			  <select class="form-select" v-model="searchParam" aria-label="Default select example">
				  <option value="" disabled selected hidden>Search params</option>
				  <option value="name">Name</option>
				  <option value="surname">Surname</option>
				  <option value="username">Username</option>
			  </select>
			  <div class="form-outline">
			    <input type="search" v-model="searchText" id="form1" class="form-control" />
			  </div>
			  <button type="button" v-on:click="filterRestaurants" class="btn btn-primary">Search</button>
			  <button type="button" v-on:click="resetSearch" class="btn btn-secondary">Reset</button>
			  <button type="button" v-on:click="toggleFilters" class="btn btn-secondary">Filters</button>
			
			</div>
			<div v-show="toggleCheck" class="input-group">
			  <select class="form-select" @change="onTypeChange($event)" v-model="filterType" aria-label="Default select example">
				  <option value="" disabled selected hidden>Role</option>
				  <option value="customer">customer</option>
				  <option value="deliveryGuy">delivery guy</option>
				  <option value="manager">manager</option>
			  </select>
			  <select class="form-select" @change="onStatusChange($event)" v-model="filterStatus" aria-label="Default select example">
				  <option value="" disabled selected hidden>Rank</option>
				  <option value="bronze">Bronze</option>
				  <option value="silver">Silver</option>
				  <option value="gold">Gold</option>
			  </select>
			  
			  
			</div>
			<div class="container emp-profile">
				<select class="form-select" @change="onSortChange($event)" v-model="sortBy" aria-label="Default select example">
				  <option value="" disabled selected hidden>Sort by: </option>
				  <option value="nameAsc">Name ascending</option>
				  <option value="nameDesc">Name descending</option>
				  <option value="surnameAsc">Surname ascending</option>
				  <option value="surnameDesc">Surname descending</option>
				  <option value="pointsAsc">Points ascending</option>
				  <option value="pointsDesc">Points descending</option>
			    </select>
				<label v-bind:hidden="orders.length != 0"> There is no orders that match your search. Use reset button. </label>
			</div>
		
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
		},
		filterRestaurants : function() {
    		
    		switch(this.searchParam) {
    		  case "name":
    			this.orders = this.orders.filter(el=>(el.name.toUpperCase().includes(this.searchText.toUpperCase())));
    		    break;
    		  case "surname":
    			this.orders = this.orders.filter(el=>(el.surname.toUpperCase().includes(this.searchText.toUpperCase())));
    		    break;
    		  case "username":
      			this.orders = this.orders.filter(el=>(el.username.toUpperCase().includes(this.searchText.toUpperCase())));
      		    break;
    		  default:
    			  this.orders = this.backupArray;
    		}
    	},
    	resetSearch : function(){
    		this.orders = this.backupArray;
            
    	},
    	
    	onTypeChange(event) {
    		this.orders = this.orders.filter(el=>(el.role == this.filterType));
  		    
        },
        onStatusChange(event) {
        	this.orders = this.orders.filter(el=>(el.type.name == this.filterStatus));
  		    
        },
        
        onSortChange(event) {
        	switch(this.sortBy) {
  		  case "nameAsc":
  			this.orders = sortByNameAsc(this.orders);
  			break;
  		  case "nameDesc":
  			this.orders = sortByNameDesc(this.orders);
  			break;
  		  case "surnameAsc":
  			this.orders = sortByGradeAsc(this.orders);
  			break;
  		  case "surnameDesc":
  			this.orders = sortByGradeDesc(this.orders);
  			break;
  		  case "pointsAsc":
  			this.orders = sortByAdressAsc(this.orders);
  			break;
  		  case "pointsDesc":
  			this.orders = sortByAdressDesc(this.orders);
  			break;
  		  default:
  			  this.orders = this.backupArray;
        	}
        },
        toggleFilters(){
        	if(this.toggleCheck){
        		this.toggleCheck = false;
        	}
        	else{
        		this.toggleCheck = true;
        	}
        },
	},
		    
	mounted () {		
//		axios
//        .get('rest/user/loggedUser')
//        .then(response => (this.user = response.data));
//	    
        axios
        .get('rest/user/waitingOrders')
        .then(response => (this.orders = response.data));
        axios
        .get('rest/user/waitingOrders')
        .then(response => (this.backupArray = response.data));
        
        
        
        
    }
});