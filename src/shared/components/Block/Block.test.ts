import type { TDynamicObject } from '@app/types/utils';
import type { Block } from './Block.component';

import { assert } from 'chai';
import sinon from 'sinon';

import { createMockBlockClass } from './tests/createMockBlockClass';

describe('Базовый компонент Block', () => {
  describe('Методы жизненного цикла', () => {
    it('Базовый жизненный цикл при создании компонента init -> render -> componentDidRender', () => {
      const mockBlockClass = createMockBlockClass();

      const initSpy = sinon.spy(mockBlockClass.prototype, 'init');
      const renderSpy = sinon.spy(mockBlockClass.prototype, 'render');
      const componentDidRenderSpy = sinon.spy(mockBlockClass.prototype, 'componentDidRender');

      new mockBlockClass();

      assert.isTrue(initSpy.calledOnce);

      assert.isTrue(renderSpy.calledOnce);

      assert.isTrue(componentDidRenderSpy.calledOnce);

      assert.isTrue(renderSpy.calledAfter(initSpy));

      assert.isTrue(componentDidRenderSpy.calledAfter(renderSpy));

      initSpy.restore();
      renderSpy.restore();
      componentDidRenderSpy.restore();
    });

    it('Уведомление о монтировании: componentDidMount', () => {
      const mockBlockClass = createMockBlockClass();

      const componentDidMountSpy = sinon.spy(mockBlockClass.prototype, 'componentDidMount');

      const mockBlock = new mockBlockClass();

      mockBlock.dispatchComponentDidMount();

      assert.isTrue(componentDidMountSpy.calledOnce);

      componentDidMountSpy.restore();
    });

    it('Уведомление о демонтировании: componentWillUnmount', () => {
      const mockBlockClass = createMockBlockClass();

      const componentWillUnmountSpy = sinon.spy(mockBlockClass.prototype, 'componentWillUnmount');

      const mockBlock = new mockBlockClass();

      mockBlock.dispatchComponentWillUnmount();

      assert.isTrue(componentWillUnmountSpy.calledOnce);

      componentWillUnmountSpy.restore();
    });

    it('Обновление компонента: componentDidUpdate -> render -> componentDidRender', () => {
      const mockBlockClass = createMockBlockClass();

      const componentDidUpdateSpy = sinon.spy(mockBlockClass.prototype, 'componentDidUpdate');
      const renderSpy = sinon.spy(mockBlockClass.prototype, 'render');
      const componentDidRenderSpy = sinon.spy(mockBlockClass.prototype, 'componentDidRender');

      const mockBlock = new mockBlockClass();

      mockBlock.setProps({ content: 'NEW_VALUE' });

      assert.isTrue(componentDidUpdateSpy.calledOnce);

      assert.isTrue(renderSpy.calledTwice);

      assert.isTrue(componentDidRenderSpy.calledTwice);

      componentDidUpdateSpy.restore();
      renderSpy.restore();
      componentDidRenderSpy.restore();
    });
  });

  describe('Рендер и обновление', () => {
    it('Базовый рендер', () => {
      const mockContent = 'Hello, World!';
      const mockClassName = 'test-class';
      const mockTag = 'div';

      const mockTemplate = `<${mockTag} class="{{className}}">{{content}}</${mockTag}>`;

      const mockBlockClass = createMockBlockClass(mockTemplate);

      const mockBlock = new mockBlockClass({ content: mockContent, className: mockClassName });

      assert.strictEqual(mockBlock.getContent()?.outerHTML, `<${mockTag} class="${mockClassName}">${mockContent}</${mockTag}>`);
    });

    it('Базовое демонтирование', () => {
      const mockBlockClass = createMockBlockClass();

      const mockBlock = new mockBlockClass();

      assert.exists(mockBlock.getContent());

      mockBlock.dispatchComponentWillUnmount();

      assert.notExists(mockBlock.getContent());
    });

    it('Базовый ререндер', () => {
      const mockContent1 = 'Hello, World!';
      const mockContent2 = 'Goodbye, World!';
      const mockTag = 'div';

      const mockTemplate = `<${mockTag}>{{content}}</${mockTag}>`;

      const mockBlockClass = createMockBlockClass(mockTemplate);

      const mockBlock = new mockBlockClass({ content: mockContent1 });

      assert.strictEqual(mockBlock.getContent()?.outerHTML, `<${mockTag}>${mockContent1}</${mockTag}>`);

      mockBlock.setProps({ content: mockContent2 });

      assert.strictEqual(mockBlock.getContent()?.outerHTML, `<${mockTag}>${mockContent2}</${mockTag}>`);
    });

    it('Рендер дерева компонентов', () => {
      const mockContent2 = 'Goodbye, World!';
      const mockTag1 = 'div';
      const mockTag2 = 'span';

      const mockTemplate1 = `<${mockTag1}>{{{Children}}}</${mockTag1}>`;
      const mockTemplate2 = `<${mockTag2}>{{content}}</${mockTag2}>`;

      const mockBlockClass1 = createMockBlockClass(mockTemplate1);
      const mockBlockClass2 = createMockBlockClass(mockTemplate2);

      const mockBlock2 = new mockBlockClass2({ content: mockContent2 });
      const mockBlock1 = new mockBlockClass1({ Children: mockBlock2 });

      assert.strictEqual(mockBlock1.getContent()?.outerHTML, `<${mockTag1}><${mockTag2}>${mockContent2}</${mockTag2}></${mockTag1}>`);
    });

    it('Демонтирование дерева компонентов', () => {
      const mockTemplate1 = `<div>{{{Children}}}</div>`;

      const mockBlockClass1 = createMockBlockClass(mockTemplate1);
      const mockBlockClass2 = createMockBlockClass();

      const mockBlock2 = new mockBlockClass2();
      const mockBlock1 = new mockBlockClass1({ Children: mockBlock2 });

      mockBlock1.dispatchComponentWillUnmount();

      assert.notExists(mockBlock1.getContent());
      assert.notExists(mockBlock2.getContent());
    });

    it('Обновление дерева компонентов', () => {
      const mockContent2 = 'Goodbye, World!';
      const mockContent3 = 'Hello again, World!';
      const mockContent4 = 'Hello once more, World!';

      const mockTag1 = 'div';
      const mockTag2 = 'span';
      const mockTag3 = 'p';
      const mockTag4 = 'b';

      const mockTemplate1 = `<${mockTag1}>{{{Children}}}</${mockTag1}>`;
      const mockTemplate2 = `<${mockTag2}>{{content}}</${mockTag2}>`;
      const mockTemplate3 = `<${mockTag3}>{{content}}</${mockTag3}>`;
      const mockTemplate4 = `<${mockTag4}>{{content}}</${mockTag4}>`;

      const mockBlockClass1 = createMockBlockClass<HTMLDivElement, TDynamicObject, { Children: Block[] | Block }>(mockTemplate1);
      const mockBlockClass2 = createMockBlockClass(mockTemplate2);
      const mockBlockClass3 = createMockBlockClass(mockTemplate3);
      const mockBlockClass4 = createMockBlockClass(mockTemplate4);

      const mockBlock3 = new mockBlockClass3({ content: mockContent3 });
      const mockBlock2 = new mockBlockClass2({ content: mockContent2 });

      const mockBlock1 = new mockBlockClass1({ Children: [mockBlock2, mockBlock3] });

      assert.strictEqual(mockBlock1.getContent()?.outerHTML, `<${mockTag1}><${mockTag2}>${mockContent2}</${mockTag2}>,<${mockTag3}>${mockContent3}</${mockTag3}></${mockTag1}>`);

      const mockBlock4 = new mockBlockClass4({ content: mockContent4 });

      mockBlock1.setChild('Children', mockBlock4);

      // force rerender
      mockBlock1.init();

      assert.strictEqual(mockBlock1.getContent()?.outerHTML, `<${mockTag1}><${mockTag4}>${mockContent4}</${mockTag4}></${mockTag1}>`);
    });
  });

  describe('События', () => {
    it('Установка и обработка события', () => {
      const clickHandlerStub = sinon.stub();

      const mockBlockClass = createMockBlockClass<HTMLDivElement>();

      const mockBlock = new mockBlockClass({ events: {
        click: clickHandlerStub,
      } });

      const element = mockBlock.getContent();

      element!.click();

      assert.isTrue(clickHandlerStub.calledOnce);
    });
  });
});
