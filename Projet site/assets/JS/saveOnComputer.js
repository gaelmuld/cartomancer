/**
 * printToComputer
 * Faire un enregistrement sur le PC de la carte créée
 */
var imgCanvas;
const download = () => {
	html2canvas(document.querySelector('#card')).then(
		canvas => {
			//document.getElementById('printArea').appendChild(canvas);
			imgCanvas = canvas
		}
	);
}

$("#printToComputer").on("click", function () {
	download()
	setTimeout(() => {
		let link = document.createElement('a');
		$("#printArea").append(link)
		link.download = 'Ma carte.png';
		link.text = 'Image'
		var img = imgCanvas.toDataURL();
		link.href = img
		link.click();
		link.remove()

	}, 1200);

})
