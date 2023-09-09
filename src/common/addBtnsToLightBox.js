const addBtnsToLightBox = (images, setIsOpen) => {
  Object.values(document.querySelectorAll('.lightbox-image-pager')).forEach((el, index) => {
    let pageNumberSpan = document.createElement('span');
    pageNumberSpan.classList.add('lightbox-image-pager-number');
    pageNumberSpan.textContent = `${index + 1} of ${images}`;
  
    
    let closeBtn = document.createElement('i');
    closeBtn.classList.add('fas', 'fa-times', 'lightbox-image-pager-close');

    closeBtn.addEventListener('click', () => {
      setIsOpen(false);
    });
  
    el.children[0].children[0].prepend(closeBtn);
    el.children[0].children[0].appendChild(pageNumberSpan);
  });
}

export default addBtnsToLightBox;
