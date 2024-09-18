document.addEventListener('DOMContentLoaded', () => {
  const playerContainers = document.querySelectorAll('.player-container');

  playerContainers.forEach(container => {
    const audio = container.querySelector('.audio-player');
    const playPauseButton = container.querySelector('.play-pause');
    const playPauseIcon = playPauseButton.querySelector('i');
    const skipBackButton = container.querySelector('.skip-back');
    const skipForwardButton = container.querySelector('.skip-forward');
    const repeatButton = container.querySelector('.repeat');
    const progressBar = container.querySelector('.progress-bar');
    const currentTimeElem = container.querySelector('.current-time');
    const durationElem = container.querySelector('.duration');

    let isPlaying = false;
    let isRepeating = false;

    // Play/Pause
    playPauseButton.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
      } else {
        audio.play();
        playPauseIcon.classList.replace('fa-play', 'fa-pause');
      }
      isPlaying = !isPlaying;
    });

    // Skip Backward 10 seconds
    skipBackButton.addEventListener('click', () => {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    // Skip Forward 10 seconds
    skipForwardButton.addEventListener('click', () => {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    });

    // Repeat
    repeatButton.addEventListener('click', () => {
      isRepeating = !isRepeating;
      audio.loop = isRepeating;
      repeatButton.querySelector('i').classList.toggle('fa-redo', !isRepeating);
      repeatButton.querySelector('i').classList.toggle('fa-times', isRepeating);
      repeatButton.classList.toggle('active', isRepeating);
    });

    // Update progress bar and time
    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress;

      // Update current time and duration
      const currentMinutes = Math.floor(audio.currentTime / 60);
      const currentSeconds = Math.floor(audio.currentTime % 60);
      const durationMinutes = Math.floor(audio.duration / 60);
      const durationSeconds = Math.floor(audio.duration % 60);

      currentTimeElem.textContent = `${String(currentMinutes).padStart(2, '0')}:${String(currentSeconds).padStart(2, '0')}`;
      durationElem.textContent = `${String(durationMinutes).padStart(2, '0')}:${String(durationSeconds).padStart(2, '0')}`;
    });

    // Seek using progress bar
    progressBar.addEventListener('input', (e) => {
      const seekTime = (e.target.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    });

    // Reset play button icon when the audio ends
    audio.addEventListener('ended', () => {
      if (!isRepeating) {
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
        isPlaying = false;
      }
    });
  });
});
// Get elements
const ellipsisButtons = document.querySelectorAll('.fa-ellipsis-v');
const sidebar = document.getElementById('sidebar');
const closeButton = document.querySelector('.close-btn');

// Add event listeners to all ellipsis buttons
ellipsisButtons.forEach((button) => {
  button.addEventListener('click', () => {
    sidebar.classList.add('open');
  });
});

// Add event listener to close button
closeButton.addEventListener('click', () => {
  sidebar.classList.remove('open');
});

// Close sidebar if clicked outside
window.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !e.target.classList.contains('fa-ellipsis-v')) {
    sidebar.classList.remove('open');
  }
});


const players = document.querySelectorAll('.player-container');
let currentSlide = 0;

function updateBackground() {
  const activeCover = players[currentSlide].querySelector('.album-cover').getAttribute('data-cover');
  document.body.style.backgroundImage = `url('${activeCover}')`;
}


const sliderContainer = document.getElementById('slider-container');
sliderContainer.addEventListener('scroll', () => {
  const slideIndex = Math.round(sliderContainer.scrollLeft / sliderContainer.clientWidth);
  if (slideIndex !== currentSlide) {
    currentSlide = slideIndex;
    updateBackground();
  }
});

window.addEventListener('load', updateBackground);
