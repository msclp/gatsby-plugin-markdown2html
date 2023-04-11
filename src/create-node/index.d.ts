import { CreateNodeArgs } from 'gatsby';
type PluginOptions = {
    nodeType: string;
};
export declare const onCreateNode: ({ actions, createContentDigest, createNodeId, node, }: CreateNodeArgs<{
    body: string;
}>, { nodeType }: PluginOptions) => void;
export {};
