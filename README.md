## Flat Node

Manipulate a tree with paths of nodes.

- Update nodes with a path. `update_at`
- Pretty print tree.`pretty`

```
 root
└─┬ a1 hello
  └─┬ b1 world
    ├── c1 good
    ├─┬ b2 world
    │ └── c2 good
    └─┬ b3 see
      └── c3 hear
```


`yarn add flatnode`

```js

import * as fnode from 'flatnode'

let { pretty,
  add_nodes,
  add_node,
  root,
  node } = fnode


  let _root = root('root'),
    a1 = node('a1', 'hello'),
    b1 = node('b1', 'world'),
    c1 = node('c1', 'good'),
    b2 = node('b2', 'world'),
    c2 = node('c2', 'good'),
    b3 = node('b3', 'see'),
    c3 = node('c3', 'hear')


  add_node(_root, a1)
  add_nodes(a1, [b1, b2, b3])
  add_node(b1, c1)
  add_node(b2, c2)
  add_node(b3, c3)

  console.log(pretty(_root))


  add_node_at(root, 'a1b2c2',
      make_fnode('d1', 'hope'))

```

