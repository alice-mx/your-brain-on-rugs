function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = "Hi";

  return element;
}

document.body.appendChild(component());

fetch('http://localhost:3000').then(response => {
  response.json().then(json => {
    let data = json;
    console.log(data);
  });
});
