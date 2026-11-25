// Algkood: https://www.w3schools.com/howto/howto_js_collapsible.asp
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

const ylesanded = [
  "cryptography-1",
  "cryptography-2",
  "web-exploitation-1",
  "web-exploitation-2",
  "steganography-1",
];

ylesanded.forEach(async (yl) => {
  const nupp = document.getElementById(yl);
  const olek = document.getElementById(`${yl}-state`);
  const koht = document.getElementById(`${yl}-place`);
  const id = localStorage.getItem(`${yl}-id`);

  if (id) {
    olek.textContent = "Lahendatud";
    const r = await fetch(
      "cgi-bin/edetabeli-koht.py?" + new URLSearchParams({ id }),
    );
    const andmed = await r.json();
    koht.textContent = `${andmed.koht}/${andmed.kokku}`;
  } else if (localStorage.getItem(yl)) {
    olek.textContent = "Pooleli";
  }

  nupp.addEventListener("click", () => {
    if (localStorage.getItem(yl) === null) localStorage.setItem(yl, Date.now());
    location.href = yl;
  });
});

