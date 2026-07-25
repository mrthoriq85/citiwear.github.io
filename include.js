async function loadComponent(id, file) {
  try {
    console.log("Load:", file);

    const response = await fetch(file);

    console.log(response.status);

    const html = await response.text();

    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");
loadComponent("testimoni", "testimoni.html");
