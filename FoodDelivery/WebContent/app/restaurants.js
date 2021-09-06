Vue.component("restaurants", {
	data: function () {
		    return {
		      restaurants: null
		      
		    }
	},
	template: ` 
		<tbody>
			 <div v-for="s in restaurants">            
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
			</tbody>
`
	, 
	
	mounted () {
    	//this.restaurants = ["5", "6"]   	
        axios
        .get('rest/restaurants/getRestaurants')
        .then(response => (this.restaurants = response.data))
        
    },
	methods: {
    	selectRestaurant : function(restaurant) {
    		if (this.mode == 'BROWSE') {
    			this.selectedRestaurant = restaurant;
    		}    
    	},
    	getFlagIcon : function(index){
    		return 'pictures/' + this.restaurants[index].type + '.png';
    	}
    		
    
    }
});