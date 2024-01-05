window.onload = async() => {

    let query = new URLSearchParams(location.search)
    console.log(location.search);
    
    const id= query.has('movies') && query.get('movies')//checkea si existe 
    console.log(id);

    const form = document.querySelector('form')
    console.log(form.elements)
    try {
        const response = await fetch(`http://localhost:3001/apis/movies/${id}`);
        const {title,rating,awards,release_date,length} = await response.json()
        console.log(length)

        form.elements[1].value = title
        form.elements[2].value = rating
        form.elements[3].value = awards
        form.elements[4].value = release_date.split('T')[0]//para traer el formarto de fecha
        form.elements[5].value = length

    } catch (error) {
        console.log(error)
    }
    document.getElementById('btn-add').addEventListener('click',()=>{
       /* for (let i = 0; i < form.elements.length; i++) {
        
        form.elements[i].value = null
        
       } */
       form.reset();// para resetear los valores de los campos a nulos
       query.set('edit',false)// cambia lo que viene en query
       form.elements[1].focus()
    })

    form.onsubmit=async function(event){
        event.preventDefault()
        const urlBase =`http://localhost:3001/apis/movies`
        
        const url =query.get('edit') === "true" ? `${urlBase}/${id}`:`${urlBase}`;
        try {
            const response = await fetch(url,{
                method : query.get('edit')==="true"?"PUT" : "POST",
                body : JSON.stringify({
                    title :this.elements[1].value,
                    rating : this.elements[2].value,
                    awards : this.elements[3].value, 
                    release_date :this.elements[4].value,
                    length: this.elements[5].value 
                }),
                headers : {
                    'Content-Type': "application/json"
                }
            });
    
            const result = await response.json();

            if(result.ok === true){
                Swal.fire({
                    position: "top-end", 
                    title: "Actualizado con exito",
                    showConfirmButton: false,
                    timer: 1500
                  });
            
            }else{
                Swal.fire({
                    position: "top-end",
                    title: "Hubo un error",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        } catch (error){
            console.log(error)
            
        }
       
    }
}