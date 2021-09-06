const WebShop = { template: '<web-shop></web-shop>' }
const LearnMore = { props: ['id'], template: '<learn-more></learn-more>' }
const SeeComments = { props: ['id'], template: '<see-comments></see-comments>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: WebShop},
	    { path: '/learn-more/:id', component: LearnMore, props: true },
	    { path: '/see-comments/:id', component: SeeComments, props: true }
	  ]
});

var app = new Vue({ 
	router,
    el: '#webShop'
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