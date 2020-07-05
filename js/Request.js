function handler() {
  if(this.status == 200 &&
    this.responseText != null) {
    // success!
    processData(this.responseText);

  } else {
    console.log("deu merda");
  }
}