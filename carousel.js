// Menu mobile
document.querySelector('.nav-toggle').addEventListener('click', function(){
    const nav = document.getElementById('mainNav');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('open');
  });
  
  // Carrossel
  document.addEventListener('DOMContentLoaded', function(){
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dotsWrap = document.getElementById('dots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let current = 0;
    let interval = null;
  
    function createDots(){
      slides.forEach((_,i)=>{
        const d = document.createElement('div');
        d.className = 'dot' + (i===0 ? ' active' : '');
        d.setAttribute('data-index', i);
        d.addEventListener('click', ()=> goTo(i));
        dotsWrap.appendChild(d);
      });
    }
  
    function updateDots(){
      const dots = dotsWrap.querySelectorAll('.dot');
      dots.forEach(d=>d.classList.remove('active'));
      if(dots[current]) dots[current].classList.add('active');
    }
  
    function goTo(idx){
      slides[current].classList.remove('active');
      current = idx;
      slides[current].classList.add('active');
      updateDots();
    }
  
    function next(){
      goTo((current+1) % slides.length);
    }
    function prev(){
      goTo((current-1 + slides.length) % slides.length);
    }
  
    createDots();
    interval = setInterval(next, 5000);
  
    nextBtn.addEventListener('click', ()=>{ next(); resetInterval(); });
    prevBtn.addEventListener('click', ()=>{ prev(); resetInterval(); });
  
    function resetInterval(){
      clearInterval(interval);
      interval = setInterval(next, 5000);
    }
  
    // Teclado
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowLeft') { prev(); resetInterval(); }
      if(e.key === 'ArrowRight') { next(); resetInterval(); }
    });
  
    // Formulário (simulação)
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      status.textContent = '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
  
      if(!name || !email || !message){
        status.textContent = 'Por favor, preencha os campos obrigatórios.';
        return;
      }
      status.textContent = 'Enviando...';
      setTimeout(()=>{
        status.textContent = 'Mensagem enviada com sucesso (simulação).';
        form.reset();
      }, 900);
    });
  });
  