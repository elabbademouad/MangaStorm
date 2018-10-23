
/** **********************Base64 to Image Converter**************************** */
function setBase64ToImage(){

	var baseString = $("#base64string").val().trim();
	// data:image/png;base64

	if(baseString.substring(0,4) != "data"){
		baseString = "data:image/png;base64," + baseString;
	}

	$("#base64Img").prop('src',baseString);	
	$("#base64Img").addClass("span12 baseurlopa2");
	$("#dwnldLink").show();
	$("#dwnldLink").prop('href',baseString);
}