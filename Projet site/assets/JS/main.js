/* input: pour un appel au coup par coup
    change: pour un appel une fois le focus fini
*/
function cl(...el) {
  return console.log(...el)
}

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
  //console.log('RESULT:', dataUrl)
})

var saveValues = function () {
  values = {
    "Titre": Titre,
    "Info": {
      "Info1": Info[1],
      "Info2": Info[2],
      "Info3": Info[3],
      "Info4": Info[4],
      "Info5": Info[5],
      "Info6": Info[6]
    }
  }
  return JSON.stringify(values)
}

var Info = []

var values = saveValues()
cl(values)

/*Titre*/
var Titre
$("#cardTitre>h3").text($("#carteNameVal").val())
$("#carteNameVal").on("input", function () {
  $("#cardTitre>h3").text($("#carteNameVal").val())
  Titre = $("#carteNameVal").val()
  values = saveValues()
});
/*HP*/
var Hp
$("#cardInfo1").text($("#carteHpVal").val())
$("#carteHpVal").on("input", function () {
  $("#cardInfo1").text($("#carteHpVal").val())
  Hp = $("#carteHpVal").val()
  values = saveValues()
});
/*Mana*/
var Mana
$("#cardInfo2").text($("#carteManaVal").val())
$("#carteManaVal").on("input", function () {
  $("#cardInfo2").text($("#carteManaVal").val())
  Hp = $("#carteManaVal").val()
  values = saveValues()
});

/*Nombre d'attaque*/
var nbAtk

let val = $("#carteNbAtkVal").val()

for (let i = 1; i <= 3; i++){
  $("#carteAtk"+i+"Info").hide();
  $("#atk"+i).hide();
}

for (let i = 1; i <= val; i++){
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
    nbAtk = $("#carteManaVal").val()
    values = saveValues()
  }
})
/* Input radio > choix pour type de dessin  ( rien x choix x importer)*/
//Initialisation
$(".optionElement input:radio").each(function(){
  $(this).parent().parent().next().children(".fileOptionSelected1").hide()
  $(this).parent().parent().next().children(".fileOptionSelected2").hide()
})
//logique
$(".optionElement input:radio").each(function(){
  $(this).change(function(){
    if($(this).val()==0){
      $(this).parent().parent().next().children(".fileOptionSelected1").hide()
      $(this).parent().parent().next().children(".fileOptionSelected2").hide()
    }
      $(this).parent().parent().next().children(".fileOptionSelected"+$(this).val()).show()
      $(this).parent().parent().next().children(".fileOptionSelected"+(3-$(this).val())).hide()
    })
})


/**
 * de/affichage du prop et de ses options
 * [DEBUG] mettre tout en relative
 */
$("#areaIllustrationBoxOption input:radio").change(function () {
  if ($(this).val() == 0) {
    $("#propIllustration").hide()
    $("#cartePosition").hide()
  }
  else {
    $("#propIllustration").show()
    $("#cartePosition").show()
  }
})


/*Liens atkInfo au éléments atk*/
for (let i = 1; i <= 3; i++) {
  $("#atk" + i + "Icone").html($("#atkIcone" + i + "Val").val());
  $("#atkIcone" + i+"Val").on("input", function () {
    let icone = $("#atkIcone" + i + "Val").val()
    $("#atk" + i + "Icone").html($("#atkIcone" + i + "Val").val());
  })
  $("#atk" + i + "Name").html($("#atkName" + i + "Val").val());
  $("#atkName" + i+"Val").on("input", function () {
    let name = $("#atkName" + i + "Val").val()
    $("#atk" + i + "Name").html($("#atkName" + i + "Val").val());
  })
  $("#atk" + i + "Power").html($("#atkPower" + i + "Val").val());
  $("#atkPower" + i + "Val").on("input", function () {
    let damage = $("#atkPower" + i + "Val").val()
    $("#atk" + i + "Power").html($("#atkPower" + i + "Val").val());
  })
  $("#atk" + i + "Mana").html($("#atkMana" + i + "Val").val());
  $("#atkMana" + i + "Val").on("input", function () {
    let mana = $("#atkMana" + i + "Val").val()
    $("#atk" + i + "Mana").html($("#atkMana" + i + "Val").val());
  })
  $("#atk" + i + "Desc").html($("#atkDesc" + i + "Val").val());
  $("#atkDesc" + i + "Val").on("input", function () {
    let description = $("#atkDesc" + i+"Val").val()
  $("#atk" + i + "Desc").html($("#atkDesc" + i + "Val").val());
  })
}

//if ($("atk" + i + "IcoOption").value()) { }
for (let i = 1; i <= 3; i++) {
  $("#atk" + i + "IconeValue").on("input", function () {
    $("#atk"+i+"Icone>img").attr("src",$(this).val())
  })
}

/*FlavorText*/
var flavorText
$("#cardInfo4").text($("#carteFlavorText").val())
$("#carteFlavorText").on("input", function () {
  flavorText = $("#carteFlavorText").val()
  $("#cardInfo4").text($("#carteFlavorText").val())
  values = saveValues()
});

var defaults
if (localStorage["Values"]) {
  defaults = JSON.parse(localStorage.getItem("Values"))
  defaults
}

$("#SaveButton").click(function () {
  defaults = JSON.parse(values)
  localStorage.setItem("Values", values)
})

$("#LoadButton").click(function () {
  if (localStorage["Values"]) {
    defaults = JSON.parse(localStorage.getItem("Values"))
    Titre = defaults["Titre"]
    $("#cardTitle>h2").text(Titre)
    for (let i = 0; i < 7; ++i) {
      Info[i] = defaults.Info["Info" + i]
      $("#cardInfo" + i).text(Info[i])
    }
  }
})

/**
 * Code pour l'incrustation d'image - BORDURE
 */
$("#encadrement").on("input", function () {
  let value = $("#encadrement").val()
  if (value) {
    $("#inside").css("border-image-source", "url('./assets/Ressources/" + value + "')");
  } else {
    $("#inside").css("border-image-source", "none");
  }
})

/**
 * Code pour choisir le nombre de champs
 */
$("#numberOption").on("input", function () {
  let value = $("#numberOption").val()
  if (value) {
    for (let i = 1; i <= value; i++){
      $("#Info"+i).css("visibility","visible")
      $("#cardInfo"+i).css("visibility","visible")
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
    $("#card>#inside").css("border-image-source", "url('" + value + "')");
  } else {
    $("#card>#inside").css("border-image-source", "none");
  }
})
/**
 * Code pour inclure une image d'arrière plan'
 */
$("#bgValue").on("input", function () {
  let value = $("#bgValue").val()
  if (value) {
    $("#cardIllustration").css("background-image", "url('" + value + "')");
  } else {
    $("#cardIllustration").css("background-image", "none");
  }
})

/* Choix du props à afficher*/
$("#IllustrationValue").on("input", function () {
  let value = $(this).val()
  if (value) {
    $("#propIllustration>img").attr("src",  value );
  } else {
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
  if ($(this).val()==1) {
    $("#manualPositionOption").show()
  }
  else {
    $("#manualPositionOption").hide();
    $("#propIllustration").css("left", "calc(50% - "+25*scale+"px)")
    $("#propIllustration").css("top", "calc(50% - "+25*scale+"px)")
  }
});
//horizontal
$("#propIllustration").css("left", "calc(50%)")
$("#horizontalRange").on("input", function () {
  $("#propIllustration").css("left", "calc(50% + " + $(this).val() + "%")
  $("#horizontalValue").html($(this).val()+"");
})

//vertical
$("#propIllustration").css("top", "calc(50%)")
$("#verticalRange").on("input", function () {
  $("#propIllustration").css("top", "calc(50% + " + $(this).val() + "%")
  $("#verticalValue").html($(this).val()+"");
})

//flip
$("#flipValue").on("input", function () {
  $("#propIllustration>img").css("transform", "scale(" + (1 - 2 * $(this).is(":checked") )+ ", 1)")
})

//scale
var scale=1
$("#scaleRange").on("input", function () {
  $("#propIllustration").css("width", ($("#scaleRange").val()*50) + "px")
  $("#scaleValue").html("X" + $(this).val());
  scale = $(this).val()
})

//rotate
$("#rotateRange").on("input", function () {
  $("#propIllustration").css("transform", "rotate(" + $("#rotateRange").val() + "deg)")
  $("#rotaValue").html($(this).val() + "°");
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
/** 
 * Structure JSON d'une carte
 */

/*
[{
  "card1":
  {
    "id": [ID,"required"],
    "title": [Title,"required"],
    "pv":  [Hp,""],
    "attack": [Attack,""],
    "mana": [Mana,""],
    "illustration": [Illus,"required"],
    "border": [Border,"required"],
    "background": [Bg,"required"],
    "cardBackground": [CardBg,"required"],
    "attack1": [{
      "icon": [IcoAtt1,""],
      "name": [NameAtt1,"required"],
      "damage": [DamageAtt1,""],
      "mana": [ManaAtt1,""],
      "description": [DescAtt1,""]
    },""],
    "attack2": [{
      "icon": [IcoAtt2,""],
      "name": [NameAtt2,"required"],
      "damage": [DamageAtt2,""],
      "mana": [ManaAtt2,""],
      "description": [DescAtt2,""]
    },""],
    "attack3": [{
      "icon": [IcoAtt3,""],
      "name": [NameAtt3,"required"],
      "damage": [DamageAtt3,""],
      "mana": [ManaAtt3,""],
      "description": [DescAtt3,""]
    },""],
    "flavorText": [FlavText,""],
    "credits": [Credits,""]
  }
}]


//**
// Image -> Base64
//  */

//**
// Base64 -> Image
//  *