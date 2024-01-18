import { useEffect, useState } from 'react';

import style from './ImgShow.module.css'

export default function ImageSlideDisplay({enviroment}) {
    const [images, setImages] = enviroment;

    const [imgWidths, setImgWidth] = useState([]);
    useEffect(() => {
        setImgWidth(Array(images.length).fill(0));
    }, [images]);

    const handleImageDelete = (index) => {
        console.log('borrando imagen');
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };
    
    return (<div style={{display:'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {images.map((image, index) => (
            <div key={index} className={style.img_show} onClick={() => handleImageDelete(index)}>
                <div style={{width: imgWidths[index]}}>
                    Delete
                </div>
                <img 
                    alt={`Uploaded ${index}`}
                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                    onMouseOver={e => {
                        const arr = [...imgWidths];
                        arr[index] = e.currentTarget.width;
                        setImgWidth(arr);
                    }}
                />
            </div>
        ))}
    </div>);
}