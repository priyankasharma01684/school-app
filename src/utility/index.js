class Utility {
  static getImage = (image) => {
    const path = process.env.NODE_ENV === 'production' ? '/images' : '/public/images';

    return `${path}/${image}`;
  };
}

module.exports = Utility;
