const ArticlesShowHome = { template: '<articles-show-home></articles-show-home>' }
const ShoppingCart = { template: '<shopping-cart></shopping-cart>' }
const Profile = { template: '<profile></profile>' }
const DeliveryProfile = { template: '<delivery-profile></delivery-profile>' }
const CustomerOrders = { template: '<customer-orders></customer-orders>' }
const DeliveryOrders = { template: '<delivery-orders></delivery-orders>' }
const Deliveries = { template: '<deliveries></deliveries>' }
const Restaurant = { template: '<restaurant></restaurant>' }
const Restaurants = { template: '<restaurants></restaurants>' }
const RestaurantDetails = { props: ['id'], template: '<restaurant-details></restaurant-details>' }
const RestaurantArticles = { template: '<restaurant-articles></restaurant-articles>' }
const AddArticle = { template: '<add-article></add-article>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: ArticlesShowHome},
	    { path: '/shopping-cart', component: ShoppingCart},
	    { path: '/profile', component: Profile},
	    { path: '/delivery-profile', component: DeliveryProfile},
	    { path: '/customer-orders', component: CustomerOrders},
	    { path: '/delivery-orders', component: DeliveryOrders},
	    { path: '/deliveries', component: Deliveries},
	    { path: '/restaurant', component: Restaurant},
	    { path: '/restaurants', component: Restaurants},
	    { path: '/restaurant-articles', component: RestaurantArticles},
	    { path: '/add-article', component: AddArticle},
	    { path: '/restaurant-details/:id', component: RestaurantDetails, props: true}
	    
	  ]
});

var app = new Vue({ 
	router,
    el: '#homeApp',
    data: {
        mode : 'plsWork',
        user : {
        username : "xxxxxxxxxxxxx"
        }
    },
    mounted() {
    	axios
	    	.get('rest/user/loggedUser')
	    	.then(response => {
	    		if (response.data == null) {
	    			this.mode = 'notLogged';
	    		} else 
	    		{
	    			if (response.data.role == "customer") {
	    				this.mode = 'customer';
	    			} else if (response.data.role == "deliveryGuy") {
		    			this.mode = 'deliveryGuy';
		    		} else if (response.data.role == "manager") {
		    			this.mode = 'manager';
		    		} else {
		    			this.mode = 'notLogged';
		    		}
	    			this.user = response.data;
	    		}
	    	})
	    	
	    	
    },
    methods : {
    	logOut : function() {
    		axios 
    			.get('rest/user/logout')
    			.then(response => {
    				this.mode = 'notLogged';
    				console.log(this.mode);
    				window.location.href = "login.html";
    			})
    		
    	}
    }
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