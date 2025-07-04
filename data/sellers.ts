
export type SellerApplication = {
  id: string;
  fullName: string;
  businessName: string;
  productCategory: string;
  phone: string;
  email: string;
  address: string;
  idUpload: string;
  status: "pending" | "approved" | "rejected";
  dateApplied: string;
};

export const sellerApplications: SellerApplication[] = [
  {
    id: "app1",
    fullName: "John Smith",
    businessName: "Smith Family Farms",
    productCategory: "vegetables",
    phone: "555-123-4567",
    email: "john@smithfarms.com",
    address: "1234 Farm Road, Ruralville, RV 12345",
    idUpload: "id123456.jpg",
    status: "pending",
    dateApplied: "2025-05-01"
  },
  {
    id: "app2",
    fullName: "Maria Rodriguez",
    businessName: "Sunrise Orchards",
    productCategory: "fruits",
    phone: "555-987-6543",
    email: "maria@sunriseorchards.com",
    address: "789 Orchard Lane, Fruitville, FL 67890",
    idUpload: "id789012.jpg",
    status: "approved",
    dateApplied: "2025-04-28"
  },
  {
    id: "app3",
    fullName: "Robert Johnson",
    businessName: "Green Acres Dairy",
    productCategory: "dairy",
    phone: "555-456-7890",
    email: "robert@greenacres.com",
    address: "567 Pasture Road, Dairytown, DT 34567",
    idUpload: "id345678.jpg",
    status: "rejected",
    dateApplied: "2025-04-30"
  }
];
