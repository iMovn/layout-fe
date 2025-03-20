export type MainMenuItem = {
  label: string;
  href: string;
};

export type SubCategory = {
  name: string;
  href: string;
};

export type ProductCategory = {
  name: string;
  href: string;
  icon: string;
  children?: SubCategory[];
};

export type Brand = {
  id: number;
  name: string;
  slug: string;
};

export type MenuItem = {
  title: string;
  slug: string;
  icon?: string; // URL icon (ảnh)
  children?: MenuItem[];
};
