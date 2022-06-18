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
	<body style="height:760px;background:url('pictures/naslovna2.jpg');background-size:cover;margin:-7px">
	<form>
		<table style="position:relative;background-color: #e7e7e5; left:150px;top:190px;border-spacing:25px;width:280px;height:270px;border: 5px solid #3e3e3e;padding-top: 70px;padding-bottom: 25px;padding-left:35px;padding-right:30px">
			<tr><td>
			<input type="text" placeholder="Username" v-model="user.username" style="width:220px;height:28px;font-size:20px;border:0px; background: none;border-bottom: 2px solid #3e3e3e"></td></tr>
			<tr><td><input type="password" placeholder="Password" v-model="user.password" style="width:220px;height:28px;font-size:20px;border:0px; background: none;border-bottom: 2px solid #3e3e3e"></td></tr>
			<tr><td><button value="Login" text="Login" v-on:click="checkUser" style="color:#F9F9F9;width:100%;height:40px;background-color: #3e3e3e;font-size:20px;border:none">Login</button>
			<p>Don't have account?  <a v-on:click ="Register"><u><span style="cursor:pointer">Register here</span></u></a></p>
			<p id="error">{{error}}</p></td></tr>
		</table>
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