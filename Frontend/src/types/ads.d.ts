type AdKey = "title" | "description" | "price" | "picture" | "location";

export type Ad = {
  id: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  location: string;
  created_at: string;
  updated_at: string;
};

export type ProductTypeWithKeys = Ad & {
  [key: string]: string | number;
};
export type AdCreateFormInfosWithoutParams = Omit<Ad, "id" | "created_at" | "updated_at">;

export type AdCreateFormInfos = {
    category: { id: string };
    title: string;
    description: string;
    price: number;
    picture: string;
    location: string;
}

// export type AdCreateFormInfos = Partial<
//   Omit<Ad, "id" | "created_at" | "updated_at">
// > &
//   Partial<{ category: { id: string } }>;