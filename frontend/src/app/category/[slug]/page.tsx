import {notFound} from "next/navigation";
import CategoryDetailClient from "@/components/section/category/CategoryDetailClient";
import {categoryService} from "@/services/category.service";

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const category = await categoryService.findBySlug(slug);

  if (!category) {
    notFound();
  }

  return <CategoryDetailClient category={category}/>;
}