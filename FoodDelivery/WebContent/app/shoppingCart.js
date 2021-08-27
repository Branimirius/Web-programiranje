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
		<div class = "orange-title">Pregled vase korpe: </div>		
		<ul class = "articles" v-for="a in articles">
		    <li class = "articles">
		      <img class = "articles" v-bind:src="a.article.picturePath" style="width: 5rem; height: 5rem; opacity: 1; float: right;" />
		      <h3> {{ a.article.name }} </h3>
		      <p> {{ a.article.description }} </p>
		      {{ a.article.price }}din
		    </li>
		      
		    
		 </ul>
		 <div>
				
				<button v-on:click="clearSc" >Obriši korpu</button>
				<button v-on:click="calculateTotal" >Izracunaj cenu</button>
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
		          .post('rest/user/clearSc')
		          .then(response => (this.init()))
			}
		},
		calculateTotal : function () {
			for(let i = 0; i < this.articles.length; i++){
				this.total += this.articles[i].article.price; 
			}						
		}
	},
	mounted () {
		this.calculateTotal();
        axios
          .get('rest/user/activeCart')
          .then(response => (this.sc = response.data));
        axios
        .get('rest/user/justArticles')
        .then(response => (this.articles = response.data));
        
        
        
        
    }
});