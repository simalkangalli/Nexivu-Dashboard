"use server";


export const handleForm = async (formData) => {
  const name = formData.get("name");
  console.log("Name submitted:", name);
  return { success: true };
};
