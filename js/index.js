$(document).ready(function(){
	var name;
	if(localStorage.getItem('username')!==null){
		alert('Taking to Product List');
		location.href='productList.html';
	}
	$('#username').focus();
	$('#reg').click(function(){
		location.href='register.html';
	});
	$('#but').click(function() {
		var temp = /^[a-zA-Z0-9]+$/ , temp2= /^[a-zA-Z0-9!@#$]+$/ , alpha=/^[a-zA-Z]+$/ , num = /^[0-9]+$/;
		name=document.getElementById('username').value;
		var pass=document.getElementById('password').value;
		if(!name||!pass){
			alert('Enter Username/Password');
			return false;
		}
		else if(name==='admin'&&pass==='admin123'){
			localStorage.username=JSON.stringify(name);
			localStorage.Password=JSON.stringify(pass);
			location.href='productList.html';
		}
		else {
		if(localStorage.getItem('nameDB')!==null){
				var tempnameDB=JSON.parse(localStorage.nameDB);
			for(i=0;i<tempnameDB.length;i++){
				if(name===tempnameDB[i]&&(localStorage.getItem('passDB')!==null)){
					if(pass===JSON.parse(localStorage.getItem('passDB'))[i]){
						localStorage.username=JSON.stringify(name);
						localStorage.Password=JSON.stringify(pass);
						location.href='productList.html';
						return false;
					}
					else{
						alert('wrong Password');
						return false;
					}
				}
			}
			alert('User Not exits!! ');
		}
			alert('Register to Login!!');
		}
	});
	$('#username,#password').keypress(function(e){
		if(e.which==13)
			$('#but').click();
	});
});
