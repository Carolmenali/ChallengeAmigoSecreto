let listaAmigos = [];
let amigosSorteados = new Set();

function adicionarAmigo() {
    const input = document.getElementById("inputAmigo");
    const nome = input.value.trim();
    
    if (nome !== "" && !listaAmigos.includes(nome)) {
        listaAmigos.push(nome);
        atualizarListaAmigos();
        input.value = ""; // Limpa o campo de entrada
    } else {
        alert("Por favor, insira um nome válido e não repetido.");
    }
}

function removerAmigo(nome) {
    listaAmigos = listaAmigos.filter(amigo => amigo !== nome);
    amigosSorteados.clear(); // Resetar sorteio ao remover um nome
    atualizarListaAmigos();
    limparResultado();
}

function atualizarListaAmigos() {
    const listaContainer = document.getElementById("listaAmigos");
    listaContainer.innerHTML = ""; // Limpa a lista antes de atualizar
    
    listaAmigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.style.fontSize = "12px";
        botaoRemover.style.marginLeft = "10px";
        botaoRemover.style.backgroundColor = "red";
        botaoRemover.style.color = "white";
        botaoRemover.style.border = "none";
        botaoRemover.style.padding = "5px 10px";
        botaoRemover.style.cursor = "pointer";
        botaoRemover.style.borderRadius = "5px";
        botaoRemover.onclick = () => removerAmigo(amigo);
        
        li.appendChild(botaoRemover);
        listaContainer.appendChild(li);
    });
}

function selecionarAmigoAleatorio() {
    if (listaAmigos.length === 0) {
        alert("A lista de amigos está vazia.");
        return;
    }
    
    if (amigosSorteados.size === listaAmigos.length) {
        alert("Todos os amigos já foram sorteados.");
        return;
    }
    
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "<span class='sorteando'>Sorteando...</span>";
    
    setTimeout(() => {
        let amigoSorteado;
        do {
            const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
            amigoSorteado = listaAmigos[indiceAleatorio];
        } while (amigosSorteados.has(amigoSorteado));
        
        amigosSorteados.add(amigoSorteado);
        resultado.innerHTML = "Amigo sorteado: " + amigoSorteado;
    }, 3000);
}

function limparResultado() {
    document.getElementById("resultado").innerHTML = "";
}
