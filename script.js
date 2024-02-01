$(document).ready(function() {
    var timelineData = [
        {
            "date": "01-01-2024",
            "description": "Slab poured",
            "images": ["https://placehold.co/600x400/000000/FFF","https://fastly.picsum.photos/id/418/200/300.jpg?hmac=T7cC_OCVJnIk98mcvhuKBWancCeGl2KcyuSBTCYE-QM"]
          }
      ,
      {
        "date": "18-01-204",
        "description": "Frame stage started",
        "images": ["https://placehold.co/600x400/000000/GGG","https://fastly.picsum.photos/id/418/200/300.jpg?hmac=T7cC_OCVJnIk98mcvhuKBWancCeGl2KcyuSBTCYE-QM"]
      }
          
    ];
  
    function createImageGallery(event, index) {
      var galleryHtml = `<div class="gallery-container" id="gallery-${index}">`;
      event.images.forEach(function(image, imgIndex) {
        galleryHtml += `<div class="gallery-slide ${imgIndex === 0 ? 'active' : ''}" style="background-image: url('${image}');"></div>`;
      });
      galleryHtml += `
        <button class="gallery-prev" onclick="changeSlide(-1, ${index})">❮</button>
        <button class="gallery-next" onclick="changeSlide(1, ${index})">❯</button>
      </div>`;
      return galleryHtml;
    }
  
    function displayTimelineEvents(data) {
      var timelineHtml = '';
      data.forEach(function(event, index) {
        timelineHtml += `<div class="max-w-xl w-full mx-auto bg-white p-5 rounded-lg shadow-md mb-8">`;
        timelineHtml += `<div class="text-lg font-bold">${event.date}</div>`;
        timelineHtml += `<p class="text-gray-700 my-2">${event.description}</p>`;
        timelineHtml += createImageGallery(event, index);
        timelineHtml += `</div>`;
      });
      $('#events').html(timelineHtml);
    }
  
    displayTimelineEvents(timelineData);
  
    window.changeSlide = function(move, galleryIndex) {
      var gallery = document.getElementById('gallery-' + galleryIndex);
      var slides = gallery.getElementsByClassName('gallery-slide');
      var currentIndex = 0;
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {
          currentIndex = i;
          slides[i].classList.remove('active');
          break;
        }
      }
      var nextIndex = (currentIndex + move + slides.length) % slides.length;
      slides[nextIndex].classList.add('active');
    };
  });
  