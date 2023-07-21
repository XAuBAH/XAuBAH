var tabLinks;
var tabContent;
var isVKapp = false;
var isMobile = false;
var triggeredUpdate = false;
var firstTrigger = false;
var TriggerCount = 0;

var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}

	
DOMReady(function() {
	tabLinks = document.querySelectorAll(".tablinks");
	tabContent = document.querySelectorAll(".tabcontent");
	isMobile = vkConnect.isWebView();
	
	tabLinks.forEach(function (el) {
	  el.addEventListener("click", openTabs); 
	});
	if(!isMobile){
		document.querySelectorAll('input[type=checkbox]').forEach(function (el) {
		  el.addEventListener("click", autosize); 
		});
	}
	
	isVKapp = (window.name.indexOf('fXD') === 0);
	
	
	/* VK.init(
	  function(){
	}); */
	vkConnect.send("VKWebAppInit", {});
	
	setInterval(updateOnline, 10000);
	setTimeout(() => autosize(), 3000);
	
	//prepareKits();
	
	
});
//на всякий
vkConnect.send("VKWebAppInit", {});

function steam(el) {
	
	window.open('steam://connect/'+document.getElementById("ipval"+el).value,'_blank');
}

function cop(el) {
	
	var e = document.getElementById("ipval"+el);
		
		var oldval = e.value;
		e.value = 'client.connect ' + oldval;
		try {
			e.select();
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			alert('нажмите CTRL + V чтобы вставить в консоль F1 в игре'); 
		} catch (err) {
			console.log('Oops, unable to copy' + err);
		  }
		e.value = oldval;
}


function updateOnline(first = false) {
	if(!triggeredUpdate || TriggerCount > 100)return;
	if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)return;
	TriggerCount++;
	
	getJSON('./servstats.php', function(gjson){
		let i = 9;
		try{
			gjson = JSON.parse(gjson);
		}catch(e){
			console.log('querry not ok '+ e);
			while (i) {
				document.getElementById("label"+i).innerText = 'Не удалось установить соединение';
				document.getElementById("bar"+i+'-1').style["width"] = "0%";
				document.getElementById("bar"+i+'-2').style["width"] = "0%";
				var warn = document.getElementById("bar"+i+'-3');
				warn.style["width"] = "100%";
				warn.classList.remove("bg-warning");
				warn.classList.add("bg-danger");
				i--;
			}
			return;
		}
		
		while (i) {
			var singleServ = gjson[i];
			var servid = i;
			var servname = singleServ?.name || null;
			
			if(servname !== null){
				var servkeyword = singleServ.gametype;
				var playersCount = servkeyword.match(/cp(\d+)/)[1] || 0;
				var queueCount = servkeyword.match(/qp(\d+)/)[1] || 0;
				var connCount = singleServ.players - playersCount - queueCount;
				var servmap = singleServ.map;
				var servmax = singleServ.max_players;
				
				var label = document.getElementById("label"+servid);
				label.innerText = 'Игроки ('+ playersCount + '/' + servmax + ')';
				document.getElementById("bar"+servid+'-1').style["width"] = (100/servmax*playersCount)+"%";
				if(first){
					var mapcat = servmap.replace(/map/gi, '');
					/* if(mapcat != 'Procedural ' && mapcat != 'Barren' && mapcat != 'HapisIsland')
						document.getElementById("grname"+servid).innerText += " Custom";
					else */
						document.getElementById("grname"+servid).innerText += " "+mapcat;
				}
				
				if(connCount > 0){
					label.innerText += ' Подключаются: '+ connCount;
					document.getElementById("bar"+servid+'-2').style["width"] = (100/servmax*connCount)+"%";
				}
				if(queueCount > 0 && playersCount > 180){
					label.innerText += ' Очередь: '+ queueCount;
					document.getElementById("bar"+servid+'-3').style["width"] = (100/servmax*queueCount)+"%";
				}else if(queueCount > 0){
					label.innerText += ' Подключаются: '+ queueCount;
					document.getElementById("bar"+servid+'-2').style["width"] = (100/servmax*queueCount)+"%";
				}else{
					document.getElementById("bar"+servid+'-3').style["width"] = "0%";
				}
				i--;
				
			} else {
				console.log('serv not ok ' +servid);
				document.getElementById("label"+servid).innerText = 'Не удалось установить соединение';
					document.getElementById("bar"+servid+'-1').style["width"] = "0%";
					document.getElementById("bar"+servid+'-2').style["width"] = "0%";
					var warn = document.getElementById("bar"+servid+'-3');
					warn.style["width"] = "100%";
					warn.classList.remove("bg-warning");
					warn.classList.add("bg-danger");
				i--;
			}
		}
		autosize();
	});
}


function openTabs(el) {
  var btnTarget = el.currentTarget;
  var country = btnTarget.dataset.country;
  
  if(country == 'tab2'){
	  if(!triggeredUpdate){
		  triggeredUpdate = true;
		  if(!firstTrigger){
			firstTrigger = true;
			updateOnline(true);
		  }
	  }
  }else {
	  triggeredUpdate = false;
  }

  tabContent.forEach(function (el) {
    el.classList.remove("active");
  });

  tabLinks.forEach(function (el) {
    el.classList.remove("active");
  });

  document.querySelector("#" + country).classList.add("active");

  btnTarget.classList.add("active");
  setTimeout(() => autosize(), 50);
}

function Open(el) {  

  var roottabcontent = document.querySelector("#tab5");
  //roottabcontent.classList.add("active");
  roottabcontent.innerHTML = '<h3>'+curcontent[el].xhead+'</h3>'+curcontent[el].xcon;

  //btnTarget.classList.add("active");
  setTimeout(() => autosize(), 50);
}


function autosize() {
        //Проверяем элемент root на наличие.
        /* if (isVKapp && !document.getElementById('root')) {
			alert('error');
			isVKapp = false;
            return;
        } */
        // Успешно ли подключен ВК скрипт
		if(isMobile)return;
        if (isVKapp) {
            /* VK.callMethod('resizeWindow', 840, document.getElementById('root').clientHeight); */
			vkConnect.send("VKWebAppResizeWindow", {"width": 840, "height": document.getElementById('root').clientHeight});
        } else {
			console.log('error #2 Using app outside vk window!!!');
        }
    }
	
	

 function getJSON(url, func) {
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xmlHttp = new XHR();

        if(xmlHttp != null)
        {
            xmlHttp.open( "GET", url, true );
            xmlHttp.send( null );
        }
		xmlHttp.onload = function() {
		  func(xmlHttp.responseText);
		}
    }
	
	
	
	
	

var curcontent = new Array();
				
curcontent["kit-prem"] = {
	xhead: 'Что входит в киты',
	xcon: `<div class="store-categories">
	<button class="btn btn-secondary" onclick="Open('kit-free', false);">Общие</button>
	<button class="btn btn-secondary active">Prem</button>
	<button class="btn btn-secondary" onclick="Open('kit-wars', false);">Wars</button>
	<button class="btn btn-secondary" onclick="Open('kit-elite', false);">Elite</button>
	<button class="btn btn-secondary" onclick="Open('kit-king', false);">King</button>
	<button class="btn btn-secondary" onclick="Open('kit-grand', false);">Grand</button></div>
	<div class="xbox_custom_kits" ><div class="serverheader">PREM оружие (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hat.wolf.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hoodie.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pants.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/shoes.boots.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/mask.bandana.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/burlap.gloves.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hazmatsuit.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/ammo.pistol.png">
<div class="kit-item__quantity">x100</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pistol.python.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pickaxe.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hatchet.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/syringe.medical.png">
<div class="kit-item__quantity">x5</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/bandage.png">
<div class="kit-item__quantity">x10</div></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">PREM ресурсы (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/stones.png">
<div class="kit-item__quantity">x5000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/wood.png">
<div class="kit-item__quantity">x4000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.fragments.png">
<div class="kit-item__quantity">x1500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/lowgradefuel.png">
<div class="kit-item__quantity">x500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/cloth.png">
<div class="kit-item__quantity">x500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/leather.png">
<div class="kit-item__quantity">x500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.refined.png">
<div class="kit-item__quantity">x100</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/scrap.png">
<div class="kit-item__quantity">x50</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/gears.png">
<div class="kit-item__quantity">x8</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/techparts.png">
<div class="kit-item__quantity">x5</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sewingkit.png">
<div class="kit-item__quantity">x20</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalblade.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalpipe.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sheetmetal.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/smgbody.png">
<div class="kit-item__quantity">x3</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/riflebody.png">
<div class="kit-item__quantity">x3</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/semibody.png">
<div class="kit-item__quantity">x3</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsigns.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/rope.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/tarp.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalspring.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/supply.signal.png"></div></div>
</div></div></div>`
};



curcontent["kit-wars"] = {
	xhead: 'Что входит в киты',
	xcon: `<div class="store-categories">
	<button class="btn btn-secondary" onclick="Open('kit-free', false);">Общие</button>
	<button class="btn btn-secondary" onclick="Open('kit-prem', false);">Prem</button>
	<button class="btn btn-secondary active">Wars</button>
	<button class="btn btn-secondary" onclick="Open('kit-elite', false);">Elite</button>
	<button class="btn btn-secondary" onclick="Open('kit-king', false);">King</button>
	<button class="btn btn-secondary" onclick="Open('kit-grand', false);">Grand</button></div>
	<div class="xbox_custom_kits" ><div class="serverheader">WARS оружие (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hat.wolf.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hoodie.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pants.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/shoes.boots.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/mask.bandana.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/burlap.gloves.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/attire.hide.poncho.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hazmatsuit.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/ammo.pistol.png">
<div class="kit-item__quantity">x150</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/smg.thompson.png">
<div class="kit-item__quantity">снаряжён</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/syringe.medical.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/bandage.png"></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">WARS ресурсы (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/stones.png">
<div class="kit-item__quantity">x10000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/wood.png">
<div class="kit-item__quantity">x10000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.fragments.png">
<div class="kit-item__quantity">x3000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/lowgradefuel.png">
<div class="kit-item__quantity">x1500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/cloth.png">
<div class="kit-item__quantity">x1000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/leather.png">
<div class="kit-item__quantity">x1000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.refined.png">
<div class="kit-item__quantity">x250</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/scrap.png">
<div class="kit-item__quantity">x80</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/gears.png">
<div class="kit-item__quantity">x15</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/techparts.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sewingkit.png">
<div class="kit-item__quantity">x30</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalblade.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalpipe.png">
<div class="kit-item__quantity">x20</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalspring.png">
<div class="kit-item__quantity">x20</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sheetmetal.png">
<div class="kit-item__quantity">x15</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/smgbody.png">
<div class="kit-item__quantity">x4</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/riflebody.png">
<div class="kit-item__quantity">x4</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/semibody.png">
<div class="kit-item__quantity">x4</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsigns.png">
<div class="kit-item__quantity">x25</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/rope.png">
<div class="kit-item__quantity">x25</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/tarp.png">
<div class="kit-item__quantity">x25</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/supply.signal.png"></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">WARS инструменты (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hatchet.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pickaxe.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/woodtea.png">
<div class="kit-item__quantity">дерево</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/oretea.png">
<div class="kit-item__quantity">руда</div></div></div>
</div></div></div>`
};

curcontent["kit-elite"] = {
	xhead: 'Что входит в киты',
	xcon: `<div class="store-categories">
	<button class="btn btn-secondary" onclick="Open('kit-free', false);">Общие</button>
	<button class="btn btn-secondary" onclick="Open('kit-prem', false);">Prem</button>
	<button class="btn btn-secondary" onclick="Open('kit-wars', false);">Wars</button>
	<button class="btn btn-secondary active">Elite</button>
	<button class="btn btn-secondary" onclick="Open('kit-king', false);">King</button>
	<button class="btn btn-secondary" onclick="Open('kit-grand', false);">Grand</button></div>
	<div class="xbox_custom_kits" ><div class="serverheader">ELITE оружие (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/coffeecan.helmet.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsign.jacket.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsign.kilt.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hoodie.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pants.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/shoes.boots.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/burlap.gloves.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hazmatsuit.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/ammo.pistol.png">
<div class="kit-item__quantity">x200</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/smg.mp5.png">
<div class="kit-item__quantity">снаряжён</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/syringe.medical.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/bandage.png"></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">ELITE ресурсы (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/stones.png">
<div class="kit-item__quantity">x13000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/wood.png">
<div class="kit-item__quantity">x12000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.fragments.png">
<div class="kit-item__quantity">x3500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/lowgradefuel.png">
<div class="kit-item__quantity">x2000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/cloth.png">
<div class="kit-item__quantity">x1500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/leather.png">
<div class="kit-item__quantity">x1500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.refined.png">
<div class="kit-item__quantity">x300</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/scrap.png">
<div class="kit-item__quantity">x100</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/gears.png">
<div class="kit-item__quantity">x20</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/techparts.png">
<div class="kit-item__quantity">x15</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sewingkit.png">
<div class="kit-item__quantity">x40</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalblade.png">
<div class="kit-item__quantity">x20</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalpipe.png">
<div class="kit-item__quantity">x25</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalspring.png">
<div class="kit-item__quantity">x25</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sheetmetal.png">
<div class="kit-item__quantity">x20</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/smgbody.png">
<div class="kit-item__quantity">x6</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/riflebody.png">
<div class="kit-item__quantity">x6</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/semibody.png">
<div class="kit-item__quantity">x6</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsigns.png">
<div class="kit-item__quantity">x35</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/rope.png">
<div class="kit-item__quantity">x35</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/tarp.png">
<div class="kit-item__quantity">x35</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/supply.signal.png"></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">ELITE инструменты (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/axe.salvaged.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/icepick.salvaged.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/oretea.advanced.png">
<div class="kit-item__quantity">дерево прод.</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/woodtea.advanced.png">
<div class="kit-item__quantity">руда прод.</div></div></div>
</div></div></div>`
};


curcontent["kit-king"] = {
	xhead: 'Что входит в киты',
	xcon: `<div class="store-categories">
	<button class="btn btn-secondary" onclick="Open('kit-free', false);">Общие</button>
	<button class="btn btn-secondary" onclick="Open('kit-prem', false);">Prem</button>
	<button class="btn btn-secondary" onclick="Open('kit-wars', false);">Wars</button>
	<button class="btn btn-secondary" onclick="Open('kit-elite', false);">Elite</button>
	<button class="btn btn-secondary active">King</button>
	<button class="btn btn-secondary" onclick="Open('kit-grand', false);">Grand</button></div>
	<div class="xbox_custom_kits" ><div class="serverheader">KING оружие (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.facemask.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.plate.torso.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsign.kilt.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hoodie.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pants.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/shoes.boots.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/burlap.gloves.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hazmatsuit.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/ammo.rifle.png">
<div class="kit-item__quantity">x200</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/rifle.ak.png">
<div class="kit-item__quantity">снаряжён</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/syringe.medical.png">
<div class="kit-item__quantity">x15</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/largemedkit.png">
<div class="kit-item__quantity">x5</div></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">KING ресурсы (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/stones.png">
<div class="kit-item__quantity">x15000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/wood.png">
<div class="kit-item__quantity">x15000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.fragments.png">
<div class="kit-item__quantity">x4500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/lowgradefuel.png">
<div class="kit-item__quantity">x2500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/cloth.png">
<div class="kit-item__quantity">x2500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/leather.png">
<div class="kit-item__quantity">x2500</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.refined.png">
<div class="kit-item__quantity">x400</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/scrap.png">
<div class="kit-item__quantity">x150</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/gears.png">
<div class="kit-item__quantity">x25</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/techparts.png">
<div class="kit-item__quantity">x20</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sewingkit.png">
<div class="kit-item__quantity">x50</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalblade.png">
<div class="kit-item__quantity">x25</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalpipe.png">
<div class="kit-item__quantity">x35</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalspring.png">
<div class="kit-item__quantity">x35</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sheetmetal.png">
<div class="kit-item__quantity">x25</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/smgbody.png">
<div class="kit-item__quantity">x7</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/riflebody.png">
<div class="kit-item__quantity">x7</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/semibody.png">
<div class="kit-item__quantity">x7</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsigns.png">
<div class="kit-item__quantity">x40</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/rope.png">
<div class="kit-item__quantity">x40</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/tarp.png">
<div class="kit-item__quantity">x40</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/supply.signal.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/targeting.computer.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/cctv.camera.png"></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">KING инструменты (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/uberpickaxe.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/uberhatchet.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/chainsaw.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/woodtea.pure.png">
<div class="kit-item__quantity">дерево чистый</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/oretea.pure.png">
<div class="kit-item__quantity">руда чистый</div></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">KING Доп. кит (по привилегии, еженедельный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/largemedkit.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/syringe.medical.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/blueberries.png">
<div class="kit-item__quantity">x20</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/candycaneclub.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hazmatsuit.png">
<div class="kit-item__quantity">x2</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sulfur.png">
<div class="kit-item__quantity">x10000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/gunpowder.png">
<div class="kit-item__quantity">x3000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.fragments.png">
<div class="kit-item__quantity">x5000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/research.table.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/workbench1.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/workbench2.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.facemask.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.plate.torso.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsign.kilt.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hoodie.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pants.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/shoes.boots.png"></div></div>
</div></div></div>`
};

curcontent["kit-grand"] = {
	xhead: 'Что входит в киты',
	xcon: `<div class="store-categories">
	<button class="btn btn-secondary" onclick="Open('kit-free', false);">Общие</button>
	<button class="btn btn-secondary" onclick="Open('kit-prem', false);">Prem</button>
	<button class="btn btn-secondary" onclick="Open('kit-wars', false);">Wars</button>
	<button class="btn btn-secondary" onclick="Open('kit-elite', false);">Elite</button>
	<button class="btn btn-secondary" onclick="Open('kit-king', false);">King</button>
	<button class="btn btn-secondary active">Grand</button></div>
	<div class="xbox_custom_kits" ><div class="serverheader">GRAND оружие (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.facemask.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.plate.torso.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsign.kilt.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hoodie.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pants.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/shoes.boots.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsign.gloves.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hazmatsuit.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/ammo.rifle.png">
<div class="kit-item__quantity">x300</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/rifle.ak.png">
<div class="kit-item__quantity">снаряжён</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/rifle.lr300.png">
<div class="kit-item__quantity">снаряжён</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/syringe.medical.png">
<div class="kit-item__quantity">x30</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/largemedkit.png">
<div class="kit-item__quantity">x10</div></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">GRAND ресурсы (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/stones.png">
<div class="kit-item__quantity">x20000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/wood.png">
<div class="kit-item__quantity">x20000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.fragments.png">
<div class="kit-item__quantity">x6000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.refined.png">
<div class="kit-item__quantity">x450</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/lowgradefuel.png">
<div class="kit-item__quantity">x3000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/cloth.png">
<div class="kit-item__quantity">x3000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/leather.png">
<div class="kit-item__quantity">x3000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/scrap.png">
<div class="kit-item__quantity">x200</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/gears.png">
<div class="kit-item__quantity">x35</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/techparts.png">
<div class="kit-item__quantity">x25</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sewingkit.png">
<div class="kit-item__quantity">x60</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalblade.png">
<div class="kit-item__quantity">x30</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/riflebody.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/semibody.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsigns.png">
<div class="kit-item__quantity">x50</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/rope.png">
<div class="kit-item__quantity">x50</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalpipe.png">
<div class="kit-item__quantity">x45</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metalspring.png">
<div class="kit-item__quantity">x45</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/smgbody.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sheetmetal.png">
<div class="kit-item__quantity">x30</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/tarp.png">
<div class="kit-item__quantity">x50</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/supply.signal.png">
<div class="kit-item__quantity">x2</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/targeting.computer.png">
<div class="kit-item__quantity">x2</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/cctv.camera.png">
<div class="kit-item__quantity">x2</div></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">GRAND инструменты (по привилегии, ежедневный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/healingtea.pure.png">
<div class="kit-item__quantity">хил чистый</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/oretea.pure.png">
<div class="kit-item__quantity">руда чистый</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/woodtea.pure.png">
<div class="kit-item__quantity">дерево чистый</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/uberhatchet.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/ubericepick.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/chainsaw.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/jackhammer.png"></div></div>
</div></div></div>
<div class="xbox_custom_kits" ><div class="serverheader">GRAND Доп. кит (по привилегии, еженедельный)</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.facemask.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.plate.torso.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/roadsign.kilt.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hoodie.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pants.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/shoes.boots.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/largemedkit.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/syringe.medical.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/blueberries.png">
<div class="kit-item__quantity">x20</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/candycaneclub.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hazmatsuit.png">
<div class="kit-item__quantity">x2</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sulfur.png">
<div class="kit-item__quantity">x15000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/gunpowder.png">
<div class="kit-item__quantity">x5000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.fragments.png">
<div class="kit-item__quantity">x10000</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/workbench1.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/workbench2.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/workbench3.png"></div></div>
</div></div></div>`
};

curcontent["kit-free"] = {
	xhead: 'Что входит в бесплатные киты',
	xcon: `<div class="store-categories">
	<button class="btn btn-secondary active">Общие</button>
	<button class="btn btn-secondary" onclick="Open('kit-prem', false);">Prem</button>
	<button class="btn btn-secondary" onclick="Open('kit-wars', false);">Wars</button>
	<button class="btn btn-secondary" onclick="Open('kit-elite', false);">Elite</button>
	<button class="btn btn-secondary" onclick="Open('kit-king', false);">King</button>
	<button class="btn btn-secondary" onclick="Open('kit-grand', false);">Grand</button></div>
<div class="xbox_custom_kits" >
<div class="serverheader">Бомж</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/tshirt.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/pants.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/movembermoustache.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hat.cap.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/stone.pickaxe.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/stonehatchet.png"></div></div>
</div></div>
<div class="serverheader">Starter</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/campfire.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/sleepingbag.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/furnace.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/syringe.medical.png">
<div class="kit-item__quantity">x2</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/bandage.png">
<div class="kit-item__quantity">x5</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/stone.pickaxe.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/stonehatchet.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/hammer.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/building.planner.png"></div></div>
</div></div>
<div class="serverheader">Med</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/bandage.png">
<div class="kit-item__quantity">x10</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/syringe.medical.png">
<div class="kit-item__quantity">x2</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/largemedkit.png"></div></div>
</div></div>
<div class="serverheader">Food</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/blueberries.png">
<div class="kit-item__quantity">x2</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/wolfmeat.cooked.png">
<div class="kit-item__quantity">x5</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/smallwaterbottle.png">
<div class="kit-item__quantity">120ml</div></div></div>
</div></div>
<div class="serverheader">Hunter</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/arrow.wooden.png">
<div class="kit-item__quantity">x50</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/bow.hunting.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/spear.wooden.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/spear.stone.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/knife.bone.png"></div></div>
</div></div>
<div class="serverheader">За приставку в нике #grandrust</div>
<div class="kit_set"><div class="kit-items">
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/attire.ninja.suit.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/metal.refined.png">
<div class="kit-item__quantity">x50</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/lowgradefuel.png">
<div class="kit-item__quantity">x200</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/lumberjack.pickaxe.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/lumberjack.hatchet.png"></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/smallwaterbottle.png">
<div class="kit-item__quantity">120ml</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/oretea.pure.png">
<div class="kit-item__quantity">руда чистый</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/jar.pickle.png">
<div class="kit-item__quantity">x5</div></div></div>
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://shop.grand-rust.ru/files/images/rust/items256/can.tuna.png">
<div class="kit-item__quantity">x2</div></div></div>
</div></div></div>`
};
