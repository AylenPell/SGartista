// CONSTRUCCION DE LA GALERIA, data en el JSON

let contGallery = document.getElementById("contGallery");
let listaCuadros = [];

const buildGallery = async () => {
    try{
        let response = await fetch("./json/cuadros.json");
        listaCuadros = await response.json();

        listaCuadros.forEach(cuadro => {
            let div = document.createElement("div");
            div.innerHTML = `
                <div class="divCard"> 
                    <div class="divFcenter">
                        <img class="imgCard" id="img${cuadro.id}" src=${cuadro.imagen} alt=${cuadro.titulo}>
                    </div> 
                    <div>   
                        <h2 class="h2Ngo"> ${cuadro.titulo} </h2>
                        <p class="pNgo"> <span class="spBld">Técnica:</span> ${cuadro.tecnica} </p>
                        <p class="pNgo"> <span class="spBld">Medidas:</span> ${cuadro.medidas} </p>
                        <p class="pNgo"> <span class="spBld">Precio:</span> $${cuadro.precio} </p>
                    </div>
                    <div class="divFcenter">
                        <button type="button" class="boton" id="agregar${cuadro.id}" onclick="agregarItem(${cuadro.id})">Lo quiero!</button>
                    </div>
                </div>
            `;
            contGallery.append(div);
        });
    } catch (error) {
        let div = document.createElement ("div");
        div.innerHTML = `
                    <pBco>Oops! Algo pasó! 💣 Inténtalo de nuevo más tarde</p>
        `;
        contGallery.append(div);
    };
};
    
buildGallery ();

// zoom imagenes



// CARRITO DE COMPRAS
let carrito = [];
let itemsCarrito = document.getElementById("itemsCarrito");

// chequear storage
carrito = JSON.parse(localStorage.getItem("carrito"));
if (!carrito || carrito.length === 0) {
    carrito = [];
    let tr = document.createElement("tr");
            tr.id = "noHayNada";
            tr.innerHTML = `
                <td>Todavía no elegiste ninguna obra</td>
            `;
            itemsCarrito.append(tr);          
} else if(carrito.length > 0){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    console.log(carrito);
    for (const cuadro of carrito){
        let tr = document.createElement("tr");
        tr.id = `filaCarrito${cuadro.id}`;
        tr.innerHTML = `
            <td>${cuadro.titulo}</td>
            <td>$${cuadro.precio}</td>
            <td><button id="eliminar${cuadro.id}" onclick="borrarItem(${cuadro.id})" type="button" class="btn btn-danger">X</button></td>
        `;
        itemsCarrito.append(tr);
    }
}

// agregar item al carrito y guardarlo en el localStorage
const guardarStorage = (clave, valor) => {localStorage.setItem(clave, valor)};

function agregarItem (id){
    console.log (id);
    let noHayNada = document.getElementById ("noHayNada"); 
    let cuadroElegido = listaCuadros.find (cuadro => id === cuadro.id && cuadro.cantidad === 1);
    if (cuadroElegido){
        let chequearCarro = carrito.find (cuadro => cuadroElegido.id === cuadro.id);
        if (!chequearCarro){
            carrito.push(cuadroElegido);
            console.log(noHayNada);
            noHayNada?.remove();
            let tr = document.createElement("tr");
            tr.id = `filaCarrito${cuadroElegido.id}`;
            tr.innerHTML = `
                <td>${cuadroElegido.titulo}</td>
                <td>$${cuadroElegido.precio}</td>
                <td><button id="eliminar${cuadroElegido.id}" onclick="borrarItem(${cuadroElegido.id})" type="button" class="btn btn-danger">X</button></td>
            `;
            itemsCarrito.append(tr);
            sumarCarro();
            
            guardarStorage("carrito", JSON.stringify(carrito));
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Buena elección!`,
                text: `Agregaste "${cuadroElegido.titulo}" al carrito`,
                showConfirmButton: false,
                timer: 2000
            });

        } else if (chequearCarro){
            
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: `Oops!`,
                text: `Ya agregaste esta obra`,
                showConfirmButton: false,
                timer: 1500
            });
        }     
    } else if (cuadroElegido.cantidad === 0){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `Oops!`,
            text: `Esta obra ya no está disponible`,
            showConfirmButton: false,
            timer: 1000
        });
    }
}

// sumar $$ total del carrito
let totalCarro = 0;
function sumarCarro (){
        //let totalCarro = 0;
        carrito.forEach ( item => {
            totalCarro = totalCarro + item.precio;
        });
    let thTotal = document.getElementById("thTotal");
    thTotal.innerText = `
    Total: $${totalCarro}
    `;    
    let trFooter = document.getElementById ("trFooter");
    trFooter.innerHTML = `
    <th scope="col" colspan="1"><button type="button" class="boton" data-bs-toggle="modal" data-bs-target="#modalCompra" id="finalizarCompra">Finalizar compra</button></th>
    `;
}


if (carrito){
    sumarCarro ();
}

let btnFinCompra = document.getElementById ("finalizarCompra");
if (carrito.length === 0){
    btnFinCompra?.remove();
}

// finalizar compra
let resumenCompra;
let filaResumen;

btnFinCompra.addEventListener("click", () =>{
    resumenCompra = document.getElementById("resumenCompra");
    for (const cuadro of carrito){
        let div1 = document.createElement("div");
        div1.id= "filaResumen";
        div1.innerHTML= `
            <div>
            </div>
        `,
        resumenCompra.append(div1);

        filaResumen = document.getElementById("filaResumen");
        let div2 = document.createElement("div");
        div2.id = `filaResumen${cuadro.id}`;
        div2.className="row";
        div2.innerHTML = `
            <div class="col-6 col-sm-4">
            <p class="pNgo">${cuadro.titulo}</p>
            </div>
            <div class="col-4 col-sm-2">
            <p class="pNgo">$${cuadro.precio}</p>
            </div>
        `;
        filaResumen.append(div2);
    }
    let resumenTotal = document.getElementById("resumenTotal");
    let div = document.createElement("div");
        div.id = "filaTotal";
        div.innerHTML = `
            <p class="pNgo"><strong>Total:</strong></p>
            <p class="pNgo">$${totalCarro}</p>    
        `;
        resumenTotal.append(div); 
});

// borrar contenido modal al salir

const vaciarModal = () => {
    let filaTotal = document.getElementById("filaTotal");
    filaResumen.remove();
    filaTotal.remove();
}; 

let btnVolver = document.getElementById("btnVolver");
let btnCerrarModal = document.getElementById("btnCerrarModal");

btnVolver.addEventListener("click", vaciarModal); 
btnCerrarModal.addEventListener("click", vaciarModal);  



// borrar item del carrito
function borrarItem(id){
    let eliminarCuadro = carrito.find(cuadro => id === cuadro.id);
    if (eliminarCuadro){
        console.log("eliminando");
        let eliminado = carrito.indexOf(eliminarCuadro);
        carrito.splice(eliminado, 1);
        let borrarFila = document.getElementById(`filaCarrito${eliminarCuadro.id}`);
        borrarFila.remove(); 
        localStorage.removeItem("carrito");
        guardarStorage("carrito", JSON.stringify(carrito));
        sumarCarro (); 
    }
    if (carrito.length === 0){
        let tr = document.createElement("tr");
        tr.id = "noHayNada";
        tr.innerHTML = `
            <td>El carrito quedó vacío</td>
        `;
        itemsCarrito.append(tr);
        btnFinCompra.remove();
    }
}


