import React from 'react';

interface TextNode {
  type: 'text';
  text: string;
  detail: number;
  format: number;
  mode: string;
  style: string;
  version: number;
}

interface HeadingNode {
  type: 'heading';
  tag: string;
  direction: string;
  format: string;
  indent: number;
  version: number;
  children: Array<TextNode>;
}

interface ListItemNode {
  type: 'listitem';
  value: number;
  direction: string;
  format: string;
  indent: number;
  version: number;
  children: Array<TextNode>;
}

interface ListNode {
  type: 'list';
  listType: string;
  start: number;
  direction: string;
  format: string;
  indent: number;
  version: number;
  children: Array<ListItemNode>;
}

interface RootNode {
  type: 'root';
  direction: string;
  format: string;
  indent: number;
  version: number;
  children: Array<HeadingNode | ListNode>;
}

interface SerializedState {
  root: RootNode;
}
interface AppProps {
  serializedState: SerializedState;
}

const renderNode = (node: any, index: number): React.ReactNode => {
  switch (node.type) {
    case 'heading':
      return React.createElement(
        node.tag,
        { key: index },
        node.children.map((child: any, childIndex: number) => renderNode(child, childIndex))
      );
    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul';
      return React.createElement(
        ListTag,
        { key: index },
        node.children.map((child: any, childIndex: number) => renderNode(child, childIndex))
      );
    case 'listitem':
      return React.createElement(
        'li',
        { key: index },
        node.children.map((child: any, childIndex: number) => renderNode(child, childIndex))
      );
    case 'text':
      return (
        <span key={index}>{node.text}</span>
      );
    default:
      return null;
  }
};

const RichTextRenderer: React.FC<{ serializedState: SerializedState }> = ({ serializedState }) => {
  return (
    <div>
      {serializedState.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
};



const LexicalProcessor: React.FC<AppProps> = ({serializedState}) => {
  return (
    <div>
      <RichTextRenderer serializedState={serializedState} />
    </div>
  );
};

export default LexicalProcessor;