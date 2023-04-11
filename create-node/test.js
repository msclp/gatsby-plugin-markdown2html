import { onCreateNode } from ".";
const createNode = jest.fn();
const createParentChildLink = jest.fn();
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
`;
const htmlContent = `<h1 id="samplemarkdown">Sample Markdown</h1>
<p>This is some basic, sample markdown.</p>
<h2 id="secondheading">Second Heading</h2>
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
  And <strong>bold</strong>, <em>italics</em>, and even <em>italics and later <strong>bold</strong></em>. Even ~~strikethrough~~. <a href="https://markdowntohtml.com">A link</a> to somewhere.
  And code highlighting:</p>
</blockquote>
<pre><code class="js language-js">var foo = 'bar';
function baz(s) {
   return foo + ':' + s;
}
</code></pre>
<p>Or inline code like <code>var foo = 'bar';</code>.
Or an image of bears
<img src="http://placebear.com/200/200" alt="bears" />
The end …</p>`;
const node = {
  id: 'id',
  body: mdContent,
  parent: 'parentId',
  children: [],
  internal: {
    type: 'nodeType',
    contentDigest: 'contentDigest',
    owner: 'owner'
  }
};
const nodeType = 'nodeType';
const htmlNode = {
  id: 'idHtml',
  html: htmlContent,
  children: [],
  parent: node.id,
  internal: {
    contentDigest: {},
    type: 'html'
  }
};
const createApi = () => ({
  actions: {
    createNode,
    createParentChildLink
  },
  createNodeId: jest.fn().mockReturnValue('idHtml'),
  createContentDigest: jest.fn().mockReturnValue({}),
  node
});
const api = createApi();
describe('onCreateNode', () => {
  it('should create child node with HTML content', () => {
    onCreateNode(api, {
      nodeType
    });
    expect(createNode).toBeCalledWith(htmlNode);
    expect(createParentChildLink).toBeCalledWith({
      parent: node,
      child: htmlNode
    });
  });
  it('should not create child and parent-child link', () => {
    onCreateNode(api, {
      nodeType: ''
    });
    expect(createNode).not.toBeCalledWith();
    expect(createParentChildLink).not.toBeCalledWith();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvbkNyZWF0ZU5vZGUiLCJjcmVhdGVOb2RlIiwiamVzdCIsImZuIiwiY3JlYXRlUGFyZW50Q2hpbGRMaW5rIiwibWRDb250ZW50IiwiaHRtbENvbnRlbnQiLCJub2RlIiwiaWQiLCJib2R5IiwicGFyZW50IiwiY2hpbGRyZW4iLCJpbnRlcm5hbCIsInR5cGUiLCJjb250ZW50RGlnZXN0Iiwib3duZXIiLCJub2RlVHlwZSIsImh0bWxOb2RlIiwiaHRtbCIsImNyZWF0ZUFwaSIsImFjdGlvbnMiLCJjcmVhdGVOb2RlSWQiLCJtb2NrUmV0dXJuVmFsdWUiLCJjcmVhdGVDb250ZW50RGlnZXN0IiwiYXBpIiwiZGVzY3JpYmUiLCJpdCIsImV4cGVjdCIsInRvQmVDYWxsZWRXaXRoIiwiY2hpbGQiLCJub3QiXSwic291cmNlcyI6WyIuLi9zcmMvY3JlYXRlLW5vZGUvdGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDcmVhdGVOb2RlQXJncyB9IGZyb20gXCJnYXRzYnlcIjtcbmltcG9ydCB7IG9uQ3JlYXRlTm9kZSB9IGZyb20gXCIuXCI7XG5cbnR5cGUgQXJncyA9IENyZWF0ZU5vZGVBcmdzPHsgYm9keTogc3RyaW5nIH0+XG5cbmNvbnN0IGNyZWF0ZU5vZGUgPSBqZXN0LmZuKClcbmNvbnN0IGNyZWF0ZVBhcmVudENoaWxkTGluayA9IGplc3QuZm4oKVxuXG5jb25zdCBtZENvbnRlbnQgPSBgXG4jIFNhbXBsZSBNYXJrZG93blxuVGhpcyBpcyBzb21lIGJhc2ljLCBzYW1wbGUgbWFya2Rvd24uXG4jIyBTZWNvbmQgSGVhZGluZ1xuICogVW5vcmRlcmVkIGxpc3RzLCBhbmQ6XG4gIDEuIE9uZVxuICAxLiBUd29cbiAgMS4gVGhyZWVcbiAqIE1vcmVcbj4gQmxvY2txdW90ZVxuQW5kICoqYm9sZCoqLCAqaXRhbGljcyosIGFuZCBldmVuICppdGFsaWNzIGFuZCBsYXRlciAqKmJvbGQqKiouIEV2ZW4gfn5zdHJpa2V0aHJvdWdofn4uIFtBIGxpbmtdKGh0dHBzOi8vbWFya2Rvd250b2h0bWwuY29tKSB0byBzb21ld2hlcmUuXG5BbmQgY29kZSBoaWdobGlnaHRpbmc6XG5cXGBcXGBcXGBqc1xudmFyIGZvbyA9ICdiYXInO1xuZnVuY3Rpb24gYmF6KHMpIHtcbiAgIHJldHVybiBmb28gKyAnOicgKyBzO1xufVxuXFxgXFxgXFxgXG5PciBpbmxpbmUgY29kZSBsaWtlIFxcYHZhciBmb28gPSAnYmFyJztcXGAuXG5PciBhbiBpbWFnZSBvZiBiZWFyc1xuIVtiZWFyc10oaHR0cDovL3BsYWNlYmVhci5jb20vMjAwLzIwMClcblRoZSBlbmQgLi4uXG5gXG5jb25zdCBodG1sQ29udGVudCA9IGA8aDEgaWQ9XCJzYW1wbGVtYXJrZG93blwiPlNhbXBsZSBNYXJrZG93bjwvaDE+XG48cD5UaGlzIGlzIHNvbWUgYmFzaWMsIHNhbXBsZSBtYXJrZG93bi48L3A+XG48aDIgaWQ9XCJzZWNvbmRoZWFkaW5nXCI+U2Vjb25kIEhlYWRpbmc8L2gyPlxuPHVsPlxuPGxpPlVub3JkZXJlZCBsaXN0cywgYW5kOjwvbGk+XG48L3VsPlxuPG9sPlxuPGxpPk9uZTwvbGk+XG48bGk+VHdvPC9saT5cbjxsaT5UaHJlZTwvbGk+XG48L29sPlxuPHVsPlxuPGxpPk1vcmU8L2xpPlxuPC91bD5cbjxibG9ja3F1b3RlPlxuICA8cD5CbG9ja3F1b3RlXG4gIEFuZCA8c3Ryb25nPmJvbGQ8L3N0cm9uZz4sIDxlbT5pdGFsaWNzPC9lbT4sIGFuZCBldmVuIDxlbT5pdGFsaWNzIGFuZCBsYXRlciA8c3Ryb25nPmJvbGQ8L3N0cm9uZz48L2VtPi4gRXZlbiB+fnN0cmlrZXRocm91Z2h+fi4gPGEgaHJlZj1cImh0dHBzOi8vbWFya2Rvd250b2h0bWwuY29tXCI+QSBsaW5rPC9hPiB0byBzb21ld2hlcmUuXG4gIEFuZCBjb2RlIGhpZ2hsaWdodGluZzo8L3A+XG48L2Jsb2NrcXVvdGU+XG48cHJlPjxjb2RlIGNsYXNzPVwianMgbGFuZ3VhZ2UtanNcIj52YXIgZm9vID0gJ2Jhcic7XG5mdW5jdGlvbiBiYXoocykge1xuICAgcmV0dXJuIGZvbyArICc6JyArIHM7XG59XG48L2NvZGU+PC9wcmU+XG48cD5PciBpbmxpbmUgY29kZSBsaWtlIDxjb2RlPnZhciBmb28gPSAnYmFyJzs8L2NvZGU+LlxuT3IgYW4gaW1hZ2Ugb2YgYmVhcnNcbjxpbWcgc3JjPVwiaHR0cDovL3BsYWNlYmVhci5jb20vMjAwLzIwMFwiIGFsdD1cImJlYXJzXCIgLz5cblRoZSBlbmQg4oCmPC9wPmBcblxuY29uc3Qgbm9kZTogQXJnc1snbm9kZSddID0ge1xuICBpZDogJ2lkJyxcbiAgYm9keTogbWRDb250ZW50LFxuICBwYXJlbnQ6ICdwYXJlbnRJZCcsXG4gIGNoaWxkcmVuOiBbXSxcbiAgaW50ZXJuYWw6IHtcbiAgICB0eXBlOiAnbm9kZVR5cGUnLFxuICAgIGNvbnRlbnREaWdlc3Q6ICdjb250ZW50RGlnZXN0JyxcbiAgICBvd25lcjogJ293bmVyJyxcbiAgfVxufVxuY29uc3Qgbm9kZVR5cGUgPSAnbm9kZVR5cGUnXG5jb25zdCBodG1sTm9kZSA9IHtcbiAgaWQ6ICdpZEh0bWwnLFxuICBodG1sOiBodG1sQ29udGVudCxcbiAgY2hpbGRyZW46IFtdLFxuICBwYXJlbnQ6IG5vZGUuaWQsXG4gIGludGVybmFsOiB7XG4gICAgY29udGVudERpZ2VzdDoge30sXG4gICAgdHlwZTogJ2h0bWwnLFxuICB9LFxufVxuXG5jb25zdCBjcmVhdGVBcGkgPSAoKSA9PiAoe1xuICBhY3Rpb25zOiB7XG4gICAgY3JlYXRlTm9kZSxcbiAgICBjcmVhdGVQYXJlbnRDaGlsZExpbmssXG4gIH0sXG4gIGNyZWF0ZU5vZGVJZDogamVzdC5mbigpLm1vY2tSZXR1cm5WYWx1ZSgnaWRIdG1sJyksXG4gIGNyZWF0ZUNvbnRlbnREaWdlc3Q6IGplc3QuZm4oKS5tb2NrUmV0dXJuVmFsdWUoe30pLFxuICBub2RlLFxufSlcblxuY29uc3QgYXBpID0gY3JlYXRlQXBpKClcblxuZGVzY3JpYmUoJ29uQ3JlYXRlTm9kZScsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCBjcmVhdGUgY2hpbGQgbm9kZSB3aXRoIEhUTUwgY29udGVudCcsICgpID0+IHtcbiAgICBvbkNyZWF0ZU5vZGUoYXBpIGFzIHVua25vd24gYXMgQXJncywgeyBub2RlVHlwZSB9KVxuICAgIGV4cGVjdChjcmVhdGVOb2RlKS50b0JlQ2FsbGVkV2l0aChodG1sTm9kZSlcbiAgICBleHBlY3QoY3JlYXRlUGFyZW50Q2hpbGRMaW5rKS50b0JlQ2FsbGVkV2l0aCh7IHBhcmVudDogbm9kZSwgY2hpbGQ6IGh0bWxOb2RlIH0pXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBub3QgY3JlYXRlIGNoaWxkIGFuZCBwYXJlbnQtY2hpbGQgbGluaycsICgpID0+IHtcbiAgICBvbkNyZWF0ZU5vZGUoYXBpIGFzIHVua25vd24gYXMgQXJncywgeyBub2RlVHlwZTogJycgfSlcbiAgICBleHBlY3QoY3JlYXRlTm9kZSkubm90LnRvQmVDYWxsZWRXaXRoKClcbiAgICBleHBlY3QoY3JlYXRlUGFyZW50Q2hpbGRMaW5rKS5ub3QudG9CZUNhbGxlZFdpdGgoKVxuICB9KVxufSlcbiJdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBU0EsWUFBWSxRQUFRLEdBQUc7QUFJaEMsTUFBTUMsVUFBVSxHQUFHQyxJQUFJLENBQUNDLEVBQUUsRUFBRTtBQUM1QixNQUFNQyxxQkFBcUIsR0FBR0YsSUFBSSxDQUFDQyxFQUFFLEVBQUU7QUFFdkMsTUFBTUUsU0FBUyxHQUFJO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxNQUFNQyxXQUFXLEdBQUk7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFFZCxNQUFNQyxJQUFrQixHQUFHO0VBQ3pCQyxFQUFFLEVBQUUsSUFBSTtFQUNSQyxJQUFJLEVBQUVKLFNBQVM7RUFDZkssTUFBTSxFQUFFLFVBQVU7RUFDbEJDLFFBQVEsRUFBRSxFQUFFO0VBQ1pDLFFBQVEsRUFBRTtJQUNSQyxJQUFJLEVBQUUsVUFBVTtJQUNoQkMsYUFBYSxFQUFFLGVBQWU7SUFDOUJDLEtBQUssRUFBRTtFQUNUO0FBQ0YsQ0FBQztBQUNELE1BQU1DLFFBQVEsR0FBRyxVQUFVO0FBQzNCLE1BQU1DLFFBQVEsR0FBRztFQUNmVCxFQUFFLEVBQUUsUUFBUTtFQUNaVSxJQUFJLEVBQUVaLFdBQVc7RUFDakJLLFFBQVEsRUFBRSxFQUFFO0VBQ1pELE1BQU0sRUFBRUgsSUFBSSxDQUFDQyxFQUFFO0VBQ2ZJLFFBQVEsRUFBRTtJQUNSRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ2pCRCxJQUFJLEVBQUU7RUFDUjtBQUNGLENBQUM7QUFFRCxNQUFNTSxTQUFTLEdBQUdBLENBQUEsTUFBTztFQUN2QkMsT0FBTyxFQUFFO0lBQ1BuQixVQUFVO0lBQ1ZHO0VBQ0YsQ0FBQztFQUNEaUIsWUFBWSxFQUFFbkIsSUFBSSxDQUFDQyxFQUFFLEVBQUUsQ0FBQ21CLGVBQWUsQ0FBQyxRQUFRLENBQUM7RUFDakRDLG1CQUFtQixFQUFFckIsSUFBSSxDQUFDQyxFQUFFLEVBQUUsQ0FBQ21CLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRGY7QUFDRixDQUFDLENBQUM7QUFFRixNQUFNaUIsR0FBRyxHQUFHTCxTQUFTLEVBQUU7QUFFdkJNLFFBQVEsQ0FBQyxjQUFjLEVBQUUsTUFBTTtFQUM3QkMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLE1BQU07SUFDckQxQixZQUFZLENBQUN3QixHQUFHLEVBQXFCO01BQUVSO0lBQVMsQ0FBQyxDQUFDO0lBQ2xEVyxNQUFNLENBQUMxQixVQUFVLENBQUMsQ0FBQzJCLGNBQWMsQ0FBQ1gsUUFBUSxDQUFDO0lBQzNDVSxNQUFNLENBQUN2QixxQkFBcUIsQ0FBQyxDQUFDd0IsY0FBYyxDQUFDO01BQUVsQixNQUFNLEVBQUVILElBQUk7TUFBRXNCLEtBQUssRUFBRVo7SUFBUyxDQUFDLENBQUM7RUFDakYsQ0FBQyxDQUFDO0VBRUZTLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxNQUFNO0lBQ3hEMUIsWUFBWSxDQUFDd0IsR0FBRyxFQUFxQjtNQUFFUixRQUFRLEVBQUU7SUFBRyxDQUFDLENBQUM7SUFDdERXLE1BQU0sQ0FBQzFCLFVBQVUsQ0FBQyxDQUFDNkIsR0FBRyxDQUFDRixjQUFjLEVBQUU7SUFDdkNELE1BQU0sQ0FBQ3ZCLHFCQUFxQixDQUFDLENBQUMwQixHQUFHLENBQUNGLGNBQWMsRUFBRTtFQUNwRCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMifQ==