Vue.component("shopping-cart", {
	data: function () {
		    return {
		      user: null,
		      sc: null,
		      total: 0
		    }
	},
	template: ` 
	<tbody class = "articles">
		<div>
				Proizvodi u korpi:
				<table border="1">
				<tr bgcolor="lightgrey">
					<th>Naziv</th><th>Jedinicna cena</th><th>Komada</th><th>Ukupna cena</th></tr>
					<tr v-for="i in sc">
					<td> {{i.product.name}}</td>
					<td> {{i.product.price}}</td>
					<td> {{i.count}} </td>
					<td> {{i.total}} </td>
					</tr>
				</table>
				<br /> 
				<button v-on:click="clearSc" >Obriši korpu</button>
				<p>
				Ukupno: {{total}} dinara.
				</p>
			<p>
				<a href="#/">Proizvodi</a>
			</p>
			
		</div>
	</tbody>		  
`
	, 
	methods : {
		init : function() {
			this.sc = {};
			this.total = 0.0;
		}, 
		clearSc : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .post('rest/proizvodi/clearSc')
		          .then(response => (this.init()))
			}
		} 
	},
	mounted () {
        axios
          .get('rest/user/loggedUser')
          .then(response => (this.user = response.data));
        this.sc = this.user.shoppingCart
    }
});