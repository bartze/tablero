class Tablero {
  constructor(ancho = 2, alto = 2) {
    this.ancho = ancho;
    this.alto = alto;
    this.cuadricula = [];
    for (let y = 0; y < alto; y++) {
      const fila = [];
      for (let x = 0; x < ancho; x++) {
        fila.push({ activa: y === 0 && x === 0 });
      }
      this.cuadricula.push(fila);
    }
    this.renderTablero();
    window.addEventListener("keydown", (e) => this.manejarTecla(e));
  }

  casillaActiva() {
    for (let y = 0; y < this.cuadricula.length; y++) {
      for (let x = 0; x < this.cuadricula[y].length; x++) {
        if (this.cuadricula[y][x].activa) {
          return { x, y };
        }
      }
    }
  }

  moverCasilla(nuevaX, nuevaY) {
    const { x, y } = this.casillaActiva();
    if (
      nuevaX < 0 ||
      nuevaY < 0 ||
      nuevaX >= this.ancho ||
      nuevaY >= this.alto
    ) {
      return `Movimiento imposible`;
    }
    this.cuadricula[y][x].activa = false;
    this.cuadricula[nuevaY][nuevaX].activa = true;
    this.renderTablero();
    return this.casillaActiva();
  }

  renderTablero() {
    const tableroDiv = document.getElementById("tablero");
    tableroDiv.innerHTML = "";
    this.cuadricula.forEach((fila) => {
      fila.forEach((casilla) => {
        const casillaDiv = document.createElement("div");
        casillaDiv.className = "casilla" + (casilla.activa ? " activa" : "");
        tableroDiv.appendChild(casillaDiv);
      });
    });
    tableroDiv.style.gridTemplateColumns = `repeat(${this.ancho}, 50px)`;
  }

  manejarTecla(e) {
    const { x, y } = this.casillaActiva();
    switch (e.key) {
      case "ArrowUp":
        this.arriba();
        break;
      case "ArrowDown":
        this.abajo();
        break;
      case "ArrowLeft":
        this.izquierda();
        break;
      case "ArrowRight":
        this.derecha();
        break;
    }
  }

  arriba() {
    const { x, y } = this.casillaActiva();
    return y > 0 ? this.moverCasilla(x, y - 1) : "Imposible mover arriba";
  }

  abajo() {
    const { x, y } = this.casillaActiva();
    return y < this.cuadricula.length - 1
      ? this.moverCasilla(x, y + 1)
      : "Imposible mover abajo";
  }

  izquierda() {
    const { x, y } = this.casillaActiva();
    return x > 0 ? this.moverCasilla(x - 1, y) : "Imposible mover izquierda";
  }

  derecha() {
    const { x, y } = this.casillaActiva();
    return x < this.cuadricula[y].length - 1
      ? this.moverCasilla(x + 1, y)
      : "Imposible mover derecha";
  }
}

const tablero = new Tablero(20, 10);
console.log(tablero.cuadricula);
console.log(tablero.casillaActiva());
console.log(tablero.derecha());
console.log(tablero.casillaActiva());
console.log(tablero.derecha());
console.log(tablero.abajo());
console.log(tablero.izquierda());
console.log(tablero.arriba());
