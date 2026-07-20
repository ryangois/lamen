import { useEffect, useRef, useState } from 'react';
import { useDialogFocus } from '../hooks/useDialogFocus';
import './ShareCard.css';

function wrapText(context, text, maxWidth) {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (context.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

async function drawCard(canvas, content, url) {
  await document.fonts?.ready;
  const context = canvas.getContext('2d');
  const { width, height } = canvas;
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a1d29');
  gradient.addColorStop(0.55, '#0b0e16');
  gradient.addColorStop(1, '#03050a');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.translate(880, 165);
  for (let radius = 80; radius <= 330; radius += 50) {
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.strokeStyle = `rgba(212, 175, 55, ${0.2 - radius / 2600})`;
    context.lineWidth = 3;
    context.stroke();
  }
  context.restore();

  context.strokeStyle = 'rgba(212, 175, 55, 0.46)';
  context.lineWidth = 3;
  roundedRect(context, 54, 54, width - 108, height - 108, 44);
  context.stroke();

  context.fillStyle = '#d4af37';
  context.font = '800 28px Inter, sans-serif';
  context.fillText('LÂMEN HERMÉTICO', 96, 135);

  const hebrew = content.pronunciation?.hebrew || content.gematria?.core?.text || '';
  if (hebrew) {
    context.save();
    context.direction = 'rtl';
    context.textAlign = 'right';
    context.fillStyle = '#f4d36f';
    context.font = '600 78px serif';
    context.fillText(hebrew, width - 96, 265);
    context.restore();
  }

  context.fillStyle = '#f1f3f8';
  context.font = '700 74px Cinzel, serif';
  const titleLines = wrapText(context, content.title, 880).slice(0, 3);
  titleLines.forEach((line, index) => context.fillText(line, 96, 320 + index * 88));

  let cursorY = 320 + titleLines.length * 88 + 28;
  context.fillStyle = '#d4af37';
  context.font = '700 34px Cinzel, serif';
  const subtitleLines = wrapText(context, content.subtitle || content.categoryLabel, 860).slice(0, 3);
  subtitleLines.forEach((line, index) => context.fillText(line, 96, cursorY + index * 48));
  cursorY += subtitleLines.length * 48 + 55;

  Object.entries(content.associations || {}).slice(0, 3).forEach(([label, value], index) => {
    const y = cursorY + index * 132;
    context.fillStyle = 'rgba(255, 255, 255, 0.055)';
    roundedRect(context, 96, y, 888, 104, 22);
    context.fill();
    context.fillStyle = '#9da9b8';
    context.font = '800 22px Inter, sans-serif';
    context.fillText(label.toUpperCase(), 126, y + 38);
    context.fillStyle = '#eef1f7';
    context.font = '700 30px Inter, sans-serif';
    context.fillText(wrapText(context, value, 610)[0] || '', 126, y + 77);
  });

  context.fillStyle = '#8e9aaa';
  context.font = '500 23px Inter, sans-serif';
  context.fillText('Explore a ficha completa', 96, height - 155);
  context.fillStyle = '#d4af37';
  context.font = '700 24px Inter, sans-serif';
  context.fillText(url.replace(/^https?:\/\//, ''), 96, height - 112);
}

function canvasBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.94));
}

export default function ShareCard({ content, onClose }) {
  const canvasRef = useRef(null);
  const dialogRef = useRef(null);
  const [status, setStatus] = useState('');
  const url = window.location.href;
  useDialogFocus(dialogRef);

  useEffect(() => {
    drawCard(canvasRef.current, content, url);
  }, [content, url]);

  const getFile = async () => {
    const blob = await canvasBlob(canvasRef.current);
    return new File([blob], `${content.title.replace(/[^\p{L}\p{N}]+/gu, '-').toLowerCase()}.png`, {
      type: 'image/png',
    });
  };

  const handleDownload = async (existingFile) => {
    const file = existingFile || await getFile();
    const objectUrl = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(objectUrl);
    setStatus('Imagem salva.');
  };

  const handleShare = async () => {
    const file = await getFile();
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          title: content.title,
          text: `${content.title} — Hermetika`,
          url,
          files: [file],
        });
        setStatus('Cartão compartilhado.');
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    handleDownload(file);
  };

  return (
    <div className="share-card-backdrop" role="presentation">
      <section ref={dialogRef} className="share-card-dialog" role="dialog" aria-modal="true" aria-labelledby="share-card-title" tabIndex="-1">
        <button type="button" className="share-card-close" onClick={onClose} aria-label="Fechar cartão">×</button>
        <p>Cartão da ficha</p>
        <h2 className="brand-font" id="share-card-title">Compartilhar visualmente</h2>
        <canvas ref={canvasRef} width="1080" height="1350" aria-label={`Prévia do cartão de ${content.title}`} />
        <div className="share-card-actions">
          <button type="button" className="primary" onClick={handleShare}>Compartilhar imagem</button>
          <button type="button" onClick={() => handleDownload()}>Salvar imagem</button>
        </div>
        <span className="share-card-status" aria-live="polite">{status}</span>
      </section>
    </div>
  );
}
