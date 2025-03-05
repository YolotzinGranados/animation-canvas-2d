const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Define las dimensiones del canvas
const window_height = 300;
const window_width = 300;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

// Clase Circle con contador de rebotes y condición de detención
class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;
    this.bounces = 0; // Contador de rebotes
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
    this.isStopped = false; // Estado del círculo (detenido o no)
  }

  // Dibuja el círculo con el texto ajustado
  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();

    // Ajustar tamaño del texto según el radio (máximo 20px)
    let fontSize = Math.min(this.radius / 2, 20);
    context.font = `${fontSize}px Arial`;
    context.fillStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Mostrar el texto con el número de rebotes dentro del círculo
    context.fillText(`${this.text}: ${this.bounces}`, this.posX, this.posY);
  }

  // Método para actualizar la posición y contar rebotes
  update(context, width, height) {
    this.draw(context);

    // Si el círculo ya ha llegado a 10 rebotes, no se mueve más
    if (this.bounces >= 10) {
      this.isStopped = true;
      return; // Sale de la función y detiene el movimiento
    }

    // Detectar colisión con los bordes y contar rebotes
    if (this.posX + this.radius > width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
      this.bounces++; // Incrementar rebotes
    }

    if (this.posY + this.radius > height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
      this.bounces++; // Incrementar rebotes
    }

    // Mover el círculo solo si no ha alcanzado 10 rebotes
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Generación de círculos dentro de los límites del canvas
function createRandomCircle(text, color, speed) {
  let randomRadius = Math.floor(Math.random() * 50 + 20); // Radio entre 20 y 70 píxeles
  let randomX = Math.random() * (canvas.width - 2 * randomRadius) + randomRadius;
  let randomY = Math.random() * (canvas.height - 2 * randomRadius) + randomRadius;
  
  return new Circle(randomX, randomY, randomRadius, color, text, speed);
}

// Crear dos círculos
let miCirculo = createRandomCircle("Tec1", "blue", 5);
let miCirculo2 = createRandomCircle("Tec2", "red", 2);

// Animación de los círculos
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Solo actualiza los círculos si no están detenidos
  if (!miCirculo.isStopped) miCirculo.update(ctx, canvas.width, canvas.height);
  if (!miCirculo2.isStopped) miCirculo2.update(ctx, canvas.width, canvas.height);
};

// Inicia la animación
updateCircle();
