const fs = require('fs');

try {
  // Lê o arquivo index.html
  let content = fs.readFileSync('index.html', 'utf8');
  
  // A logo que você enviou, com uma altura ajustada para caber no menu/rodapé
  const logoHtml = `<img src="https://images.dualite.app/d52f60de-2692-4885-8c36-cb03ccdd56d7/D2_-_300X90_-_CHECKOUT_-_BRANCO-ca7a9d10-fed8-47be-aa87-321f27fedf6e.webp" alt="D2ChatPro Logo" style="height: 45px; width: auto; object-fit: contain;">`;
  
  // Substitui o texto D2CHATPRO (maiúsculo ou minúsculo) pela imagem da logo
  // Isso procura especificamente pelo texto solto entre as tags HTML (> e <)
  content = content.replace(/>\s*D2CHATPRO\s*</gi, `>${logoHtml}<`);
  content = content.replace(/>\s*d2chatpro\s*</gi, `>${logoHtml}<`);
  
  // Salva o arquivo atualizado
  fs.writeFileSync('index.html', content);
  console.log("Logo aplicada com sucesso!");
} catch (error) {
  console.error("Erro ao atualizar o arquivo:", error);
}
