import type { Block } from '../../Block.component';

export const replaceStubWithComponentInstance = ({
  fragment,
  component,
  constructorName,
}: {
  fragment: DocumentFragment;
  component: Block;
  constructorName: string;
}) => {
  const stubElement = fragment.querySelector(
    `[data-id="${component.getId()}"]`,
  );

  if (!stubElement) {
    throw new Error(
      `Не найден stub c data-id="${component.getId()}" для компонента "${
        component.constructor.name
      }" внутри фрагмента компонента "${constructorName}"`,
    );
  }

  const componentRoot = component.getContent();

  if (!componentRoot) {
    throw new Error(
      `У компонента "${component.constructor.name}" внутри "${constructorName}" отсутствует "_element"`,
    );
  }

  stubElement.replaceWith(componentRoot);
};
