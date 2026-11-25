// Mihkel Mäemees
const nupp = document.getElementById("kontroll-nupp");
const sisend = document.getElementById("kasutajaVastus");
const vastus = document.getElementById("vastus");
const ylesanne = location.pathname.split("/").at(-2);

nupp.addEventListener("click", async () => {
  const aeg = Date.now() - localStorage.getItem(ylesanne);
  const params = new URLSearchParams({
    ylesanne: ylesanne,
    lipp: sisend.value,
    aeg: aeg,
  });
  const r = await (
    await fetch("../cgi-bin/kontrolli-vastust.py?" + params)
  ).json();

  if (r.ok) {
    if (!localStorage.getItem(`${ylesanne}-id`)) {
      localStorage.setItem(`${ylesanne}-id`, r.id);
    }

    vastus.innerHTML =
      'Tubli töö! <a href="../index.html">Tagasi avalehele</a>';
  } else {
    vastus.innerHTML = "Vale vastus. Proovi uuesti";
  }
});
