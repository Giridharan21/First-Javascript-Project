$(document).ready(function(){
	
	//Getting user name
	var name;
	if((localStorage.getItem('username')!==null)&&(JSON.parse(localStorage.username).length>0)){
		name=JSON.parse(localStorage.username);
		qName=name+'Quan';
	}
	else{
		alert('Please Log In to conitnue');
		location.href='index.html';
	}
	
	//var temp=JSON.parse(localStorage.getItem('productQuan'));
	var x=1;
	var toCheck=0,a=[];
	//Display username
	document.getElementById('dispName').innerHTML+=' <b>'+name+'</b>';
	//Retrieving product information(data) form local storage
	if((localStorage.getItem(name)!==null)&&(JSON.parse(localStorage.getItem(name)).length>0))
	 a=JSON.parse(localStorage.getItem(name));
	var sum=0,  numOfEachItems=[];
	var  ind = 0,tableStart ='<tr> <td class="sno">';
	//Array of cartTable
	var tableArray = [ '</td> <td>Mobile Phone</td> <td>Samsung</td> <td class="price">15000</td> <td class="action">Delete</td> <td><button class="add" >+</button ><p >1</p> <button class="sub" >-</button></td></tr>', '</td> <td>Camera</td> <td>Nikon</td> <td class="price">20000</td> <td class="action">Delete</td> <td><button class="add" >+</button ><p >1</p> <button class="sub" >-</button></td></tr>', '</td> <td>Camera Tripod</td> <td>Nikon</td> <td class="price">800</td> <td class="action">Delete</td><td><button class="add" >+</button ><p >1</p> <button class="sub" >-</button></td> </tr>', '</td> <td>Laptop</td> <td>Dell</td> <td class="price">40000</td> <td class="action">Delete</td> <td><button class="add" >+</button ><p >1</p> <button class="sub" >-</button></td></tr>', '</td> <td>Printer</td> <td>HP</td> <td class="price">7000</td> <td class="action">Delete</td> <td><button class="add" >+</button ><p >1</p> <button class="sub" >-</button></td></tr>'];
	var price = [15000,20000,800,40000,7000];
	var priceInCart=[];
	//appending the item/items to the table
	for(i=1;i<=a.length;i++){
		var x = tableArray[a[i-1]];
		
		priceInCart.push(price[a[i-1]]);
			$('#cartTable').append(tableStart+i+x);
		//retreiving quantity of each products
		if((localStorage.getItem(qName)!==null)&&(JSON.parse(localStorage.getItem(qName)).length>0)){
			numOfEachItems[i-1]=(JSON.parse(localStorage.getItem(qName)))[i-1];
			sum+=(price[a[i-1]]*numOfEachItems[i-1]);	
		}
		else {
			numOfEachItems.push(1);
			sum+=price[a[i-1]];
		}
	}
	//changing quantity to correct values
	$('.add').parent().find('p').each(function(index){
		$(this).text(numOfEachItems[index]);
	});
	//Displaying total Amount
	document.getElementById('span').innerHTML='<b>Total :</b>'+sum;
	//Deleting a product
	$('.action').click(function(){
		$(this).parent().remove();
		var content=$(this).parent().text();
		var index=$(this).parent().text()[1];
		a.splice(index-1,1);
		localStorage.setItem(name,JSON.stringify(a));
		$('.sno').each(function(index){
			$(this).text(index+1);
		})
		if((localStorage.getItem(qName)!==null)&&(JSON.parse(localStorage.getItem(qName)).length>0)){
			var temp=JSON.parse(localStorage.getItem(qName));
			temp.splice(index-1,1);
			localStorage.setItem(qName,JSON.stringify(temp));
		}
		//hiding table and total when cart is empty
		if($('tr').length<2){
			alert('Cart is Empty!! Going Back to Products List');
			//$('table ,span').hide();
			location.href='productList.html';
		}
		//updating the total sum
		for(i=1,sum=0;i<=a.length;i++){
			sum+=(price[a[i-1]]*numOfEachItems[i-1]);
		}
		document.getElementById('span').innerHTML='<b>Total :</b>'+sum;
	});
	//Incrementing quantity
	$('.add').click(function(){
		var position = parseInt($(this).parent().parent().index())-1, value ;
  		$(this).parent().find('p').text(function(i, t){
			value=parseInt(t);
			if(value>=9){
				alert('Cannot add more than 9');
				return value;
			}
			value++;
			sum+=priceInCart[position];
			return value;
		});
		
		document.getElementById('span').innerHTML='<b>Total :</b>'+sum;
		numOfEachItems[position]=value;
		localStorage.setItem(qName,JSON.stringify(numOfEachItems));
		
	});
	//decrementing quantity
	$('.sub').click(function(){
		var position = parseInt($(this).parent().parent().index())-1, value ;
  		$(this).parent().find('p').text(function(i, t){
			value=parseInt(t);
			if(value<2){
				alert('Cannot be less than 1');
				return 1;
			}
			value--;
			return value;
		});
		sum=0;
		for(i=1;i<=a.length;i++){
			sum+=(price[a[i-1]]*value);
	}
		document.getElementById('span').innerHTML='<b>Total :</b>'+sum;
		numOfEachItems[position]=value;
		console.log(numOfEachItems);
		localStorage.setItem(qName,JSON.stringify(numOfEachItems));
			//alert(numOfEachItems);
	});
	//storing the quantity of each products in local storage
	localStorage.setItem(qName,JSON.stringify(numOfEachItems));
	//logout function to remove stored username
	$('.logout').click(function(){
		localStorage.removeItem('username');
		location.href='index.html';
	});
	
});