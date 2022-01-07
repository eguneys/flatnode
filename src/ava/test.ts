import test from 'ava';

import {
  make_fnode,
  fnode_at_path,
  fnode_add_nodes,
  fnode_add_node_at,
  fnode_pretty } from '../types'


test('pretty', t => {

  let root = fnode_add_nodes(
    make_fnode('', 'root'),
    fnode_add_nodes(make_fnode('a1', 'hello'), 
      fnode_add_nodes(
        fnode_add_nodes(make_fnode('b1', 'world'),
          make_fnode('c1', 'good')),
        fnode_add_nodes(make_fnode('b2', 'world'),
          make_fnode('c2', 'good')),
        fnode_add_nodes(make_fnode('b3', 'see'),
          make_fnode('c3', 'hear')),
      )
    )
  )

  t.log(fnode_pretty(root))

  fnode_add_node_at(root, 'a1b1b2c2', make_fnode('d1', 'hope'))

  t.log(fnode_pretty(root))

  let res = fnode_at_path(root, 'a1b1b2c2d1')!
  t.truthy(res)

  t.is(res.data, 'hope')

});
