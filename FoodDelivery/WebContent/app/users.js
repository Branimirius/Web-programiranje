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
	return restaurants.sort((a, b) => (a.surname > b.surname) ? 1 : (b.surname > a.surname) ? -1 : 0);
}
function sortByGradeDesc(restaurants){
	return restaurants.sort((a, b) => (a.surname < b.surname) ? 1 : (b.surname < a.surname) ? -1 : 0);
}
function sortByAdressAsc(restaurants){
	return restaurants.sort((a, b) => (a.bonusPoints > b.bonusPoints) ? 1 : (b.bonusPoints > a.bonusPoints) ? -1 : 0);
}
function sortByAdressDesc(restaurants){
	return restaurants.sort((a, b) => (a.bonusPoints < b.bonusPoints) ? 1 : (b.bonusPoints < a.bonusPoints) ? -1 : 0);
}

Vue.component("users", {
	data: function () {
		    return {
		      user: this.$root.$data.user,
		      users: null,
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
	<div>
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
				<label v-bind:hidden="users.length != 0"> There is no users that match your search. Use reset button. </label>
			</div>
		
        <table class="table table-hover" style="background-color:white">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Points</th>
                    <th scope="col">Type</th>
                    <th scope="col"> </th>
                </tr>
            </thead>
            <tbody  v-for="s in users">
                <tr v-if="s.role!='admin'">
                    <td>@{{ s.username }}</td>
                    <td>{{ s.surname }}</td>
                    <td>{{ s.name }}</td>
                    <td>{{ s.role }}</td>
                    <td v-if="s.bonusPoints">{{ s.bonusPoints }}</td>
                    <td v-else >0</td>
                    <td v-if="s.role=='customer'">{{ s.type.name }}</td>
                    <td v-else>X</td>
                    <button type="button" class="btn btn-primary" v-on:click="deleteUser(s.username)">Delete</button>
                </tr> 
            </tbody>
        </table>  
    </div>        
                
`
	,
    methods: {
        deleteUser(user) {
            axios
                .post('rest/user/deleteUser', user,{
                    headers:{
                        'Content-Type': 'application/json',
                    }
                })
                .then(response =>{
                    this.users = [];
                    response.data.forEach(el => {
                        this.users.push(el);
                    });
                    return this.users;
                })
                
                
        },
filterRestaurants : function() {
    		
    		switch(this.searchParam) {
    		  case "name":
    			this.users = this.users.filter(el=>(el.name.toUpperCase().includes(this.searchText.toUpperCase())));
    		    break;
    		  case "surname":
    			this.users = this.users.filter(el=>(el.surname.toUpperCase().includes(this.searchText.toUpperCase())));
    		    break;
    		  case "username":
      			this.users = this.users.filter(el=>(el.username.toUpperCase().includes(this.searchText.toUpperCase())));
      		    break;
    		  default:
    			  this.users = this.backupArray;
    		}
    	},
    	resetSearch : function(){
    		this.users = this.backupArray;
            
    	},
    	
    	onTypeChange(event) {
    		this.users = this.users.filter(el=>(el.role == this.filterType));
  		    
        },
        onStatusChange(event) {
        	this.users = this.users.filter(el=>(el.type.name == this.filterStatus));
  		    
        },
        
        onSortChange(event) {
        	switch(this.sortBy) {
  		  case "nameAsc":
  			this.users = sortByNameAsc(this.users);
  			break;
  		  case "nameDesc":
  			this.users = sortByNameDesc(this.users);
  			break;
  		  case "surnameAsc":
  			this.users = sortByGradeAsc(this.users);
  			break;
  		  case "surnameDesc":
  			this.users = sortByGradeDesc(this.users);
  			break;
  		  case "pointsAsc":
  			this.users = sortByAdressAsc(this.users);
  			break;
  		  case "pointsDesc":
  			this.users = sortByAdressDesc(this.users);
  			break;
  		  default:
  			  this.users = this.backupArray;
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
//	    //<a class="btn btn-primary" v-bind:href="'#/user-details/'+ s.username" role="button">INFO</a>
        axios
        .get('rest/user/users')
        .then(response => (this.users = response.data));
        axios
        .get('rest/user/users')
        .then(response => (this.backupArray = response.data));
        
        
        
    }
});