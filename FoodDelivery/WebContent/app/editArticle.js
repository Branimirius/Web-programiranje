function findArticle(articles, id) {
	return articles.find(el => el.id == id);
}
Vue.component("edit-article", {	
	props:['id'],
	data: function () {
	    return {	    	
	    	errorMessage:'',
	    	name: '',		    			    	
		    price: 0,
		    type:'',
		    restaurant:'',		    			    	
		    amount:'',
		    description:'',
			imagePath:'',
			articleId: this.$route.params.id,
			article: {}
	    }
},
	
template: ` 
	
	<div class="row" style="width: 100%;">
		<div class = "orange-title">  Edit article:  </div>
		<div class="col-md-6 col-md-offset-3">
			<div class="panel panel-login">
				<div class="panel-body">
					<div class="row">
						<div class="col-lg-12" v-show="article">
							<div class="form-group">
								<input type="text" name="name" tabindex="1" class="form-control" v-on:change="signalChange" v-model="article.name" required>
							</div>
							<div class="form-group">
								<input type="number" name="price" tabindex="2" class="form-control" v-on:change="signalChange" v-model="article.price" required>
							</div>
							<div class="form-group">
								<input type="text" name="description" tabindex="3" class="form-control" v-on:change="signalChange" v-model="article.description" required>
							</div>
							<div class="form-group">
								<input type="number" name="amount" tabindex="5" class="form-control" v-on:change="signalChange" v-model="article.amount" required>
							</div>
							<div class="form-group">
								<input type="text" name="imagePath" tabindex="5" class="form-control" v-on:change="signalChange" v-model="article.picturePath" required>
							</div>
							
							<div class="form-group" >
								<div class="row">
									<div class="col-sm-6 col-sm-offset-3">
										<p style="color:red;text-transform:none;">{{errorMessage}}</p>
										<button class="btn btn-secondary" v-on:click="editArticle"> Edit article </button>
									</div>
								</div>
							</div>
							
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`
, 
methods : {
	editArticle : function() {
		if(this.article.name=='' || this.article.price=='' || this.article.description=='' || this.article.type=='')
		{
			this.errorMessage="Morate popuniti sva polja.";
		}
		else
		{

			let editParameters = {
				name : this.article.name,
				price : this.article.price,
				description : this.article.description,
				amount : this.article.amount,
				imagePath : this.article.imagePath,
				type : this.article.type,
				id : this.article.id
		};
		
		axios 
			.post('rest/articles/editArticle', JSON.stringify(editParameters),{
		        headers: {
		            'Content-Type': 'application/json',
		        }
		    })
			.then(response => {
				if (response.data == "Username, password i email su obavezna polja.") {
					this.errorMessage="Username, password i email su obavezna polja.";
				} 
				else if (response.data == "Username koji ste uneli vec je zauzet.") {
					this.errorMessage="Username koji ste uneli vec je zauzet.";
				} 
				
				else {	
					alert("Article successfully edited.")
					window.location.href = "http://localhost:3665/FoodDelivery/home.html#/restaurant-articles";				
				}
			})
		}
		
		
		
	}, 
	
	signalChange : function()
	{
		this.errorMessage="";
	},
//	getLoggedUser : function(){
//		axios
//          .get('rest/user/loggedUser')
//          .then(response => (this.loggedUser = response.data));
//        
//	}
	
	
},
mounted () {		
	axios
    .get('rest/articles/getArticles')
    .then(response => (this.article = findArticle(response.data, this.articleId)));
   this.name = this.article.name;
   this.description = this.article.description;
   this.price = this.article.price;
   this.imagePath = this.article.imagePath;
   this.amount = this.article.amount;
   this.path = this.article.path;
}
});