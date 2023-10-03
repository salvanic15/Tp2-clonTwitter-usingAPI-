
const endPointUser = "https://jsonplaceholder.typicode.com/users/";
const endPointPosts = "https://jsonplaceholder.typicode.com/posts/";
const containerBtn = document.querySelector("#btnContainerUsers");
const usersContainer = document.querySelector("#usersContainer");
const postsContainer = document.querySelector("#postsContainer");
const fragment = document.createDocumentFragment();
const fragment2 = document.createDocumentFragment();
const fragment3 = document.createDocumentFragment();
let contenidoActivoUsers = null;
let contenidoActivoPost = null;
//Funcion asincrona para realizar peticiones
const request = async (link) => {
    try {
        const res = await fetch(link);
        if (!res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        alert(`La solicitud fue cancelada!${error}`)
    }
}

//Realizo una desestructuracion del valor devuelvo por Promise.all y trabajo con los resultados
Promise.all([request(endPointUser),request(endPointPosts)])
    .then(([users, posts]) => {
        const divUser = document.createElement("h2");
        divUser.classList = "text-center";
        fragment2.appendChild(divUser);

        const containerTitleAndBody = document.createElement("div");
        containerTitleAndBody.classList = "containerTitleAndBody";
        fragment3.appendChild(containerTitleAndBody);
        
        //Recorremos usuarios y a la vez que mostramos por evento
        users.map(elementUsers => {
            const button = document.createElement("button");
            button.classList = "btnSwitch";
            button.style.display = "inline"
            button.textContent = elementUsers.id;
            fragment.appendChild(button);

            let arrayPosts = [];

            posts.map(elementPost => {
                if(elementUsers.id == elementPost.userId) {
                    let valuesTitleAndBody = elementPost
                    arrayPosts.push(valuesTitleAndBody);
                }
            })
            //
            button.addEventListener("click",(event) => {
                //Logica para limpiar contenedores.
                if(contenidoActivoUsers !== null && contenidoActivoPost !== null) {
                    contenidoActivoUsers.textContent = "";
                    contenidoActivoPost.textContent = "";
                    }
                
                divUser.textContent = `name:${elementUsers.name}, Email:${elementUsers.email}`
                
                //Recorremos el array de posteos 
                arrayPosts.forEach(element => {
                    const title = document.createElement("h4");
                    title.classList = "fw-bold";
                    containerTitleAndBody.appendChild(title);
                    
    
                    const body = document.createElement("p");
                    body.classList = "border-bottom pb-4";
                    containerTitleAndBody.appendChild(body);
                    
    
                    title.textContent = `"title": ${element.title},`;
                    body.textContent = `"body": ${element.body},`;    
                })
                
                contenidoActivoUsers = divUser;
                contenidoActivoPost = containerTitleAndBody;  
            })    
        })
        
        containerBtn.appendChild(fragment);
        usersContainer.appendChild(fragment2);
        postsContainer.appendChild(fragment3);   
    })
    .catch(error =>{
        console.log(error);
    })

   