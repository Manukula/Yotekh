// Constants
const MAX_COMMENTS = 3;

document.addEventListener('DOMContentLoaded', () => {
  // Discover Carousel Navigation (only when present)
  const slider = document.querySelector('.discover-slider');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');

  if (rightArrow && slider) {
    rightArrow.addEventListener('click', () => slider.scrollBy({ left: 300, behavior: 'smooth' }));
  }
  if (leftArrow && slider) {
    leftArrow.addEventListener('click', () => slider.scrollBy({ left: -300, behavior: 'smooth' }));
  }

  // Navigation Menu helpers
  const navLinks = document.getElementById('navLinks');
  window.showMenu = window.showMenu || function () {
    if (navLinks) navLinks.style.right = '0';
  };
  window.hideMenu = window.hideMenu || function () {
    if (navLinks) navLinks.style.right = '-200px';
  };

  // Comment Section Logic (optional)
  const commentInput = document.getElementById('commentInput');
  const commentButton = document.getElementById('commentButton');
  const postedEmailSection = document.getElementById('postedEmailSection');
  const postedComment = document.getElementById('postedComment');

  function getComments() {
    const commentsStr = localStorage.getItem('comments');
    return commentsStr ? JSON.parse(commentsStr) : [];
  }

  function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  function renderComments() {
    // optional: implement per-page rendering
  }

  function addComment() {
    if (!commentInput || !commentButton || !postedEmailSection || !postedComment) return;

    const text = commentInput.value.trim();
    if (!text) {
      alert('Please enter a comment before posting.');
      return;
    }

    let comments = getComments();

    if (comments.length >= MAX_COMMENTS) {
      alert(`Only ${MAX_COMMENTS} comments allowed at a time.`);
      return;
    }

    comments.push({ text, timestamp: Date.now() });
    saveComments(comments);

    postedComment.textContent = text;
    postedEmailSection.style.display = 'block';
    commentInput.value = '';

    commentButton.disabled = true;
    setTimeout(() => { commentButton.disabled = false; }, 3000);

    renderComments();
  }

  if (commentButton) {
    commentButton.addEventListener('click', addComment);
  }

  // Carousel movement (alternative pattern) — guard checks
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    let scrollAmount = 0;
    window.moveCarousel = function (direction) {
      const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
      const firstChild = carousel.children[0];
      if (!firstChild) return;
      const itemWidth = firstChild.clientWidth + 14;
      scrollAmount += direction * itemWidth;
      if (scrollAmount < 0) scrollAmount = 0;
      if (scrollAmount > scrollWidth) scrollAmount = scrollWidth;
      carousel.style.transform = `translateX(-${scrollAmount}px)`;
    };
  }
});



