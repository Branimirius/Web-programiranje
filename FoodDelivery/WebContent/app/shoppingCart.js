Vue.component("shopping-cart", {
	data: function () {
		    return {
		      user: null,
		      sc: null,
		      articles: [],
		      total: 0
		    }
	},
	template: ` 
	<tbody class = "articles">
		<div>
				Proizvodi u korpi {{ sc.user.name }}:
				<table border="1">
				<tr bgcolor="lightgrey">
					<th>Naziv</th><th>Jedinicna cena</th><th>Komada</th><th>Ukupna cena</th></tr>
					<tr v-for="a in articles">
					<td> {{a.name}}</td>
					<td> {{a.price}}</td>
					
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
			this.articles = [];
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
          .get('rest/user/activeCart')
          .then(response => (this.sc = response.data));
        axios
        .get('rest/user/justArticles')
        .then(response => (this.articles = response.data));
    }
});