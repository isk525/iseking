const menuButton=document.querySelector('.menu-button');const nav=document.querySelector('.global-nav');if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}))}
const search=document.getElementById('article-search');const cards=[...document.querySelectorAll('#article-list .article-card')];const empty=document.getElementById('no-results');if(search){search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();let count=0;cards.forEach(card=>{const match=!q||card.dataset.search?.toLowerCase().includes(q)||card.textContent.toLowerCase().includes(q);card.hidden=!match;if(match)count++});if(empty)empty.hidden=count!==0})}
const setCount=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=String(value)};setCount('article-count',cards.length);setCount('category-count',new Set(cards.map(card=>card.dataset.category).filter(Boolean)).size);setCount('app-count',document.querySelectorAll('[data-public-app="true"]').length);
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();const items=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});items.forEach(item=>observer.observe(item))}else{items.forEach(item=>item.classList.add('visible'))}
// カテゴリフィルター機能
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const articles = document.querySelectorAll('.article-card');
  const noResultsMsg = document.getElementById('no-results');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // アクティブなボタンの表示切り替え
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.textContent.trim();
      let visibleCount = 0;

      // 記事の表示・非表示切り替え
      articles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');

        if (selectedCategory === 'すべて' || articleCategory === selectedCategory) {
          article.style.display = '';
          visibleCount++;
        } else {
          article.style.display = 'none';
        }
      });

      // 該当記事が0件の場合のメッセージ表示切り替え
      if (noResultsMsg) {
        if (visibleCount === 0) {
          noResultsMsg.textContent = 'まだ投稿された記事がありません。';
          noResultsMsg.removeAttribute('hidden');
        } else {
          noResultsMsg.setAttribute('hidden', '');
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // スクロールで要素が画面内に入ったらふわっと表示する関数
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // 一度表示されたら監視解除
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});

// 1. マウス追従グラデーションエフェクト
document.addEventListener('DOMContentLoaded', () => {
  // 追従ライト用のHTML要素を自動生成
  const glow = document.createElement('div');
  glow.id = 'mouse-glow';
  document.body.appendChild(glow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // なめらかに追従
    glow.style.left = `${mouseX}px`;
    glow.style.top = `${mouseY}px`;
  });

  // 2. スクロール監視＆遅延（Stagger）アニメーション実行
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
});
<!-- カーソル光追従用要素 -->
<div class="cursor-glow" id="cursorGlow"></div>

<script>
  // マウスカーソル追従処理
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }
</script>
