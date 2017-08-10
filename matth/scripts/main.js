var ignoreMouseWeel = false;
var projectData;
var projectOverlayImgNbr = 1;
var currentImage = 1;
var $data;

$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});

var tooltipID = 0;

function BeginTooltip(){
	$(".tooltip:first").addClass("active");
  $("#down-button").animate({"opacity": 1}, 1000);
}
function SwitchTooltip(){
	if(tooltipID < 4){
		$(".tooltip.active").next().addClass("active");
		$(".tooltip.active:first").removeClass("active");
		tooltipID++;
	}
	else{
		$(".tooltip.active").removeClass("active");
		$(".tooltip:first").addClass("active");
		tooltipID = 0;
	}
}

function ScrollToTop(){
	$('html, body').animate({
		scrollTop: 0
	}, 500);
	ignoreMouseWeel = true;
	//$(".background#white").removeClass("active");
	setTimeout(EndIgnoreMouseWeel, 500);
}

function ScrollToContent(){
	$('html, body').animate({
		scrollTop: $("#content").offset().top
	}, 500);
	ignoreMouseWeel = true;
	//$(".background#white").addClass("active");
	setTimeout(EndIgnoreMouseWeel, 500);
}

function EndIgnoreMouseWeel(){
	ignoreMouseWeel = false;
}

$(window).resize(function() {
	resize();
});

function resize(){
	if(window.innerHeight*16 > window.innerWidth*9)
		$("#player").css({"width": window.innerHeight*16/9, "height": window.innerHeight, "top": 0, "left": -(window.innerHeight*16/9 - window.innerWidth)/2});
	else
		$("#player").css({"height": window.innerWidth*9/16, "width": window.innerWidth, "top": -(window.innerWidth*9/16 - window.innerHeight)/2, "left": 0});
}

function hideProjectOverlay(){
	$("#project-overlay").css("z-index", -2);
}

function hideFeedback(){
	$('#feedback').removeClass("active");
}

function imageExists(image_url){
	var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

	return http.status != 404;
}

$(function() {

	$('#skills #img').each(function() {
        var $img = jQuery(this);
        var imgURL = $img.attr('background-image');
        var attributes = $img.prop("attributes");

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Remove any invalid XML tags
            $svg = $svg.removeAttr('xmlns:a');

            // Loop through IMG attributes and apply on SVG
            $.each(attributes, function() {
                $svg.attr(this.name, this.value);
            });

            // Replace IMG with SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

	resize();
	//if(player.getCurrentTime() == 6000)

	var CurrentScroll = 0;
	$(window).scroll(function(event){

		if(ignoreMouseWeel)
			return;

		var NextScroll = $(this).scrollTop();

		if (NextScroll > CurrentScroll){
			if(window.pageYOffset < 120)
				ScrollToContent();
		}
		else {
			if(window.pageYOffset < window.innerHeight &&  window.pageYOffset > 120)
				ScrollToTop();
		}

		CurrentScroll = NextScroll;
	});

	$("#down-button").click(function() {
		ScrollToContent();
	});

	$("#savoir-faire .nav div").click(function() {
		$("#savoir-faire .nav .active").removeClass("active");
		$(this).addClass("active");
		$("#savoir-faire #exp-container .active").removeClass("active");
		$("#savoir-faire #exp-container #" + $(this).attr('id')).addClass("active");
	});

  var data = [
  	{
  		"name": "Ariko",
  		"subtitle": "Kalulu's Game Jam - Phaser JS",
  		"categories": "gd prog ld",
  		"folder": "Ariko",
  		"video": "",
  		"webBuild": "Ariko",
  		"download": "",
  		"description": "<p>Ce jeu iPad est destiné à l'apprentissage du système décimal pour des enfants de 5 à 10 ans.</p><p>Le but du jeu est de livrer le nombre exacte de pois que le livreur commande en utilisant des pois pour les unités, des cosses pour les dizaines et des grappes pour les centaines.</p><p>Pour y jouer sur navigateur, vous devrez dézoomer la page.</p><p>Cette Game Jam été organisée par Manzalab et ISART DIGITAL dans le cadre du concours X'PRIZE Global Learning.</p><br/><a class='button' href='http://www.kalulugamejam.com/accueil' target='_blank'>En savoir plus</a><br/>"
  	}, {
  		"name": "L'Odre du Lys",
  		"subtitle": "Visual Novel - Ren'py",
  		"categories": "scenar prog",
  		"folder": "VN",
  		"video": "4Z2tV00bB94",
  		"webBuild": "",
  		"download": "L-Ordre-Du-Lys.zip",
  		"description": "<p>Réalisé par 4 Game Designers et 6 Digital Artists.</p><p>L’histoire se passe dans une France du XIVème siècle aux mains des Templiers. Le joueur rencontrera des personnages lui disant qu’il fait partie d’un groupe rebelle, mais il se peut que la réalité soit tout autre...</p>"
  	}, {
  		"name": "Hipstown Corp.",
  		"subtitle": "Social Builder - Haxe/PixieJS",
  		"categories": "gd",
  		"folder": "Hipstown",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": "<p>Dans Hipstown, devenez la ville hipster la plus populaire en gagnant de nouveaux articles exclusifs et en réalisant les modes les plus originales ! Construisez des magasins, des décos, des maisons et faites grandir votre ville hipster !</p><p>Réalisé par une équipe de 13 personnes issues des formations Game Design, Game Art et Game Design & Programming.</p>"
  	}, {
  		"name": "Inspector Bourricot Vs. Mr Nobody",
  		"subtitle": "Global Game Jam 2016 - Unity 3D",
  		"categories": "gd prog",
  		"folder": "GGJ",
  		"video": "",
  		"webBuild": "GGJ",
  		"download": "",
  		"description": "<p>Jeu réalisé sur le thème « Rituels ».</p><p>Un joueur contrôle un tueur devant s’infiltrer dans la foule afin de sacrifier le personnage correspondant aux critères indiqués au centre de l’écran. Il lui faudra 5 sacrifices pour gagner la partie.</p><p>Un second joueur à la souris incarne l’Inspecteur Bourricot qui doit trouver le premier. Il peut fermer des portes pour créer un effet de surprise, puis tuer sa cible s’il l’a démasqué.</p>"
  	}, {
  		"name": "Killing Sight",
  		"subtitle": "FPS Multijoueur - Unity 3D",
  		"categories": "gd ld prog",
  		"folder": "P3D",
  		"video": "peCRv9_mUiU",
  		"webBuild": "",
  		"download": "",
  		"description": "<p>FPS PC fait sur Unity en un mois dans lequel les objets dans le champ de vision du joueur disparaissent.</p><p>Pour gagner un kill, il faut faire disparaître entièrement son adversaire en le regardant.</p><p>Pour contrer cela, l’adversaire peut utiliser un fumégène qui le cachera de la vision du joueur.</p>"
  	}, {
  		"name": "United We Laugh",
  		"subtitle": "Game Jam de 3 jours - Unity 3D",
  		"categories": "gd prog",
  		"folder": "UWL",
  		"video": "JOqlC-aTXPg",
  		"webBuild": "UnitedWeLaugh",
  		"download": "",
  		"description": "<p>Réalisé sur Unity 3D en 2 jours sur le thème 'Plus on est de fous, plus on ris', United We Laugh est un jeu dans lequel vous incarnez un clown ayant un rire contagieux. Votre but est de contaminer un maximum de passants en riant à côté d'eux.</p><p>Mais attention : si un policier vous entend, vous perdrez des adeptes ou vous ferez Game Over.</p>"
  	}, {
  		"name": "Polarium Dashed",
  		"subtitle": "Puzzle-game Smartphone - MonoGame",
  		"categories": "gd ld prog",
  		"folder": "Polarium",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": "<p>Polarium Dashed est un puzzle-game basé sur le jeu Polarium sortis sur Nintendo DS. Par groupe de 3 Game Designers, nous devions réaliser la programmation, les graphismes et la sonorisation du jeu.</p><p>Nous devions également modifier le gameplay par l'ajout d'une nouvelle feature ouvrant la voie à de nouveaux puzzles.</p><p>La feature de Polarium Dashed est un power-up permettant de 'sauter' une case sur deux.</p>"
  	}, {
  		"name": "Polarium Random",
  		"subtitle": "Puzzle-game Smartphone - Unity 3D",
  		"categories": "gd ld prog",
  		"folder": "PolariumRandom",
  		"video": "",
  		"webBuild": "PolariumRandom",
  		"download": "",
  		"description": "<p>Du au limitation du développement sur MonoGame en version gratuite, j'ai créé une version alternative sur Unity 3D afin d'avoir la possibilité de faire des builds WebGL et smartphone.</p><p>Cette version diffère aussi par son design : elle ne comporte pas de feature originale, les niveaux sont chronométrés et générés de manière procédurale.</p><p>J'ai également implémenté beaucoup d'animations grâce au plugin DoTween.</p>"
  	}, {
  		"name": "EIS: Galactic War",
  		"subtitle": "Tactical Multijoueur Smartphone - Unity 3D",
  		"categories": "gd ld prog",
  		"folder": "EIS",
  		"video": "",
  		"webBuild": "EIS-GalacticWar",
  		"download": "",
  		"description": "<p>EIS: Galactic War est un jeu tactique de type Cell-War. Je l'ai développé en collaboration avec un graphiste.</p>"
  	}, {
  		"name": "Shoot'em Up",
  		"subtitle": "Construct 2",
  		"categories": "ld prog",
  		"folder": "Shmup",
  		"video": "sy7879KDe0o",
  		"webBuild": "Shmup",
  		"download": "",
  		"description": "<p>Projet individuel réalisé sur Construct 2 à partir d'assets graphiques.</p>"
  	}, {
  		"name": "Micro-games",
  		"subtitle": "Construct 2",
  		"categories": "gd prog",
  		"folder": "Microgames",
  		"video": "",
  		"webBuild": "Micro-games",
  		"download": "",
  		"description": "<p>Projet individuel de 1e année de Game Design consistant à concevoir et créer un ensemble de trois micro-games comportant chacun 3 niveaux de difficultés.</p><p>Un micro-game est un jeu ne devant pas durer plus de quelques secondes. Ils sont souvent inclus dans des compilations (comme Wario Ware par exemple).</p>"
  	}, {
  		"name": "Maps Death-Match et CTF",
  		"subtitle": "Unreal Tournament 4 - UE4",
  		"categories": "ld",
  		"folder": "UT4",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": "<p>Il s'agit de deux maps Unreal Tournament 4. La map Death-Match a été faite début 2015.</p>"
  	}, {
  		"name": "Map Warcraft III 1V1",
  		"subtitle": "Warcraft III Editor",
  		"categories": "ld",
  		"folder": "Warcraft3",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": ""
  	}, {
  		"name": "Design Inventaire Skyrim",
  		"subtitle": "Adobe Flash - AS3",
  		"categories": "prog",
  		"folder": "Skyrim",
  		"video": "",
  		"webBuild": "SkyrimInventory.swf",
  		"download": "",
  		"description": "<p>Projet individuel dont le but était de repenser l'interface de l'inventaire de Skyrim puis de programmer cette nouvelle interface avec Adobe Flash en ActionScript 3.</p>"
  	}, {
  		"name": "Tribal Conquest",
  		"subtitle": "Jeu de plateau market-ready",
  		"categories": "gd",
  		"folder": "JDP",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": "<p>Jeu « ready for market » créé par une équipe composée de 4 concepteurs ainsi que 5 graphistes dans lequel chaque joueur incarne un chaman voulant répandre son culte sur les terres de ses rivaux.</p><p>L’important pour nous - game designers - était de créer des mécaniques de jeu intéressantes, fluides ainsi que des règles pouvant être comprises rapidement.</p>"
  	}, {
  		"name": "5 fruits et légumes par jour",
  		"subtitle": "Game Jam - Unity 3D",
  		"categories": "other",
  		"folder": "GameDay",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": ""
  	}, {
  		"name": "Aguard Chronicles",
  		"subtitle": "Création d'univers",
  		"categories": "scenar",
  		"folder": "Asguard",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": ""
  	}, {
  		"name": "Site web personnel",
  		"subtitle": "6 versions depuis 2013",
  		"categories": "other",
  		"folder": "PF-LG",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": ""
  	}, {
  		"name": "Portfolio de Matthieu Lopez",
  		"subtitle": "...",
  		"categories": "other",
  		"folder": "PF-ML",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": ""
  	}, {
  		"name": "Octavarium",
  		"subtitle": "Identité visuelle",
  		"categories": "other",
  		"folder": "Octavarium",
  		"video": "",
  		"webBuild": "",
  		"download": "",
  		"description": ""
  	}
  ];

	//$.getJSON("./scripts/projects.json", function (data) {
		for(var index=0; index<data.length; index++)
		{
			$("#realisations #project-grid").append('<div class="project ' + data[index].categories + '" id="' + index + '"><div id="img" style="background-image: url(imgs/projects/' + data[index].folder + '/thumbnail.jpg)"><div id="text"><div id="name">' + data[index].name + '</div><div id="subtitle">' + data[index].subtitle + '</div></div></div></div>');

			if($("#savoir-faire .project#" + data[index].folder) != null){
				$("#savoir-faire .project#" + data[index].folder).each(function(){
					$(this).append('<div id="img" style="background-image: url(imgs/projects/' + data[index].folder + '/thumbnail.jpg)"></div><div id="text"><div id="name">' + data[index].name + '</div><div id="subtitle">' + data[index].subtitle + '</div></div>');
					$(this).attr("id", index);
				});
			}
		}

		$("#realisations .project").addClass("visible");

		$("#realisations .nav div").each(function(index) {
			$(this).append(" (" + $("#realisations .project." + $(this).attr("id")).length + ")");
		});

		$(".project").not("#skills .project").bind( "click", function() {
			projectData = $data[parseInt($(this).attr("id"), 10)];

			if(projectData.video == "")
				$("#project-overlay #imgs").css("background-image", "url(imgs/projects/" + projectData.folder + "/1.jpg");
			else
				$("#project-overlay #imgs").html('<iframe src="https://www.youtube.com/embed/' + projectData.video + '" frameborder="0" allowfullscreen></iframe>');

			$("#project-overlay #name").text(projectData.name);
			$("#project-overlay #subtitle").text(projectData.subtitle);

			if(projectData.webBuild != "")
				$("#project-overlay #description").html(projectData.description + '<br/><a class="button" href="/build/' + projectData.webBuild + '" target="_blank">Jouer</a>');
			else if(projectData.download != "")
				$("#project-overlay #description").html(projectData.description + '<br/><a class="button" href="/build/' + projectData.download + '" target="_blank">Télécharger</a>');
			else
				$("#project-overlay #description").html(projectData.description);

			/*if(imageExists("imgs/projects/" + projectData.folder + "/3.jpg") == true)
				projectOverlayImgNbr = 3;
			else if(imageExists("imgs/projects/" + projectData.folder + "/2.jpg") == true)
				projectOverlayImgNbr = 2;
			else*/
				projectOverlayImgNbr = 1;

			/*projectOverlayImgNbr = imageExists("imgs/projects/" + projectData.folder) - 1;
			$.get("imgs/projects/" + projectData.folder + "/3.jpg").done(function() {
				projectOverlayImgNbr = 3;
			}).fail(function() {
				$.get("imgs/projects/" + projectData.folder + "/2.jpg").done(function() {
					projectOverlayImgNbr = 2;
				});
			});*/
			$("#project-overlay #page-nbr").text("1 / " + projectOverlayImgNbr);
			currentImage = 1;

			$("#project-overlay").addClass("active");
			$("#project-overlay").css("z-index", 10);
		});

		$data = data;

	/*}).fail(function( jqxhr, textStatus, error ) {
		console.log( "Request Failed: " + textStatus + ', ' + error);
	});*/

	$("#realisations .nav div").click(function() {
		$("#realisations .project.visible").removeClass("visible");
		$("#realisations .project." + $(this).attr("id")).addClass("visible");
		$("#realisations .nav .active").removeClass("active");
		$(this).addClass("active");
	});

	$("#close-button").click(function() {
		$("#project-overlay").removeClass("active");
		$("#project-overlay #imgs").html("");
		$("#project-overlay #imgs").css("background-image", "none");
		setTimeout(hideProjectOverlay, 200);
	});

	$("#left-button").click(function() {
		if(currentImage > 1){
			currentImage--;
			$("#project-overlay #imgs").css("background-image", "url(imgs/projects/" + projectData.folder + "/" + currentImage + ".jpg");
			$("#project-overlay #page-nbr").text(currentImage + " / " + projectOverlayImgNbr);
		}
	});

	$("#right-button").click(function() {
		if(currentImage < projectOverlayImgNbr){
			currentImage++;
			$("#project-overlay #imgs").css("background-image", "url(imgs/projects/" + projectData.folder + "/" + currentImage + ".jpg");
			$("#project-overlay #page-nbr").text(currentImage + " / " + projectOverlayImgNbr);
		}
	});

	$('#send-button').click(function(e){
		e.preventDefault();
		var error = false;
		var $name = $('input#name').val();
		var $email = $('input#email').val();
		var $message = $('textarea#message').val();

		if($name.length == 0){
			error = true;
			$('input#name').css("color", "red");
		} else {
			$('input#name').removeAttr("style");
		}

		if($email.length == 0 || $email.indexOf('@') == '-1' || $email.indexOf('.') == '-1'){
			error = true;
			$('input#email').css("color", "red");
		} else {
			$('input#email').removeAttr("style");
		}

		if($message.length == 0){
			error = true;
			$('textarea#message').css("color", "red");
		} else {
			$('textarea#message').removeAttr("style");
		}

		if(error){

		}
		else{
			var data = {
				name: $name,
				email: $email,
				message: $message
			};
			$.ajax({
				type: "POST",
				url: "scripts/email.php",
				data: data,
				success: function(){
					$('#feedback').addClass("active");
					$('input#name').val('');
					$('input#email').val('');
					$('textarea#message').val('');
					setTimeout(hideFeedback, 5000);
				}
			});
		}
	});


	$("#scrollTop").click(function() {
		ScrollToTop();
	});

	//$("body > div")[4].css("display", "none");
});
