Vue.component("login", {
	data: function () {
		    return {
		      title: "Login",
		      value: "Login",
		      user: { username:null, password:null}
		    }
	},
	template: ` 
<div>
	<form>
		<table>
			<tr><td>Username</td><td><input type="text" name="username" v-model="user.username"></td></tr>
			<tr><td>Password</td><td><input type="password" name="password" v-model="user.password"></td></tr>
			<tr><td><input type="submit" value="Login" v-on:click = "checkUser"></td></tr>
		</table>
	</form>
</div>		  
    	`,
    methods: {
    	checkUser : function() {
			//this.user.username = username.value
			//this.user.password = password.value
			axios.post('rest/login/', this.user).
			//axios.post('rest/login' + this.user.username + ',' + this.user.password).
				then(response => (router.push(`/startup`)));
    	}
    }
});