/**
 * This file is entry file for your library
 */

export function render() {
    var prefix = "__adf___QUZTD4vFQRPj8evY__";
//var theUrl = "http://localhost:5000/v1/";
var qs = window.location.search;
	var searchParam = new URLSearchParams(qs)
	var adfref = searchParam.get("adfref");
	

 if(adfref){
	var decode = atob(adfref)
	var key = JSON.parse(atob(decode))
	var data = 'adfref'+key.CampaignId+key.AdGroupId
	if(getCookie(decode) =='')
		setCookie( JSON.stringify(decode),'true')
		localStorage.setItem('adfref'+key.CampaignId+key.AdGroupId, JSON.stringify({'key':'adfref'+key.CampaignId+key.AdGroupId,'id':decode}))
	}
	function setCookie(cname, cvalue) {
		const d = new Date();
		d.setTime(d.getTime() + (10*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	  }

	function getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
		  let c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		  }
		}
		return "";
	  }


async function sendRequest(data){
	var payload = JSON.parse(localStorage.getItem(data))
	if(getCookie(JSON.stringify(payload.id)) =='' || getCookie(JSON.stringify(payload.id))=='false'){
		return
	}
	var theUrl = "https://bangladesh-staging.adfinix.com/v1/";
	var url = theUrl.concat("conversion");
	var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
	xmlhttp.open("POST", url);
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify({id:payload.id}));
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var json = JSON.parse(xmlhttp.responseText);

			if(json.success==true){
				setCookie(JSON.stringify(payload.id),false);
			}
		}
	};
}



}