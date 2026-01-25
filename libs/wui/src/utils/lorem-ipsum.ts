export const LOREM_IPSUM: string =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac nisl enim. In in enim a augue rutrum semper vitae nec sapien. Vivamus et diam mauris. Nunc mattis, ante in laoreet pulvinar, felis orci semper nisi, nec vulputate nulla nulla sed erat. Quisque elementum, sapien ac congue blandit, elit nunc commodo nisl, ut commodo metus est ac urna. Curabitur lobortis urna nec neque ultrices, id blandit lacus interdum. Maecenas rhoncus odio a nibh commodo, feugiat consequat erat sagittis. Nullam dapibus nibh odio, ut fringilla leo feugiat at. In hac habitasse platea dictumst. Ut ultricies eros et auctor lacinia. Suspendisse potenti. In et euismod odio. Cras dui justo, viverra eu maximus vitae, volutpat scelerisque magna. Vestibulum vitae diam vel ex interdum ultricies. Quisque elementum ex vitae purus luctus, vitae tempor nisi maximus. Sed vehicula in eros in elementum. Vivamus orci arcu, gravida ut ante et, feugiat imperdiet enim. Curabitur quis purus sit amet tellus auctor egestas quis at quam. Nulla suscipit ante ac rhoncus vestibulum. Nam ac dignissim dui. Mauris vel velit bibendum, laoreet arcu vitae, lobortis magna. Sed at dapibus neque. Nulla vel risus aliquam, tincidunt massa sed, mollis turpis. Sed sit amet hendrerit risus. Ut id ultrices tellus. Integer magna quam, viverra quis feugiat sit amet, aliquet ultricies elit. Maecenas porta ullamcorper molestie. Sed eu sollicitudin nisl. Phasellus id sagittis mi. Proin eget metus at augue consequat fringilla vitae ac velit. Mauris nec scelerisque eros, sit amet porta nulla. Duis velit enim, semper id aliquam eget, mollis a nisl. Donec cursus rhoncus pretium. Aenean eget rutrum nisl, ac accumsan nunc. Cras pharetra ultrices vehicula. Nulla semper ac dolor at interdum. In nulla justo, suscipit a interdum quis, mollis et dolor. In vitae ipsum pellentesque, tempor urna vitae, ullamcorper velit. Nulla velit felis, porttitor a dictum quis, aliquet eget arcu. Etiam in blandit est. Nulla interdum arcu ut mi hendrerit, ultrices pellentesque eros maximus. Donec tempus lorem eu nunc pellentesque efficitur. Proin ultricies erat nunc, nec tincidunt velit posuere vitae. Nullam sodales quam et sapien aliquet ullamcorper. Mauris efficitur lorem nisl. Vivamus ornare lorem ac risus rhoncus viverra. Proin a ex et sapien fermentum lobortis eget ut ipsum. Suspendisse convallis velit in ultricies cursus. Integer magna nibh, molestie id orci eget, accumsan faucibus mauris. Vestibulum ut metus nulla. Nunc urna nisi, sollicitudin ac diam a, ultricies eleifend ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque nec eleifend sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas feugiat congue libero. In ac libero elementum, consectetur nibh sit amet, pulvinar lectus. Aenean tempor purus vel cursus lobortis. Ut et mauris erat. Fusce sed diam ut elit dignissim commodo lacinia eu ligula. Morbi quis sapien a nisi tempor faucibus. In fermentum finibus neque, quis facilisis risus malesuada id. Proin in elit justo. Sed sodales viverra rutrum. Phasellus est dui, vulputate at ultricies ac, egestas in lacus. Duis leo nisi, vehicula non faucibus sed, tincidunt et ex. Ut volutpat justo ac dui interdum, ac fringilla sapien efficitur. Nunc ullamcorper lobortis sem in euismod.";

/**
 * Génère un texte Lorem Ipsum avec un nombre spécifique de mots
 * Coupe proprement (ne coupe pas au milieu d'un mot) et ajoute un point à la fin
 *
 * @param wordCount - Nombre de mots à générer (par défaut: 50)
 * @returns Texte Lorem Ipsum avec le nombre de mots demandé, terminé par un point
 *
 * @example
 * loremIpsum(5) // "Lorem ipsum dolor sit amet."
 * loremIpsum(10) // "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do."
 */
export const loremIpsum = (wordCount: number = 50): string => {
  const words = LOREM_IPSUM.split(/\s+/);
  const selectedWords = words.slice(0, Math.min(wordCount, words.length));
  const text = selectedWords.join(" ");

  // Ajouter un point à la fin si ce n'est pas déjà présent
  return text.endsWith(".") ? text : `${text}.`;
};
