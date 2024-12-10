import { customRender } from "@/types";
import { motion } from "framer-motion";

type TableProps<T extends Record<string, any>> = {
  data: T[];
  excludeFields?: (keyof T)[];
  customRender?: customRender<T>;
};

export default function Table<T extends Record<string, any>>({
  data,
  excludeFields = [],
  customRender = {},
}: TableProps<T>) {
  if (data.length === 0) {
    return <p>No data available</p>;
  }

  const keys = Object.keys(data[0]) as (keyof T)[];

  const columns = keys.filter((key) => !excludeFields.includes(key));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-x-auto"
    >
      <table className="w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {column.toString().toUpperCase()}
              </th>
            ))}
            {customRender.actions && (
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column, index) => (
                <td key={index} className="border border-gray-300 px-4 py-2">
                  {customRender[column]
                    ? customRender[column](row[column] as any, row)
                    : (row[column] as React.ReactNode)}
                </td>
              ))}
              {customRender.actions && (
                <td
                  key={`actions-${rowIndex}`}
                  className="border border-gray-300 px-4 py-2"
                >
                  {customRender.actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
