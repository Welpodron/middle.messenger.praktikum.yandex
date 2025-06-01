import type { Block } from '../../Block.component';

export const replaceStubWithComponentInstance = ({
  fragment,
  component,
}: {
  fragment: DocumentFragment;
  component: Block;
}) => {
  const stubElement = fragment.querySelector(
    `[data-id="${component.getId()}"]`,
  );

  if (!stubElement) {
    return;
  }

  const componentRoot = component.getContent();

  stubElement.replaceWith(componentRoot ?? '');
};
