"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Add Product Action
export const addProduct = async (formData) => {
  const { title, cat, price, stock, color, desc } = Object.fromEntries(formData);

  try {
    // Here you would typically save to a database
    // For now, we'll just log the data and redirect
    console.log("Adding product:", {
      title,
      category: cat,
      price: Number(price),
      stock: Number(stock),
      color,
      description: desc,
      createdAt: new Date(),
    });

    // Revalidate the products page to show updated data
    revalidatePath("/dashboard/products");
    
    // Redirect back to products page
    redirect("/dashboard/products");
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};

// Update Product Action
export const updateProduct = async (formData) => {
  const { id, title, cat, price, stock, color, size, desc } = Object.fromEntries(formData);

  try {
    // Here you would typically update in a database
    // For now, we'll just log the data and redirect
    console.log("Updating product:", {
      id,
      title,
      category: cat,
      price: Number(price),
      stock: Number(stock),
      color,
      size,
      description: desc,
      updatedAt: new Date(),
    });

    // Revalidate the products page to show updated data
    revalidatePath("/dashboard/products");
    
    // Redirect back to products page
    redirect("/dashboard/products");
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

// Add User Action
export const addUser = async (formData) => {
  const { username, email, password, phone, isAdmin, isActive, address } = Object.fromEntries(formData);

  try {
    // Here you would typically save to a database
    // For now, we'll just log the data and redirect
    console.log("Adding user:", {
      username,
      email,
      password: "***", // Don't log actual password
      phone,
      isAdmin: isAdmin === "true",
      isActive: isActive === "true",
      address,
      createdAt: new Date(),
    });

    // Revalidate the users page to show updated data
    revalidatePath("/dashboard/users");
    
    // Redirect back to users page
    redirect("/dashboard/users");
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user");
  }
};

// Update User Action
export const updateUser = async (formData) => {
  const { id, username, email, password, phone, isAdmin, isActive, address } = Object.fromEntries(formData);

  try {
    // Here you would typically update in a database
    // For now, we'll just log the data and redirect
    console.log("Updating user:", {
      id,
      username,
      email,
      password: password ? "***" : undefined, // Don't log actual password
      phone,
      isAdmin: isAdmin === "true",
      isActive: isActive === "true",
      address,
      updatedAt: new Date(),
    });

    // Revalidate the users page to show updated data
    revalidatePath("/dashboard/users");
    
    // Redirect back to users page
    redirect("/dashboard/users");
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};
