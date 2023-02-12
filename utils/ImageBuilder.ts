interface Image {
  name: string;
  image: any;
}

/**
 * Allow to generate dynamics icons for our components.
 */
export class ImageBuilder {
  private static images: Array<Image> = [
    {
      name: "dishesToDo",
      image: require("../assets/icons/tasks/kitchen/kitchen-dishes-todo.png"),
    },
  ];

  static GetImage = (name: string) => {
    const found = ImageBuilder.images.find((e) => e.name === name);
    return found ? found.image : null;
  };
}

/*
  s'utilise comme ça

 const backgroundImage = BackgroundImageService.GetImage(
    `background${imageNumber}.jpg`,
  );
  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      {children}
    </ImageBackground>
  );
  */
