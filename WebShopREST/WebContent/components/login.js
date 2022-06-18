Vue.component("login", {
	data: function () {
		    return {
		      title: "Login",
		      value: "Login",
		      user: { username:null, password:null},
		      error: '',
		    }
	},
	template: ` 
<div>
	<body style="height:760px;background:url('pictures/naslovna.jpg');background-size:cover;margin:-8px">
	<form>
		<table>
			<tr><td>Username</td><td><input type="text" v-model="user.username"></td></tr>
			<tr><td>Password</td><td><input type="password" v-model="user.password"></td></tr>
			<tr><td><input type="submit" value="Login" v-on:click = "checkUser"></td></tr>
		</table>
		<p id="error">{{error}}</p>
		<p>Ukoliko nemate nalog, registrujte se:</p>
		<button v-on:click = "Register">Registracija</button>
	</form>
	</body>
</div>		  
    	`,
    methods: {
    	checkUser : function(event) {
			event.preventDefault();
			axios.post('rest/login/', this.user)
				.then(response => (router.push(`/startup`)))
				.catch(this.error = 'Pogresna lozinka/username',
				event.preventDefault());
    	},
    	Register : function(){
			router.push(`/register`);
		}
    }
});