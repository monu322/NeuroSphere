/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Lightbox from 'react-spring-lightbox';
import addBtnsToLightBox from '../../../common/addBtnsToLightBox';

const LightBoxGallery = ({ index, images, isOpen, setIsOpen }) => {
    const [currentImageIndex, setCurrentIndex] = useState(index);

    useEffect(() => {
      setCurrentIndex(index);
    }, [index]);

    useEffect(() => {
      addBtnsToLightBox(images.length, setIsOpen);
    }, [images]);

    const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

    const gotoNext = () => currentImageIndex + 1 < images.length && setCurrentIndex(currentImageIndex + 1);

    const handleClose = () => {
      setIsOpen(false);
    };

    return (
        <Lightbox
          isOpen={isOpen}
          onPrev={gotoPrevious}
          onNext={gotoNext}
          images={images}
          onClose={handleClose}
          currentIndex={currentImageIndex}
          renderPrevButton={() => (<i className="fas fa-caret-left lightBox_prev" onClick={gotoPrevious} />)}
          renderNextButton={() => (<i className="fas fa-caret-right lightBox_next" onClick={gotoNext} />)}
        />
  )
}

export default LightBoxGallery;