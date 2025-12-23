import Editor from "~/components/editor";
import { Metadata } from "next";
import { getDefaultPanelLayoutFromCookies } from "~/lib/server/react-resizable-panels";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description: "Format JSON and make it prettier",
};

export default async function JsonPage() {
  const groupId = "json-formatter";
  const defaultLayout = await getDefaultPanelLayoutFromCookies(groupId);

  return (
    <Editor
      title="JSON Formatter"
      placeholderText="Formatted JSON will appear here"
      variant="json"
      defaultLayout={defaultLayout}
      groupId={groupId}
    />
  );
}
