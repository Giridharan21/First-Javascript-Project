$(document).ready(function(){
	var name;
	$('#username').focus();
	$('button').click(function() {
		var temp = /^[a-zA-Z0-9]+$/ , temp2= /^[a-zA-Z0-9!@#$]+$/ , alpha=/^[a-zA-Z]+$/ , num = /^[0-9]+$/;
		name=document.getElementById('username').value;
		var pass=document.getElementById('password').value;
		var pass2=document.getElementById('password2').value;
		var checkBox=document.getElementById('checkBox');
		if(!name||!pass){
			alert('Enter Username/Password');
			return false;
		}
		else if(name.length<5){
			alert('Username should be 5 characters Long');
			return false;
		}
		else if(pass.length<8){
			alert('Password should contain atleast 8 characters');
			return false;
		}
		else if((num.test(name))&&(!(alpha.test(name)))){
			alert('Username should contain atleast two alphabets');
		}
		else if(!(temp.test(name))){
			alert('Username should be in Alphanumeric Only!!');
			return false;
		}
		else if(!(temp2.test(pass))){
			alert('Password should contain followed symbols only !@#$');
			return false;
		}
		else if(pass!==pass2){
			alert('Passwords are not same');
			return false;
		}
		else if(!$('#checkBox').prop('checked')){
			alert('Accept terms and conditions to continue');
		}
		else {
			if((localStorage.getItem('nameDB')===null)&&(localStorage.getItem('passDB')===null)){
				localStorage.nameDB=JSON.stringify([name]);
				localStorage.passDB=JSON.stringify([pass]);
			}
			else {
				let tempArr=[];
				tempArr=JSON.parse(localStorage.nameDB);
				for(i=0;i<tempArr.length;i++){
					if(name===tempArr[i]){
						alert('Username Already Exits ');
						return false;
					}
				}
				tempArr.push(name);
				localStorage.nameDB=JSON.stringify(tempArr);
				tempArr=JSON.parse(localStorage.passDB);
				tempArr.push(pass);
				localStorage.passDB=JSON.stringify(tempArr);
				localStorage.username =JSON.stringify(name);
				location.href='productList.html';
			}
		}
		
	});
	$('input').keypress(function(e){
		if(e.which==13)
			$('button').click();
	});
});
