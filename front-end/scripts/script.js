/**
 * Função chamada quando o usuário envia uma pergunta
 * Faz a requisição ao backend e exibe a resposta no HTML
 */
async function enviarPergunta() {
  const question = document.getElementById("question").value.trim(); // pega o texto digitado
  const resposta = document.getElementById("resposta"); // área de resposta

  // Se o campo estiver vazio, mostra aviso
  if (!question) {
    resposta.innerText = "Por favor, digite uma pergunta.";
    return;
  }

  // Enquanto espera a resposta, mostra "Carregando..."
  resposta.innerHTML += `
    <div class="msg user">
      <strong>Você:</strong> ${question}
    </div>
  `;

  document.getElementById("question").value = "";

  resposta.scrollTop = resposta.scrollHeight;

  try {
    // Faz requisição POST ao backend em Node.js (rota /api/chat)
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }), // envia a pergunta no corpo
    });

    // Converte resposta em JSON
    const data = await res.json();

    // Mostra a resposta da IA no HTML

    respostaIa = data.response || "Sem resposta da IA.";

    resposta.innerHTML += `
    <div class="msg ia">
        <strong>Agente:</strong> ${respostaIa}
      </div>
    `;

    resposta.scrollTop = resposta.scrollHeight;
  } catch (err) {
    // Caso aconteça algum erro (ex.: servidor desligado)
    console.error("Erro na requisição:", err);
    resposta.innerHTML += `
    <div class="msg ia">
        <strong>Agente:</strong> Erro ao se comunicar com o servidor
      </div>
    `;
    resposta.scrollTop = resposta.scrollHeight;
  }
}
