var app = new Vue({ 
    el: '#webShop',
    data: {
        restaurants: null,
        title: "Primer Vue.js tehnologije na spisku restorana",
        mode: "BROWSE",
        
    },
    mounted () {
        axios
          .get('rest/restaurants/getRestaurants')
          .then(response => (this.restaurants = response.data))
    },
    
    
   	
});