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

var cryptogr1 = document.getElementById("cryptogr1")
var cryptogr1_state = document.getElementById("cryptogr1_state")
var cryptogr1_place = document.getElementById("cryptogr1_place")

var cryptogr2 = document.getElementById("cryptogr2")
var cryptogr2_state = document.getElementById("cryptogr2_state")
var cryptogr2_place = document.getElementById("cryptogr2_place")

var steg1 = document.getElementById("steg1")
var steg1_state = document.getElementById("steg1_state")
var steg1_place = document.getElementById("steg1_place")


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

var web2_id = localStorage.getItem("web2-id")
if (web2_id) {
  const params = new URLSearchParams({
    id: web2_id
  })
  const r = await fetch("cgi-bin/edetabeli-koht.py?" + params)
  //console.log((await r.json()).koht)
  web2_place.textContent = (await r.json()).koht
}

var cryptogr1_id = localStorage.getItem("cryptogr1-id")
if (cryptogr1_id) {
  const params = new URLSearchParams({
    id: cryptogr1_id
  })
  const r = await fetch("cgi-bin/edetabeli-koht.py?" + params)
  //console.log((await r.json()).koht)
  cryptogr1_place.textContent = (await r.json()).koht
}

var cryptogr2_id = localStorage.getItem("cryptogr2-id")
if (cryptogr2_id) {
  const params = new URLSearchParams({
    id: cryptogr2_id
  })
  const r = await fetch("cgi-bin/edetabeli-koht.py?" + params)
  //console.log((await r.json()).koht)
  cryptogr2_place.textContent = (await r.json()).koht
}

var steg1_id = localStorage.getItem("steg1-id")
if (steg1_id) {
  const params = new URLSearchParams({
    id: steg1_id
  })
  const r = await fetch("cgi-bin/edetabeli-koht.py?" + params)
  //console.log((await r.json()).koht)
  steg1_place.textContent = (await r.json()).koht
}


}

main()


//web1

if (localStorage.getItem("web1")) {
  web1_state.textContent = "Pooleli"
}


web1.addEventListener("click", function() {
  if (localStorage.getItem("web1") === null) {
    localStorage.setItem("web1", Date.now())
  }
  location.href = "web-exploitation-1"

});

//web2

if (localStorage.getItem("web2")) {
  web2_state.textContent = "Pooleli"
}


web2.addEventListener("click", function() {
  if (localStorage.getItem("web2") === null) {
    localStorage.setItem("web2", Date.now())
  }
  location.href = "web-exploitation-2"

});

//cryptogr1

if (localStorage.getItem("cryptogr1")) {
  cryptogr1_state.textContent = "Pooleli"
}


cryptogr1.addEventListener("click", function() {
  if (localStorage.getItem("cryptogr1") === null) {
    localStorage.setItem("cryptogr1", Date.now())
  }
  location.href = "cryptography-1"

});

//cryptogr2

if (localStorage.getItem("cryptogr2")) {
  cryptogr2_state.textContent = "Pooleli"
}


cryptogr2.addEventListener("click", function() {
  if (localStorage.getItem("cryptogr2") === null) {
    localStorage.setItem("cryptogr2", Date.now())
  }
  location.href = "cryptography-2"

});

//steg1

if (localStorage.getItem("steg1")) {
  steg1_state.textContent = "Pooleli"
}


steg1.addEventListener("click", function() {
  if (localStorage.getItem("steg1") === null) {
    localStorage.setItem("steg1", Date.now())
  }
  location.href = "steganography-1"

});