Vue.component("web-shop", {
	data: function () {
		    return {
		      restaurants: null
		      
		    }
	},
	template: ` 
<div>
	
	<table border="1" class = "center">
	<tr bgcolor="lightgrey">
		<th>Naziv</th>
		<th>Tip</th>
		
	</tr>
		
	<tr v-for="p in restaurants">
		<td>{{p.name }}</td>
		<td>{{p.type}}</td>
		
	</tr>
</table>
	
</div>		  
`
	, 
	
	mounted () {
        axios
          .get('rest/restaurant/restaurants')
          .then(response => (this.restaurants = response.data))
    },
});