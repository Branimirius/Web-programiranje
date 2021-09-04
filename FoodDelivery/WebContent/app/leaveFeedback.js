Vue.component("leave-feedback", {
	props:['id'],
	data: function () {
	    return {	    	
	    	errorMessage:'',
	    	text: '',		    			    	
		    grade: 0,
		    restaurantId: this.$route.params.id
			
	    }
},
	
template: ` 
	
	<div class="row" style="width: 100%; background: #d3d3d3d3;">
		<div class = "orange-title">  Leave comment and rate restaurant:  </div>
		<div class="col-md-6 col-md-offset-3">
			<div class="panel panel-login">
				<div class="panel-body">
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<input type="text" name="name" tabindex="1" class="form-control" v-on:change="signalChange" v-model="text" placeholder="Comment" value="" required>
							</div>
							
							
							<div class="rate">
							    <input type="radio" v-model="grade" id="star5" name="rate" value="5" />
							    <label for="star5" title="text">5 stars</label>
							    <input type="radio" v-model="grade" id="star4" name="rate" value="4" />
							    <label for="star4" title="text">4 stars</label>
							    <input type="radio" v-model="grade" id="star3" name="rate" value="3" />
							    <label for="star3" title="text">3 stars</label>
							    <input type="radio" v-model="grade" id="star2" name="rate" value="2" />
							    <label for="star2" title="text">2 stars</label>
							    <input type="radio" v-model="grade" id="star1" name="rate" value="1" />
							    <label for="star1" title="text">1 star</label>
							  </div>
							<div class="form-group" >
								<div class="row">
									<div class="col-sm-6 col-sm-offset-3">
										<p style="color:red;text-transform:none;">{{errorMessage}}</p>
										<button class="btn btn-secondary" v-on:click="addFeedback"> Submit </button>
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
	addFeedback : function() {
		if(this.text=='' || this.grade==0)
		{
			this.errorMessage="Morate popuniti sva polja.";
		}
		else
		{

			let feedbackParameters = {
				restaurant : this.restaurantId,
				text : this.text,
				grade : this.grade
		};
		
		axios 
			.post('rest/user/addFeedback', JSON.stringify(feedbackParameters),{
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
					alert("Feedback successfully sent.")
					window.location.href = "http://localhost:3665/FoodDelivery/home.html#/customer-orders";				
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