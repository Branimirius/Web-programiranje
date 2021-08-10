const ArticlesShow = { template: '<articles-show></articles-show>' }
//const LogIn = { template: '<log-in></log-in>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: ArticlesShow}
	    //{ path: '/log-in', component: LogIn}
	  ]
});

var app = new Vue({ 
	router,
    el: '#articlesShow'
    /*
    data: {
        restaurants: null,
        title: "Primer Vue.js tehnologije na spisku restorana",
        mode: "BROWSE",
        selectedRestaurant : {},
		imagePath: "pictures/serbia.jpg"
        
    },
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
      */   	
});