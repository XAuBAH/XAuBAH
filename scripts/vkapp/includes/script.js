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
	
	prepareKits();
	
	
});
//на всякий
setTimeout(() => vkConnect.send("VKWebAppInit", {}), 3000);

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
		let i = 8;
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
					if(mapcat != 'Procedural ' && mapcat != 'Barren')
						document.getElementById("grname"+servid).innerText += " Custom";
					else
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

var kit_prem = ['stones', 5000, 10000, 13000, 
				'wood', 4000, 10000, 12000,
				'metal.fragments', 1500, 3000, 3500,
				'lowgradefuel', 500, 1500, 2000,
				'cloth', 500, 1000, 1500,
				'leather', 500, 1000, 1500,
				'metal.refined', 100, 200, 300,
				'gears', 6, 30, 40,
				'techparts', 5, 10, 15,
				'sewingkit', 20, 30, 40,
				'metalblade', 10, 15, 20,
				'metalpipe', 10, 20, 25,
				'metalspring', 10, 25, 35,
				'sheetmetal', 10, 15, 20,
				'smgbody', 3, 4, 6,
				'riflebody', 3, 4, 6,
				'semibody', 3, 4, 5,
				'roadsigns', 10, 25, 35,
				'rope', 10, 25, 35,
				'tarp', 10, 25, 35,
				'propanetank', 10, 25, 35,
				'scrap', 50, 80, 100,
				'pistol.python', null, null, null,
				'ammo.pistol', 100, 100, 100,
				'hatchet', null, null, null,
				'pickaxe', null, null, null,
				'supply.signal', null, null, null,
				'hazmatsuit', null, null, null];
				
curcontent["kit-prem"] = {
	xhead: 'Prem',
	xcon: '<div class="store-categories">\
	<button class="btn btn-secondary" onclick="Open(\'kit-free\', false);">Общие</button>\
	<button class="btn btn-secondary active">Prem</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-wars\', false);">Wars</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-elite\', false);">Elite</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-king\', false);">King</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-grand\', false);">Grand</button></div>\
	<div class="xbox_custom_kits" ><p class="MsoNormal"><span>KIT PREMIUM (по привилегии)</span></p>\
<div class="kit_set"><div class="kit-items">'
};



curcontent["kit-wars"] = {
	xhead: 'Wars',
	xcon: '<div class="store-categories">\
	<button class="btn btn-secondary" onclick="Open(\'kit-free\', false);">Общие</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-prem\', false);">Prem</button>\
	<button class="btn btn-secondary active">Wars</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-elite\', false);">Elite</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-king\', false);">King</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-grand\', false);">Grand</button></div>\
	<div class="xbox_custom_kits" ><p class="MsoNormal"><span>KIT WARS (по привилегии)</span></p>\
<div class="kit_set"><div class="kit-items">'
};

curcontent["kit-elite"] = {
	xhead: 'Elite',
	xcon: '<div class="store-categories">\
	<button class="btn btn-secondary" onclick="Open(\'kit-free\', false);">Общие</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-prem\', false);">Prem</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-wars\', false);">Wars</button>\
	<button class="btn btn-secondary active">Elite</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-king\', false);">King</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-grand\', false);">Grand</button></div>\
	<div class="xbox_custom_kits" ><p class="MsoNormal"><span>KIT ELITE (по привилегии)</span></p>\
<div class="kit_set"><div class="kit-items">'
};


curcontent["kit-king"] = {
	xhead: 'King',
	xcon: '<div class="store-categories">\
	<button class="btn btn-secondary" onclick="Open(\'kit-free\', false);">Общие</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-prem\', false);">Prem</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-wars\', false);">Wars</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-elite\', false);">Elite</button>\
	<button class="btn btn-secondary active">King</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-grand\', false);">Grand</button></div>\
	<div class="xbox_custom_kits" ><p class="MsoNormal"><span>KIT KING (по привилегии)</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/stones_256.png">\
<div class="kit-item__quantity">x15000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/wood_256.png">\
<div class="kit-item__quantity">x15000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metal.fragments_256.png">\
<div class="kit-item__quantity">x4500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/lowgradefuel_256.png">\
<div class="kit-item__quantity">x2500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/cloth_256.png">\
<div class="kit-item__quantity">x2500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/leather_256.png">\
<div class="kit-item__quantity">x2500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metal.refined_256.png">\
<div class="kit-item__quantity">x500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/gears_256.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/techparts_256.png">\
<div class="kit-item__quantity">x20</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/sewingkit_256.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metalblade_256.png">\
<div class="kit-item__quantity">x25</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metalpipe_256.png">\
<div class="kit-item__quantity">x35</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metalspring_256.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/sheetmetal_256.png">\
<div class="kit-item__quantity">x25</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/smgbody_256.png">\
<div class="kit-item__quantity">x7</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/riflebody_256.png">\
<div class="kit-item__quantity">x7</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/semibody_256.png">\
<div class="kit-item__quantity">x7</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/roadsigns_256.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/rope_256.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/tarp_256.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/propanetank_256.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/scrap_256.png">\
<div class="kit-item__quantity">x150</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/chainsaw_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/rifle.ak_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/ammo.rifle_256.png">\
<div class="kit-item__quantity">x100</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/uberpickaxe_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/uberhatchet_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/supply.signal_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/hazmatsuit_256.png"></div></div>\
</div></div></div>\
<div class="xbox_custom_kits" ><p class="MsoNormal"><span>Дополнительный кит</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/coffeecan.helmet_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/roadsign.jacket_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/835832255996856478/C94DC702DFFCD444D2EB063E50F0058070FECB22/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/835832255996847303/98730BA2501FC28059707E08A080718CE9026565/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/850465965368818420/7BFE0E70C0B8BB0DE8EC3B39A7EE169594C1359F/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/largemedkit_256.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/syringe.medical_256.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/blueberries_256.png">\
<div class="kit-item__quantity">x20</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/candycane_256.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/hazmatsuit_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/hazmatsuit_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/sulfur_256.png">\
<div class="kit-item__quantity">x10000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/gunpowder_256.png">\
<div class="kit-item__quantity">x3000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metal.fragments_256.png">\
<div class="kit-item__quantity">x5000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/workbench1_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/workbench2_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/research.table_256.png"></div></div>\
</div></div></div>'
};

curcontent["kit-grand"] = {
	xhead: 'Grand',
	xcon: '<div class="store-categories">\
	<button class="btn btn-secondary" onclick="Open(\'kit-free\', false);">Общие</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-prem\', false);">Prem</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-wars\', false);">Wars</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-elite\', false);">Elite</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-king\', false);">King</button>\
	<button class="btn btn-secondary active">Grand</button></div>\
	<div class="xbox_custom_kits" ><p class="MsoNormal"><span>KIT GRAND (по привилегии)</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/stones_256.png">\
<div class="kit-item__quantity">x20000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/wood_256.png">\
<div class="kit-item__quantity">x20000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metal.fragments_256.png">\
<div class="kit-item__quantity">x6000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/lowgradefuel_256.png">\
<div class="kit-item__quantity">x3000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/cloth_256.png">\
<div class="kit-item__quantity">x3000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/leather_256.png">\
<div class="kit-item__quantity">x3000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metal.refined_256.png">\
<div class="kit-item__quantity">x800</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/gears_256.png">\
<div class="kit-item__quantity">x60</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/techparts_256.png">\
<div class="kit-item__quantity">x25</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/sewingkit_256.png">\
<div class="kit-item__quantity">x60</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metalblade_256.png">\
<div class="kit-item__quantity">x30</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metalpipe_256.png">\
<div class="kit-item__quantity">x45</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metalspring_256.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/sheetmetal_256.png">\
<div class="kit-item__quantity">x30</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/smgbody_256.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/riflebody_256.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/semibody_256.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/roadsigns_256.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/rope_256.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/tarp_256.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/propanetank_256.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/scrap_256.png">\
<div class="kit-item__quantity">x200</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/ammo.rifle_256.png">\
<div class="kit-item__quantity">x200</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/chainsaw_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/rifle.ak_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/rifle.lr300_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/uberpickaxe_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/uberhatchet_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/supply.signal_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/hazmatsuit_256.png"></div></div>\
</div></div></div>\
<div class="xbox_custom_kits" ><p class="MsoNormal"><span>Дополнительный кит</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metal.facemask_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metal.plate.torso_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/867355724173241313/A699E74A69184F91A5BD81DBC9D2A7528F1C32AD/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/867355893168560145/03DF3272223A4A9F7B445D8CC3ED10A8D12B8D5A/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/835832990473838125/CBB88C83250F86B393D58B81219EFC3604A93C36/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/largemedkit_256.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/syringe.medical_256.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/blueberries_256.png">\
<div class="kit-item__quantity">x20</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/candycane_256.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/hazmatsuit_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/hazmatsuit_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/sulfur_256.png">\
<div class="kit-item__quantity">x15000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/gunpowder_256.png">\
<div class="kit-item__quantity">x5000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/metal.fragments_256.png">\
<div class="kit-item__quantity">x10000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/workbench1_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/workbench2_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/workbench3_256.png"></div></div>\
</div></div></div>'
};

curcontent["kit-free"] = {
	xhead: 'Киты',
	xcon: '<div class="store-categories">\
	<button class="btn btn-secondary active">Общие</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-prem\', false);">Prem</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-wars\', false);">Wars</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-elite\', false);">Elite</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-king\', false);">King</button>\
	<button class="btn btn-secondary" onclick="Open(\'kit-grand\', false);">Grand</button></div>\
<div class="xbox_custom_kits" >\
<p class="MsoNormal"><span>Бомж</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/851593237065046314/C4394B54330D8C6C0D1DC624FE5F20F448880603/?imw=268&imh=268&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/821190300748591786/D677BA94E2D706E033F9BB3B78B154364E17EAE0/?imw=268&imh=268&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/90478291046828677/21E21062B5573D3ACBCD9DBFAB2571923538CB90/?imw=637&imh=358&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/956350181140504911/CB13074BC7EE6C818347E10CF8ECDBFA47F1E9A3/?imw=268&imh=268&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://steamuserimages-a.akamaihd.net/ugc/956350181140521182/4D408A70093BFEF6C339E99628E4907AC069E253/?imw=268&imh=268&impolicy=Letterbox"></div></div>\
</div></div>\
<p class="MsoNormal"><span>Starter</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/furnace_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/sleepingbag_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/campfire_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/building.planner_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/hammer_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/cactusflesh_256.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/stonehatchet_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/stone.pickaxe_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/bandage_256.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/syringe.medical_256.png">\
<div class="kit-item__quantity">x2</div></div></div>\
</div></div>\
<p class="MsoNormal"><span>Med</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/bandage_256.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/syringe.medical_256.png">\
<div class="kit-item__quantity">x2</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/largemedkit_256.png"></div></div>\
</div></div>\
<p class="MsoNormal"><span>Food</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/blueberries_256.png">\
<div class="kit-item__quantity">x2</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/wolfmeat.cooked_256.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/smallwaterbottle_256.png">\
<div class="kit-item__quantity">120ml</div></div></div>\
</div></div>\
<p class="MsoNormal"><span>Hunter</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/arrow.wooden_256.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/bow.hunting_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/spear.wooden_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/spear.stone_256.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/knife.bone_256.png"></div></div>\
</div></div></div>'
};


function prepareKits(){
	
	for (var i = 0; i < kit_prem.length; i+=4) {
		if(kit_prem[(i+1)] != null)
			curcontent["kit-prem"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/'+ kit_prem[i] +'_256.png">\
										<div class="kit-item__quantity">x'+ kit_prem[(i+1)] +'</div></div></div>';
		else 
			curcontent["kit-prem"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/'+ kit_prem[i] +'_256.png"></div></div>';
	
		if(kit_prem[(i+2)] != null)
			curcontent["kit-wars"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/'+ kit_prem[i] +'_256.png">\
										<div class="kit-item__quantity">x'+ kit_prem[(i+2)] +'</div></div></div>';
		else {
			if(i==88)kit_prem[i] = "smg.thompson";
			curcontent["kit-wars"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/'+ kit_prem[i] +'_256.png"></div></div>';
		}
	
		if(kit_prem[(i+3)] != null){
			if(i==92)kit_prem[i] = "ammo.rifle";
			curcontent["kit-elite"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/'+ kit_prem[i] +'_256.png">\
										<div class="kit-item__quantity">x'+ kit_prem[(i+3)] +'</div></div></div>';
		}else {
			if(i==88)kit_prem[i] = "rifle.ak";
			curcontent["kit-elite"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" loading="lazy" src="https://files.facepunch.com/rust/item/'+ kit_prem[i] +'_256.png"></div></div>';
		}
	}
	curcontent["kit-prem"].xcon += '</div></div></div>';
	curcontent["kit-wars"].xcon += '</div></div></div>';
	curcontent["kit-elite"].xcon += '</div></div></div>';
	
}
