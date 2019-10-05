const getNewsButton = document.getElementById('getnews');
const cards = document.querySelectorAll('.card-body');
console.log(cards)

getNewsButton.addEventListener('click', async event => {
  cards.forEach((el) => {
    el.innerHTML = `<p class="card-text">loading...</p>
                        <div class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>`
  });
  window.location = '/'

})