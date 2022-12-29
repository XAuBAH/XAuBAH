function map(val, minA, maxA, minB, maxB) {
  return (minB + ((val - minA) * (maxB - minB)) / (maxA - minA))/100;
}
function map2(val, minA, maxA, minB, maxB) {
  return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
}

function Card3D(card, ev) {
  let img = card.querySelector('a');
  if(img.href.includes('/products/219902') || img.href.includes('/products/107896') || img.href.includes('/products/82915') || img.href.includes('/products/82914') || img.href.includes('/products/766'))
  {
	  let imgRect = card.getBoundingClientRect();
	  let width = imgRect.width;
	  let height = imgRect.height;
	  let mouseX = ev.offsetX;
	  let mouseY = ev.offsetY;
	  let rotateY = map(mouseX, 0, 180, -25, 25);
	  let rotateX = map(mouseY, 0, 250, 25, -25);
	  let brightness = map2(mouseY, 0, 250, 1.5, 0.5);
	  let glassreflect = map2(mouseX, 0, 150, 0, -500);
	  
	  //img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	  img.style.transform = `rotate3d( ${rotateX}, ${rotateY}, 0, 25deg )`;
	  img.style.filter = `brightness(${brightness})`;
	  img.querySelector('img').style.backgroundPosition = `${glassreflect*brightness}px`;
  }
}

function initCards(Interval = true) {
  var cards = document.querySelectorAll('.store-products__item:nth-child(-n+5)');

  cards.forEach((card) => {
    card.dataset.norm = "true";
    card.addEventListener('mousemove', (ev) => {
      //requestAnimationFrame(() => { Card3D(card, ev); });
      Card3D(card, ev);
    });

    card.addEventListener('mouseleave', (ev) => {
      let img = card.querySelector('a');

      img.style.transform = 'rotate3d( 0, 0, 0, 0deg )';
      img.style.filter = 'brightness(1)';
    });
  });
  if(Interval)
  	setInterval((()=>CheckCards()), 1000);
}

function CheckCards() {
  var card = document.querySelector('.store-products__item:nth-child(1)');
  if(card && (!card.dataset || card.dataset.norm != 'true')) {
    initCards(false);
  }
  
}
DOMReady((function() {
    setTimeout((()=>initCards()), 3000);
    setTimeout((()=>setTabsNav()), 3000);
}));


function setTabsNav() {
    var headerbuttonNews = document.querySelector('.nav-link-news');
	headerbuttonNews?.addEventListener("click", function() {
	  document.querySelectorAll('.nav-link').forEach((curLink) => {
		  curLink.classList.remove("active");
		});
	  this.classList.add("active");
	});
	 
	 
    var headerbuttonProducts = document.querySelector('.nav-link-products');
	headerbuttonProducts?.addEventListener("click", function() {
	  document.querySelectorAll('.nav-link').forEach((curLink) => {
		  curLink.classList.remove("active");
		});
	  this.classList.add("active");
	});
    var headerbuttonDropdown = document.querySelector('.dropdown .nav-link');
	headerbuttonDropdown?.addEventListener("click", function() {
	  document.querySelectorAll('.nav-link').forEach((curLink) => {
		  curLink.classList.remove("active");
		});
	  this.classList.add("active");
	});
    var headerbuttonProfile = document.querySelector('.nav-link-profile');
	headerbuttonProfile?.addEventListener("click", function() {
	  document.querySelectorAll('.nav-link').forEach((curLink) => {
		  curLink.classList.remove("active");
		});
	  this.classList.add("active");
	});
	switch(location.pathname.split("/")[1]){
		case 'news':
			document.querySelector('.nav-link-news')?.classList.add("active");
		break;
		case 'products':
			document.querySelector('.nav-link-products')?.classList.add("active");
		break;
		case 'servers':
			if(location.pathname.split("/")[3] === 'bans')
				document.querySelector('.nav-link-custom')?.classList.add("active");
			else
				document.querySelector('.dropdown .nav-link')?.classList.add("active");
		break;
		case 'profile':
			document.querySelector('.nav-link-profile')?.classList.add("active");
		break;
	}
   }
