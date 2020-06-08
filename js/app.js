/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

let sections = document.querySelectorAll("section");
let navbar = document.getElementById("navbar__list");
let sectionNames = [];
let sectionID = [];
sections.forEach(entry => {
	sectionNames.push(entry.getAttribute("data-nav"));
	sectionID.push(entry.getAttribute("id"));
});

/**
 * End Global Variables
 * Start Helper Functions
 *
*/


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav(){
	for(let i=0; i<= sections.length; i++){
		let li = document.createElement("li");
	    let a = document.createElement("a");
	    a.textContent = sectionNames[i];
	    a.id = "a" + sectionID[i];
	    a.setAttribute("href", "#"+sectionID[i]);
	    a.setAttribute("class", "navbar__link");
	    // Scroll to section on link click
	    a.addEventListener('click', goToSection);
	    navbar.appendChild(li).appendChild(a);
	}
}

// Add class 'active' to section when near top of viewport

function activeSection(){
	document.body.style.overflow = "visible";
	let sectionY = [];
	sections.forEach(entry => {
		if(entry.style.display == "block"){
			sectionY.push(Math.abs(entry.getBoundingClientRect().top));
		}
	});

	let top = Math.min(...sectionY);
		sections.forEach(entry => {
			if(Math.abs(entry.getBoundingClientRect().top) == top){
				entry.classList.add("your-active-class");
				menuItem = document.getElementById("a"+entry.id);
				menuItem.style.color = "red";
			}
			else{
				entry.classList.remove("your-active-class");
				menuItem = document.getElementById("a"+entry.id);
				menuItem.style.color = "black";
			}
		});

}


// Scroll to anchor ID using scrollTo event
function goToSection(element){
	sections.forEach(entry => {
		if(element.target.textContent == entry.getAttribute("data-nav")){
			entry.style.overflow = "visible";
			entry.style.display = "block";
			if(entry.previousElementSibling.textContent == "Open Section"){
		  		entry.previousElementSibling.textContent = "Close Section";
		  	}
		}

	});

	activeSection();
}

/**
 * End Main Functions
 * Begin Events
 *
*/

document.addEventListener('DOMContentLoaded', function() {
	// Build menu
	buildNav();
	// Set sections as active
    document.addEventListener('scroll', activeSection);
});




/*collapsible sections https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible*/
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
  	if(this.textContent == "Open Section"){
  		this.textContent = "Close Section";
  	}
  	else if(this.textContent == "Close Section"){
  		this.textContent = "Open Section";
  	}
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
    activeSection();
  });
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}