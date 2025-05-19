export type MenuItem = {
  id: number;
  name: string;
  link: string;
  icon?: string; // URL icon (ảnh)
  children: MenuItem[];
  is_active: number;
  parent_id?: number;
};

export type ApiResponse = {
  status: boolean;
  message: string;
  data: MenuItem[];
};
