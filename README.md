## Flat Node

Manipulate a tree with paths of nodes.

- Update nodes with a path. `fnode_update_at`
- Pretty print tree.`fnode_pretty`

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

let { fnode_pretty,
  fnode_add_nodes,
  make_fnode } = fnode

let root = fnode_add_nodes(
    make_fnode('', 'root'),
    fnode_add_nodes(
      make_fnode('a1', 'hello'), 
      fnode_add_nodes(
        fnode_add_nodes(
          make_fnode('b1', 'world'),
          make_fnode('c1', 'good')),
        fnode_add_nodes(
          make_fnode('b2', 'world'),
          make_fnode('c2', 'good')),
        fnode_add_nodes(
          make_fnode('b3', 'see'),
          make_fnode('c3', 'hear')),
        )
      )
    )

console.log(fnode_pretty(root));

fnode_add_node_at(root, 'a1b1b2c2',
    make_fnode('d1', 'hope'))

```

