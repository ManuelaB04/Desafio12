let id = null;

let addContact = document.getElementById('addContact')
let listContact = document.getElementById('listContact')




document.getElementById('addContact').addEventListener('submit', function (event){
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let date = document.getElementById('date').value;
    let id = document.getElementById('id').value;

    if (!name || !email || !date || !id) {
        alert('Todos los campos son obligatorios');
        return;
    }

    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        alert('Debe ser una dirección de email válida');
        return;
    }

    if (!date.match(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)) {
        alert('Ingresa la fecha en formato YYYY-MM-DD');
        return;
    }
        fetch(`https://contactos-bd-default-rtdb.firebaseio.com/545684/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify({
                nombre: name,
                correo: email,
                fecha_nac: date,
                nit: id,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTH-8'
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
        fetch(`https://contactos-bd-default-rtdb.firebaseio.com/545684/${id}.json`)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log('solicitud fallida', err))
        addContactTable(name, email, date, id)
  })

//FUNCIÓN PARA AGREGAR USUARIOS NUEVOS Y QUE INGRESEN A LA TABLA
function addContactTable(name, email, date, id) {
    let contact = document.createElement('tr');
    contact.id = id;

    let nameContact = document.createElement('td');
    nameContact.textContent = name;

    let emailContact = document.createElement('td');
    emailContact.textContent = email;

    let dateContact = document.createElement('td');
    dateContact.textContent = date;

    let idContact = document.createElement('td');
    idContact.textContent = id;

    let accionContact = document.createElement('td')

    //ACTUALIZAR CONTACTO
    let actualizarBoton = document.createElement('button');
    actualizarBoton.textContent = 'Actualizar';
    actualizarBoton.addEventListener('click', function () {
        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('date').value = date;
        document.getElementById('id').value = id;
        id = id;
    });

  accionContact.appendChild(actualizarBoton);

    //ELEIMINAR CONTACTO
    let eliminarBoton = document.createElement('button');
    eliminarBoton.textContent = 'Eliminar';
    eliminarBoton.addEventListener('click', function () {
        fetch(`https://contactos-bd-default-rtdb.firebaseio.com/545684/${id}.json`, {
            method: 'DELETE'
        }).then(function () {
            document.getElementById('contacts').removeChild(contact);
        });
    });
    accionContact.appendChild(eliminarBoton);

    contact.appendChild(nameContact);
    contact.appendChild(emailContact);
    contact.appendChild(dateContact);
    contact.appendChild(idContact);
    contact.appendChild(accionContact);

document.getElementById('contacts').appendChild(contact);
}

window.addEventListener('load', function () {
    fetch(`https://contactos-bd-default-rtdb.firebaseio.com/545684/${id}.json`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let id in data) {
               addContactTable(id, data[id].nombre, data[id].correo, data[id].fecha_nac);
            }
        });
});

