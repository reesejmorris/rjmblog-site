/**
 * Gatsby's Markdown transformer preserves raw HTML by default. Blog posts are
 * subsequently rendered with dangerouslySetInnerHTML, so treat HTML embedded
 * in Markdown as text rather than executable markup.
 */
module.exports = ({ markdownAST }) => {
  const visit = (node) => {
    if (!node || typeof node !== "object") {
      return;
    }

    if (node.type === "html") {
      node.type = "text";
      return;
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
  };

  visit(markdownAST);
};
