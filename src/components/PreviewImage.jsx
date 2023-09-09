import React, { useEffect, useState } from "react";

const PreviewImage = ({ file, imgUrl }) => {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  }, [file]);
  return (
    <div>
      {preview ? (
        <img src={preview} alt="preview" className="w-10 h-10 mb-1" />
      ) : (
        <img src={imgUrl} alt="image" className="w-10 h-10 mb-1" />
      )}
    </div>
  );
};

export default PreviewImage;
