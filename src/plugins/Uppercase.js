import { Mark } from '@tiptap/vue-2';
import { updateMark } from 'command';

export default class UpperCase extends Mark {
  get name() {
    return 'UpperCase';
  }

  get schema() {
    return {
      parseDOM: [
        {
          tag: 'span',
          getAttrs(dom) {
            console.log(dom.classList[1]);
            return { level: dom.classList[1] };
          },
        },
      ],
      toDOM: () => {
        return [
          'span',
          {
            style: `textTransform: 'uppercase'`,
          },
          0,
        ];
      },
    };
  }

  commands({ type }) {
    return (attrs) => updateMark(type, attrs);
  }
}
