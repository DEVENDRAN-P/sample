export const createPageUrl = (pageName) => {
  const pageMap = {
    Home: "/",
    Search: "/search",
    Upload: "/upload",
    NearbyShops: "/nearby",
    Profile: "/profile",
    ShopDashboard: "/shop-dashboard",
  };
  return pageMap[pageName] || "/";
};
