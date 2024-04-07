import React from "react";

const InputImage = ({field,setSelectedImage,selectedImage}:{field:any,setSelectedImage:any,selectedImage:any}) => {
  return (
    <input
      accept="image/*"
      type="file"
      className="hidden"
      id="fileInput"
      onBlur={field.onBlur}
      name={field.name}
      onChange={(e) => {
        field.onChange(e.target.files);
        setSelectedImage(e.target.files?.[0] || null);
      }}
      ref={field.ref}
    />
  );
};

export default InputImage;
