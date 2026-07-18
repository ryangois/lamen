import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { contentData } from '../src/data/content.js';
import { ringStructure } from '../src/data/rings.js';
import { treePaths, treeSephiroth, treeSpecialNodes } from '../src/data/treeOfLife.js';

const angels = ringStructure.find((ring) => ring.ringId === 'angels').segments;
const zodiac = ringStructure.find((ring) => ring.ringId === 'zodiac').segments;
const choirs = ringStructure.find((ring) => ring.ringId === 'choirs').segments;

function digitalRoot(value) {
  if (value === 0) return 0;
  return 1 + ((value - 1) % 9);
}

function collectLocalAssets(value, results = new Set()) {
  if (typeof value === 'string' && /^\/.+\.(?:avif|jpe?g|png|svg|webp)$/i.test(value)) {
    results.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectLocalAssets(item, results));
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectLocalAssets(item, results));
  }
  return results;
}

test('the wheel contains exactly 72 angels, six per zodiac sign', () => {
  assert.equal(angels.length, 72);
  assert.equal(zodiac.length, 12);
  zodiac.forEach((sign, signIndex) => {
    const signAngels = angels.slice(signIndex * 6, signIndex * 6 + 6);
    assert.equal(signAngels.length, 6, sign.id);
    assert.ok(signAngels.every((angel) => angel.color === sign.color), sign.id);
  });
});

test('the 72 angels are distributed as eight entries across nine choirs', () => {
  assert.equal(choirs.length, 9);
  const distribution = Object.fromEntries(choirs.map((choir) => [choir.id, 0]));
  angels.forEach((angel) => {
    const choir = contentData[angel.id].relations.find((relation) => relation.category === 'Coro');
    assert.ok(choir, `missing choir relation for ${angel.id}`);
    distribution[choir.id] += 1;
  });
  Object.entries(distribution).forEach(([choirId, count]) => assert.equal(count, 8, choirId));
});

test('the Tree of Life has ten Sephiroth, Daath and 22 paths', () => {
  assert.equal(treeSephiroth.length, 10);
  assert.equal(treeSpecialNodes.length, 1);
  assert.equal(treeSpecialNodes[0].id, 'arc_daath');
  assert.equal(treePaths.length, 22);
  assert.equal(new Set(treePaths.map((path) => path.id)).size, 22);
});

test('all encyclopedia relations point to existing entries', () => {
  Object.entries(contentData).forEach(([id, entry]) => {
    (entry.relations || []).forEach((relation) => {
      assert.ok(contentData[relation.id], `${id} points to missing ${relation.id}`);
    });
  });
});

test('gematria totals and reductions agree with their letter breakdowns', () => {
  Object.entries(contentData).forEach(([id, entry]) => {
    ['core', 'full'].forEach((key) => {
      const calculation = entry.gematria?.[key];
      if (!calculation) return;
      const total = calculation.letters.reduce((sum, letter) => sum + letter.value, 0);
      assert.equal(calculation.value, total, `${id}.${key} total`);
      assert.equal(calculation.root, digitalRoot(total), `${id}.${key} root`);
    });
  });
});

test('all cited sources use valid web URLs', () => {
  Object.entries(contentData).forEach(([id, entry]) => {
    (entry.sources || []).forEach((source) => {
      assert.doesNotThrow(() => new URL(source.url), `${id}: ${source.url}`);
      assert.match(source.url, /^https?:\/\//, `${id}: ${source.url}`);
    });
  });
});

test('all local visual assets referenced by encyclopedia data exist', () => {
  collectLocalAssets(contentData).forEach((asset) => {
    assert.ok(existsSync(resolve('public', asset.slice(1))), asset);
  });
});

test('permitted historical Tarot reproductions are stored locally', () => {
  treePaths.forEach((path) => {
    const cards = contentData[path.id].tarotDecks;
    const riderWaite = cards.find((card) => card.deck.startsWith('Rider-Waite'));
    const marseille = cards.find((card) => card.deck.startsWith('Tarot de Marselha'));
    const thoth = cards.find((card) => card.deck.startsWith('Thoth'));

    assert.match(riderWaite.image, /^\/tarot\/rws\/.+\.webp$/, path.id);
    assert.match(marseille.image, /^\/tarot\/marseille\/.+\.webp$/, path.id);
    assert.ok(thoth.visual, `${path.id} keeps an original reference card instead of protected artwork`);
  });
});

test('editorial terminology distinguishes singular and plural Sephiroth forms', () => {
  const prose = JSON.stringify(contentData);
  assert.doesNotMatch(prose, /\b10 Sefirot\b/i);
  assert.match(contentData.arc_metatron.traditionNote, /“Sephirah”.+singular.+“Sephiroth”.+plural/i);
  assert.match(contentData.angel_1.traditionNote, /tríplice hebraico.+-el\/-iah/i);
});
