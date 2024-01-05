window.onload = async() => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  
  try {

    const response = await fetch('http://localhost:3001/apis/movies');
    const result = await response.json();
    console.log(result);
    
    let data = result.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      const link = document.createElement('a')
      link.setAttribute("href",`formulario.html?movies=${movie.id}&edit=true`);
      link.textContent = "EDITAR";
      card.appendChild(link)
    });
  
 


    
  } catch (error) {
    console.log(error);
  }

 
   // Aqui debemos agregar nuestro fetch



  /*  Codigo que debemos usar para mostrar los datos en el frontend */
  }