import test from 'ava';

import {
  FRoot,
  root,
  node,
  at_path,
  add_node,
  add_nodes,
  add_node_at,
  pretty } from '../types'

import {
  climb_with_root } from '../types'

test('pretty', t => {

  let _root: FRoot<string, string> = root('root'),
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

  add_node_at(_root, 'a1b2c2', node('d1', 'hope'))

  console.log(pretty(_root))

  let res = at_path(_root, 'a1b2c2d1')!
  t.truthy(res)

  t.is(res.data, 'hope')


  climb_with_root(_root, 
    (sit: string, 
      child: string,
      max_depth: number) => {

        let res = sit + child + max_depth
        console.log(res)
        return res
  })


});
