import React, { useState } from "react";

const PreviewImage = ({ file, imgUrl }) => {
  const [preview, setPreview] = useState(null);
  // if (!file.startsWith("https://")) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setPreview(reader.result);
  //   };
  // }
  if (!imgUrl) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <div>
      {preview ? (
        <img src={preview} alt="preview" className="w-10 h-10 mb-1" />
      ) : (
        <img src={imgUrl} alt="preview" className="w-10 h-10 mb-1" />
      )}
    </div>
  );
};

export default PreviewImage;
