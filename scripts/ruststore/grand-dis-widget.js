
var DOMReady = function(a,b,c){b=document,c='addEventListener';b[c]?b[c]('DOMContentLoaded',a):window.attachEvent('onload',a)}

DOMReady(function () {
	try{
		// UpdateDiscord();
	}catch(e){
		console.log('wiget element not found '+ e);
	}
	
	
	setInterval(() => CheckDisCounter(), 5000);
	
});


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

function UpdateDiscord(isRetry = false) {
	getJSON('https://discord.com/api/v6/invites/'+ invite_id +'?with_counts=true', function(gjson){
		try{
			gjson = JSON.parse(gjson);
		}catch(e){
			console.log('Discord querry not ok '+ e);
			return;
		}
		if(gjson.guild != null){
		try{
			document.getElementById('discord-guild-name').innerText = gjson.guild.name;
			document.getElementById('discord-guild-icon').setAttribute("style", "content: url('https://cdn.discordapp.com/icons/"+ guild_id +"/"+ gjson.guild.icon +".png'); content: -webkit-image-set(url(https://cdn.discordapp.com/icons/729354570618372156/607937561fec981f6e852c877ced008c.png?size=64) 0.5x, url(https://cdn.discordapp.com/icons/729354570618372156/607937561fec981f6e852c877ced008c.png) 1x, url(https://cdn.discordapp.com/icons/729354570618372156/607937561fec981f6e852c877ced008c.png?size=256) 2x);");
			document.getElementById('discord-guild-online').innerText = gjson.approximate_presence_count+' в сети';
			document.getElementById('discord-guild-all').innerText = gjson.approximate_member_count;
			if(isRetry){
			  document.getElementById('discord-guild-invite-btn').setAttribute("href", "https://discord.com/invite/"+invite_id);
			  document.getElementById('discord-guild-icon').setAttribute("href", "https://discord.com/invite/"+invite_id);
			}
		}catch(e){
			console.log('Elements not found '+ e);
			return;
		}
      
      }else if(!isRetry){
        console.log('Discord querry ok but invite expired for guild '+ guild_id);
        getJSON('https://discordapp.com/api/guilds/'+ guild_id +'/widget.json', function(gjson2){
          try{
              gjson2 = JSON.parse(gjson2);
          }catch(e){
              console.log('Discord querry 2 not ok '+ e);
              return;
		  }
          if(gjson2.instant_invite != null){
            invite_id = gjson2.instant_invite.match(/invite\/(\w+)$/)[1];
        	console.log('new discord invite is '+ invite_id);
            UpdateDiscord(true);
          }
          
   		});
      }
   });
}

function CheckDisCounter() {
	if(document.getElementById('discord-guild-all')?.innerText == '12598'){
		UpdateDiscord();
	}
}

function OnCustomWidgetSet(widgetId) {
	console.log('OnCustomWidgetSet '+widgetId);
	if(widgetId == 2783){
		UpdateDiscord();
	}
}