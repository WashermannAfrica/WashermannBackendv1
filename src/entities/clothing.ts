// src/entities/clothing.ts

export enum Tops {
    SHIRT = 'Shirt',
    POLOS = 'Polos',
  }
  
  export enum Downs {
    TROUSERS = 'Trousers',
    SKIRTS = 'Skirts',
    SHORTS = 'Shorts',
    GOWNS = 'Gowns',
  }
  
  export enum Special {
    TWO_PIECE_SUIT = '2-piece suit',
    THREE_PIECE_SUIT = '3-piece suit',
    JACKET = 'Jacket',
    NATIVE = 'Native',
    AGBADA = 'Agbada',
    SWEATERS_HOODIES = 'Sweaters/Hoodies',
  }
  
  // Mapping category names to their respective clothe types
  export const ClothingCategories = {
    Tops: Tops,
    Downs: Downs,
    Special: Special,
  };
  