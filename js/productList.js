$(document).ready(function(){
	//getting username 
	var name,qName,eye='&#128065;',crossed='&#10672;';
	if((localStorage.getItem('username')!==null)&&(JSON.parse(localStorage.username).length>0)){
		name=JSON.parse(localStorage.username);
		qName=name+'Quan';
	}
	else{
		alert('Please Log in to conitnue!!')
		location.href='index.html';
	}
	var storedCart=[];
	//getting cart values
	if((localStorage.getItem(name)!==null)&&(JSON.parse(localStorage.getItem(name)).length>0))
		storedCart = JSON.parse(localStorage.getItem(name));
	var cart=[];
	var  ind = 0;
	//setting the cart values obtatined from local storage
	if(storedCart.length>0){
		cart=storedCart;
		ind=1;
		for(i=0;i<cart.length;i++){
			$('#tbody tr:nth-child('+(cart[i]+1)+') td:last').text('Added');
		}
	}
	//Displaying username
	document.getElementById('dispName').innerHTML+=' <b>'+name+'</b>';
	//Link to shopping cart
	$('#cart').click( function(){
		if(cart.length<=0){
			alert('cart is empty');
		}
		else{
		location.href='ShoppingCart.html';
		}
	});
	//adding products to cart
	$(document.body).on('click','.action',function(){
		var check=$(this).parent().index();
		if(ind==0){
			ind++;
			cart.push(check);
		}
		//checking whether it is added before
		for(i=0;i<cart.length;i++){
			if(check==cart[i]){
				break;
			}
		}
		if(i==cart.length){
			cart.push(check);
			ind++;
		}
		$(this).text('Added');
		//storing cart values
		localStorage.setItem(name,JSON.stringify(cart));
		//initializing quantity as 1 when it is added
		if((localStorage.getItem(qName)!==null)&&(JSON.parse(localStorage.getItem(qName)).length>0)){
			var temp=JSON.parse(localStorage.getItem(qName));
			temp.push(1);
			localStorage.setItem(qName,JSON.stringify(temp));
		}
	});
	//logout function to remove stored username
	$('.logout').click(function(){
		localStorage.removeItem('username');
		location.href='index.html';
	});
	//change password modal 
	//displaying the modal
	$('#changeBut').click(function(){
		//$('.change:nth-of-type(1)').focus();
		$('#div').css({
			'display': 'block'
		});
	});
	//closing the modal
	$('#divContent>span,#cancel').click(function(){
		$('input').val('');
		$('#div').css({
			 'display': 'none'
		 });
	});
	//reading input from modal and updating the password in DB(localStorage)
	$('#ok').click(function(){
		var currentPassword=($('.change:nth-of-type(1)').val());
		if(localStorage.getItem('Password')!==null&&(JSON.parse(localStorage.Password).length>0)){
			var storedPassword=JSON.parse(localStorage.getItem('Password'));
			var  temp2= /^[a-zA-Z0-9!@#$]+$/;
			if(storedPassword!==currentPassword){
				alert('Incorrect Password');
				$('input').val('');
			}
			else{
				var pass1=$('.change:nth-of-type(2)').val();
				var pass2=$('.change:nth-of-type(3)').val();
				if(pass1!==pass2){
					alert('Password Do not Match');
					$('input').val('');
				}
				else if(pass1.length<8){
					alert('Password should contain atleast 8 characters');
					$('input').val('');
				}
				else if(!(temp2.test(pass1))){
					alert('Password should contain followed symbols only !@#$');
					$('input').val('');
				}
				else if(localStorage.getItem('nameDB')!==null){
					var tempnameDB=JSON.parse(localStorage.nameDB);
					for(i=0;i<tempnameDB.length;i++){
						if(name===tempnameDB[i]&&(localStorage.getItem('passDB')!==null)){
							var tempPassword=[];
							tempPassword = JSON.parse(localStorage.passDB);
							tempPassword[i]=pass1;
							//updating DB with new password
							localStorage.passDB=JSON.stringify(tempPassword);
							alert('Password successfully Changed \n\n Login to continue');
							localStorage.removeItem('username');
							location.href='index.html';
						}
					}
				}
				else{
					alert('Please Re-login and try again');
				}
			}
		}
	});
	//show or hide password toggling
	$('.eye').click(function(){
		if($(this).html()==='$'){
			var index=Math.floor($(this).index()/4);
			$('.change:nth-of-type('+index+')').attr('type','text');
			$(this).html('S');
		}
		else{
			var index=Math.floor($(this).index()/4);
			$('.change:nth-of-type('+index+')').attr('type','password');
			$(this).html('&#36;');
			
		}
	});
	
	//Adding Admin features
	if(name==='admin'){
		$('#cart').hide();
		$('table').after('<button id="addProducts">Add Product</button>');
		$('th').css('text-align','center');
		//making two columns for action 
		$('tr > th:last').attr('colspan','2');
		$('tr > td:nth-child(5)').attr('class','edit').text('Edit').parent().append('<td class="delete">Delete</td>').css({'border':'1px solid white'});
	}
	//deleting the product
	$('.delete').click(function(){
		$(this).parent().remove();
		$('tr > td:nth-child(1)').each(function(index){
			$(this).text(index+1);
		});
	});
	var editIndex;
	//opening the Edit modal
	$('.edit').click(function(){
		$('#editModal').show();
		editIndex=$(this).parent().index()+1;
		//alert($(this).parent().index());
	});
	//updating the product contents through modal 
	var alpha=/^[a-zA-Z ]+$/ , num = /^[0-9]+$/;
	$('#editOk').click(function(){
		//getting the values of input fields
		var productName = $('.editInput:nth-of-type(1)').val();
		var productManufacturer = $('.editInput:nth-of-type(2)').val();
		var productPrice = $('.editInput:nth-of-type(3)').val();
		//testing the input fields
		if(!productName||!productManufacturer||!productPrice)
			alert('Input fields cannot be empty!!!');
		else if(!(alpha.test(productName)))
			alert('Product Name should be in Alphabets only!');
		else if(!(alpha.test(productManufacturer)))
			alert('Product Manufacturer should be in Alphabets only!');
		else if(!(num.test(productPrice)))
			alert('Product Price should be in numbers only!');
		else{
			$(' tr:nth-child('+editIndex+') td:nth-child(2)').text(productName);
			$(' tr:nth-child('+editIndex+') td:nth-child(3)').text(productManufacturer);
			$(' tr:nth-child('+editIndex+') td:nth-child(4)').text(productPrice);
			$('#editModal').css('display','none');
		}
	});
	//closing the modal
	$('#editCancel,#editClose').click(function(){
		$('#editModal').css('display','none');
		$('.editInput').val('');
	});
});