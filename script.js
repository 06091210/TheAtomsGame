function move() {
space = 103
line = Math. floor (window.innerWidth / space);
row = Math. floor (window.innerHeight / space);
shiftX = (window.innerWidth - (space * line)) / 2;
shiftY = 10;
elements = ["H", "O"];
colors = ["#00A0F0", "#0000C0"];
Scolors = [];
selects = [];
Eselect = [];
Ecoordinates = [];
for (let i=0; i<line*row; i++) {
  random = Math.floor(Math.random() * elements.length)
  selects.push(elements[random]);
  Scolors.push(colors[random]);
}
for (let j=0; j<selects.length; j++) {
  document. write(`<h1 class='circle' style="background: ${Scolors[j]}; translate: ${shiftX}px -20px" id=${j}>${selects[j]}</h1>`);
}
window.addEventListener('touchstart', (e) => {
  table = [["H", "H", "O"], ["O", "O"], ["O", "O", "O"], ["H", "H"], ["O", "O", "H", "H"]];
  Ecoordinates.splice(0, Ecoordinates.length);
  Eselect.splice(0, Eselect.length);
});
window.addEventListener('touchmove', (e) => {
  moveX = e.changedTouches[0].pageX;
  moveY = e.changedTouches[0].pageY;
  blockX = Math.ceil((moveX - shiftX) / space);
  blockY = Math.floor((moveY - shiftY) / space) * line;
  block = blockX + blockY;
  if (Ecoordinates[Ecoordinates.length - 1] !== block) {
    if (!Ecoordinates.includes(block)) {
      if (Ecoordinates.length != 0) {
        sub = Math.abs(block-Ecoordinates[Ecoordinates - 1]);
        if ((sub == 1) || (sub == line)) {
          Ecoordinates.push(block);
        }
      }
      else {
        Ecoordinates.push(block);
      }
    }
  }
});
window.addEventListener('touchend', (e) => {
  for (let l=0; l<Ecoordinates.length; l++) {
    if (document.getElementById(Ecoordinates[l] - 1).id != "no") {
      Eselect.push(selects[Ecoordinates[l] - 1]);
    }
  }
  for (let k=0; k<table.length; k++) { 
    TEselect = [...Eselect];
    Ttable = table[k];
    n = 0;
    for (let m=0; m<Eselect.length; m++) {
      if (Ttable.includes(TEselect[n])) {
        anElement = TEselect[n];
        TEselect.splice(n, 1);
        Ttable.splice(Ttable.indexOf(anElement), 1);
      }
      else {
        n += 1;
      }
    }
    if ((TEselect[0] == Ttable[0]) && (TEselect.length == Ttable.length)) {
      for (let p=0; p<Ecoordinates.length; p++) {
        const id = document.getElementById(Ecoordinates[p] - 1);
        id.id = "no";
      }
    }
  }
});
}
