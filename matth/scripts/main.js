var ignoreMouseWeel = false;
var projectData;
var projectOverlayImgNbr = 1;
var currentMediaId = 1;
var $data;

$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});

var tooltipID = 0;

function BeginTooltip(){
	//$(".tooltip:first").addClass("active");
  $("#down-button").animate({"opacity": 1}, 1000);
  $(".background:first").attr('id', 'black');
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
	$('#scroll').animate({
		scrollTop: 0
	}, 500);
	ignoreMouseWeel = true;
	//$(".background#white").removeClass("active");
	setTimeout(EndIgnoreMouseWeel, 500);
}

function ScrollToContent(){
	$('#scroll').animate({
		scrollTop: $("#content").offset().top + 10
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

function showProjectOverlayMedia(mediaId){
  if(mediaId < 0)
    mediaId = projectData.medias.length-1;
  else if(mediaId > projectData.medias.length-1)
    mediaId = 0;
  if(mediaId == 0){
    $("#project-overlay #showreel .arrow#left").hide();}
  else if(mediaId == 1)
    $("#project-overlay #showreel .arrow#left").show();
  if(mediaId == projectData.medias.length-1)
    $("#project-overlay #showreel .arrow#right").hide();
  else if(mediaId == projectData.medias.length-2)
    $("#project-overlay #showreel .arrow#right").show();
  console.log(mediaId);
  var media = projectData.medias[mediaId];
  if(media == null)
    return;
  currentMediaId = mediaId;
  if(media != null){
    switch (media.type) {
      case 'img':
        $("#project-overlay #medias").html('<div id="img" style="background-image: url(' + media.url + ')"></div>');
        break;
      case 'embed':
        $("#project-overlay #medias").html('<iframe src="' + media.url + '" frameborder="0" allowfullscreen></iframe>');
        break;
      case "html":
        $("#project-overlay #medias").html(media.html);
        break;
      default:
    }
  }
}

function showProjectInOverlay(projectId){
  if(projectId < 0 || projectId > $data.length-1)
    return;
  currentProjectId = projectId;
  projectData = $data[projectId];

  //projectData.medias.forEach(function(media){
  showProjectOverlayMedia(0);
  //});

  $("#project-overlay #name").text(projectData.name);
  $("#project-overlay #subtitle").text(projectData.subtitle);

  /*if(projectData.webBuild != "")
    $("#project-overlay #description").html(projectData.description + '<br><br><a class="button" href="/build/' + projectData.webBuild + '" target="_blank">Jouer</a>');
  else if(projectData.download != "")
    $("#project-overlay #description").html(projectData.description + '<br><br><a class="button" href="/build/' + projectData.download + '" target="_blank">Télécharger</a>');
  else*/
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
  //$("#project-overlay #page-nbr").text("1 / " + projectOverlayImgNbr);
  //currentMediaId = 1;

  $("#project-overlay").addClass("active");
  $("#project-overlay").css("z-index", 10);
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
	$('#scroll').scroll(function(event){

		if(ignoreMouseWeel)
			return;

		var NextScroll = $(this).scrollTop();

		if (NextScroll > CurrentScroll){
			if(NextScroll < 120)
				ScrollToContent();
		}
		else {
			if(NextScroll < window.innerHeight &&  NextScroll > 120)
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

  var data = projects;

  //$.getJSON("./scripts/projects.json", function (data) {
		for(var index=0; index<data.length; index++)
		{
			$("#realisations #project-grid").append('<div class="project ' + data[index].categories + '" id="' + index + '"><div id="img" style="background-image: url(' + data[index].thumbnail + ')"><div id="text"><div id="inner"><span id="name">' + data[index].name + '</span><br><span id="subtitle">' + data[index].subtitle + '</span></div></div></div></div>');

			if($("#savoir-faire .project#" + data[index].folder) != null){
				$("#savoir-faire .project#" + data[index].folder).each(function(){
					$(this).append('<div id="img" style="background-image: url(' + data[index].thumbnail + ')"></div><div id="text"><span id="name">' + data[index].name + '</span><br><span id="subtitle">' + data[index].subtitle + '</span></div>');
					$(this).attr("id", index);
				});
			}
		}

		$("#realisations .project").addClass("visible");

		/*$("#realisations .nav div").each(function(index) {
			$(this).append(" (" + $("#realisations .project." + $(this).attr("id")).length + ")");
		});*/

    var currentProjectId;

		$(".project").not("#skills .project").bind( "click", function() {
      showProjectInOverlay( parseInt( $(this).attr("id") ) );
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
		if(currentMediaId > 1){
			currentMediaId--;
			showProjectOverlayMedia(projectData.medias[currentMediaId]);
		}
	});

	$("#right-button").click(function() {
		if(currentMediaId < projectOverlayImgNbr){
			currentMediaId++;
			showProjectOverlayMedia(projectData.medias[currentMediaId]);
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
