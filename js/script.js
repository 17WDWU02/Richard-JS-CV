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
//Change the Header Styles
var HeaderName = document.getElementById('Name');
HeaderName.style.color = "red";
HeaderName.style.fontSize = "50px";
HeaderName.innerHTML += " - CV";

//Add my Education List
var EducationList = document.getElementById('Education');
for (var i = 0; i < Education.length; i++) {
	EducationList.innerHTML += "<li>"+Education[i]+"</li>";
};

//Add my Employment List
var EmploymentContainer = document.getElementById('Employment');
for (var i = 0; i < Employment.length; i++) {
	EmploymentContainer.innerHTML += "<div class='EmploymentItem'>"+
										"<h3>" + Employment[i]["CompanyName"] + "</h3>"+
										"<h4>" + Employment[i].Role + "</h4>"+
									"</div>";
};

//Create a click function for my Employment List
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

//Pop up to show my employment with more info
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

//Close the Pop Up
document.getElementById('Close').addEventListener("click", ClosePopUp);

function ClosePopUp(){
	overlay = false;
	document.getElementById('popup').style.display = "none";
}

//Skills
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
		ChangeMainImage(image);

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
	ChangeMainImage(ClickedImage);
	var Thumbnails = document.getElementsByClassName('LightboxThumb');
	for (var i = 0; i < Thumbnails.length; i++) {
		Thumbnails[i].classList.remove("active");
	};
	Element.classList.add("active");
}

//Keyboard Click Events
window.onkeyup = function(event){
	if(LightBoxOpen === true){
		var Thumbnails = document.getElementsByClassName('LightboxThumb');
		var NextElement;
		var CurrentElement = keychangeLightBox();
		Thumbnails[CurrentElement].classList.remove('active');
		if(event.keyCode == 39){
			NextElement = CurrentElement + 1;
			if(NextElement == Thumbnails.length){
				NextElement = 0;
			}
		} else if(event.keyCode == 37){
			NextElement = CurrentElement - 1;
			if(NextElement == -1){
				NextElement = Thumbnails.length - 1;
			}
		}
		Thumbnails[NextElement].classList.add('active');
		var NewLightBox = Thumbnails[NextElement].getElementsByTagName('img')[0];
		ChangeMainImage(NewLightBox);
	}
}

function keychangeLightBox(){
	var Thumbnails = document.getElementsByClassName('LightboxThumb');
	for (var i = 0; i < Thumbnails.length; i++) {
		var ClassList = Thumbnails[i].classList;
		for (var j = 0; j < ClassList.length; j++) {
			if(ClassList[j] === 'active'){
				return i;
			}
		};
	};
}

function ChangeMainImage(element){
	document.getElementById('Lightbox-Image').src = element.src;
	document.getElementById('Lightbox-Image').alt = element.alt;
	document.getElementById('Lightbox-Image-Tag').innerText = element.alt;
}




































