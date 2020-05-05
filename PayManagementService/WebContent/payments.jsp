<%@page import="model.Payment"%> 
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%> 
 
<!DOCTYPE html> 
<html> 
<head> 
<meta charset="ISO-8859-1"> 
<title>PayManagement Service</title> 
<link rel="stylesheet" href="Views/bootstrap.min.css"> 
<script src="Components/jquery-3.2.1.min.js"></script> 
<script src="Components/payments.js"></script> 
</head> 
<body> 


<div class="raw">
	<div class="col-6">

		<h1>ONLINE PAYMENT</h1>

		<form id="formPayment" name="formPayment" method="post" action="payments.jsp">
			User name: <input id="userName" name="userName" type="text"
			class="form-control form-control-sm"> 
			<br>
		    Amount: <input id="amount" name="amount" type="text"
			class="form-control form-control-sm"> 
			<br>
		    E mail: <input id="email" name="email" type="text"
			class="form-control form-control-sm">
		    <br> 
			Card type: <input id="cardType" name="cardType" type="text"
			class="form-control form-control-sm">
			<br>
			Card No: <input id="cardNo" name="cardNo" type="text"
			class="form-control form-control-sm"> 
			<br> 
			Expire date: <input id="expireDate" name="expireDate" type="text"
			class="form-control form-control-sm"> 
			<br>
			CVN: <input id="CVN" name="CVN" type="text" class="form-control form-control-sm">
			<br>
			<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary"> 
			<input type="hidden" id="hidReferanceNoSave" name="hidReferanceNoSave" value="">
		</form>
		
		 <div id="alertSuccess" class="alert alert-success"></div>  
 		 <div id="alertError" class="alert alert-danger"></div> 
 
 <br>  <div id="divPaymentsGrid">   
 <%    
 	Payment paymentObj = new Payment();    
 	out.print(paymentObj.readPayments());   
 %>  	</div>
 	</div>
 	</div>
	 
 </body>
 </html>
 