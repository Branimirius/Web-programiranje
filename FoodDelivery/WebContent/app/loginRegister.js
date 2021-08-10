const LogIn = { template: '<log-in></log-in>' }
const Register = { template: '<register-show></register-show>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: LogIn },
	    { path: '/register', component: Register}
	  ]
});

var app = new Vue({ 
	router,
    el: '#loginRegister'
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