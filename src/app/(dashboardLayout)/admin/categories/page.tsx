import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategory } from "@/services/category.service";
import CategoryTable from "@/components/table/CategoryTable";
import { Category } from "@/types/category.types";
import CategoryForm from "@/components/forms/CategoryForm";

const AdminCategories = async () => {
  const data = await getAllCategory();
  const categories: Category[] = data?.data;
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-7">
        <Card className="gap-4">
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name</TableHead>
                  <TableHead className="text-end">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <CategoryTable key={category.id} category={category} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <CategoryForm />
      </div>
    </div>
  );
};

export default AdminCategories;
