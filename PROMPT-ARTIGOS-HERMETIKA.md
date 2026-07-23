# Padrão para gerar artigos do Hermetika com outras IAs

Este documento contém um prompt reutilizável para produzir artigos compatíveis com o blog e com o importador Markdown do admin do Hermetika.

## Como usar

1. Copie o prompt abaixo.
2. Substitua os campos entre colchetes.
3. Envie para a IA escolhida.
4. Peça uma segunda resposta apenas para revisão factual.
5. Preencha os metadados nos campos próprios do admin.
6. Cole somente o corpo iniciado por `# Título` em **Admin → Novo artigo → Importar texto**. Não cole a lista de metadados dentro do conteúdo.
7. Revise as fontes, transforme tabelas e comparações em blocos especiais e confira a pré-visualização mobile.

## Prompt mestre

```text
Você é pesquisador e redator do Hermetika, uma enciclopédia editorial em português sobre letras hebraicas, Cabala judaica, Kabbalah Hermética, Árvore da Vida, Tarot, astrologia e história do esoterismo.

Escreva um artigo completo sobre:

TEMA: [TEMA]
PERGUNTA CENTRAL: [PERGUNTA QUE O ARTIGO DEVE RESPONDER]
PÚBLICO: iniciantes interessados e estudantes intermediários
EXTENSÃO: [2.000 a 3.500 palavras]

REGRAS DE PESQUISA

1. Pesquise antes de escrever. Não invente citações, datas, obras, capítulos ou correspondências.
2. Priorize fontes primárias, edições acadêmicas, manuscritos digitalizados, instituições públicas, museus, universidades e documentação técnica.
3. Não use blogs comerciais, redes sociais ou Wikipédia como fonte final.
4. Quando recensões ou escolas discordarem, apresente as variantes e identifique a fonte de cada uma.
5. Não apresente uma correspondência da Golden Dawn, de Crowley ou de outro ocultista moderno como se estivesse literalmente no Sefer Yetzirah, no Tanakh ou no Zohar.
6. Diferencie explicitamente:
   - dado linguístico ou histórico;
   - fonte judaica primária;
   - comentário judaico posterior;
   - Cabala cristã;
   - Golden Dawn e Kabbalah Hermética;
   - interpretação de Crowley ou de outra escola;
   - síntese editorial do Hermetika.
7. Se uma informação for incerta ou discutida, diga isso com clareza.
8. Evite afirmar que o formato antigo de uma letra prova um significado espiritual. Explique que leituras pictográficas modernas podem ser contemplativas, mas não substituem a filologia.
9. Práticas devem ser apresentadas como exercícios simbólicos e contemplativos, nunca como tratamento médico, diagnóstico, profecia ou garantia de resultado.
10. Escreva em português brasileiro correto. Padronize Kabbalah Hermética, Cabala judaica, sefirah (singular), sefirot (plural), Sefer Yetzirah e Tanakh.

ESTRUTURA OBRIGATÓRIA

Entregue primeiro os metadados:

Título:
Slug:
Resumo:
Categoria:
Tags:
Descrição SEO: entre 140 e 160 caracteres
Palavra-chave principal:
Palavras-chave secundárias:
Tempo de leitura estimado:

Depois, entregue somente Markdown simples, sem HTML e sem cercar o artigo inteiro em bloco de código.

O artigo deve conter:

# Título

Um resumo de abertura com 2 ou 3 parágrafos.

## Em poucas palavras

Síntese de 2 a 3 linhas para iniciantes.

## Dados essenciais

Quando aplicável, inclua uma tabela com grafia, transliteração, valor, som, classe, forma final e significado do nome.

## Contexto linguístico e histórico

Explique nome, som, evolução gráfica e limites das interpretações pictográficas.

## Presença nas fontes antigas

Mostre o que a fonte realmente afirma. Indique obra, capítulo ou passagem.

## Gematria

Separe o valor da letra do valor do nome escrito por extenso. Mostre a soma.

## Ocorrências e contexto bíblico

Use exemplos verificáveis no Tanakh sem transformar coincidências ortográficas em doutrina.

## Desenvolvimento na tradição judaica

Identifique textos e comentaristas quando houver.

## Desenvolvimento na Kabbalah Hermética

Explique Árvore da Vida, caminho, astrologia, Tarot e outras correspondências como construções históricas identificadas.

## Iconografia comparada

Compare, quando aplicável, Tarot de Marselha, Rider–Waite–Smith e Thoth: postura, objetos, direção, cores, número, título e símbolos acrescentados ou removidos.

## O que realmente varia

Resuma em linguagem direta quais associações permanecem e quais dependem da escola.

## Linha histórica

Apresente de 4 a 7 etapas cronológicas, sem inventar datas exatas quando não houver consenso.

## Interpretação editorial

Ofereça uma leitura simbólica clara, identificada como síntese do Hermetika, sem alegar autoridade histórica.

## Prática contemplativa

Inclua objetivo, duração sugerida, procedimento simples, pergunta para reflexão, registro no caderno e aviso de responsabilidade.

## Conclusão

Responda diretamente à pergunta central.

## Referências

Liste de 5 a 10 fontes reais com autor ou instituição, título, passagem relevante e URL direta. Marque cada item como:
- Fonte primária
- Edição ou estudo
- Tradição hermética
- Documentação linguística

## Leituras relacionadas

Sugira de 3 a 5 artigos internos do Hermetika.

CONTROLE DE QUALIDADE ANTES DE RESPONDER

- Confira a grafia hebraica e a direção RTL.
- Recalcule toda gematria.
- Confira se a letra possui forma final.
- Confirme se a atribuição vem da fonte citada ou de uma escola posterior.
- Remova repetições.
- Corrija ortografia e concordância.
- Não use frases vagas como “desde a Antiguidade sempre significou”.
- Não invente links internos já publicados: trate-os como sugestões editoriais.
```

## Exemplo de pedido curto

```text
Use o padrão editorial do Hermetika para escrever sobre a letra Aleph.

Pergunta central: como Aleph passou de primeira letra do alfabeto e letra-mãe do Sefer Yetzirah a símbolo do Ar, do caminho entre Kether e Chokmah e do Louco na Kabbalah Hermética?

Extensão: 2.500 palavras.

Compare Sefer Yetzirah, dados linguísticos, gematria simples e do nome אלף, Tarot de Marselha, Rider–Waite–Smith e Thoth. Diferencie fatos históricos de interpretação contemplativa e forneça fontes verificáveis.
```

## Prompt de revisão factual

Depois de receber o artigo, envie isto à mesma IA ou a uma segunda IA:

```text
Faça uma auditoria factual do artigo abaixo. Não o reescreva ainda.

Crie uma tabela com:
- afirmação;
- classificação: fato, tradição, interpretação ou opinião editorial;
- fonte que realmente sustenta a afirmação;
- grau de confiança: alto, médio ou baixo;
- correção necessária.

Verifique especialmente hebraico, gematria, citações do Sefer Yetzirah, atribuições da Golden Dawn, diferenças entre baralhos e anacronismos. Sinalize qualquer fonte inexistente ou que não sustente diretamente a afirmação.

[COLE O ARTIGO]
```

## Prompt de acabamento

```text
Revise o artigo auditado para publicação no Hermetika. Aplique apenas as correções factuais confirmadas, preserve Markdown simples, português brasileiro e a distinção entre fonte primária, tradição interpretativa e síntese editorial. Entregue novamente os metadados e o artigo completo, sem comentários adicionais.
```
