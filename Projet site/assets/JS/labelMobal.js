var modal
$("label").on("click", function () { 
	let modalText = $(this).attr('infoModal');
	modal = '<div class="modal">'+
	modalText +'<div/>'
	$(this).append(modal)
})
$("label").mouseleave(function () {
	$('.modal').remove()
	modal = null;
})