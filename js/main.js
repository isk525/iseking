/* =========================================================
   イセキングのDX日和 メインJS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // 1. モバイルナビゲーション
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.global-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  // 2. 記事カードとカウント集計処理
  const cards = [...document.querySelectorAll('#article-list .article-card')];
  
  const setCount = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
  };

  // 公開記事数
  setCount('article-count', cards.length);

  // カテゴリ数（英字属性/日本語表示のどちらでも一意にカウント）
  const categorySet = new Set(cards.map(card => card.dataset.category).filter(Boolean));
  setCount('category-count', categorySet.size);

  // 公開アプリ数（[data-public-app="true"] または .creation 要素をカウント）
  const appCards = document.querySelectorAll('[data-public-app="true"], .creation');
  setCount('app-count', appCards.length);

  // 3. キーワード検索機能
  const search = document.getElementById('article-search');
  const empty = document.getElementById('no-results');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let count = 0;
      cards.forEach(card => {
        const match = !q || card.dataset.search?.toLowerCase().includes(q) || card.textContent.toLowerCase().includes(q);
        card.hidden = !match;
        if (match) count++;
      });
      if (empty) empty.hidden = count !== 0;
    });
  }

  // 4. カテゴリフィルター機能
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // ボタンの data-category または テキストから取得
        const selectedCategory = btn.dataset.category || btn.textContent.trim();
        let visibleCount = 0;

        cards.forEach(card => {
          const articleCategory = card.getAttribute('data-category');
          const isAll = selectedCategory === 'all' || selectedCategory === 'すべて';

          if (isAll || articleCategory === selectedCategory) {
            card.style.display = '';
            card.hidden = false;
            visibleCount++;
          } else {
            card.style.display = 'none';
            card.hidden = true;
          }
        });

        if (empty) {
          if (visibleCount === 0) {
            empty.textContent = '該当する記事がありません。';
            empty.removeAttribute('hidden');
          } else {
            empty.setAttribute('hidden', '');
          }
        }
      });
    });
  }

  // 5. フッター年号反映
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // 6. スクロールアニメーション（IntersectionObserver）
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible', 'visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up, .reveal').forEach(el => observer.observe(el));

  // 7. マウス追従光エフェクトの自動挿入と処理
  let glow = document.getElementById('mouse-glow') || document.getElementById('cursorGlow');
  if (!glow) {
    glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.id = 'cursorGlow';
    document.body.appendChild(glow);
  }

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

});
