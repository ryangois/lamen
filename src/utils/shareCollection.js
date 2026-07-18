function wrapText(context, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function buildCollectionCard(name, items) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, 1080, 1350);
  gradient.addColorStop(0, '#1d2130');
  gradient.addColorStop(1, '#080a10');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = 'rgba(212, 175, 55, .55)';
  context.lineWidth = 3;
  context.strokeRect(52, 52, 976, 1246);
  context.fillStyle = '#d4af37';
  context.font = '800 25px Inter, sans-serif';
  context.letterSpacing = '5px';
  context.fillText('COLEÇÃO · LÂMEN', 92, 122);
  context.fillStyle = '#f4f5f8';
  context.font = '700 62px Georgia, serif';
  wrapText(context, name, 880).slice(0, 2).forEach((line, index) => {
    context.fillText(line, 92, 210 + index * 68);
  });

  const visibleItems = items.slice(0, 12);
  let y = 340;
  visibleItems.forEach((item, index) => {
    const rowHeight = 73;
    context.fillStyle = index % 2 ? 'rgba(255,255,255,.035)' : 'rgba(212,175,55,.065)';
    context.beginPath();
    context.roundRect(86, y - 45, 908, rowHeight, 18);
    context.fill();
    context.fillStyle = item.color || '#d4af37';
    context.beginPath();
    context.arc(122, y - 8, 9, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#f4f5f8';
    context.font = '700 29px Georgia, serif';
    context.fillText(item.content.title.slice(0, 40), 152, y);
    context.fillStyle = '#aeb9c8';
    context.font = '600 18px Inter, sans-serif';
    context.textAlign = 'right';
    context.fillText(item.categoryName.slice(0, 34), 960, y - 2);
    context.textAlign = 'left';
    y += 82;
  });

  if (items.length > visibleItems.length) {
    context.fillStyle = '#d4af37';
    context.font = '700 22px Inter, sans-serif';
    context.fillText(`+ ${items.length - visibleItems.length} itens na coleção`, 92, 1210);
  }
  context.fillStyle = '#8e98a8';
  context.font = '500 20px Inter, sans-serif';
  context.fillText('Mapa hermético interativo · lamen', 92, 1254);
  return canvas;
}

export async function shareCollection(name, items) {
  if (!items.length) throw new Error('Adicione itens antes de compartilhar esta coleção.');
  const canvas = buildCollectionCard(name, items);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Não foi possível criar o cartão.');
  const fileName = `lamen-${name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || 'colecao'}.png`;
  const file = new File([blob], fileName, { type: 'image/png' });

  if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
    await navigator.share({
      title: `Coleção ${name} · Lâmen`,
      text: `Minha coleção “${name}” no Lâmen.`,
      files: [file],
    });
    return 'Coleção compartilhada.';
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
  return 'Cartão da coleção salvo como imagem.';
}
