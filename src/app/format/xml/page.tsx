import Editor from "~/components/editor";
import { cookies } from "next/headers";

export const metadata = {
  title: "XML Formatter",
  description: "Format XML and make it prettier",
};

export default async function XmlPage() {
  const layout = (await cookies()).get("react-resizable-panels:layout");

  let defaultLayout;
  if (layout) {
    defaultLayout = JSON.parse(layout.value);
  }

  return (
    <Editor
      title="XML Formatter"
      placeholderText="Formatted XML will appear here"
      variant="xml"
      defaultLayout={defaultLayout}
    />
  );
}
