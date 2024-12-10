import Table from "@/components/CustomTable";
import { customRender } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

type FieldConfig = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
};

type DashboardProps<T extends Record<string, any>> = {
  name: string;
  data: T[];
  isFetching: boolean;
  onFetch: () => void;
  onSubmit: (formData: Record<string, string | number>) => void;
  fields: FieldConfig[];
  customRender?: customRender<T>;
};

export default function Dashboard<T extends Record<string, any>>({
  name,
  data,
  isFetching,
  onFetch,
  onSubmit,
  fields,
  customRender = {},
}: DashboardProps<T>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isTablePanelOpen, setIsTablePanelOpen] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const dataObj = Object.fromEntries(formData.entries());
      onSubmit(dataObj as Record<string, string | number>);
      onFetch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="flex h-full flex-col"
    >
      <h3 className="mb-2 h-14 w-full items-center rounded-xl border-2 border-gray-200 bg-white p-2 text-center text-2xl font-bold">
        {name}
      </h3>
      <motion.div className="flex h-full flex-col space-y-2">
        <motion.div
          onClick={() => setIsTablePanelOpen(true)}
          className={`flex h-full flex-row items-center justify-center space-x-2 overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-4 transition-all ${isTablePanelOpen ? "h-full cursor-default" : "h-1/6 cursor-pointer hover:bg-gray-100"}`}
        >
          {!isTablePanelOpen && (
            <p className="w-full text-center font-bold">Click to open</p>
          )}
          <AnimatePresence>
            {isTablePanelOpen && (
              <div className="h-fit overflow-x-hidden overflow-y-scroll border border-gray-200">
                {!isFetching ? (
                  data.length > 0 ? (
                    <Table<T>
                      data={data}
                      excludeFields={[]}
                      customRender={customRender}
                    />
                  ) : (
                    <p>No {name.toLowerCase()} found</p>
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span>Loading...</span>
                  </div>
                )}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          onClick={() => setIsTablePanelOpen(false)}
          className={`flex flex-col items-center justify-center space-y-4 rounded-xl border-2 border-gray-200 bg-white transition-all ${!isTablePanelOpen ? "h-full cursor-default" : "h-1/6 cursor-pointer hover:bg-gray-100"}`}
        >
          {!isTablePanelOpen ? (
            <>
              <h4 className="w-full p-4 text-center text-xl font-medium">
                Add {name}
              </h4>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-center space-y-4"
              >
                {fields.map((field, index) => (
                  <p
                    key={`filed-${index}-${field.name}`}
                    className="w-full space-x-2 rounded-xl text-center"
                  >
                    <label htmlFor={field.name}>{field.label}:</label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      className="rounded-md border border-black bg-white p-1 text-black"
                    />
                  </p>
                ))}
                <button
                  type="submit"
                  className="rounded-md border border-black p-2 px-6"
                >
                  Add {name}
                </button>
              </form>
            </>
          ) : (
            <p className="w-full text-center font-bold">Click to Open</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
