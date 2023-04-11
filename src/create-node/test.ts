import { CreateNodeArgs } from "gatsby";
import { onCreateNode } from ".";

type Args = CreateNodeArgs<{ body: string }>

const createNode = jest.fn()
const createParentChildLink = jest.fn()

const mdContent = `
# Sample Markdown
This is some basic, sample markdown.
## Second Heading
 * Unordered lists, and:
  1. One
  1. Two
  1. Three
 * More
> Blockquote
And **bold**, *italics*, and even *italics and later **bold***. Even ~~strikethrough~~. [A link](https://markdowntohtml.com) to somewhere.
And code highlighting:
\`\`\`js
var foo = 'bar';
function baz(s) {
   return foo + ':' + s;
}
\`\`\`
Or inline code like \`var foo = 'bar';\`.
Or an image of bears
![bears](http://placebear.com/200/200)
The end ...
`
const htmlContent = `<h1 id=\"samplemarkdown\">Sample Markdown</h1>
<p>This is some basic, sample markdown.</p>
<h2 id=\"secondheading\">Second Heading</h2>
<ul>
<li>Unordered lists, and:</li>
</ul>
<ol>
<li>One</li>
<li>Two</li>
<li>Three</li>
</ol>
<ul>
<li>More</li>
</ul>
<blockquote>
  <p>Blockquote
  And <strong>bold</strong>, <em>italics</em>, and even <em>italics and later <strong>bold</strong></em>. Even ~~strikethrough~~. <a href=\"https://markdowntohtml.com\">A link</a> to somewhere.
  And code highlighting:</p>
</blockquote>
<pre><code class=\"js language-js\">var foo = 'bar';
function baz(s) {
   return foo + ':' + s;
}
</code></pre>
<p>Or inline code like <code>var foo = 'bar';</code>.
Or an image of bears
<img src=\"http://placebear.com/200/200\" alt=\"bears\" />
The end …</p>`

const node: Args['node'] = {
  id: 'id',
  body: mdContent,
  parent: 'parentId',
  children: [],
  internal: {
    type: 'nodeType',
    contentDigest: 'contentDigest',
    owner: 'owner',
  }
}
const nodeType = 'nodeType'
const htmlNode = {
  id: 'idHtml',
  html: htmlContent,
  children: [],
  parent: node.id,
  internal: {
    contentDigest: {},
    type: 'html',
  },
}

const createApi = () => ({
  actions: {
    createNode,
    createParentChildLink,
  },
  createNodeId: jest.fn().mockReturnValue('idHtml'),
  createContentDigest: jest.fn().mockReturnValue({}),
  node,
})

const api = createApi()

describe('onCreateNode', () => {
  it('should create child node with HTML content', () => {
    onCreateNode(api as unknown as Args, { nodeType })
    expect(createNode).toBeCalledWith(htmlNode)
    expect(createParentChildLink).toBeCalledWith({ parent: node, child: htmlNode })
  })

  it('should not create child and parent-child link', () => {
    onCreateNode(api as unknown as Args, { nodeType: '' })
    expect(createNode).not.toBeCalledWith()
    expect(createParentChildLink).not.toBeCalledWith()
  })
})
