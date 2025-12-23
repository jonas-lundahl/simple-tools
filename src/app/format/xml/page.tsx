import Editor from "~/components/editor";
import { Metadata } from "next";
import { getDefaultPanelLayoutFromCookies } from "~/lib/server/react-resizable-panels";

export const metadata: Metadata = {
  title: "XML Formatter",
  description: "Format XML and make it prettier",
};

export default async function XmlPage() {
  const groupId = "xml-formatter";
  const defaultLayout = await getDefaultPanelLayoutFromCookies(groupId);

  return (
    <Editor
      title="XML Formatter"
      placeholderText="Formatted XML will appear here"
      variant="xml"
      defaultLayout={defaultLayout}
      groupId={groupId}
    />
  );
}
