function sortByWorking(restaurants){
	return restaurants.sort((a, b) => (!a.working) ? 1 : -1);
}
function sortByNameAsc(restaurants){
	return restaurants.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
}
function sortByNameDesc(restaurants){
	return restaurants.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
}
function sortByGradeAsc(restaurants){
	return restaurants.sort((a, b) => (a.grade > b.grade) ? 1 : (b.grade > a.grade) ? -1 : 0);
}
function sortByGradeDesc(restaurants){
	return restaurants.sort((a, b) => (a.grade < b.grade) ? 1 : (b.grade < a.grade) ? -1 : 0);
}
function sortByAdressAsc(restaurants){
	return restaurants.sort((a, b) => (a.location.adress > b.location.adress) ? 1 : (b.location.adress > a.location.adress) ? -1 : 0);
}
function sortByAdressDesc(restaurants){
	return restaurants.sort((a, b) => (a.location.adress < b.location.adress) ? 1 : (b.location.adress < a.location.adress) ? -1 : 0);
}

Vue.component("articles-show-home", {
	data: function () {
		    return {
		      backupArray: [],
		      searchText: "",
		      searchParam: "",
		      toggleCheck: false,
		      filterType: "",
		      filterStatus: "",
		      filterGrade: 0,
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
			
			<div v-show="user.role != 'customer'" class="input-group">
			  <select class="form-select" v-model="searchParam" aria-label="Default select example">
				  <option value="" disabled selected hidden>Search params</option>
				  <option value="name">Name</option>
				  <option value="type">Type</option>
				  <option value="adress">Adress</option>
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
				  <option value="" disabled selected hidden>Type</option>
				  <option value="Serbian">Serbian</option>
				  <option value="Italian">Italian</option>
				  <option value="Greek">Greek</option>
				  <option value="French">French</option>
				  <option value="Mexican">Mexican</option>
				  <option value="Chinese">Chinese</option>
			  </select>
			  <select class="form-select" @change="onStatusChange($event)" v-model="filterStatus" aria-label="Default select example">
				  <option value="" disabled selected hidden>Status</option>
				  <option value="true">Open</option>
				  <option value="false">Closed</option>
			  </select>
			  <select class="form-select" @change="onGradeChange($event)" v-model="filterGrade" aria-label="Default select example">
				  <option value="" disabled selected hidden>Grade</option>
				  <option value="1">1</option>
				  <option value="2">2</option>
				  <option value="3">3</option>
				  <option value="4">4</option>
				  <option value="5">5</option>
			  </select>
			  
			</div>
			<div class="container emp-profile">
				<select class="form-select" @change="onSortChange($event)" v-model="sortBy" aria-label="Default select example">
				  <option value="" disabled selected hidden>Sort by: </option>
				  <option value="nameAsc">Name ascending</option>
				  <option value="nameDesc">Name descending</option>
				  <option value="gradeAsc">Grade ascending</option>
				  <option value="gradeDesc">Grade descending</option>
				  <option value="locationAsc">Adress ascending</option>
				  <option value="locationDesc">Adress descending</option>
			    </select>
				<label v-bind:hidden="restaurants.length != 0"> There is no restaurants that match your search. Use reset button. </label>
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
        .then(response => (this.articles = response.data));
        
        axios
        .get('rest/user/loggedUser')
        .then(response => (this.user = response.data));
        
        axios
        .get('rest/restaurants/getRestaurants')
        .then(response => (this.restaurants = sortByWorking(response.data)));
        
        axios
        .get('rest/restaurants/getRestaurants')
        .then(response => (this.backupArray = response.data));
        
        
    },
	methods: {
    	selectRestaurant : function(restaurant) {
    		if (this.mode == 'BROWSE') {
    			this.selectedRestaurant = restaurant;
    		}    
    	},
    	filterRestaurants : function() {
    		
    		switch(this.searchParam) {
    		  case "name":
    			this.restaurants = this.restaurants.filter(el=>(el.name.toUpperCase().includes(this.searchText.toUpperCase())));
    		    break;
    		  case "type":
    			this.restaurants = this.restaurants.filter(el=>(el.type.toUpperCase().includes(this.searchText.toUpperCase())));
    		    break;
    		  case "adress":
      			this.restaurants = this.restaurants.filter(el=>(el.location.adress.toUpperCase().includes(this.searchText.toUpperCase())));
      		    break;
    		  default:
    			  this.restaurants = this.backupArray;
    		}
    	},
    	resetSearch : function(){
    		this.restaurants = this.backupArray;
            
    	},
    	
    	onTypeChange(event) {
    		this.restaurants = this.restaurants.filter(el=>(el.type == this.filterType));
  		    
        },
        onStatusChange(event) {
        	if(this.filterStatus == "true"){
        		this.restaurants = this.restaurants.filter(el=>(el.working));
        	}
        	else if(this.filterStatus == "false"){
        		this.restaurants = this.restaurants.filter(el=>(!el.working));
        	}
        	else{
        		this.restaurants = this.backupArray;
        	}
  		    
        },
        onGradeChange(event) {
        	if(this.filterGrade != 0){
        		this.restaurants = this.restaurants.filter(el=>(el.grade == this.filterGrade));
        	}
        },
        onSortChange(event) {
        	switch(this.sortBy) {
  		  case "nameAsc":
  			this.restaurants = sortByNameAsc(this.restaurants);
  			break;
  		  case "nameDesc":
  			this.restaurants = sortByNameDesc(this.restaurants);
  			break;
  		  case "gradeAsc":
  			this.restaurants = sortByGradeAsc(this.restaurants);
  			break;
  		  case "gradeDesc":
  			this.restaurants = sortByGradeDesc(this.restaurants);
  			break;
  		  case "locationAsc":
  			this.restaurants = sortByAdressAsc(this.restaurants);
  			break;
  		  case "locationDesc":
  			this.restaurants = sortByAdressDesc(this.restaurants);
  			break;
  		  default:
  			  this.restaurants = this.backupArray;
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