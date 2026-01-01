/* input: pour un appel au coup par coup
    change: pour un appel une fois le focus fini
*/

function cl(...el) {
	return console.log(...el)
}

function toDataURL(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
			var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
}

function loadSave(checkData = true) {
	if (localStorage["Card"] || checkData == false) {
		if (checkData != false) {
			defaults = JSON.parse(localStorage.getItem("Card"))
		}
		$("#cardTitre>h3").text(defaults["title"])
		Title = defaults["title"]
		$("#carteNameVal").val(defaults["title"])
		$("#carteHpVal").val(defaults["pv"])
		Hp = defaults["pv"]
		$("#cardInfo1").text(defaults["pv"])
		$("#carteManaVal").val(defaults["mana"])
		Mana = defaults["mana"]
		$("#cardInfo2").text(defaults["mana"])
		if (defaults["illustration"]) {
			document.getElementById("propIllustration").innerHTML = `<img src="${defaults["illustration"]}" alt="Illustration" />`
		}
		Illus = defaults["illustration"]
		$("#carteNbAtkVal").val(defaults["attack"])
		Attack = defaults["attack"]
		let val = $("#carteNbAtkVal").val()
		for (let i = 1; i <= 3; i++) {
			$("#carteAtk" + i + "Info").hide();
			$("#atk" + i).hide();
		}
		for (let i = 1; i <= val; i++) {
			$("#carteAtk" + i + "Info").show();
			$("#atk" + i).show();
		}
		if (defaults["background"]) {
			$("#cardIllustration").css("background-image", "url(" + defaults["background"] + ")");
			}
			Bg = defaults["background"]

		$("#propIllustration>img").css("transform", "scale(" + (1 - 2 * defaults["flipx"]) + ", 1)")
		FlipX = defaults["flipx"]
		$("#flipValue").prop("checked", defaults["flipx"])

		$("#propIllustration").css("transform", "rotate(" + defaults["rotation"] + "deg)")
		$("#rotaValue").html(defaults["rotation"] + "°");
		Rotation = defaults["rotation"]

		$("#propIllustration").css("width", (defaults["scale"] * 50) + "px")
		$("#scaleValue").html("X" + defaults["scale"]);
		Echelle = defaults["scale"]

		if (defaults["center"] == 1) {
			$("#manualPositionOption").show()
			$("#propIllustration").css("top", "calc(50% + " + defaults["vertical"] + "%")
			$("#verticalValue").html(defaults["vertical"] + "");
			Vertical = defaults["vertical"]

			$("#propIllustration").css("left", "calc(50% + " + defaults["horizontal"] + "%")
			$("#horizontalValue").html(defaults["horizontal"] + "");
			Horizontal = defaults["horizontal"]
		} else {
			$("#manualPositionOption").hide();
			$("#propIllustration").css("left", "calc(50% - " + 25 * defaults["scale"] + "px)")
			$("#propIllustration").css("top", "calc(50% - " + 25 * defaults["scale"] + "px)")
			}
			Centrage = defaults["center"]

		$("#carteFlavorText").val(defaults["flavorText"])
		flavText = defaults["flavorText"]
		$("#cardInfo4").text($("#carteFlavorText").val())

		$("#cardInfo3").text(defaults["credits"])
		Credits = defaults["credits"]
		$("#carteCreditValue").val(defaults["credits"])

		NameAtt1 = defaults.attack1["name"]
		$("#atk1Name").html(defaults.attack1["name"]);
		NameAtt2 = defaults.attack2["name"]
		$("#atk2Name").html(defaults.attack2["name"]);
		NameAtt3 = defaults.attack3["name"]
		$("#atk3Name").html(defaults.attack3["name"]);

		DamageAtt1 = defaults.attack1["damage"]
		$("#atk1Power").html(defaults.attack1["damage"]);
		DamageAtt2 = defaults.attack2["damage"]
		$("#atk2Power").html(defaults.attack2["damage"]);
		DamageAtt3 = defaults.attack3["damage"]
		$("#atk3Power").html(defaults.attack3["damage"]);

		ManaAtt1 = defaults.attack1["mana"]
		$("#atk1Mana").html(defaults.attack1["mana"]);
		ManaAtt2 = defaults.attack2["mana"]
		$("#atk2Mana").html(defaults.attack2["mana"]);
		ManaAtt3 = defaults.attack3["mana"]
		$("#atk3Mana").html(defaults.attack3["mana"]);

		DescAtt1 = defaults.attack1["description"]
		$("#atk1Desc").html(defaults.attack1["description"]);
		DescAtt2 = defaults.attack2["description"]
		$("#atk2Desc").html(defaults.attack2["description"]);
		DescAtt3 = defaults.attack3["description"]
		$("#atk3Desc").html(defaults.attack3["description"]);

		$("#atk1Icone>img").attr("src", defaults.attack1["icon"])
		$("#atk2Icone>img").attr("src", defaults.attack2["icon"])
		$("#atk3Icone>img").attr("src", defaults.attack3["icon"])
		IcoAtt1 = defaults.attack1["icon"]
		IcoAtt2 = defaults.attack2["icon"]
		IcoAtt3 = defaults.attack3["icon"]

		updateCard();
		}
}

/** 
 * Structure JSON d'une carte
 */

Title = "";
Hp = 0;
Attack = 1;
Mana = 0;
Illus = "";
Bg = "";
Border = "",
	IcoAtt1 = "";
NameAtt1 = "";
DamageAtt1 = 0;
ManaAtt1 = 0;
DescAtt1 = "";
IcoAtt2 = "";
NameAtt2 = "";
DamageAtt2 = 0;
ManaAtt2 = 0;
DescAtt2 = "";
IcoAtt3 = "";
NameAtt3 = "";
DamageAtt3 = 0;
ManaAtt3 = 0;
DescAtt3 = "";
FlavText = "";
FlipX = false;
Rotation = 0;
Echelle = 1;
Horizontal = 0;
Vertical = 0;
Centrage = 0;
Credits = "";

var updateCard = function () {

	card = {
			"title": Title,
		"pv": Hp,
		"attack": Attack,
		"mana": Mana,
		"illustration": Illus,
		"flipx": FlipX,
		"rotation": Rotation,
		"scale": Echelle,
		"horizontal": Horizontal,
		"vertical": Vertical,
		"center": Centrage,
		"background": Bg,
		"border": Border,
		"attack1": {
			"icon": IcoAtt1,
			"name": NameAtt1,
			"damage": DamageAtt1,
			"mana": ManaAtt1,
			"description": DescAtt1
		},
		"attack2": {
			"icon": IcoAtt2,
			"name": NameAtt2,
			"damage": DamageAtt2,
			"mana": ManaAtt2,
			"description": DescAtt2
		},
		"attack3": {
			"icon": IcoAtt3,
			"name": NameAtt3,
			"damage": DamageAtt3,
			"mana": ManaAtt3,
			"description": DescAtt3
		},
		"flavorText": FlavText,
		"credits": Credits
		}
		return JSON.stringify(card)
}

var card = updateCard()

toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function (dataUrl) {
			//console.log('RESULT:', dataUrl)
})

var Info = []

/*Titre*/
var Titre
$("#cardTitre>h3").text($("#carteNameVal").val())
$("#carteNameVal").on("input", function () {
	$("#cardTitre>h3").text($("#carteNameVal").val())
	Title = $("#carteNameVal").val()
	card = updateCard()
});
/*HP*/
var Hp
$("#cardInfo1").text($("#carteHpVal").val())
$("#carteHpVal").on("input", function () {
	$("#cardInfo1").text($("#carteHpVal").val())
	Hp = $("#carteHpVal").val()
	card = updateCard()
});
/*Mana*/
var Mana
$("#cardInfo2").text($("#carteManaVal").val())
$("#carteManaVal").on("input", function () {
	$("#cardInfo2").text($("#carteManaVal").val())
	Mana = $("#carteManaVal").val()
	card = updateCard()
});

/*Nombre d'attaque*/
var nbAtk

let val = $("#carteNbAtkVal").val()

for (let i = 1; i <= 3; i++) {
	$("#carteAtk" + i + "Info").hide();
	$("#atk" + i).hide();
}

for (let i = 1; i <= val; i++) {
	$("#carteAtk" + i + "Info").show();
	$("#atk" + i).show();
}

$("#carteNbAtkVal").on("input", function () {
	let val = $("#carteNbAtkVal").val()
	for (let i = 1; i <= 3; i++) {
		$("#carteAtk" + i + "Info").hide();
		$("#atk" + i).hide();
	}
	for (let i = 1; i <= val; i++) {
		$("#carteAtk" + i + "Info").show();
		$("#atk" + i).show();
	}
	Attack = $("#carteNbAtkVal").val()
	card = updateCard()
})
/* Input radio > choix pour type de dessin  ( rien x choix x importer)*/
//Initialisation
/*$(".optionElement input:radio").each(function () {
			$(this).parent().parent().next().children(".fileOptionSelected1").hide()
			$(this).parent().parent().next().children(".fileOptionSelected2").hide()
})
//logique
$(".optionElement input:radio").each(function () {
			$(this).change(function () {
						if ($(this).val() == 0) {
							$(this).parent().parent().next().children(".fileOptionSelected1").hide()
							$(this).parent().parent().next().children(".fileOptionSelected2").hide()
						}
		$(this).parent().parent().next().children(".fileOptionSelected" + $(this).val()).show()
		$(this).parent().parent().next().children(".fileOptionSelected" + (3 - $(this).val())).hide()
		})
}) * /

// Limite de la taille de fichier (1Mo
var isTobig = true;
const uploadFields = $("input[type='file']");
for (let UF of uploadFields) {
	UF.onchange = function () {
		isTobig = true
		if (this.files[0].size > 1024 * 1024) {
			alert("File is too big!");
		} else {
			isTobig = false
		}
	};
}

//upload image

$("#illuImport").on("change", function () {
			if (!isTobig) {
				const file = this.files[0];
				const reader = new FileReader();
				const container = document.getElementById("propIllustration");

		reader.onload = function () {
				base64 = reader.result
			container.innerHTML = `<img src="${base64}" alt="Illustration" />`;
			Illus = base64
			card = updateCard()
			};
		reader.readAsDataURL(file);
	}
});

$("#bgImport").on("change", function () {
			if (!isTobig) {
				const file = this.files[0];
				const reader = new FileReader();
				const container = $("#cardIllustration");

		reader.onload = function () {
				base64 = reader.result

			container.css("background-image", "url(" + base64 + ")");
			Bg = base64
			card = updateCard()
			};

		reader.readAsDataURL(file);
	}
});

/**
 * de/affichage du prop et de ses options
 * [DEBUG] mettre tout en relative
 */

$("#areaIllustrationBoxOption input:radio").change(function () {
	if ($(this).val() == 0) {
		$("#propIllustration").hide()
		$("#cartePosition").hide()
	} else {
		$("#propIllustration").show()
		$("#cartePosition").show()
	}
})


/*Liens atkInfo au éléments atk*/
for (let i = 1; i <= 3; i++) {
	$("#atk" + i + "Icone").html($("#atkIcone" + i + "Val").val());
	$("#atkIcone" + i + "Val").on("change", function () {
		let icone = $("#atkIcone" + i + "Val").val()
	})
	$("#atk" + i + "Name").html($("#atkName" + i + "Val").val());
	$("#atkName" + i + "Val").on("input", function () {
				let name = $("#atkName" + i + "Val").val()
				$("#atk" + i + "Name").html($("#atkName" + i + "Val").val());
				switch (i) {
			case 1:
				NameAtt1 = $("#atkName" + i + "Val").val()
			case 2:
				NameAtt2 = $("#atkName" + i + "Val").val()
			case 3:
				NameAtt3 = $("#atkName" + i + "Val").val()
			}
			card = updateCard();
			})
			$("#atk" + i + "Power").html($("#atkPower" + i + "Val").val());
			$("#atkPower" + i + "Val").on("input", function () {
						let damage = $("#atkPower" + i + "Val").val()
						$("#atk" + i + "Power").html($("#atkPower" + i + "Val").val());
						switch (i) {
			case 1:
				DamageAtt1 = $("#atkPower" + i + "Val").val()
			case 2:
				DamageAtt2 = $("#atkPower" + i + "Val").val()
			case 3:
				DamageAtt3 = $("#atkPower" + i + "Val").val()
			}
			card = updateCard();
			})
			$("#atk" + i + "Mana").html($("#atkMana" + i + "Val").val());
			$("#atkMana" + i + "Val").on("input", function () {
						let mana = $("#atkMana" + i + "Val").val()
						$("#atk" + i + "Mana").html($("#atkMana" + i + "Val").val());
						switch (i) {
			case 1:
				ManaAtt1 = $("#atkMana" + i + "Val").val()
			case 2:
				ManaAtt2 = $("#atkMana" + i + "Val").val()
			case 3:
				ManaAtt3 = $("#atkMana" + i + "Val").val()
			}
			card = updateCard();
			})
			$("#atk" + i + "Desc").html($("#atkDesc" + i + "Val").val());
			$("#atkDesc" + i + "Val").on("input", function () {
		let description = $("#atkDesc" + i + "Val").val()
		$("#atk" + i + "Desc").html($("#atkDesc" + i + "Val").val());
		switch (i) {
			case 1:
				DescAtt1 = $("#atkDesc" + i + "Val").val()
			case 2:
				DescAtt2 = $("#atkDesc" + i + "Val").val()
			case 3:
				DescAtt3 = $("#atkDesc" + i + "Val").val()
			}
			card = updateCard();
			})
}

//if ($("atk" + i + "IcoOption").value()) { }
for (let i = 1; i <= 3; i++) {
	$("#atk" + i + "IconeValue").on("input", function () {
		$("#atk" + i + "Icone>img").attr("src", $(this).val())
		switch (i) {
			case 1:
				IcoAtt1 = $(this).val()
			case 2:
				IcoAtt2 = $(this).val()
			case 3:
				IcoAtt3 = $(this).val()
			}
			card = updateCard();
			})
}

/*FlavorText*/
var flavorText
$("#cardInfo4").text($("#carteFlavorText").val())
$("#carteFlavorText").on("input", function () {
	FlavText = $("#carteFlavorText").val()
	$("#cardInfo4").text($("#carteFlavorText").val())
	card = updateCard()
});

var defaults
if (localStorage["Card"]) {
	defaults = JSON.parse(localStorage.getItem("Card"))
	defaults
}

$("#saveButton").click(function () {
	defaults = JSON.parse(card)
	localStorage.setItem("Card", card)
	cl(JSON.stringify(card))
})

$("#exportButton").click(function () {
	code = JSON.stringify(card)
	navigator.clipboard.writeText(code)
})

$("#exportCode").on("input", function () {
	defaults = JSON.parse($(this).val())
	loadSave(false)
})

$("#loadButton").click(function () {
	loadSave()
})

/**
 * Code pour l'incrustation d'image - BORDURE
 */
$("#encadrement").on("input", function () {
	let value = $(this).val()
	cl(value)
	if (value) {
		$("#card").css("border-image-source", "url('./assets/Ressources/" + value + "')");
	} else {
		$("#card").css("border-image-source", "none");
	}
})

/**
 * Code pour choisir le nombre de champs
 */
$("#numberOption").on("input", function () {
	let value = $("#numberOption").val()
	if (value) {
		for (let i = 1; i <= value; i++) {
			$("#Info" + i).css("visibility", "visible")
			$("#cardInfo" + i).css("visibility", "visible")
		}
		value++
		for (let i = value; i < 6; i++) {
			$("#Info" + i).css("visibility", "hidden")
			$("#cardInfo" + i).css("visibility", "hidden")
		}
		}
})
/**
 * Code pour inclure une bordure de carte
 */
$("#borderValue").on("input", function () {
	let value = $(this).val()
	if (value) {
		$("#card").css("border-image-source", "url('" + value + "')");
	} else {
		$("#card").css("border-image-source", "none");
	}
})
/**
 * Code pour inclure une image d'arrière plan'
 */
$("#bgValue").on("input", function () {
	let value = $(this).val()
	if (value) {
		$("#inside").css("background-image", "url('" + value + "')");
	} else {
		$("#inside").css("background-image", "none");
	}
})

/* Choix du props à afficher*/
$("#IllustrationValue").on("input", function () {
	let value = $(this).val()
	if (value) {
		$("#propIllustration>img").attr("src", value);
		}
		else {
			$("#propIllustration>img").attr("src", "");
		}
})

$("#placeProp").on("click", function () {
	if (this.checked) {
		$("#propIllustration").css("display", "block")
		$("#displacement").css("display", "block")
	} else {

		$("#propIllustration").css("display", "none")
		$("#displacement").css("display", "none")
		}
})

//Centrage
$("#manualPositionOption").hide();
$("input[name='centrage']").on('input', function () {
	if ($(this).val() == 1) {
		$("#manualPositionOption").show()
	} else {
		$("#manualPositionOption").hide();
		$("#propIllustration").css("left", "calc(50% - " + 25 * scale + "px)")
		$("#propIllustration").css("top", "calc(50% - " + 25 * scale + "px)")
		}
		Centrage = $(this).val()
		card = updateCard()
});
//horizontal
$("#propIllustration").css("left", "calc(50%)")
$("#horizontalRange").on("input", function () {
	$("#propIllustration").css("left", "calc(50% + " + $(this).val() + "%")
	$("#horizontalValue").html($(this).val() + "");
	Horizontal = $(this).val()
	card = updateCard();
})

//vertical
$("#propIllustration").css("top", "calc(50%)")
$("#verticalRange").on("input", function () {
	$("#propIllustration").css("top", "calc(50% + " + $(this).val() + "%")
	$("#verticalValue").html($(this).val() + "");
	Vertical = $(this).val()
	card = updateCard();
})

//flip
$("#flipValue").on("input", function () {
	$("#propIllustration>img").css("transform", "scale(" + (1 - 2 * $(this).is(":checked")) + ", 1)")
	FlipX = $(this).is(":checked")
	cl(FlipX)
	card = updateCard();
})

//scale
var scale = 1
$("#scaleRange").on("input", function () {
	$("#propIllustration").css("width", ($("#scaleRange").val() * 50) + "px")
	$("#scaleValue").html("X" + $(this).val());
	scale = $(this).val()
	if ($("#manualPositionOption").val() == 1) {} else {
		$("#propIllustration").css("left", "calc(50% - " + 25 * scale + "px)")
		$("#propIllustration").css("top", "calc(50% - " + 25 * scale + "px)")
	}
	Echelle = $(this).val()
	card = updateCard()
})

//rotate
$("#rotateRange").on("input", function () {
	$("#propIllustration").css("transform", "rotate(" + $("#rotateRange").val() + "deg)")
	$("#rotaValue").html($(this).val() + "°");
	Rotation = $(this).val()
	card = updateCard();
})

//Crédits de l'illustration
var Credit = ""
$("#carteCreditValue").on("input", function () {
	Credit = $(this)
	cl($(this))
	$("#cardInfo3").text($(this).val())
	Credits = $(this).val()
	card = updateCard();
})

/**
 * DEBUG Mode
 */
$("#debugMode").on("click", function () {
	if (this.checked) {
		$(".field").css("outline-width", "3px")
		$("#cardText").css("outline-width", "3px")
		$("#cardText>div").css("outline-width", "3px")
		$("#cardValues").css("outline-width", "3px")
	} else {

		$(".field").css("outline-width", "0px")
		$("#cardText").css("outline-width", "0px")
		$("#cardText").css("outline-width", "0px")
		$("#cardText>div").css("outline-width", "0px")
		$("#cardValues").css("outline-width", "0px")
		}
})
/**PAR DÉFAUT */
$(".field").css("outline-width", "0px")
$("#cardText").css("outline-width", "0px")
$("#cardText").css("outline-width", "0px")
$("#cardText>div").css("outline-width", "0px")
$("#cardValues").css("outline-width", "0px")
