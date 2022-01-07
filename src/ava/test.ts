import test from 'ava';

import {
  make_fnode,
  fnode_add_nodes,
  fnode_add_node_at,
  fnode_pretty } from '../types'


test('pretty', t => {

  let root = fnode_add_nodes(make_fnode('a', 'hello'), 
    fnode_add_nodes(
      fnode_add_nodes(make_fnode('b', 'world'),
        make_fnode('c', 'good')),
      fnode_add_nodes(make_fnode('b2', 'world'),
        make_fnode('c2', 'good')),
      fnode_add_nodes(make_fnode('b3', 'see'),
        make_fnode('c3', 'hear')),
    )
  )


  console.log(fnode_pretty(root))
  
  t.fail()

});
