Vue.component("add-article", {	
	data: function () {
	    return {	    	
	    	errorMessage:'',
	    	name: '',		    			    	
		    price: 0,
		    type:'',
		    restaurant:'',		    			    	
		    amount:'',
		    description:'',
			imagePath:''
			
	    }
},
	
template: ` 
	
	<div class="row" style="width: 100%;">
		<div class = "orange-title">  Add article to your restaurant:  </div>
		<div class="col-md-6 col-md-offset-3">
			<div class="panel panel-login">
				<div class="panel-body">
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<input type="text" name="name" tabindex="1" class="form-control" v-on:change="signalChange" v-model="name" placeholder="Name" value="" required>
							</div>
							<div class="form-group">
								<input type="number" name="price" tabindex="2" class="form-control" v-on:change="signalChange" v-model="price" placeholder="0.0" required>
							</div>
							<div class="form-group">
								<input type="text" name="description" tabindex="3" class="form-control" v-on:change="signalChange" v-model="description" placeholder="Description" value="" required>
							</div>
							<div class="form-group">
								<input type="number" name="amount" tabindex="5" class="form-control" v-on:change="signalChange" v-model="amount" placeholder="300g" value="" required>
							</div>
							<div class="form-group">
								<input type="text" name="imagePath" tabindex="5" class="form-control" v-on:change="signalChange" v-model="imagePath" placeholder="pictures/image.png" value="" required>
							</div>
							<select class="form-select" v-model="type" id="types" name="types" form="types" required>
							  <option disabled value="">Select option</option>
							  <option value="hrana">Food</option>
							  <option value="pice">Drink</option>
							</select>
							<div class="form-group" >
								<div class="row">
									<div class="col-sm-6 col-sm-offset-3">
										<p style="color:red;text-transform:none;">{{errorMessage}}</p>
										<button class="btn btn-secondary" v-on:click="addArticle"> Add article </button>
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
	addArticle : function() {
		if(this.name=='' || this.price=='' || this.description=='' || this.type=='')
		{
			this.errorMessage="Morate popuniti sva polja.";
		}
		else
		{

			let addParameters = {
				name : this.name,
				price : this.price,
				description : this.description,
				amount : this.amount,
				imagePath : this.imagePath,
				type : this.type
		};
		
		axios 
			.post('rest/articles/addArticle', JSON.stringify(addParameters),{
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
					alert("Article successfully added.")
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
	
	
}
});