Vue.component("log-in", {	
	data: function () {
		    return {
		      articles: null,
		      
		    }
	},
		
	template: ` 

    	<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row">
							<div class="col-xs-6">
								<a href="#/" class="active" id="login-form-link" style="padding-left: 150px">Login</a>
							</div>
							<div class="col-xs-6">
								<a href="#/register" id="register-form-link">Register</a>
							</div>
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form id="login-form" method="post" role="form" style="display: block;">
									<div class="form-group">
										<input type="text" name="username-log" id="username-log" tabindex="1" class="form-control" placeholder="Username" value="" required>
									</div>
									<div class="form-group">
										<input type="password" name="password-log" id="password-log" tabindex="2" class="form-control" placeholder="Password" required>
									</div>
									<div class="form-group" >
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">
											</div>
										</div>
									</div>
								</form>
								
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
//		addToCart : function (product) {
//			axios
//			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
//			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
//		}
	}
	
});