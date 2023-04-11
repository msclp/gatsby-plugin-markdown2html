import { CreateNodeArgs } from 'gatsby'
import showdown from 'showdown'

type PluginOptions = {
  nodeType: string
}

const converter = new showdown.Converter();

export const onCreateNode = ({
  actions,
  createContentDigest,
  createNodeId,
  node,
}: CreateNodeArgs<{ body: string }>, { nodeType }: PluginOptions) => {
  const { internal: { type }} = node

  if (type !== nodeType) {
    return
  }

  const { createNode, createParentChildLink } = actions
  const htmlNode = {
    id: createNodeId(`${node.id}Html`),
    html: converter.makeHtml(node.body),
    children: [],
    parent: node.id,
    internal: {
      contentDigest: createContentDigest(node),
      type: 'html',
    },
  }

  createNode(htmlNode)
  createParentChildLink({ parent: node, child: htmlNode })
}
