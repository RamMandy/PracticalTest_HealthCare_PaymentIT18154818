$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validatePaymentForm();

	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var method = ($("#hidReferanceNoSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "PaymentsAPI",
		type : method,
		data : $("#formPayment").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onPaymentSaveComplete(response.responseText, status);
		}
	});
});

function onPaymentSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") 
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divPaymentsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	}
	else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	}
	else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}

	$("#hidReferanceNoSave").val("");
	$("#formPayment")[0].reset();
}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{
	$("#hidReferanceNoSave").val($(this).closest("tr").find('#hidReferanceNoUpdate').val());
	$("#userName").val($(this).closest("tr").find('td:eq(0)').text());
    $("#amount").val($(this).closest("tr").find('td:eq(1)').text());
	$("#email").val($(this).closest("tr").find('td:eq(2)').text());
	$("#cardType").val($(this).closest("tr").find('td:eq(3)').text());
	$("#cardNo").val($(this).closest("tr").find('td:eq(4)').text());
	$("#expireDate").val($(this).closest("tr").find('td:eq(5)').text());
	$("#CVN").val($(this).closest("tr").find('td:eq(6)').text());
});

// REMOVE==========================================
$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
		url : "PaymentsAPI",
		type : "DELETE",
		data : "referanceNo=" + $(this).data("payid"),
		dataType : "text",
		complete : function(response, status)
		{
			onPaymentDeleteComplete(response.responseText, status);
		}
	});
});

function onPaymentDeleteComplete(response, status) 
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divPaymentsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	}
	else if (status == "error")
	{
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	}
	else
	{
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

function validatePaymentForm() {
	// CODE
	if ($("#userName").val().trim() == "") {
		return "Insert Name.";

	}
	
	if ($("#amount").val().trim() == "") {
		return "Insert Amount.";

	}
	
	if ($("#email").val().trim() == "") {
		return "Insert E mail.";

	}
	
	if ($("#cardType").val().trim() == "") {
		return "Insert Card type.";

	}
	
	if ($("#cardNo").val().trim() == "") {
		return "Insert Card Number.";

	}
	
	if ($("#expireDate").val().trim() == "") {
		return "Insert Expire date.";

	}
	
	if ($("#CVN").val().trim() == "") {
		return "Insert CVN on your card.";

	}
	
	// is numerical value
	var tmpPrice = $("#amount").val().trim();
	
	if (!$.isNumeric(tmpPrice))
	{
		return "Insert a numerical value for Item Price.";
	}
	
	// convert to decimal price
	$("#amount").val(parseFloat(tmpPrice).toFixed(2));
	
	
 return true;
	
}