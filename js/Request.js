function handler() {
  if(this.status == 200 &&
    this.responseText != null) {
    // success!
    processData(this.responseText);

  } else {
  	var loader = document.getElementById('loader');
  	loader.innerHTML = getAlert();
  }
}