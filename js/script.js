document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('user-list')
  const userSelect = document.getElementById('userSelect')
  const commentsList = document.getElementById('commentsList')

  // Fetch JSON
  fetch('https://nataliasotelo.github.io/act-estrellas/estrellas.json')
    .then((res) => res.json())
    .then((users) => {
      users.forEach((user) => {
        const userCard = document.createElement('div')
        userCard.classList.add('card', 'mb-3')

        userCard.innerHTML = `
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">${user.name}</h5>
              <p class="card-text">${crearEstrellas(user.numberrange)}</p>
            </div>
            <p class="card-text fst-italic text-muted">${user.company}</p>
          </div>
        `

        userList.appendChild(userCard)

        // Añadimos los usuarios al select
        const option = document.createElement('option')
        option.value = user.name
        option.textContent = user.name
        userSelect.appendChild(option)
      })
    })

  // Función para crear las estrellas
  function crearEstrellas(cantidadEstrellas) {
    let estrellasHTML = ''
    for (let i = 1; i <= 5; i++) {
      if (i <= cantidadEstrellas) {
        estrellasHTML += `<span class="fa fa-star checked"></span>`
      } else {
        estrellasHTML += `<span class="fa fa-star"></span>`
      }
    }

    return estrellasHTML
  }

  // Listener para enviar y mostrar los comentarios realizados por un usuario seleccionado
  document.getElementById('submitComment').addEventListener('click', () => {
    const usuarioSeleccionado = userSelect.value
    const textoComentario = document.getElementById('comment').value.trim()

    if (usuarioSeleccionado && textoComentario) {
      // Creamos el comentario HTML
      const comentarioItem = document.createElement('li')
      comentarioItem.classList.add('list-group-item')
      comentarioItem.innerHTML = `<p class="my-2 text-break"><strong>${usuarioSeleccionado}:</strong> ${textoComentario}</p>`

      commentsList.appendChild(comentarioItem)

      // Limpiamos el campo de texto
      document.getElementById('comment').value = ''
    } else {
      alert('❌ Por favor, seleccione un usuario y escriba un comentario.')
    }
  })
})
