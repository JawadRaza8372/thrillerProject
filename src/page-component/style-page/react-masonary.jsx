import Masonry from "react-masonry-css";
import "./style.css";
import { useState, useEffect } from "react";
import ImageGalleryModal from "./imageGalleyModal";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const MasonaryComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageCount, setSelectedImageCount] = useState(0);
  const [allImages, setAllImages] = useState(props.metaImages);
  const items = props.images.map(function (item) {
    return (
      <img
        src={item.cover}
        key={item.cover}
        className="massonary-image"
        onClick={() => {
          setIsOpen(true);
          const index = allImages.findIndex(
            (image) => image.url === item.cover
          );
          setSelectedImage(index + 1);
          setSelectedImageCount(index);
          console.log(index);
        }}
      />
    );
  });
  useEffect(() => {
    const aa = props?.metaImages.map((item) => item.images);
    console.log(aa, "aaaa");
    const ab = aa.map((item) => item.map((item) => item.url));
    let test = [];
    aa.forEach((item) => {
      test = [...test, ...item];
    });

    console.log(test, "testing");
    setAllImages(test);
  }, [props.metaImages]);
  return (
    <div>
      {selectedImage && (
        // <ImageGalleryModal
        //   isOpen={isOpen}
        //   onClose={() => {
        //     setIsOpen(!isOpen);
        //     setSelectedImage(null);
        //     setSelectedImageCount(0);
        //   }}
        //   // images={props?.images.filter((item) => item.id === selectedImage)[0]}
        //   images={allImages}
        //   count={selectedImageCount}
        //   setCount={setSelectedImageCount}
        // />
        <ImageGalleryModal
          isOpen={true}
          onClose={() => {
            setIsOpen(!isOpen);
            setSelectedImage(null);
            setSelectedImageCount(0);
          }}
          // images={props?.images.filter((item) => item.id === selectedImage)[0]}
          images={allImages}
          count={selectedImageCount}
          setCount={setSelectedImageCount}
        />
      )}

      <Masonry
        breakpointCols={{ default: 3, 800: 2 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items}
      </Masonry>
    </div>
  );
};

export default MasonaryComponent;
