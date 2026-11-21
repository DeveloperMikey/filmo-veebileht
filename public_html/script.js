var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/* Algkood:
https://www.w3schools.com/howto/howto_js_collapsible.asp
*/


var web1 = document.getElementById("web1");
var web1_state = document.getElementById("web1_state")
var web1_place = document.getElementById("web1_place")

var web2 = document.getElementById("web2")
var web2_state = document.getElementById("web2_state")
var web2_place = document.getElementById("web2_place")

async function main () {

var web1_id = localStorage.getItem("web1-id")
if (web1_id) {
  const params = new URLSearchParams({
    id: web1_id
  })
  const r = await fetch("cgi-bin/edetabeli-koht.py?" + params)
  //console.log((await r.json()).koht)
  web1_place.textContent = (await r.json()).koht
}
}

main()

if (localStorage.getItem("web1")) {
  web1_state.textContent = "pooleli"
}


web1.addEventListener("click", function() {
  if (localStorage.getItem("web1") === null) {
    localStorage.setItem("web1", Date.now())
  }
  location.href = "web-exploitation-1"


});



