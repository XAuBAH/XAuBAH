var tabLinks;
var tabContent;
var isVKapp = false;
var isMobile = false;
var triggeredUpdate = false;
var firstTrigger = false;
var TriggerCount = 0;

window.onload = function(){
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
	
	
	for (var i = 0; i < kit_prem.length; i+=4) {
		if(kit_prem[(i+1)] != null)
			curcontent["kit-prem"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/'+ kit_prem[i] +'.png">\
										<div class="kit-item__quantity">x'+ kit_prem[(i+1)] +'</div></div></div>';
		else 
			curcontent["kit-prem"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/'+ kit_prem[i] +'.png"></div></div>';
	
		if(kit_prem[(i+2)] != null)
			curcontent["kit-wars"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/'+ kit_prem[i] +'.png">\
										<div class="kit-item__quantity">x'+ kit_prem[(i+2)] +'</div></div></div>';
		else {
			if(i==88)kit_prem[i] = "smg.thompson";
			curcontent["kit-wars"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/'+ kit_prem[i] +'.png"></div></div>';
		}
	
		if(kit_prem[(i+3)] != null){
			if(i==92)kit_prem[i] = "ammo.rifle";
			curcontent["kit-elite"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/'+ kit_prem[i] +'.png">\
										<div class="kit-item__quantity">x'+ kit_prem[(i+3)] +'</div></div></div>';
		}else {
			if(i==88)kit_prem[i] = "rifle.ak";
			curcontent["kit-elite"].xcon += '<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/'+ kit_prem[i] +'.png"></div></div>';
		}
	}
	curcontent["kit-prem"].xcon += '</div></div></div>';
	curcontent["kit-wars"].xcon += '</div></div></div>';
	curcontent["kit-elite"].xcon += '</div></div></div>';
	
	/* VK.init(
	  function(){
	}); */
	vkConnect.send("VKWebAppInit", {});
	
	setInterval(updateOnline, 10000);
	autosize();
	
	
};

function steam(el) {
	
	window.open('steam://connect/'+document.getElementById("ipval"+el).value,'_blank');
}

function cop(el) {
	
	var e = document.getElementById("ipval"+el);
	
		e.select();
		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('успешно скопирован, нажмите CTRL + V чтобы вставить в консоль F1 в игре.'); 
		} catch (err) {
			console.log('Oops, unable to copy' + err);
		  }
}


function updateOnline() {
	if(!triggeredUpdate || TriggerCount > 100)return;
	TriggerCount++;
	
	getJSON('./servstats.php?modules=monitoring&action=getServers', function(gjson){
		try{
			gjson = JSON.parse(gjson);
		}catch{
			console.log('OVH querry not ok ');
			let i = 6;
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
		}
		
		 for (var singleServ of gjson.data) {
			var servid = singleServ.sort;
			var servname = singleServ.hostname;
			var servok = singleServ.steamData.onlineStatus;
			var servmap = singleServ.steamData.map;
			var servkeyword = singleServ.steamData.keywords;
			var servmax = singleServ.steamData.maxplayers;
			
			if(servok === 1){
				var playersCount = servkeyword.match(/cp(\d+)/)[1] || 0;
				var queueCount = servkeyword.match(/qp(\d+)/)[1] || 0;
				var connCount = singleServ.steamData.players - playersCount;
				
				var label = document.getElementById("label"+servid);
				label.innerText = 'Игроки ('+ playersCount + '/' + servmax + ')';
				document.getElementById("bar"+servid+'-1').style["width"] = (100/servmax*playersCount)+"%";
				
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
				
			} else {
				console.log('serv not ok ' +servok);
				document.getElementById("label"+servid).innerText = 'Перезагрузка';
					document.getElementById("bar"+servid+'-1').style["width"] = "0%";
					document.getElementById("bar"+servid+'-2').style["width"] = "0%";
					var warn = document.getElementById("bar"+servid+'-3');
					warn.style["width"] = "100%";
					warn.classList.remove("bg-warning");
					warn.classList.add("bg-danger");
			}
			
			
			
		} 
	//document.getElementById("moder-preloader").innerHTML = '';
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
			updateOnline();
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
  autosize();
}

function Open(el) {  

  var roottabcontent = document.querySelector("#tab5");
  //roottabcontent.classList.add("active");
  roottabcontent.innerHTML = '<h3>'+curcontent[el].xhead+'</h3>'+curcontent[el].xcon;

  //btnTarget.classList.add("active");
  autosize();
}


function autosize(width) {
        //Проверяем элемент root на наличие.
        /* if (!document.getElementById('root')) {
			alert('error');
            return;
        } */
        // Успешно ли подключен ВК скрипт
		if(isMobile)return;
        if (isVKapp) {
        /*
        Вызываем функцию vk js api для управления окном.
        VK.callMethod('функция', параметры)
        В данном случае у нас - VK.callMethod('изменение_размеров_окна', ширина, высота);
        Так же добавляем еще 60 пикселей что бы было небольшое расстояние.
        */
            /* VK.callMethod('resizeWindow', 840, ); */
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
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/stones.png">\
<div class="kit-item__quantity">x15000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/wood.png">\
<div class="kit-item__quantity">x15000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metal.fragments.png">\
<div class="kit-item__quantity">x4500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/lowgradefuel.png">\
<div class="kit-item__quantity">x2500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/cloth.png">\
<div class="kit-item__quantity">x2500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/leather.png">\
<div class="kit-item__quantity">x2500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metal.refined.png">\
<div class="kit-item__quantity">x500</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/gears.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/techparts.png">\
<div class="kit-item__quantity">x20</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/sewingkit.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metalblade.png">\
<div class="kit-item__quantity">x25</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metalpipe.png">\
<div class="kit-item__quantity">x35</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metalspring.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/sheetmetal.png">\
<div class="kit-item__quantity">x25</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/smgbody.png">\
<div class="kit-item__quantity">x7</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/riflebody.png">\
<div class="kit-item__quantity">x7</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/semibody.png">\
<div class="kit-item__quantity">x7</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/roadsigns.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/rope.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/tarp.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/propanetank.png">\
<div class="kit-item__quantity">x40</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/scrap.png">\
<div class="kit-item__quantity">x150</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/chainsaw.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/rifle.ak.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/ammo.rifle.png">\
<div class="kit-item__quantity">x100</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/uberpickaxe.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/uberhatchet.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/supply.signal.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/hazmatsuit.png"></div></div>\
</div></div></div>\
<div class="xbox_custom_kits" ><p class="MsoNormal"><span>Дополнительный кит</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/coffeecan.helmet.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/roadsign.jacket.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/835832255996856478/C94DC702DFFCD444D2EB063E50F0058070FECB22/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/835832255996847303/98730BA2501FC28059707E08A080718CE9026565/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/850465965368818420/7BFE0E70C0B8BB0DE8EC3B39A7EE169594C1359F/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/largemedkit.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/syringe.medical.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/blueberries.png">\
<div class="kit-item__quantity">x20</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/candycane.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/hazmatsuit.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/hazmatsuit.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/sulfur.png">\
<div class="kit-item__quantity">x10000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/gunpowder.png">\
<div class="kit-item__quantity">x3000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metal.fragments.png">\
<div class="kit-item__quantity">x5000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/workbench1.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/workbench2.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/research.table.png"></div></div>\
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
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/stones.png">\
<div class="kit-item__quantity">x20000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/wood.png">\
<div class="kit-item__quantity">x20000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metal.fragments.png">\
<div class="kit-item__quantity">x6000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/lowgradefuel.png">\
<div class="kit-item__quantity">x3000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/cloth.png">\
<div class="kit-item__quantity">x3000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/leather.png">\
<div class="kit-item__quantity">x3000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metal.refined.png">\
<div class="kit-item__quantity">x800</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/gears.png">\
<div class="kit-item__quantity">x60</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/techparts.png">\
<div class="kit-item__quantity">x25</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/sewingkit.png">\
<div class="kit-item__quantity">x60</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metalblade.png">\
<div class="kit-item__quantity">x30</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metalpipe.png">\
<div class="kit-item__quantity">x45</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metalspring.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/sheetmetal.png">\
<div class="kit-item__quantity">x30</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/smgbody.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/riflebody.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/semibody.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/roadsigns.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/rope.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/tarp.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/propanetank.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/scrap.png">\
<div class="kit-item__quantity">x200</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/ammo.rifle.png">\
<div class="kit-item__quantity">x200</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/chainsaw.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/rifle.ak.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/rifle.lr300.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/uberpickaxe.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/uberhatchet.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/supply.signal.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/hazmatsuit.png"></div></div>\
</div></div></div>\
<div class="xbox_custom_kits" ><p class="MsoNormal"><span>Дополнительный кит</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metal.facemask.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metal.plate.torso.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/867355724173241313/A699E74A69184F91A5BD81DBC9D2A7528F1C32AD/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/867355893168560145/03DF3272223A4A9F7B445D8CC3ED10A8D12B8D5A/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/835832990473838125/CBB88C83250F86B393D58B81219EFC3604A93C36/?imw=268&imh=268&ima=fit&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/largemedkit.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/syringe.medical.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/blueberries.png">\
<div class="kit-item__quantity">x20</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/candycane.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/hazmatsuit.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/hazmatsuit.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/sulfur.png">\
<div class="kit-item__quantity">x15000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/gunpowder.png">\
<div class="kit-item__quantity">x5000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/metal.fragments.png">\
<div class="kit-item__quantity">x10000</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/workbench1.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/workbench2.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/workbench3.png"></div></div>\
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
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/851593237065046314/C4394B54330D8C6C0D1DC624FE5F20F448880603/?imw=268&imh=268&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/821190300748591786/D677BA94E2D706E033F9BB3B78B154364E17EAE0/?imw=268&imh=268&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/90478291046828677/21E21062B5573D3ACBCD9DBFAB2571923538CB90/?imw=637&imh=358&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/956350181140504911/CB13074BC7EE6C818347E10CF8ECDBFA47F1E9A3/?imw=268&imh=268&impolicy=Letterbox"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://steamuserimages-a.akamaihd.net/ugc/956350181140521182/4D408A70093BFEF6C339E99628E4907AC069E253/?imw=268&imh=268&impolicy=Letterbox"></div></div>\
</div></div>\
<p class="MsoNormal"><span>Starter</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/furnace.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/sleepingbag.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/campfire.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/building.planner.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/hammer.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/cactusflesh.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/stonehatchet.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/stone.pickaxe.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/bandage.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/syringe.medical.png">\
<div class="kit-item__quantity">x2</div></div></div>\
</div></div>\
<p class="MsoNormal"><span>Med</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/bandage.png">\
<div class="kit-item__quantity">x10</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/syringe.medical.png">\
<div class="kit-item__quantity">x2</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/largemedkit.png"></div></div>\
</div></div>\
<p class="MsoNormal"><span>Food</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/blueberries.png">\
<div class="kit-item__quantity">x2</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/wolfmeat.cooked.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/meat.pork.cooked.png">\
<div class="kit-item__quantity">x5</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/smallwaterbottle.png">\
<div class="kit-item__quantity">150ml</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/smallwaterbottle.png">\
<div class="kit-item__quantity">150ml</div></div></div>\
</div></div>\
<p class="MsoNormal"><span>Hunter</span></p>\
<div class="kit_set"><div class="kit-items">\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/arrow.wooden.png">\
<div class="kit-item__quantity">x50</div></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/bow.hunting.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/spear.wooden.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/spear.stone.png"></div></div>\
<div class="kit-items__item"><div class="kit-item"><img class="kit-item__image" src="https://static.moscow.ovh/images/games/rust/icons/knife.bone.png"></div></div>\
</div></div></div>'
};


