import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/types/category.types";
import { getAllCategory } from "@/services/category.service";
import CategoryTable from "@/components/table/CategoryTable";
import { getMe } from "@/lib/getMe";
import CategoryAddForm from "@/components/forms/CategoryAddForm";

const TutorSubject = async () => {
  const profileRes = await getMe();
  const myCategories: Category[] = profileRes?.data?.tutor?.category || null;
  const categoryData = await getAllCategory();
  const categories: Category[] = categoryData?.data;

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-7">
        <Card className="gap-4">
          <CardHeader>
            <CardTitle>All Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Name</TableHead>
                  <TableHead className="text-end">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myCategories.map((category) => (
                  <CategoryTable key={category.id} category={category} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <CategoryAddForm categories={categories} />
      </div>
    </div>
  )
}

export default TutorSubject