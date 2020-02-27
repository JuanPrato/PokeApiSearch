document.addEventListener('DOMContentLoaded', e => {

    const buscar = document.querySelector('#buscar');

    buscar.addEventListener( 'click', buscarPokemon);

});


function buscarPokemon(e){
    e.preventDefault();

    let pokemon = document.querySelector('#pokemon');
    pokemon = pokemon.value.toLowerCase();

    if(pokemon !== ''){
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
            .then(function(informacion) {
                return informacion.json();
            }).then(function(informacion) {
                console.log(informacion);
                mostrarInformacion(informacion);

        }).catch(function(e) {
            console.log(e);
            console.log("error");
            mostrarNotificacion('error', 'Hubo un error en la busqueda');
        });
    } else {
        mostrarNotificacion('error', 'El campo no puede estar vacio');
    }
}

function mostrarInformacion( informacion ) {

    const contenido = document.querySelector('#contenido');
    
    contenido.innerHTML =`
    <table>
        <tbody>
            <tr>
                <td class="celda_centrada">Nombre:</td>
                <td class="celda_centrada">${ informacion.name }</td>
            </tr>
            <tr>
                <td class="celda_centrada">Habilidades:</td>
                <td id="habilidades">
                </td>
            </tr>
            <tr>
                <td>Imagen: </td>
                <td>
                    <img src= ${ informacion.sprites.front_default } alt="imagen ${ informacion.name }"/>
                </td>
            </tr>
            <tr>
                <td>Movimientos:</td>
                <td id="movimientos">

                </td>
            </tr>
        </tbody>
    </table>`;

    let habilidades = document.createElement("ul");
    informacion.abilities.forEach(ability => {
        habilidades.innerHTML = `
        ${habilidades.innerHTML}
        <li> ${ ability.ability.name } </li>
        `;
    }); 

    const lista_habilidades = document.querySelector('#habilidades');

    lista_habilidades.appendChild(habilidades);

    let movimientos = document.createElement("ul");

    informacion.moves.forEach(move => {
        movimientos.innerHTML = `
        ${ movimientos.innerHTML }
        <li> ${ move.move.name } </li>        
        `;
    });

    let lista_movimientos = document.querySelector('#movimientos');

    lista_movimientos.appendChild(movimientos);
}

function mostrarNotificacion(tipo, mensaje) {

    const contenido = document.querySelector('#contenido');
    let notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    if( tipo === 'exito'){
        notificacion.classList.add('exito');
    } else if( tipo === 'error'){
        notificacion.classList.add('error');
    }
    notificacion.innerHTML = mensaje;

    contenido.appendChild(notificacion);
}