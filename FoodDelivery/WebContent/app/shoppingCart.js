Vue.component("shopping-cart", {
	data: function () {
		    return {
		      user: {},
		      sc: {},
		      articles: [],
		      total: 0
		    }
	},
	template: ` 
	
	<tbody class = "articles">
		<div class = "orange-title">Pregled vase korpe: </div>		
		<ul class = "articles" v-for="a in articles">
		    <li class = "articles">
		      <img class = "articles" v-bind:src="a.article.picturePath" style="width: 5rem; height: 5rem; opacity: 1; float: right;" />
		      <h3> {{ a.article.name }} </h3>
		      <p> {{ a.article.description }} </p>
		      {{ a.article.price }}din
		    </li>
		      
		    
		 </ul>
		 <div style="background: #d3d3d3d3; opacity: 0.9;">
				
				<button class="btn btn-danger" v-on:click="clearSc" >Obriši korpu</button>				
				<button class="btn btn-secondary" v-on:click="placeOrder" >Naruci</button>
				<p>
				Ukupno: {{sc.price}} dinara.
				</p>
			<p>
				<a class="badge badge-primary" href="#/">Proizvodi</a>
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
		          .post('rest/user/clearSc')
		          .then(response => (this.init()))
			}
		},
		
		placeOrder : function () {
			if (confirm('Da li ste sigurni?') == true) {
				
				
				axios
		          .post('rest/user/placeOrder')
		          .then(response => (this.clearSc()))
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
        axios
	        .get('rest/user/loggedUser')
	        .then(response => (this.user = response.data));
        
        
        
        
    }
});