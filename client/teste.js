document.querySelector("button").onclick = (event) => {
    event.preventDefault();

    const nome = document.querySelector('#nome').value;
    const cep = document.querySelector('#cep').value;
    const renda = document.querySelector('#renda').value;
    const num = document.querySelector('#num').value;

    const object = { nome, cep, renda, num };

    const http = new XMLHttpRequest();
    const url = `http://localhost:3000/usuario?cep=${cep}&nome=${nome}&renda=${renda}&num=${num}`;
    console.log(url)
    http.open("GET", url, true);

    http.onreadystatechange = function () {
        console.log(http.readyState)
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            const resp = JSON.parse(http.responseText);
            ressite(resp)
        }else if(http.readyState == 4 && http.status == 404){ 
           window.alert("CEP inválido")
        }else if(http.readyState == 4 && http.status == 400){ 
           window.alert("Campos com * são obrigatórios")
        }

    };
    http.send();
    
};
function ressite(resp){
    const resultado = document.querySelector(".resultado")
    resultado.style.display = "block"
    

    const name = document.querySelector('#name');
    const rua = document.querySelector('#rua');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const est = document.querySelector('#estado');
    const renda = document.querySelector('#rpc');


    name.innerText = resp.nome
    rua.innerText = resp.rua
    bairro.innerText = resp.bairro
    cidade.innerText = resp.cidade
    est.innerText = resp.est
    renda.innerText = resp.rpc

    
}

document.querySelector("#reset").onclick = (event) => {
    window.location.reload();
};