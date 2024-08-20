// src/entities/clothing.ts

export enum Tops {
    SHIRT = 'Shirt',
    POLOS = 'Polo',
  }
  
  export enum Downs {
    TROUSERS = 'Trousers',
    SKIRTS = 'Skirts',
    SHORTS = 'Shorts',
    GOWNS = 'Gowns',
  }
  
  export enum Specials {
    TWO_PIECE_SUIT = '2-piece suit',
    THREE_PIECE_SUIT = '3-piece suit',
    JACKET = 'Jacket',
    NATIVE = 'Native',
    AGBADA = 'Agbada',
    SWEATERS_HOODIES = 'Hoodie',
  }
  
  // Mapping category names to their respective clothe types
  export const ClothingCategories = {
    Tops: Tops,
    Downs: Downs,
    Specials: Specials,
  };
  