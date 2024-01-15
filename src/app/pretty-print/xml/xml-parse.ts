type ParseResult = SuccessResult | FailureResult;

type SuccessResult = {
  success: true;
  content: Document;
};

type FailureResult = {
  success: false;
  error: string;
};

export function safeParseXML(str: string): ParseResult {
  const parser = new DOMParser();
  const document = parser.parseFromString(str, "application/xml");

  // Check for parsing errors
  const parserError = document.getElementsByTagName("parsererror");
  if (parserError.length > 0) {
    return {
      success: false,
      error: "An error occurred during parsing",
    };
  }

  return {
    success: true,
    content: document,
  };
}

export function prettyPrintXML(xmlDoc: Document): string {
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
