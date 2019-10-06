const getNewsButton = document.getElementById('getnews');
const cards = document.querySelectorAll('.card-body');

window.onload = function() {
 if(cards[0].querySelector('.card-text').innerText === 'loading...')
    window.location = '/news';
  };

getNewsButton.addEventListener('click', async event => {
  cards.forEach((el) => {
    el.innerHTML = `<p class="card-text">loading...</p>
                        <div class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>`
  });
  //window.location = `/${Math.random().toString(36).substring(7)}`
  window.location = '/news';
})