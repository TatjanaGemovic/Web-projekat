Vue.component("startup", {
	data: function () {
		    return {
		      title: "Start",
		      value: "Start",
		    }
	},
	template: ` 
<div>
	<p>Dobrodosli</p>
	<form>
		<table>
			<tr><td>Username</td></tr>
			<tr><td>Password</td></tr>
		</table>
	</form>
</div>		  
    	`,
    methods: {
    	/*checkUser : function() {
			axios.post('rest/login', this.user).
				then(response => (router.push(`/pocetna`)));
    	}*/
    }
});