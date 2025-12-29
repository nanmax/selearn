import { getCourseCategories } from "../actions/get-course-categories"
import { NavbarPublic } from "./navbar-client";

export const Navbar = async () => {
  const categories = await getCourseCategories();
  return <NavbarPublic categories={categories} />
}