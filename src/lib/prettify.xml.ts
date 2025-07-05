import z from "zod";

const ErrorSchema = z.object({
  message: z.string(),
});

export function prettifyXML(text: string) {
  let prettified = "";
  let error = "";
  try {
    if (!text) {
      return ["", ""];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "application/xml");

    const parsererror = doc.querySelector("parsererror");

    if (parsererror) {
      const messageDiv = parsererror.querySelector("div");
      const message = messageDiv?.textContent || "Unknown XML parsing error";
      return ["", message];
    }

    prettified = prettyPrintXML(doc);
  } catch (e) {
    if (text) {
      const parsedError = ErrorSchema.safeParse(e);
      if (parsedError.success) {
        error = parsedError.data.message;
      } else {
        error = "An error occurred";
      }
    }
  }

  return [prettified, error] as const;
}

function prettyPrintXML(xmlDoc: Document): string {
  const xsltDoc = new DOMParser().parseFromString(
    [
      // describes how we want to modify the XML - indent everything
      '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
      '  <xsl:strip-space elements="*"/>',
      '  <xsl:template match="para[content-style][not(text())]">',
      '    <xsl:value-of select="normalize-space(.)"/>',
      "  </xsl:template>",
      '  <xsl:template match="node()|@*">',
      '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
      "  </xsl:template>",
      '  <xsl:output indent="yes"/>',
      "</xsl:stylesheet>",
    ].join("\n"),
    "application/xml",
  );

  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);
  const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  return new XMLSerializer().serializeToString(resultDoc);
}
