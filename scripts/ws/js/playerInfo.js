
app.controller( 'PlayerInfoController', PlayerInfoController );
var globalScope;
var globalRconService;

function PlayerInfoController( $scope, rconService, $routeParams )
{
	$scope.userid = $routeParams.userid;

	$scope.info = null;
	
	$scope.items_list_bp = [];

	$scope.refresh = function ()
	{
		console.log('refresh')
		rconService.getPlayers($scope, function(players) {

			for(var i in players) {
				if(players[i].SteamID === $scope.userid){

					// set player data
					$scope.info = players[i];

					// remove xp remnants
					if ($scope.info['CurrentLevel'] !== undefined)
						delete $scope.info['CurrentLevel'];
					if ($scope.info['UnspentXp'] !== undefined)
						delete $scope.info['UnspentXp'];

					// fix violation level
					if ($scope.info['VoiationLevel'] !== undefined){
						var violationLevel = $scope.info['VoiationLevel'];
						delete $scope.info['VoiationLevel'];
						$scope.info['ViolationLevel'] = violationLevel;
					}

					return;
				}
			}

			// player not found
			// reset data to null
			$scope.info = null;
		});
	}
	$scope.GivePlayerItems = function ()
	{
		console.log('GivePlayerItems '+ $scope.userid);
		document.getElementById("GiveItemsUpdateButton").setAttribute("disabled", "true");
		rconService.Request('items_list_bp', $scope, function(msg) {
		  _updateItemsDataTable(JSON.parse(msg.Message));
		});
		
	}

	$scope.getUsername = function ()
	{
		// try to find players name in info
		if($scope.info && $scope.info.DisplayName) {
			return $scope.info.DisplayName;
		}

		// otherwise show the id
		return $scope.userid;
	}

	rconService.InstallService( $scope, $scope.refresh )

	function _updateItemsDataTable(data) {
		$scope.items_list_bp = data;
		_generateItemsData();
	}

	function _generateItemsData() {
		var tabsSorted = [];
		var newDiv;
			newDiv = document.getElementById("playerGiveItemsDatabase");
			if(newDiv!=null && newDiv.innerHTML != ""){
				newDiv.innerHTML = "";
				document.getElementById("GiveItemsUpdateButton").setAttribute("disabled", "false");
				newDiv.remove();
				return;
			}
			newDiv = document.createElement("div");
			newDiv.setAttribute("id", "playerGiveItemsDatabase");
			document.getElementById("PlayerInfoController").appendChild(newDiv);
		var tabsDiv = document.createElement("div");
			tabsDiv.setAttribute("id", "playerGiveItemsDatabaseTabs");
			tabsDiv.setAttribute("class", "DatabaseTabsParent");
		var tabsContDiv = document.createElement("div");
			tabsContDiv.setAttribute("id", "playerGiveItemsDatabaseTabsCont");
			tabsContDiv.setAttribute("class", "DatabaseTabsContParent");

			newDiv.innerHTML = "<h2 class=\"center ng-binding\">Выдача предметов игроку</h2>";
			newDiv.appendChild(tabsDiv);
			newDiv.appendChild(tabsContDiv);
			// var isFirstCat = true;
			// var isFirstCat2 = true;
		for (var i = 0; i < $scope.items_list_bp.length; i++) {
			var record = $scope.items_list_bp[i];
			var tabCat;
			tabCat = document.getElementById("TabName_"+record.category);
			if(tabCat==null){
				tabCat = document.createElement("button");
				tabCat.setAttribute("id", "TabName_"+record.category);
				tabCat.setAttribute("class", "TabByCategory TabByCategory"+record.categoryName);
				// if(isFirstCat) tabCat.classList.add("active");
				tabCat.setAttribute("data-country", record.categoryName);
				tabCat.setAttribute("onclick", `ShowTab(${record.category})`);
				tabCat.innerHTML = `<p title="${record.categoryName}">${record.categoryName}</p>`;
				//tabsDiv.appendChild(tabCat);
				tabsSorted[record.category] = tabCat;
			}
			var tabCatCont;
			tabCatCont = document.getElementById("TabContentName_"+record.category);
			if(tabCatCont==null){
				tabCatCont = document.createElement("div");
				tabCatCont.setAttribute("id", "TabContentName_"+record.category);
				tabCatCont.setAttribute("class", "TabContentByCategory TabContentByCategory"+record.categoryName);
				tabsContDiv.appendChild(tabCatCont);
			}
			var tabContItem;
			tabContItem = document.getElementById("TabItem_"+record.shortname);
			if(tabContItem==null){
				tabContItem = document.createElement("button");
				tabContItem.setAttribute("id", "TabItem_"+record.shortname);
				tabContItem.setAttribute("class", "TabItemMain");
				tabContItem.setAttribute("onclick", `GiveItemToPlayer(event, '${record.shortname}',1)`);
				const curitemname = (record.name == "")?record.shortname:record.name;
				tabCatCont.appendChild(tabContItem);
				var tabContItemImg = document.createElement("img");
				tabContItem.innerHTML += `<p class="tabContItemImgP" title="${curitemname}">${curitemname}</p>`;
				tabContItem.appendChild(tabContItemImg);
				tabContItemImg.src = `https://files.facepunch.com/rust/item/${record.shortname}_256.png`;
				tabContItemImg.srcset = `https://shop.grand-rust.ru/files/images/rust/items256/${record.shortname}.webp 1x`;
				tabContItemImg.loading = "lazy";
				tabContItemImg.setAttribute("class", "product__image");
				tabContItemImg.onerror = function () {
					this.onerror=null; // убираем onerror
					this.src=this.src.replace("https://files.facepunch.com/rust/item/","https://shop.grand-rust.ru/files/images/rust/items256/").replace("_256.png",".png"); // подгружаем картинку с альтернативного ресурса
				}
				var tabContItemX = document.createElement("div");
				tabContItem.appendChild(tabContItemX);
				tabContItemX.setAttribute("class", "tabContItemX");
				tabContItemX.innerHTML += `<button class="tabContItemXall tabContItemX10" title="дать х10" data="10" onclick="GiveItemToPlayer(event, '${record.shortname}',10)">х10</button>
				<button class="tabContItemXall tabContItemX100" title="дать х100" data="100" onclick="GiveItemToPlayer(event, '${record.shortname}',100)">х100</button>
				<button class="tabContItemXall tabContItemX1000" title="дать х1000" data="1000" onclick="GiveItemToPlayer(event, '${record.shortname}',1000)">х1k</button>
				<input type="tel" placeholder="x?" class="tabContItemXall tabContItemXinput" title="Введите сколько дать" onkeydown="GiveItemToPlayer2(this, '${record.shortname}')"/>`;
			}
			
			
		}
		FillCustomItems(tabsContDiv,tabsSorted);
			
		for (let i = 0; i < tabsSorted.length; i++) {
			const thiselem = tabsSorted[i];
			// console.log(thiselem);
			if(thiselem != null)
			tabsDiv.appendChild(thiselem);
		}
		globalScope = $scope;
		globalRconService = rconService;
		ShowTab(0);
	}
	
	
	
	/* $scope.GiveItemToPlayer = function (shortname,count) {
	  console.log(shortname+" x"+count);
	  rconService.Request(`inventory.giveto ${$scope.userid} ${shortname} ${count}`, $scope, function(msg) {
		  // _updateItemsDataTable(JSON.parse(msg.Message));
		  console.log(msg.Message);
		});
	} */
	
	
	
	function insertAfter(referenceNode, newNode) {
	  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
}

////////////////////////////////
//end class/////////////////////
////////////////////////////////
	
	function ShowTab(tabid) {
	  console.log(tabid);
	  document.querySelectorAll(".TabContentByCategory").forEach(function (el) {
		el.classList.remove("active");
	  });
	  document.querySelectorAll(".TabByCategory").forEach(function (el) {
		el.classList.remove("active");
	  });
	  document.getElementById("TabContentName_"+tabid).classList.add("active");
	  document.getElementById("TabName_"+tabid).classList.add("active");
	  
	}
	
	
	
	
	function GiveItemToPlayer(event,shortname,count) {
	  console.log(shortname+" x"+count);
		// console.log(event);
	  if (count==1) {
		  if (event.target.className.startsWith("tabContItemXall")) return;
	  }
	  if (shortname=="") {
		return;
	  }
	  globalRconService.Request(`inventory.giveto ${globalScope.userid} ${shortname} ${count}`, globalScope, function(msg) {
		  // _updateItemsDataTable(JSON.parse(msg.Message));
		  console.log(msg.Message);
		  var msgAlert = document.getElementById("alerts-givemsg");
		  if(msgAlert.innerText=="log")msgAlert.innerText = msg.Message;
		  else msgAlert.innerText = msg.Message+" \n"+msgAlert.innerText;
		  msgAlert.classList.remove("alert-give");
		});
	}
	function GiveItemToPlayer2(element,shortname) {
		if(event.key !== 'Enter') return;
		const count = parseInt(element.value)??0;
		console.log("GiveItemToPlayer2 "+shortname+" x"+count);
		if (shortname=="" || count==0) {
			return;
		}
		globalRconService.Request(`inventory.giveto ${globalScope.userid} ${shortname} ${count}`, globalScope, function(msg) {
		  // _updateItemsDataTable(JSON.parse(msg.Message));
		  console.log(msg.Message);
		  var msgAlert = document.getElementById("alerts-givemsg");
		  if(msgAlert.innerText=="log")msgAlert.innerText = msg.Message;
		  else msgAlert.innerText = msg.Message+" \n"+msgAlert.innerText;
		  msgAlert.classList.remove("alert-give");
		});
		element.value="";
	}
	function GiveCustomItemToPlayer(event,shortname,count) {
	  console.log(shortname+" x"+count);
		// console.log(event);
	  if (count==1) {
		if (event.target.className.startsWith("tabContItemXall")) return;
	  }
	  if (shortname=="") {
		return;
	  }
	  const togivecommand = shortname.replace("{steamid}",globalScope.userid).replace("{amo}",count);
	  globalRconService.Request(togivecommand, globalScope, function(msg) {
		  console.log(msg.Message);
		  var msgAlert = document.getElementById("alerts-givemsg");
		  if(msgAlert.innerText=="log")msgAlert.innerText = msg.Message;
		  else msgAlert.innerText = msg.Message+" \n"+msgAlert.innerText;
		  msgAlert.classList.remove("alert-give");
		});
	}
	function GiveCustomItemToPlayer2(element,shortname) {
		if(event.key !== 'Enter') return;
		// const count = parseInt(element.value)??0;
		const count = element.value || 0;
		console.log("GiveCustomItemToPlayer2 "+shortname+" x"+count);
		if (shortname=="" || count==0) {
			return;
		}
		const togivecommand = shortname.replace("{steamid}",globalScope.userid).replace("{amo}",count);
		globalRconService.Request(togivecommand, globalScope, function(msg) {
			console.log(msg.Message);
			var msgAlert = document.getElementById("alerts-givemsg");
			if(msgAlert.innerText=="log")msgAlert.innerText = msg.Message;
			else msgAlert.innerText = msg.Message+" \n"+msgAlert.innerText;
			msgAlert.classList.remove("alert-give");
		});
		element.value="";
	}
	
	function FillCustomItems(tabsContDiv, tabsSorted) {
			var tabCus;
			const custIndex = tabsSorted.length+1;
			tabCus = document.getElementById("TabName_"+custIndex);
			if(tabCus==null){
				tabCus = document.createElement("button");
				tabCus.setAttribute("id", "TabName_"+custIndex);
				tabCus.setAttribute("class", "TabByCategory TabByCategoryCustom");
				// if(isFirstCat) tabCus.classList.add("active");
				tabCus.setAttribute("data-country", custIndex);
				tabCus.setAttribute("onclick", `ShowTab(${custIndex})`);
				tabCus.innerHTML = '<p title="Кастомные предметы">Кастом</p>';
				//tabsDiv.appendChild(tabCus);
				tabsSorted[custIndex] = tabCus;
			}
			var tabCatCont;
			tabCatCont = document.getElementById("TabContentName_"+custIndex);
			if(tabCatCont==null){
				tabCatCont = document.createElement("div");
				tabCatCont.setAttribute("id", "TabContentName_"+custIndex);
				tabCatCont.setAttribute("class", "TabContentByCategory TabContentByCategoryCustom");
				tabsContDiv.appendChild(tabCatCont);
			}
			var tabContItem;
			for (let i = 0; i < customItemsList.length; i++) {
				const thiselem = customItemsList[i];
				tabContItem = document.getElementById("TabItem_"+i);
				if(tabContItem==null){
					tabContItem = document.createElement("button");
					tabContItem.setAttribute("id", "TabItem_"+i);
					tabContItem.setAttribute("class", "TabItemMain");
					tabContItem.setAttribute("onclick", `GiveCustomItemToPlayer(event, '${thiselem.command}',1)`);
					const curitemname = thiselem.name;
					tabCatCont.appendChild(tabContItem);
					var tabContItemImg = document.createElement("img");
					tabContItem.innerHTML += `<p class="tabContItemImgP" title="${curitemname}">${curitemname}</p>`;
					tabContItem.appendChild(tabContItemImg);
					tabContItemImg.src = thiselem.image;
					tabContItemImg.loading = "lazy";
					tabContItemImg.setAttribute("class", "product__image");
					if(thiselem.command.includes("{amo}")){
						var tabContItemX = document.createElement("div");
						tabContItem.appendChild(tabContItemX);
						tabContItemX.setAttribute("class", "tabContItemX");
						if(!(thiselem.command.includes("grant."))){
							tabContItemX.innerHTML += `<button class="tabContItemXall tabContItemX10" title="Дать х10" data="10" onclick="GiveCustomItemToPlayer(event, '${thiselem.command}',10)">х10</button>
							<button class="tabContItemXall tabContItemX100" title="Дать х100" data="100" onclick="GiveCustomItemToPlayer(event, '${thiselem.command}',100)">х100</button>
							<button class="tabContItemXall tabContItemX1000" title="Дать х1000" data="1000" onclick="GiveCustomItemToPlayer(event, '${thiselem.command}',1000)">х1k</button>`;
						}
						tabContItemX.innerHTML += `<input type="tel" placeholder="x?" class="tabContItemXall tabContItemXinput" title="Введите сколько дать" onkeydown="GiveCustomItemToPlayer2(this, '${thiselem.command}')"/>`;
						
					}
				}
			}
	  
	}
	
	const customItemsList = [{
  command: "grant.group {steamid} grand {amo}",
  image: "https://i.imgur.com/7HWdil3_d.png?maxwidth=250&fidelity=low",
  name: "Гранд"
},{
  command: "grant.group {steamid} king {amo}",
  image: "https://i.imgur.com/2iUxbNF_d.png?maxwidth=250&fidelity=low",
  name: "Кинг"
},{
  command: "grant.group {steamid} elite {amo}",
  image: "https://i.imgur.com/xQZGxhr_d.png?maxwidth=250&fidelity=low",
  name: "Элит"
},{
  command: "grant.group {steamid} wars {amo}",
  image: "https://i.imgur.com/ceXnaMI_d.png?maxwidth=250&fidelity=low",
  name: "Варс"
},{
  command: "grant.group {steamid} prem {amo}",
  image: "https://i.imgur.com/FlryHJ6_d.png?maxwidth=250&fidelity=low",
  name: "Прем"
},{
  command: "giverecycler {steamid}",
  image: "https://i.imgur.com/aD1Vio6_d.png?maxwidth=250&fidelity=low",
  name: "ПРМ"
},{
  command: "grant.permission {steamid} recycler.premium {amo}",
  image: "https://i.imgur.com/QM6TkB5_d.png?maxwidth=250&fidelity=low",
  name: "Перераб"
},{
  command: "grant.group {steamid} neverwear {amo}",
  image: "https://i.imgur.com/fWiiDdx_d.png?maxwidth=250&fidelity=low",
  name: "Неломайка"
},{
  command: "grant.permission {steamid} skins.change {amo}",
  image: "https://i.imgur.com/nR41r0t.png",
  name: "скины"
},{
  command: "grant.permission {steamid} queue.access {amo}",
  image: "https://i.imgur.com/Fa1T9nK_d.png?maxwidth=250&fidelity=low",
  name: "Очереди"
},{
  command: "grant.permission {steamid} metabolism.testpermission {amo}",
  image: "https://i.imgur.com/zs8KjyF_d.png?maxwidth=250&fidelity=low",
  name: "Метабол"
},{
  command: "grant.group {steamid} sil {amo}",
  image: "https://i.imgur.com/gYFIDT3.png",
  name: "Sil"
},{
  command: "grant.permission {steamid} rucksack.access {amo}",
  image: "https://i.imgur.com/oegDo6u_d.png?maxwidth=250&fidelity=low",
  name: "Рюкзак"
},{
  command: "giveplayercomp {steamid}",
  image: "https://i.imgur.com/LGMAyC9_d.webp?maxwidth=250&fidelity=low",
  name: "Ферма запчасти"
},{
  command: "xpgive {steamid} {amo}",
  image: "https://media.discordapp.net/attachments/619458176483328020/619461634318139392/cKJ41ae.png?width=256&height=256",
  name: "Гранды"
},{
  command: "levelgive {steamid} {amo}",
  image: "https://media.discordapp.net/attachments/619458176483328020/621437920674578433/icon.png?width=256&height=256",
  name: "Левел"
},{
  command: "givegold {steamid}",
  image: "https://media.discordapp.net/attachments/578323395842670593/878378478221803530/icon.png?width=256&height=256",
  name: "Грандий"
},{
  command: "nalog givetoplayer {steamid}",
  image: "https://media.discordapp.net/attachments/578323395842670593/871838952091430952/icon.png?width=256&height=256",
  name: "Пока не<br>работает"// Налог ящик
},{
  command: "cases.add {steamid} s2 10",
  image: "https://i.imgur.com/7HWdil3_d.png?maxwidth=250&fidelity=low",
  name: "Гранд в склад<br>7д"
},{
  command: "cases.add {steamid} s5 9",
  image: "https://i.imgur.com/2iUxbNF_d.png?maxwidth=250&fidelity=low",
  name: "Кинг в склад<br>7д"
},{
  command: "cases.add {steamid} s8 8",
  image: "https://i.imgur.com/xQZGxhr_d.png?maxwidth=250&fidelity=low",
  name: "Элит в склад<br>7д"
},{
  command: "cases.add {steamid} s11 7",
  image: "https://i.imgur.com/ceXnaMI_d.png?maxwidth=250&fidelity=low",
  name: "Варс в склад<br>7д"
},{
  command: "cases.add {steamid} s14 6",
  image: "https://i.imgur.com/FlryHJ6_d.png?maxwidth=250&fidelity=low",
  name: "Прем в склад<br>7д"
},{
  command: "copter.add {steamid}",
  image: "https://media.discordapp.net/attachments/578323395842670593/738225124385488976/icon.png?width=256&height=256",
  name: "Коптер"
},{
  command: "givecasino {steamid}",
  image: "https://media.discordapp.net/attachments/578323395842670593/878378605695107092/table.png?width=256&height=256",
  name: "Игровой стол"
},{
  command: "th givecard1 {steamid}",
  image: "https://media.discordapp.net/attachments/578323395842670593/685235338398007374/vX4qb6R.png?width=256&height=256",
  name: "Пока не<br>работает"// Карта 1
},{
  command: "th givecard2 {steamid}",
  image: "https://media.discordapp.net/attachments/578323395842670593/685235353212551188/2KmMtJF.png?width=256&height=256",
  name: "Пока не<br>работает"// Карта 2
},{
  command: "th givecard3 {steamid}",
  image: "https://media.discordapp.net/attachments/578323395842670593/685235367678312473/2q4V2lG.png?width=256&height=256",
  name: "Пока не<br>работает"// Карта 3
},{
  command: "th givecard4 {steamid}",
  image: "https://media.discordapp.net/attachments/578323395842670593/685235411798327329/kzyItsE.png?width=256&height=256",
  name: "Пока не<br>работает"// Карта 4
},{
  command: "addach {steamid} 1 1",
  image: "https://i.imgur.com/DAy0aef.png",
  name: "Нашивка 1"
},{
  command: "addach {steamid} 2 1",
  image: "https://i.imgur.com/NZy4Uvl.png",
  name: "Нашивка 2"
},{
  command: "addach {steamid} 3 1",
  image: "https://i.imgur.com/dBQFgYM.png",
  name: "Нашивка 3"
},{
  command: "buymap {steamid}",
  image: "https://media.discordapp.net/attachments/619458176483328020/621462478328561664/1.png?width=256&height=256",
  name: "Карта 1"
},{
  command: "buyuncommonmap {steamid}",
  image: "https://media.discordapp.net/attachments/619458176483328020/621462296304287783/2.png?width=256&height=256",
  name: "Карта 2"
},{
  command: "buyraremap {steamid}",
  image: "https://media.discordapp.net/attachments/619458176483328020/621462355460620289/3.png?width=256&height=256",
  name: "Карта 3"
},{
  command: "buyelitemap {steamid}",
  image: "https://media.discordapp.net/attachments/619458176483328020/621462408992391168/4.png?width=256&height=256",
  name: "Карта 4"
},{
  command: "gathgame.refill {steamid} 200",
  image: "https://i.imgur.com/jc8a8Dt_d.png?maxwidth=250&fidelity=low",
  name: "Супер игра<br>Всё на 200"
},{
  command: "",
  image: "",
  name: ""
},{
  command: "",
  image: "",
  name: ""
},{
  command: "",
  image: "",
  name: ""
}]