import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";

const ResponsiveImage = ({ displayImage }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dkjvgsngd",
    },
  });

  const myImage = cld.image(displayImage);

  myImage.resize(thumbnail().width(112).height(112));

  return <AdvancedImage cldImg={myImage} />;
};

export default ResponsiveImage;
