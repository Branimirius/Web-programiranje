Vue.component("register-show", {	
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
								<form id="register-form" method="post" role="form" >
									<div class="form-group">
										<input type="text" name="username-reg" id="username-reg" tabindex="1" class="form-control" placeholder="Username" value="" required>
									</div>
                                    <div class="form-group">
										<input type="password" name="password-reg" id="password-reg" tabindex="2" class="form-control" placeholder="Password" required>
									</div>
									<div class="form-group">
										<input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Adresa" value="" required>
									</div>
									<div class="form-group">
										<input type="text" name="name" id="name" tabindex="2" class="form-control" placeholder="Ime" value="">
									</div>
                                    <div class="form-group">
										<input type="text" name="surname" id="surname" tabindex="2" class="form-control" placeholder="Prezime" value="">
									</div>
                                    <div class="form-group">
										<input type="text" name="cellnumber" id="cellnumber" tabindex="2" class="form-control" placeholder="Broj Telefona" value="">
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
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