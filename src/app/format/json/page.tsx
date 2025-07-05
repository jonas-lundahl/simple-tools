import Editor from "~/components/editor";
import { cookies } from "next/headers";

export const metadata = {
  title: "JSON Formatter",
  description: "Format JSON and make it prettier",
};

export default async function JsonPage() {
  const layout = (await cookies()).get("react-resizable-panels:layout");

  let defaultLayout;
  if (layout) {
    defaultLayout = JSON.parse(layout.value);
  }

  return (
    <Editor
      title="JSON Formatter"
      placeholderText="Formatted JSON will appear here"
      variant="json"
      defaultLayout={defaultLayout}
    />
  );
}
