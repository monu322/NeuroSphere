const removeSlashFromPagination = () => {
  let swiperPagination = document.querySelector(".swiper-pagination");
  if (swiperPagination) {
    swiperPagination.innerHTML = swiperPagination.innerHTML.replace(" / ", "");
  }
};

export default removeSlashFromPagination;
