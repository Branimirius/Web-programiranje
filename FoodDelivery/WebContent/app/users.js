Vue.component("users", {
	data: function () {
		    return {
		      user: null,
		      users: null
		    }
	},
	template: ` 
        <table class="table table-hover" style="background-color:white">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Points</th>
                    <th scope="col">Type</th>
                    <th scope="col"> </th>
                </tr>
            </thead>
            <tbody  v-for="s in users">
                <tr>
                    <td>@{{ s.username }}</td>
                    <td>{{ s.surname }}</td>
                    <td>{{ s.name }}</td>
                    <td>{{ s.role }}</td>
                    <td v-if="s.bonusPoints">{{ s.bonusPoints }}</td>
                    <td v-if="s.type">{{ s.type.name }}</td>
                </tr> 
            </tbody>
        </table>  
            
                
`
	,
		    
	mounted () {		
		axios
        .get('rest/user/loggedUser')
        .then(response => (this.user = response.data));
	    //<a class="btn btn-primary" v-bind:href="'#/user-details/'+ s.username" role="button">INFO</a>
        axios
        .get('rest/user/users')
        .then(response => (this.users = response.data));
        
        
        
        
    }
});