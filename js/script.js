var overlay = false;

var Education = ['Scots College Wellington',
 				'Victoria University of Wellington',
 				 'Yoobee School of Design'
 				 ];

var Employment = [
	{
		CompanyName : "Yoobee School of Design",
		Role : "Web and UX Design Tutor",
		StartDate : "July 2016",
		EndDate : "Present",
		Description : "Description for Yoobee School of Design"
	},
	{
		CompanyName : "Little Yellow Bird",
		Role : "Web Developer",
		StartDate : "April 2016",
		EndDate : "Present",
		Description : "Description for Little Yellow Bird"
	}
];

var HeaderName = document.getElementById('Name');
HeaderName.style.color = "red";
HeaderName.style.fontSize = "50px";
HeaderName.innerHTML += " - CV";

var EducationList = document.getElementById('Education');
for (var i = 0; i < Education.length; i++) {
	EducationList.innerHTML += "<li>"+Education[i]+"</li>";
};

var EmploymentContainer = document.getElementById('Employment');
for (var i = 0; i < Employment.length; i++) {
	EmploymentContainer.innerHTML += "<div class='EmploymentItem'>"+
										"<h3>" + Employment[i]["CompanyName"] + "</h3>"+
										"<h4>" + Employment[i].Role + "</h4>"+
									"</div>";
};

var EmploymentBlock = document.getElementsByClassName('EmploymentItem');
for (var i = 0; i < EmploymentBlock.length; i++) {
	EmploymentBlock[i].onclick = function(){
		if(overlay === false){
			var companyname = this.childNodes[0].innerText;
			popup(companyname);
			overlay = true;
		}
	}
};

function popup(CompanyName){
	var CompanyDesc;
	for (var i = 0; i < Employment.length; i++) {
		if(Employment[i]['CompanyName'] == CompanyName){
			CompanyDesc = Employment[i]['Description'];
			break;
		}
	};
	var popupbox = document.getElementById('popup');
	popupbox.childNodes[1].innerText = CompanyName;
	popupbox.childNodes[5].innerText = CompanyDesc;
	popupbox.style.display = 'block';
}

document.getElementById('Close').addEventListener("click", ClosePopUp);

function ClosePopUp(){
	// popupbox.style.display = 'none';
	overlay = false;
	document.getElementById('popup').style.display = "none";
}

var Skills = [
	{
		SkillName : "HTML",
		Percentage : "80",
		Colour : "#D22630"
	},
	{
		SkillName : "CSS",
		Percentage : "70",
		Colour : "#365ABD"
	},
	{
		SkillName : "JS",
		Percentage : "60",
		Colour: "#00AD50"
	}
]

var SkillMoving = false;
//Skills Bar
var SkillContainer = document.getElementById('SkillContainer');
for (var i = 0; i < Skills.length; i++) {
	SkillContainer.innerHTML += "<label>"+Skills[i]['SkillName']+"</label>"+
								"<div class='SkillBar'>"+
									"<div id='"+Skills[i].SkillName+"' class='progress'></div>"+
								"</div>"
};

var bars = document.getElementsByClassName('progress');

function progressSkills(){
	if(SkillMoving == false){

		for (var i = 0; i < bars.length; i++) {
			var StopPoint;
			for(var j = 0; j < Skills.length; j++){
				if(bars[i].id == Skills[j]['SkillName']){
					StopPoint = Skills[j]['Percentage'];
					var Colour = Skills[j]['Colour'];
					break;
				}
			}
		move(bars[i], StopPoint, Colour);
		}
	}
}

function move(bar, StopPoint, Colour){
	var width = 0;
	bar.style.backgroundColor = Colour;
	var barMove = setInterval(barGrow, 10);
	function barGrow(){
		if(width >= StopPoint){
			clearInterval(barMove);
			SkillMoving = false;
		} else {
			SkillMoving = true;
			width++;
			bar.style.width = width + '%';
			bar.innerHTML = width + '%';
		}
	}

}
var LightBoxOpen = false;
function openLightbox(){
	document.getElementById('Lightbox').style.display = "block";
	LightBoxOpen = true;
}

function closeLightbox(){
	document.getElementById('Lightbox').style.display = "none";
	LightBoxOpen = false;
}

var Images = document.getElementsByClassName('single-image');
for (var i = 0; i < Images.length; i++) {
	Images[i].onclick = function(){
		var image = this.getElementsByTagName('img')[0];
		document.getElementById('Lightbox-Image').src = image.src;
		document.getElementById('Lightbox-Image').alt = image.alt;
		document.getElementById('Lightbox-Image-Tag').innerText = image.alt;

		var ThumbWidth = 100 / Images.length;
		var ImgContainer = document.getElementById('thumbImage');
		ImgContainer.innerHTML = "";
		for (var j = 0; j < Images.length; j++) {
			var jImage = Images[j].getElementsByTagName('img')[0];
			ImgContainer.innerHTML += "<div class='LightboxThumb "+jImage.alt+"' style='width:"+ThumbWidth+"%' onclick='changeLightBox(this);'>"+
										"<img src='"+jImage.src+"' alt='"+jImage.alt+"'>"+ 
										"</div>"
			if(jImage.src === image.src){
				document.getElementsByClassName(jImage.alt)[0].classList.add("active");
			}
		};
	}
};

function changeLightBox(Element){
	var ClickedImage = Element.getElementsByTagName('img')[0];
	document.getElementById('Lightbox-Image').src = ClickedImage.src;
	document.getElementById('Lightbox-Image').alt = ClickedImage.alt;
	document.getElementById('Lightbox-Image-Tag').innerText = ClickedImage.alt;
	var Thumbnails = document.getElementsByClassName('LightboxThumb');
	for (var i = 0; i < Thumbnails.length; i++) {
		Thumbnails[i].classList.remove("active");
	};
	Element.classList.add("active");
}

//Keyboard Click Events
window.onkeyup = function(event){
	if(LightBoxOpen === true){
		if(event.keyCode == 39){
			var Thumbnails = document.getElementsByClassName('LightboxThumb');
			var NextElement;
			for (var i = 0; i < Thumbnails.length; i++) {
				var ClassList = Thumbnails[i].classList;
				for (var j = 0; j < ClassList.length; j++) {
					if(ClassList[j] === 'active'){
						var CurrentElement = i;
						break;
					}
				};
			};
			console.log(CurrentElement);




		} else if(event.keyCode == 37){
			console.log("left");
		}
	}
}






























