// Por defecto empieza en el nivel dificil, 6 cuadrados en la pantalla
let numeroDeCuadrados = 6;

// Arreglo de colores aleatorios segun la dificulatd que se indica por medio del numero pasado por parametro
let colors = getColors(numeroDeCuadrados);

// Seleccionar todos los cuadrados --> nodeList => esto me permite trabajarlos como si fueran un array
const squares = document.querySelectorAll(".square");

llenarCuadrados(squares,colors);

const colorDisplay = document.querySelector("#colorDisplay");
const msj = document.querySelector("#message");

//  Color que tiene que adivinar el usuario generado de forma aleatoria
let pickedColor = pickColor(colors);

const h1Display = document.querySelector("h1");

// Renderiza en el h1 el color que tiene que adivinar el usuario 
colorDisplay.textContent = pickedColor;

const resetButton = document.querySelector("#reset");
const easyButton = document.querySelector("#easyButton");
const hardButton = document.querySelector("#hardButton");
let modeButtons = document.querySelectorAll(".mode"); // arreglo con los botones easyMode y hardMode
let currentMode = document.querySelector(".selected");


//Agregar event listener al boton reset
resetButton.addEventListener("click", function(){
    reset()
});


//Agregar event listeners para detectar el modo actual de dificultad del juego
for(var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
		if(currentMode !== this) {
            console.log(currentMode)
			this.classList.add("selected");
			currentMode.classList.remove("selected");
			currentMode = this;
			reset();
		}
	});
}

//Agregar event listeners a los cuadrados
for(var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function() {
		let clickedColor = this.style.background;
		if(clickedColor === pickedColor) {
			//Mostrar al usuario un mensaje que le indique que gano
			msj.textContent = "Correct!";
            
			//Cambiar el color de todos los cuadrados a la opcion ganadora
			for(var i = 0; i < squares.length; i++) {
				squares[i].style.background = pickedColor;
			}
			h1Display.style.background = pickedColor;
			resetButton.textContent = "Play Again?";
		} else {
			// Mostrar al usuario que la respuesta es incorrecta
			msj.textContent = "Incorrect";
			this.style.background = "rgb(91, 89, 89)";
		}
	});
}



// Funciones

// Reinicia el juego
function reset() {
	h1Display.style.background = "black";
	msj.textContent = "";
	resetButton.textContent = "Nuevos colores";

    // Cambia el valor de la variable que me indica el numero de cuadrados, dependiendo de la dificultad
    currentMode.textContent === "Easy" ? numeroDeCuadrados = 3 : numeroDeCuadrados = 6;

	colors = getColors(numeroDeCuadrados);
	llenarCuadrados(squares, colors);
	pickedColor = pickColor(colors);
	colorDisplay.textContent = pickedColor;
}

// Devuelve un array de colores
function getColors(num) {
	var arr = [];
	for(var i = 0; i < num; i++) {
		arr.push(generateColor()); // Agrega un nuevo color al array dependiendo de la dimension 
	}
	return arr; //Retorna el nuevo array cargado con colores
}

// Elige un color entre las opciones del array de colores
function pickColor(colors) {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Rellena todos los cuadrados con los colores
function llenarCuadrados(squares, colors) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.display = "block";
		if(colors[i]) {
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

// Funcion que genera un numero aleatorio entre 0 y 255
function generateRandomNumber(num) {
    return (Math.floor(Math.random() * num.toFixed(0)))
};

// Funcion para generar un color RGB de forma aleatoria
function generateColor() {
    let color = `(${generateRandomNumber(255)}, ${generateRandomNumber(255)}, ${generateRandomNumber(255)})`;
    return `rgb${color}`;
}

