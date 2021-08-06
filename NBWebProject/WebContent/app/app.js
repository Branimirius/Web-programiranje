var app = new Vue({ 
    el: '#restaurant-wrapper',
    data: {
        restaurants: null,
        title: "Primer Vue.js tehnologije na spisku restorana",
        mode: "BROWSE",
        selectedRestaurant: {},
        searchField: ""
    },
    mounted () {
        axios
          .get('rest/restaurant/restaurants')
          .then(response => (this.restaurants = response.data))
    }
    
   	
});