import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { contentData } from '../src/data/content.js';
import { blogPosts, getBlogPost } from '../src/data/blogPosts.js';
import {
  HEBREW_LETTERS,
  RESEARCH_SOURCES,
  getLetterGate,
} from '../src/data/researchData.js';
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

test('the 22 Hebrew letters form exactly 231 distinct unordered gates', () => {
  assert.equal(HEBREW_LETTERS.length, 22);
  assert.equal(new Set(HEBREW_LETTERS.map((letter) => letter.hebrew)).size, 22);
  HEBREW_LETTERS.forEach((letter) => {
    assert.ok(letter.image, `${letter.name} image`);
    assert.ok(letter.meaning, `${letter.name} meaning`);
  });
  const gates = HEBREW_LETTERS.flatMap((first, firstIndex) => (
    HEBREW_LETTERS.slice(firstIndex + 1).map((second) => getLetterGate(first.hebrew, second.hebrew).pair)
  ));
  assert.equal(gates.length, 231);
  assert.equal(new Set(gates).size, 231);
});

test('only the five Hebrew letters with final forms expose a final-form card', () => {
  const expected = new Set(['Kaph', 'Mem', 'Nun', 'Peh', 'Tzaddi']);
  treePaths.forEach((path) => {
    const entry = contentData[path.id];
    assert.equal(Boolean(entry.hebrewLetter.finalForm), expected.has(path.letter), path.letter);
    assert.equal(
      Object.hasOwn(entry.associations, 'Forma final'),
      expected.has(path.letter),
      `${path.letter} association`,
    );
  });
});

test('research layers are complete for Tree entries', () => {
  treeSephiroth.forEach((sephirah) => {
    const entry = contentData[sephirah.id];
    assert.equal(entry.fourWorlds.length, 4, sephirah.id);
    assert.equal(new Set(entry.fourWorlds.map((world) => world.id)).size, 4, sephirah.id);
    assert.equal(entry.seferVersions.length, 4, sephirah.id);
  });
  treePaths.forEach((path) => {
    const entry = contentData[path.id];
    assert.equal(entry.seferVersions.length, 4, path.id);
    assert.equal(entry.tarotComparison.length, 3, path.id);
    assert.equal(entry.variations.length, 4, path.id);
    assert.ok(entry.variations.every((variation) => variation.facts?.length === 4), `${path.id} variations`);
    assert.ok(entry.variations.every((variation) => (
      variation.description.includes(path.letter) || variation.description.includes(path.hebrew)
    )), `${path.id} specificity`);
    assert.ok(entry.hebrewAnalysis, path.id);
  });
});

test('Marseille Strength and Justice preserve their historical numbering', () => {
  const teth = contentData.path_teth.tarotDecks.find((card) => card.deck.startsWith('Tarot de Marselha'));
  const lamed = contentData.path_lamed.tarotDecks.find((card) => card.deck.startsWith('Tarot de Marselha'));
  assert.equal(teth.variant, 'Arcano 11');
  assert.equal(teth.image, '/tarot/marseille/lamed.webp');
  assert.equal(lamed.variant, 'Arcano 08');
  assert.equal(lamed.image, '/tarot/marseille/teth.webp');
});

test('provenance and equal-gematria links remain internally consistent', () => {
  Object.entries(contentData).forEach(([id, entry]) => {
    assert.ok(entry.provenance?.length, `${id} provenance`);
    (entry.hebrewAnalysis?.equals || []).forEach((equal) => {
      assert.equal(equal.value, entry.gematria.core.value, `${id} ↔ ${equal.id}`);
      assert.ok(contentData[equal.id], equal.id);
    });
  });
  Object.values(RESEARCH_SOURCES).forEach((url) => {
    assert.doesNotThrow(() => new URL(url));
  });
});

test('all encyclopedia entries expose the new editorial and contemplative layers', () => {
  Object.values(contentData).forEach((item) => {
    assert.ok(item.brief?.length > 40, `${item.id} is missing its beginner summary`);
    assert.equal(item.associationTimeline?.length, 6, `${item.id} has an incomplete history timeline`);
    assert.ok(item.practice?.objective, `${item.id} is missing a practice objective`);
    assert.ok(item.practice?.duration, `${item.id} is missing a suggested duration`);
    assert.ok(item.practice?.journal, `${item.id} is missing a journal prompt`);
    assert.match(item.practice?.disclaimer || '', /não substitui/i, `${item.id} is missing the practice disclaimer`);
  });
});

test('angels, Sephiroth and paths expose their specific research additions', () => {
  const angels = Object.values(contentData).filter((item) => item.categoryLabel === 'Anjo');
  const sephiroth = Object.values(contentData).filter((item) => item.categoryLabel === 'Sephirah');
  const paths = Object.values(contentData).filter((item) => item.categoryLabel === 'Caminho');

  assert.equal(angels.length, 72);
  angels.forEach((angel) => {
    assert.ok(angel.psalm?.context?.psalmTheme);
    assert.ok(angel.psalm?.context?.associationReason);
    assert.match(angel.psalm?.context?.nameDistinction || '', /tríplice hebraico/i);
  });

  assert.equal(sephiroth.length, 10);
  sephiroth.forEach((sephirah) => {
    assert.ok(sephirah.biblicalOccurrences?.occurrences?.length);
    assert.ok(sephirah.spellingVariants?.forms?.length);
  });

  assert.equal(paths.length, 22);
  paths.forEach((path) => {
    assert.ok(path.pathTransformation?.text);
    assert.ok(path.variationConclusion);
    assert.equal(path.tarotComparison?.length, 3);
    path.tarotComparison.forEach((card) => {
      assert.deepEqual(
        Object.keys(card.iconography || {}).sort(),
        ['changes', 'colors', 'gaze', 'objects', 'posture'],
      );
    });
  });
});

test('all 22 path letters include script, sound and philological notes', () => {
  Object.values(contentData)
    .filter((item) => item.categoryLabel === 'Caminho')
    .forEach((path) => {
      const [letter] = path.hebrewAnalysis.letters;
      assert.ok(letter.modern);
      assert.ok(letter.paleo);
      assert.ok(letter.sound);
      assert.ok(letter.philology);
      assert.ok(letter.paleoNote);
    });
});

test('blog posts have unique, SEO-ready routes and metadata', () => {
  const slugs = new Set();
  blogPosts.forEach((post) => {
    assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!slugs.has(post.slug), `duplicate blog slug: ${post.slug}`);
    slugs.add(post.slug);
    assert.equal(getBlogPost(post.slug), post);
    assert.ok(post.title.length > 20);
    assert.ok(post.description.length >= 120 && post.description.length <= 180);
    assert.ok(post.tags.length >= 3);
    assert.doesNotThrow(() => new Date(post.publishedAt).toISOString());
  });
});
