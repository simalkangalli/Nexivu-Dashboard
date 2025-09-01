"use server";

// Mock user data for development
const mockUsers = [
  {
    id: "1",
    username: "simal simone",
    email: "simal.simone@example.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, City, State 12345",
    img: "/noavatar.png",
    isAdmin: true,
    isActive: true,
    createdAt: "2021-01-01"
  },
  {
    id: "2", 
    username: "john doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8901",
    address: "456 Oak Ave, City, State 12345",
    img: "/noavatar.png",
    isAdmin: false,
    isActive: true,
    createdAt: "2022-06-15"
  }
];

// Mock product data for development
const mockProducts = [
  {
    id: "test",
    title: "Test Product",
    desc: "Test description",
    price: 100,
    stock: 10,
    color: "Blue",
    size: "Medium",
    cat: "software",
    img: "/noproduct.jpg",
    createdAt: "2024-01-01"
  }
];

export async function fetchProduct(id) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Find product by id
    const product = mockProducts.find(product => product.id === id);
    
    if (!product) {
      // Return default product if not found
      return {
        id: id,
        title: "Unknown Product",
        desc: "No description available",
        price: 0,
        stock: 0,
        color: "Not specified",
        size: "Not specified",
        cat: "general",
        img: "/noproduct.jpg",
        createdAt: new Date().toISOString().split('T')[0]
      };
    }
    
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}

export async function fetchProducts() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function fetchUser(id) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Find user by id
    const user = mockUsers.find(user => user.id === id);
    
    if (!user) {
      // Return default user if not found
      return {
        id: id,
        username: "Unknown User",
        email: "user@example.com",
        phone: "+1 000 000 0000",
        address: "No address provided",
        img: "/noavatar.png",
        isAdmin: false,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
    }
    
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function fetchUsers() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}
