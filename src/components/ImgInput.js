export default function ImageUploader({enviroment}) {
  const [images, setImages] = enviroment;

  const handleImageChange = (event) => {
    const fileList = event.target.files;

    // Convert FileList to Array and update state
    const newImages = Array.from(fileList);
    setImages([...images, ...newImages]);
  };

  return (<input
    type="file"
    accept="image/*"
    multiple
    onChange={handleImageChange}
  />);
}
  /*return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />

      <div>
        {images.map((image, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index}`}
              style={{ maxWidth: '150px', maxHeight: '150px' }}
            />
            <button onClick={() => handleImageDelete(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}*/